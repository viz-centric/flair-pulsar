import {IncomingEvent} from "../../persistence/incoming-event/incoming-event.entity";
import {IncomingEventLogType} from "../../persistence/incoming-event/incoming-event-log-type";
import {msg} from "../../utils/logging/logging.service";
import {IncomingEventService} from "../../persistence/incoming-event/incoming-event.service";
import {Injectable} from "@nestjs/common";
import {DateUtils} from "../../utils/date-utils";

@Injectable()
export class PulseService {

  constructor(
    private readonly incomingMessageService: IncomingEventService
  ) {
  }

  async handlePulse(pulseConfig: any, pulseHeader: any, pulseBody: any) {
    let seconds: number = pulseHeader.eventTime.seconds;
    let nanos: number = pulseHeader.eventTime.nanos;

    let event = new IncomingEvent();
    event.summary = pulseBody.summary;
    event.eventTime = DateUtils.toDateFromSecondsAndNanos(seconds, nanos);
    event.serviceName = pulseHeader.service;
    event.logType = pulseConfig.log ? IncomingEventLogType.ON : IncomingEventLogType.OFF;
    event.ttl = pulseConfig.ttl;
    event.eventData = pulseBody.eventData;

    try {
      let savedMessage = await this.incomingMessageService.save(event);
      msg(  `incoming message saved`, savedMessage);
    } catch (e) {
      msg(`failed saving incoming message`, event, e);
    }
  }
}
