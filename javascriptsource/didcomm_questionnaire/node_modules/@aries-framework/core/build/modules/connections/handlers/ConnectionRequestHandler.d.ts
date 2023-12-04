import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidRepository } from '../../dids/repository';
import type { OutOfBandService } from '../../oob/OutOfBandService';
import type { RoutingService } from '../../routing/services/RoutingService';
import type { ConnectionsModuleConfig } from '../ConnectionsModuleConfig';
import type { ConnectionService } from '../services/ConnectionService';
import { OutboundMessageContext } from '../../../agent/models';
import { ConnectionRequestMessage } from '../messages';
export declare class ConnectionRequestHandler implements MessageHandler {
    private connectionService;
    private outOfBandService;
    private routingService;
    private didRepository;
    private connectionsModuleConfig;
    supportedMessages: (typeof ConnectionRequestMessage)[];
    constructor(connectionService: ConnectionService, outOfBandService: OutOfBandService, routingService: RoutingService, didRepository: DidRepository, connectionsModuleConfig: ConnectionsModuleConfig);
    handle(messageContext: MessageHandlerInboundMessage<ConnectionRequestHandler>): Promise<OutboundMessageContext<import("../messages").ConnectionResponseMessage> | undefined>;
}
