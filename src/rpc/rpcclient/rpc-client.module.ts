import {Module} from '@nestjs/common';
import {ConfigService} from "../../config/config.service";
import {RpcConfigService} from "../rpcconfig/rpc-config.service";
import {RpcClientService} from "./rpc-client.service";

@Module({
  providers: [ConfigService, RpcConfigService, RpcClientService],
})
export class RpcClientModule {}
