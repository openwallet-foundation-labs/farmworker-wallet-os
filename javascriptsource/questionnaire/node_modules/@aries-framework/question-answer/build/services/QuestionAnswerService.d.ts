import type { ValidResponse } from '../models';
import type { AgentContext, InboundMessageContext, Query } from '@aries-framework/core';
import { EventEmitter, Logger } from '@aries-framework/core';
import { AnswerMessage, QuestionMessage } from '../messages';
import { QuestionAnswerRepository, QuestionAnswerRecord } from '../repository';
export declare class QuestionAnswerService {
    private questionAnswerRepository;
    private eventEmitter;
    private logger;
    constructor(questionAnswerRepository: QuestionAnswerRepository, eventEmitter: EventEmitter, logger: Logger);
    /**
     * Create a question message and a new QuestionAnswer record for the questioner role
     *
     * @param question text for question message
     * @param details optional details for question message
     * @param connectionId connection for QuestionAnswer record
     * @param validResponses array of valid responses for question
     * @returns question message and QuestionAnswer record
     */
    createQuestion(agentContext: AgentContext, connectionId: string, config: {
        question: string;
        validResponses: ValidResponse[];
        detail?: string;
    }): Promise<{
        questionMessage: QuestionMessage;
        questionAnswerRecord: QuestionAnswerRecord;
    }>;
    /**
     * receive question message and create record for responder role
     *
     * @param messageContext the message context containing a question message
     * @returns QuestionAnswer record
     */
    processReceiveQuestion(messageContext: InboundMessageContext<QuestionMessage>): Promise<QuestionAnswerRecord>;
    /**
     * create answer message, check that response is valid
     *
     * @param questionAnswerRecord record containing question and valid responses
     * @param response response used in answer message
     * @returns answer message and QuestionAnswer record
     */
    createAnswer(agentContext: AgentContext, questionAnswerRecord: QuestionAnswerRecord, response: string): Promise<{
        answerMessage: AnswerMessage;
        questionAnswerRecord: QuestionAnswerRecord;
    }>;
    /**
     * receive answer as questioner
     *
     * @param messageContext the message context containing an answer message message
     * @returns QuestionAnswer record
     */
    receiveAnswer(messageContext: InboundMessageContext<AnswerMessage>): Promise<QuestionAnswerRecord>;
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param questionAnswerRecord The question answer record to update the state for
     * @param newState The state to update to
     *
     */
    private updateState;
    private createRecord;
    /**
     * Retrieve a question answer record by connection id and thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The question answer record
     */
    getByThreadAndConnectionId(agentContext: AgentContext, connectionId: string, threadId: string): Promise<QuestionAnswerRecord>;
    /**
     * Retrieve a question answer record by thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @returns The question answer record or null if not found
     */
    findByThreadAndConnectionId(agentContext: AgentContext, connectionId: string, threadId: string): Promise<QuestionAnswerRecord | null>;
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The question answer record
     *
     */
    getById(agentContext: AgentContext, questionAnswerId: string): Promise<QuestionAnswerRecord>;
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @return The question answer record or null if not found
     *
     */
    findById(agentContext: AgentContext, questionAnswerId: string): Promise<QuestionAnswerRecord | null>;
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @return The question answer record or null if not found
     *
     */
    getAll(agentContext: AgentContext): Promise<QuestionAnswerRecord[]>;
    findAllByQuery(agentContext: AgentContext, query: Query<QuestionAnswerRecord>): Promise<QuestionAnswerRecord[]>;
}
