import { Injectable } from '@nestjs/common';
import { ActivityHandler, TurnContext } from 'botbuilder';


@Injectable()
export class BotService extends ActivityHandler {
    conversationReferences: any = {};
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await context.sendActivity(`You said '${ context.activity.text }'`);
            await next();
        });

        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context.activity);
            await next();
        });
    }
    addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
}
