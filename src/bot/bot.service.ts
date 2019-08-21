import { Injectable } from '@nestjs/common';
import { ActivityHandler, TurnContext } from 'botbuilder';


@Injectable()
export class BotService extends ActivityHandler {
    conversationReferences: any = {};
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            await context.sendActivity('Thanks for texting me but now i cannot answer you.. I can only send proactive messages');
            await next();
        });

        this.onConversationUpdate(async (context, next) => {
            this.addConversationReference(context.activity);
            await next();
        });

        this.onMembersAdded(async (context, next) => {
           this.sendWelcomeMessage(context);
        });
    }
    private addConversationReference(activity) {
        const conversationReference = TurnContext.getConversationReference(activity);
        this.conversationReferences[conversationReference.conversation.id] = conversationReference;
    }
    private async sendWelcomeMessage(context) {
        for (const idx in context.activity.membersAdded) {
            if (context.activity.membersAdded[idx].id !== context.activity.recipient.id) {
                await context.sendActivity(`Hello, I'm flair bot. I will send proactive messages for critical incidents`);
            }
        }
    }
}
