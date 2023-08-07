import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidRepository } from '../../dids/repository';
import type { OutOfBandService } from '../../oob/OutOfBandService';
import type { RoutingService } from '../../routing/services/RoutingService';
import type { ConnectionsModuleConfig } from '../ConnectionsModuleConfig';
import type { DidExchangeProtocol } from '../DidExchangeProtocol';
import { OutboundMessageContext } from '../../../agent/models';
import { DidExchangeRequestMessage } from '../messages';
export declare class DidExchangeRequestHandler implements MessageHandler {
    private didExchangeProtocol;
    private outOfBandService;
    private routingService;
    private didRepository;
    private connectionsModuleConfig;
    supportedMessages: (typeof DidExchangeRequestMessage)[];
    constructor(didExchangeProtocol: DidExchangeProtocol, outOfBandService: OutOfBandService, routingService: RoutingService, didRepository: DidRepository, connectionsModuleConfig: ConnectionsModuleConfig);
    handle(messageContext: MessageHandlerInboundMessage<DidExchangeRequestHandler>): Promise<OutboundMessageContext<import("../messages").DidExchangeResponseMessage> | undefined>;
}
