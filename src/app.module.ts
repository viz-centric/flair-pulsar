import {AppController} from './app.controller';
import {ConfigService} from './config/config.service';
import {LoggingService} from './utils/logging/logging.service';
import {RpcClientModule} from "./rpc/client/rpc-client.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RpcServerModule} from "./rpc/server/rpc-server.module";
import {Module} from "@nestjs/common";
import {IncomingEventService} from "./persistence/incoming-event/incoming-event.service";
import {IncomingEvent} from "./persistence/incoming-event/incoming-event.entity";
import {PulseService} from "./rpc/pulse/pulse.service";
import {RpcServerService} from "./rpc/server/rpc-server.service";
import {RpcConfigService} from "./rpc/config/rpc-config.service";
import {DatabaseService} from './persistence/database/database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([IncomingEvent]),
    RpcClientModule,
    RpcServerModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    ConfigService,
    LoggingService,
    IncomingEventService,
    PulseService,
    RpcServerService,
    RpcConfigService,
    DatabaseService,
  ],
})
export class AppModule {
}
