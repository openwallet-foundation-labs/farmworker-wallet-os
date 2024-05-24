import type { MessagePickupRepository } from './MessagePickupRepository';
import type { AddMessageOptions, GetAvailableMessageCountOptions, RemoveMessagesOptions, TakeFromQueueOptions } from './MessagePickupRepositoryOptions';
import type { QueuedMessage } from './QueuedMessage';
import { Logger } from '../../../logger';
export declare class InMemoryMessagePickupRepository implements MessagePickupRepository {
    private logger;
    private messages;
    constructor(logger: Logger);
    getAvailableMessageCount(options: GetAvailableMessageCountOptions): number | Promise<number>;
    takeFromQueue(options: TakeFromQueueOptions): QueuedMessage[];
    addMessage(options: AddMessageOptions): string;
    removeMessages(options: RemoveMessagesOptions): void;
}
