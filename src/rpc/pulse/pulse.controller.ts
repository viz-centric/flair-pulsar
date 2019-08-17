import {Controller} from '@nestjs/common';
import {GrpcMethod} from '@nestjs/microservices';
import {PulseRequest} from '../dto/pulse-request.interface';
import {PulseResponse} from '../dto/pulse-response.interface';
import {msg} from '../../utils/logging/logging.service';
import {PulseService} from './pulse.service';

@Controller()
export class PulseController {

  constructor(private readonly pulseService: PulseService) {
  }

  @GrpcMethod('PulsarService')
  publishPulse(data: PulseRequest, metadata: any): PulseResponse {
    msg(`Publish pulse grpc handler called`, data);
    this.pulseService.handlePulse(data.pulseConfig, data.pulseHeader, data.pulseBody);
    return new PulseResponse();
  }

}
