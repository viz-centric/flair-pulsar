import {IncomingEvent} from '../../persistence/incoming-event/incoming-event.entity';
import {IncomingEventLogType} from '../../persistence/incoming-event/incoming-event-log-type';
import {msg} from '../../utils/logging/logging.service';
import {IncomingEventService} from '../../persistence/incoming-event/incoming-event.service';
import {Injectable} from '@nestjs/common';
import {DateUtils} from '../../utils/date-utils';
import {PulseConfig} from '../dto/pulse-config.interface';
import {PulseHeader} from '../dto/pulse-header.interface';
import {PulseBody} from '../dto/pulse-body.interface';

@Injectable()
export class PulseService {
  constructor(private readonly incomingMessageService: IncomingEventService) {}

  async handlePulse(pulseConfig: PulseConfig, pulseHeader: PulseHeader, pulseBody: PulseBody) {
    const seconds: number = pulseHeader.eventTime.seconds;
    const nanos: number = pulseHeader.eventTime.nanos;

    const event = new IncomingEvent();
    event.summary = pulseBody.summary;
    event.eventTime = DateUtils.toDateFromSecondsAndNanos(seconds, nanos);
    event.serviceName = pulseHeader.service;
    event.logType = pulseConfig.log
      ? IncomingEventLogType.ON
      : IncomingEventLogType.OFF;
    event.ttl = pulseConfig.ttl;
    event.eventData = pulseBody.eventData;

    try {
      const savedMessage = await this.incomingMessageService.save(event);
      msg(`incoming message saved`, savedMessage);
    } catch (e) {
      msg(`failed saving incoming message`, event, e);
    }
  }
}
