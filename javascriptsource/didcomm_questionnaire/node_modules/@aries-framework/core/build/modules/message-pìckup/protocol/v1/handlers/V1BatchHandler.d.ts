import type { MessageHandler, MessageHandlerInboundMessage } from '../../../../../agent/MessageHandler';
import { V1BatchMessage } from '../messages';
export declare class V1BatchHandler implements MessageHandler {
    supportedMessages: (typeof V1BatchMessage)[];
    handle(messageContext: MessageHandlerInboundMessage<V1BatchHandler>): Promise<void>;
}
