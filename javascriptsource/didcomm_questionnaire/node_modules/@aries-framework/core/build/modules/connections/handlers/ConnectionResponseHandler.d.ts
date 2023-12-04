import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidResolverService } from '../../dids';
import type { OutOfBandService } from '../../oob/OutOfBandService';
import type { ConnectionsModuleConfig } from '../ConnectionsModuleConfig';
import type { ConnectionService } from '../services/ConnectionService';
import { OutboundMessageContext } from '../../../agent/models';
import { ConnectionResponseMessage } from '../messages';
export declare class ConnectionResponseHandler implements MessageHandler {
    private connectionService;
    private outOfBandService;
    private didResolverService;
    private connectionsModuleConfig;
    supportedMessages: (typeof ConnectionResponseMessage)[];
    constructor(connectionService: ConnectionService, outOfBandService: OutOfBandService, didResolverService: DidResolverService, connectionsModuleConfig: ConnectionsModuleConfig);
    handle(messageContext: MessageHandlerInboundMessage<ConnectionResponseHandler>): Promise<OutboundMessageContext<import("../messages").TrustPingMessage> | undefined>;
}
