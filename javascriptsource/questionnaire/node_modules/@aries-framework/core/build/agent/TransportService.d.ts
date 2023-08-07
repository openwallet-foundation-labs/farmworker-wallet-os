import type { AgentMessage } from './AgentMessage';
import type { EnvelopeKeys } from './EnvelopeService';
import type { AgentContext } from './context';
import type { DidDocument } from '../modules/dids';
import type { EncryptedMessage } from '../types';
export declare class TransportService {
    transportSessionTable: TransportSessionTable;
    saveSession(session: TransportSession): void;
    findSessionByConnectionId(connectionId: string): TransportSession | undefined;
    setConnectionIdForSession(sessionId: string, connectionId: string): void;
    hasInboundEndpoint(didDocument: DidDocument): boolean;
    findSessionById(sessionId: string): TransportSession | undefined;
    removeSession(session: TransportSession): void;
}
interface TransportSessionTable {
    [sessionId: string]: TransportSession | undefined;
}
export interface TransportSession {
    id: string;
    type: string;
    keys?: EnvelopeKeys;
    inboundMessage?: AgentMessage;
    connectionId?: string;
    send(agentContext: AgentContext, encryptedMessage: EncryptedMessage): Promise<void>;
    close(): Promise<void>;
}
export {};
