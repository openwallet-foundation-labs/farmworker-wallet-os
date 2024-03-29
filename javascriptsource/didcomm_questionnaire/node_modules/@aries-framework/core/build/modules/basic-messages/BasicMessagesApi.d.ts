import type { BasicMessageRecord } from './repository/BasicMessageRecord';
import type { Query } from '../../storage/StorageService';
import { AgentContext } from '../../agent';
import { MessageHandlerRegistry } from '../../agent/MessageHandlerRegistry';
import { MessageSender } from '../../agent/MessageSender';
import { ConnectionService } from '../connections';
import { BasicMessageService } from './services';
export declare class BasicMessagesApi {
    private basicMessageService;
    private messageSender;
    private connectionService;
    private agentContext;
    constructor(messageHandlerRegistry: MessageHandlerRegistry, basicMessageService: BasicMessageService, messageSender: MessageSender, connectionService: ConnectionService, agentContext: AgentContext);
    /**
     * Send a message to an active connection
     *
     * @param connectionId Connection Id
     * @param message Message contents
     * @throws {RecordNotFoundError} If connection is not found
     * @throws {MessageSendingError} If message is undeliverable
     * @returns the created record
     */
    sendMessage(connectionId: string, message: string, parentThreadId?: string): Promise<BasicMessageRecord>;
    /**
     * Retrieve all basic messages matching a given query
     *
     * @param query The query
     * @returns array containing all matching records
     */
    findAllByQuery(query: Query<BasicMessageRecord>): Promise<BasicMessageRecord[]>;
    /**
     * Retrieve a basic message record by id
     *
     * @param basicMessageRecordId The basic message record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The basic message record
     *
     */
    getById(basicMessageRecordId: string): Promise<BasicMessageRecord>;
    /**
     * Retrieve a basic message record by thread id
     *
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The connection record
     */
    getByThreadId(basicMessageRecordId: string): Promise<BasicMessageRecord>;
    /**
     * Delete a basic message record by id
     *
     * @param connectionId the basic message record id
     * @throws {RecordNotFoundError} If no record is found
     */
    deleteById(basicMessageRecordId: string): Promise<void>;
    private registerMessageHandlers;
}
