import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { BotService } from '../bot/bot.service';
import { BotAdapter } from '../bot/bot.adapter';

@Controller('api') 
export class DispatcherController {
  
    constructor(private readonly botService: BotService, private botAdapter: BotAdapter) {}    
    adapter = this.botAdapter.getBotAdapter();

    @Post('messages')
    listen(@Req() request: Request, @Res() response: Response): any {
        this.adapter.processActivity(request, response, async (context) => {
            await this.botService.run(context); 
        });
    }

    @Get('send') 
    async sendProactive(){ 
        for (let conversationReference of Object.values(this.botService.conversationReferences)) {
            await this.adapter.continueConversation(conversationReference, async turnContext => {
                await turnContext.sendActivity('proactive hello');
            }); 
        }
    }
}
