import type { MessageRepository } from './MessageRepository';
import type { EncryptedMessage } from '../types';
import { Logger } from '../logger';
export declare class InMemoryMessageRepository implements MessageRepository {
    private logger;
    private messages;
    constructor(logger: Logger);
    getAvailableMessageCount(connectionId: string): number | Promise<number>;
    takeFromQueue(connectionId: string, limit?: number, keepMessages?: boolean): EncryptedMessage[];
    add(connectionId: string, payload: EncryptedMessage): void;
}
