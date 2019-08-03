import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IncomingEventService} from "./incoming-event/incoming-event.service";
import {IncomingEvent} from "./incoming-event/incoming-event.entity";

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([IncomingEvent])],
  providers: [IncomingEventService]
})
export class DatabaseModule {}
