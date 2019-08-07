import {Module} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import {RpcClientService} from './rpc-client.service';
import {RpcConfigService} from '../config/rpc-config.service';

@Module({
  providers: [ConfigService, RpcConfigService, RpcClientService],
})
export class RpcClientModule {}
