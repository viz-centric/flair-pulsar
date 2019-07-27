import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigService} from './config/config.service';
import {RpcClientService} from "./rpc/rpcclient/rpc-client.service";
import {RpcConfigService} from "./rpc/rpcconfig/rpc-config.service";
import {RpcServerService} from "./rpc/server/rpc-server.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConfigService, RpcServerService, RpcClientService, RpcConfigService],
})
export class AppModule {}
