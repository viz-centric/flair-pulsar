import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RpcService} from './rpc/rpc.service';
import {ConfigService} from './config/config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RpcService, ConfigService],
})
export class AppModule {}
