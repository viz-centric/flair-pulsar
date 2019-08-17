import {PulseHeader} from './pulse-header.interface';
import {PulseBody} from './pulse-body.interface';
import {PulseConfig} from './pulse-config.interface';

export interface PulseRequest {
  pulseHeader: PulseHeader;
  pulseBody: PulseBody;
  pulseConfig: PulseConfig;
}
