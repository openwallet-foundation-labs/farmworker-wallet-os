import type { QuestionAnswerRecord } from './repository';
import type { Query } from '@aries-framework/core';
import { AgentContext, ConnectionService, MessageSender } from '@aries-framework/core';
import { ValidResponse } from './models';
import { QuestionAnswerService } from './services';
export declare class QuestionAnswerApi {
    private questionAnswerService;
    private messageSender;
    private connectionService;
    private agentContext;
    constructor(questionAnswerService: QuestionAnswerService, messageSender: MessageSender, connectionService: ConnectionService, agentContext: AgentContext);
    /**
     * Create a question message with possible valid responses, then send message to the
     * holder
     *
     * @param connectionId connection to send the question message to
     * @param config config for creating question message
     * @returns QuestionAnswer record
     */
    sendQuestion(connectionId: string, config: {
        question: string;
        validResponses: ValidResponse[];
        detail?: string;
    }): Promise<QuestionAnswerRecord>;
    /**
     * Create an answer message as the holder and send it in response to a question message
     *
     * @param questionRecordId the id of the questionAnswer record
     * @param response response included in the answer message
     * @returns QuestionAnswer record
     */
    sendAnswer(questionRecordId: string, response: string): Promise<QuestionAnswerRecord>;
    /**
     * Get all QuestionAnswer records
     *
     * @returns list containing all QuestionAnswer records
     */
    getAll(): Promise<QuestionAnswerRecord[]>;
    /**
     * Get all QuestionAnswer records by specified query params
     *
     * @returns list containing all QuestionAnswer records matching specified query params
     */
    findAllByQuery(query: Query<QuestionAnswerRecord>): Promise<QuestionAnswerRecord[]>;
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @return The question answer record or null if not found
     *
     */
    findById(questionAnswerId: string): Promise<QuestionAnswerRecord | null>;
}
