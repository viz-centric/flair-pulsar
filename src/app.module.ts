import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigService} from './config/config.service';
import {RpcConfigService} from "./rpc/rpcconfig/rpc-config.service";
import {RpcServerService} from "./rpc/server/rpc-server.service";
import {RpcClientModule} from "./rpc/rpcclient/rpc-client.module";
import {LoggingService} from './utils/logging/logging.service';

@Module({
  imports: [RpcClientModule],
  controllers: [AppController],
  providers: [ConfigService, RpcServerService, RpcConfigService, LoggingService],
})
export class AppModule {}
