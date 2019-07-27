import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigService} from './config/config.service';
import {RpcConfigService} from "./rpc/rpcconfig/rpc-config.service";
import {RpcServerService} from "./rpc/server/rpc-server.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ConfigService, RpcServerService, RpcConfigService],
})
export class AppModule {}
