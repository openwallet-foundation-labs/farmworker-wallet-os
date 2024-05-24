import type { MessageHandler, MessageHandlerInboundMessage } from '../../../agent/MessageHandler';
import type { DidResolverService } from '../../dids';
import type { OutOfBandService } from '../../oob/OutOfBandService';
import type { ConnectionsModuleConfig } from '../ConnectionsModuleConfig';
import type { DidExchangeProtocol } from '../DidExchangeProtocol';
import type { ConnectionService } from '../services';
import { OutboundMessageContext } from '../../../agent/models';
import { DidExchangeResponseMessage } from '../messages';
export declare class DidExchangeResponseHandler implements MessageHandler {
    private didExchangeProtocol;
    private outOfBandService;
    private connectionService;
    private didResolverService;
    private connectionsModuleConfig;
    supportedMessages: (typeof DidExchangeResponseMessage)[];
    constructor(didExchangeProtocol: DidExchangeProtocol, outOfBandService: OutOfBandService, connectionService: ConnectionService, didResolverService: DidResolverService, connectionsModuleConfig: ConnectionsModuleConfig);
    handle(messageContext: MessageHandlerInboundMessage<DidExchangeResponseHandler>): Promise<OutboundMessageContext<import("../messages").DidExchangeCompleteMessage> | undefined>;
}
