import type { AgentMessage } from './AgentMessage';
import type { AgentContext } from './context';
import type { EncryptedMessage, PlaintextMessage } from '../types';
import { Key } from '../crypto';
import { Logger } from '../logger';
export interface EnvelopeKeys {
    recipientKeys: Key[];
    routingKeys: Key[];
    senderKey: Key | null;
}
export declare class EnvelopeService {
    private logger;
    constructor(logger: Logger);
    packMessage(agentContext: AgentContext, payload: AgentMessage, keys: EnvelopeKeys): Promise<EncryptedMessage>;
    unpackMessage(agentContext: AgentContext, encryptedMessage: EncryptedMessage): Promise<DecryptedMessageContext>;
}
export interface DecryptedMessageContext {
    plaintextMessage: PlaintextMessage;
    senderKey?: Key;
    recipientKey?: Key;
}
