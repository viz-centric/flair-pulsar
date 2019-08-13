import {Injectable} from '@nestjs/common';
import * as grpc from 'grpc';

@Injectable()
export class RpcConfigService {

  createServerCredentials() {
    return grpc.ServerCredentials.createInsecure();
  }

  createClientCredentials() {
    return grpc.credentials.createInsecure();
  }

}
