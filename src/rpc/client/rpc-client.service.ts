import {Injectable, OnModuleInit} from '@nestjs/common';
import {msg} from '../../utils/logging/logging.service';
import {PulsarService} from '../dto/pulsar-service.interface';
import {Client, ClientGrpc} from '@nestjs/microservices';
import {grpcClientOptions} from '../config/grpc-client.options';
import {PulseRequest} from '../dto/pulse-request.interface';
import {PulseResponse} from '../dto/pulse-response.interface';

@Injectable()
export class RpcClientService implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;
  private pulsarService: PulsarService;

  onModuleInit(): any {
    msg(`gRPC client created`);
    this.pulsarService = this.client.getService<PulsarService>('PulsarService');
  }

  publishPulse(request: PulseRequest): PulseResponse {
    msg('Publishing pulse request', request);
    return this.pulsarService.publishPulse(request)
      .toPromise();
  }
}
