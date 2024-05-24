import type { Routing } from './ConnectionService';
import type { AgentContext } from '../../../agent';
import type { InboundMessageContext } from '../../../agent/models/InboundMessageContext';
import type { ConnectionRecord } from '../repository/ConnectionRecord';
import { EventEmitter } from '../../../agent/EventEmitter';
import { OutboundMessageContext } from '../../../agent/models';
import { Logger } from '../../../logger';
import { DidResolverService } from '../../dids';
import { DidRotateMessage, DidRotateAckMessage, DidRotateProblemReportMessage, HangupMessage } from '../messages';
export declare class DidRotateService {
    private didResolverService;
    private logger;
    private eventEmitter;
    constructor(didResolverService: DidResolverService, logger: Logger, eventEmitter: EventEmitter);
    createRotate(agentContext: AgentContext, options: {
        connection: ConnectionRecord;
        toDid?: string;
        routing?: Routing;
    }): Promise<DidRotateMessage>;
    createHangup(agentContext: AgentContext, options: {
        connection: ConnectionRecord;
    }): Promise<HangupMessage>;
    /**
     * Process a Hangup message and mark connection's theirDid as undefined so it is effectively terminated.
     * Connection Record itself is not deleted (TODO: config parameter to automatically do so)
     *
     * Its previous did will be stored in record in order to be able to recognize any message received
     * afterwards.
     *
     * @param messageContext
     */
    processHangup(messageContext: InboundMessageContext<HangupMessage>): Promise<void>;
    /**
     * Process an incoming DID Rotate message and update connection if success. Any acknowledge
     * or problem report will be sent to the prior DID, so the created context will take former
     * connection record data
     *
     * @param param
     * @param connection
     * @returns
     */
    processRotate(messageContext: InboundMessageContext<DidRotateMessage>): Promise<OutboundMessageContext<DidRotateProblemReportMessage> | OutboundMessageContext<DidRotateAckMessage>>;
    processRotateAck(inboundMessage: InboundMessageContext<DidRotateAckMessage>): Promise<void>;
    /**
     * Process a problem report related to did rotate protocol, by simply deleting any temporary metadata.
     *
     * No specific event is thrown other than generic message processing
     *
     * @param messageContext
     */
    processProblemReport(messageContext: InboundMessageContext<DidRotateProblemReportMessage>): Promise<void>;
    clearDidRotationData(agentContext: AgentContext, connection: ConnectionRecord): Promise<void>;
    private emitDidRotatedEvent;
}
