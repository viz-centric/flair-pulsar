import { Module, Global } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotAdapter } from './bot.adapter';

@Module({
  providers: [BotService, BotAdapter],
  exports: [BotService, BotAdapter]
})
export class BotModule {}
