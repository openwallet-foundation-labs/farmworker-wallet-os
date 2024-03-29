import type { DidDoc } from '../models';
import { AgentMessage } from '../../../agent/AgentMessage';
import { Connection } from '../models';
export interface ConnectionRequestMessageOptions {
    id?: string;
    label: string;
    did: string;
    didDoc?: DidDoc;
    imageUrl?: string;
}
/**
 * Message to communicate the DID document to the other agent when creating a connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#1-connection-request
 */
export declare class ConnectionRequestMessage extends AgentMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new ConnectionRequestMessage instance.
     * @param options
     */
    constructor(options: ConnectionRequestMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    label: string;
    connection: Connection;
    imageUrl?: string;
}
