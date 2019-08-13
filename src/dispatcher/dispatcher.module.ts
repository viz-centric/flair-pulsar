import { Module } from '@nestjs/common';
import { DispatcherController } from './dispatcher.controller';
import { BotModule } from '../bot/bot.module';

@Module({
  controllers: [DispatcherController],
  imports: [BotModule]
})
export class DispatcherModule {}
