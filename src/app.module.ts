import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigService} from './config/config.service';
import {RpcServerService} from "./rpc/server/rpc-server.service";
import {LoggingService} from './utils/logging/logging.service';
import {RpcClientModule} from "./rpc/client/rpc-client.module";
import {RpcConfigService} from "./rpc/config/rpc-config.service";
import {DatabaseModule} from "./persistence/database.module";

@Module({
  imports: [RpcClientModule, DatabaseModule],
  controllers: [AppController],
  providers: [ConfigService, RpcServerService, RpcConfigService, LoggingService],
})
export class AppModule {}
