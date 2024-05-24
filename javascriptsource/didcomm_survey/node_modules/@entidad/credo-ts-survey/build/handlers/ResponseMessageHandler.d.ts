import type { SurveyService } from '../services';
import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core';
import { ResponseMessage } from '../messages';
export declare class ResponseMessageHandler implements MessageHandler {
    private surveyService;
    supportedMessages: (typeof ResponseMessage)[];
    constructor(surveyService: SurveyService);
    handle(messageContext: MessageHandlerInboundMessage<ResponseMessageHandler>): Promise<void>;
}
