import type { QuestionAnswerService } from '../services';
import type { MessageHandler, MessageHandlerInboundMessage } from '@aries-framework/core';
import { AnswerMessage } from '../messages';
export declare class AnswerMessageHandler implements MessageHandler {
    private questionAnswerService;
    supportedMessages: (typeof AnswerMessage)[];
    constructor(questionAnswerService: QuestionAnswerService);
    handle(messageContext: MessageHandlerInboundMessage<AnswerMessageHandler>): Promise<void>;
}
