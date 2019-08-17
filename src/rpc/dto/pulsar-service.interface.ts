import {PulseRequest} from './pulse-request.interface';
import {Observable} from 'rxjs';
import {PulseResponse} from './pulse-response.interface';

export interface PulsarService {
  publishPulse(data: PulseRequest): Observable<PulseResponse>;
}
