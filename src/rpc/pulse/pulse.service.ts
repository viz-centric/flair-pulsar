import {IncomingEvent} from "../../persistence/incoming-event/incoming-event.entity";
import {IncomingEventLogType} from "../../persistence/incoming-event/incoming-event-log-type";
import {msg} from "../../utils/logging/logging.service";
import {IncomingEventService} from "../../persistence/incoming-event/incoming-event.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PulseService {

  constructor(
    private readonly incomingMessageService: IncomingEventService
  ) {
  }

  handlePulse(pulseConfig: any, pulseHeader: any, pulseBody: any) {
    let event = new IncomingEvent();
    event.summary = pulseBody.summary;
    event.eventTime = pulseHeader.eventTime;
    event.serviceName = pulseHeader.service;
    event.logType = pulseConfig.log ? IncomingEventLogType.ON : IncomingEventLogType.OFF;
    event.ttl = pulseConfig.ttl;

    this.incomingMessageService.create(event)
      .then((data) => {
        msg(`incoming message saved ${data}`);
      })
      .catch((error) => {
        msg(`error saving incoming message ${error}`);
      });
  }
}
