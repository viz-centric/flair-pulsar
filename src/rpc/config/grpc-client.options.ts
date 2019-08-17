import {ClientOptions, Transport} from '@nestjs/microservices';
import {join} from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
    package: 'pulsar',
    protoPath: join('./src/resources/proto/PulsarService.proto'),
  },
};
