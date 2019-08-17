import {Timestamp} from './timestamp.interface';

export interface PulseHeader {
  service: string;
  eventTime: Timestamp;
}
