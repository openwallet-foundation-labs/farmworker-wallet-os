import type { ConnectionRecord } from './repository';
import type { Routing } from './services/ConnectionService';
import type { AgentContext } from '../../agent';
import type { InboundMessageContext } from '../../agent/models/InboundMessageContext';
import type { OutOfBandRecord } from '../oob/repository';
import { JwsService } from '../../crypto/JwsService';
import { Logger } from '../../logger';
import { DidRegistrarService } from '../dids';
import { DidRepository } from '../dids/repository';
import { DidExchangeCompleteMessage } from './messages/DidExchangeCompleteMessage';
import { DidExchangeRequestMessage } from './messages/DidExchangeRequestMessage';
import { DidExchangeResponseMessage } from './messages/DidExchangeResponseMessage';
import { ConnectionService } from './services';
interface DidExchangeRequestParams {
    label?: string;
    alias?: string;
    goal?: string;
    goalCode?: string;
    routing: Routing;
    autoAcceptConnection?: boolean;
}
export declare class DidExchangeProtocol {
    private connectionService;
    private didRegistrarService;
    private jwsService;
    private didRepository;
    private logger;
    constructor(connectionService: ConnectionService, didRegistrarService: DidRegistrarService, didRepository: DidRepository, jwsService: JwsService, logger: Logger);
    createRequest(agentContext: AgentContext, outOfBandRecord: OutOfBandRecord, params: DidExchangeRequestParams): Promise<{
        message: DidExchangeRequestMessage;
        connectionRecord: ConnectionRecord;
    }>;
    processRequest(messageContext: InboundMessageContext<DidExchangeRequestMessage>, outOfBandRecord: OutOfBandRecord): Promise<ConnectionRecord>;
    createResponse(agentContext: AgentContext, connectionRecord: ConnectionRecord, outOfBandRecord: OutOfBandRecord, routing?: Routing): Promise<DidExchangeResponseMessage>;
    processResponse(messageContext: InboundMessageContext<DidExchangeResponseMessage>, outOfBandRecord: OutOfBandRecord): Promise<ConnectionRecord>;
    createComplete(agentContext: AgentContext, connectionRecord: ConnectionRecord, outOfBandRecord: OutOfBandRecord): Promise<DidExchangeCompleteMessage>;
    processComplete(messageContext: InboundMessageContext<DidExchangeCompleteMessage>, outOfBandRecord: OutOfBandRecord): Promise<ConnectionRecord>;
    private updateState;
    private createPeerDidDoc;
    private createSignedAttachment;
    /**
     * Extracts DID document as is from request or response message attachment and verifies its signature.
     *
     * @param message DID request or DID response message
     * @param invitationKeys array containing keys from connection invitation that could be used for signing of DID document
     * @returns verified DID document content from message attachment
     */
    private extractDidDocument;
    private routingToServices;
}
export {};
