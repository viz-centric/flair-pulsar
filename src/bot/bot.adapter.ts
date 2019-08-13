import { BotFrameworkAdapter } from "botbuilder";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BotAdapter {

    getBotAdapter() : BotFrameworkAdapter{
        const adapter = new BotFrameworkAdapter({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword,
        });
    
        // Catch-all for errors.
        adapter.onTurnError = async (context, error) => { 
            console.error(`\n [onTurnError]: ${error}`);
            await context.sendActivity(`Oops. Something went wrong!`);
        };
        // End of bot adpater configurations //

        return adapter;
    }
}