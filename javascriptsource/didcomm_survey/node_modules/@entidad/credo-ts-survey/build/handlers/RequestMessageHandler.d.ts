import type { SurveyService } from '../services';
import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core';
import { RequestMessage } from '../messages';
export declare class RequestMessageHandler implements MessageHandler {
    private surveyService;
    supportedMessages: (typeof RequestMessage)[];
    constructor(surveyService: SurveyService);
    handle(messageContext: MessageHandlerInboundMessage<RequestMessageHandler>): Promise<void>;
}
