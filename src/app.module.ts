import {LoggingService} from './utils/logging/logging.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {IncomingEventService} from './persistence/incoming-event/incoming-event.service';
import {IncomingEvent} from './persistence/incoming-event/incoming-event.entity';
import {PulseService} from './rpc/pulse/pulse.service';
import {RpcConfigService} from './rpc/config/rpc-config.service';
import {DatabaseService} from './persistence/database/database.service';
import {PulseController} from './rpc/pulse/pulse.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([IncomingEvent]),
  ],
  controllers: [
    PulseController,
  ],
  providers: [
    LoggingService,
    IncomingEventService,
    PulseService,
    RpcConfigService,
    DatabaseService,
  ],
})
export class AppModule {
  constructor(private readonly databaseService: DatabaseService) {}

  async shutdown() {
    await this.databaseService.close();
  }
}
