import type { AgentContext, InboundMessageContext, Query } from '@credo-ts/core';
import { EventEmitter, Logger } from '@credo-ts/core';
import { ResponseMessage, RequestMessage } from '../messages';
import { SurveyModel } from '../models';
import { SurveyRepository, SurveyRecord } from '../repository';
export declare class SurveyService {
    private surveyRepository;
    private eventEmitter;
    private logger;
    constructor(surveyRepository: SurveyRepository, eventEmitter: EventEmitter, logger: Logger);
    /**
     * Create a request message and a new Survey record for the survey role
     *
     * @param request text for request message
     * @param details optional details for request message
     * @param connectionId connection for Survey record
     * @returns request message and Survey record
     */
    createSurvey(agentContext: AgentContext, connectionId: string, config: {
        threadId: string;
        expirationDate?: string;
        request: SurveyModel;
    }): Promise<{
        requestMessage: RequestMessage;
        surveyRecord: SurveyRecord;
    }>;
    /**
     * receive request message and create record for responder role
     *
     * @param messageContext the message context containing a respond message
     * @returns Survey record
     */
    processReceiveSurvey(messageContext: InboundMessageContext<RequestMessage>): Promise<SurveyRecord>;
    /**
     * create response message, check that response is valid
     *
     * @param surveyRecord record containing request and response
     * @param response response used in response message
     * @returns answer message and Survey record
     */
    createResponse(agentContext: AgentContext, surveyResponseRecord: SurveyRecord, response: string): Promise<{
        responseMessage: ResponseMessage;
        surveyResponseRecord: SurveyRecord;
    }>;
    /**
     * receive response as questioner
     *
     * @param messageContext the message context containing an response message
     * @returns Survey record
     */
    receiveResponse(messageContext: InboundMessageContext<ResponseMessage>): Promise<SurveyRecord>;
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param surveyRecord The survey record to update the state for
     * @param newState The state to update to
     *
     */
    private updateState;
    private createRecord;
    /**
     * Retrieve a survey record by connection id and thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The survey record
     */
    getByThreadAndConnectionId(agentContext: AgentContext, connectionId: string, threadId: string): Promise<SurveyRecord>;
    /**
     * Retrieve a survey record by thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @returns The survey record or null if not found
     */
    findByThreadAndConnectionId(agentContext: AgentContext, connectionId: string, threadId: string): Promise<SurveyRecord | null>;
    /**
     * Retrieve a survey record by id
     *
     * @param surveyId The survey record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The survey record
     *
     */
    getById(agentContext: AgentContext, surveyId: string): Promise<SurveyRecord>;
    /**
     * Retrieve a survey record by id
     *
     * @param surveyId The survey record id
     * @return The survey record or null if not found
     *
     */
    findById(agentContext: AgentContext, surveyId: string): Promise<SurveyRecord | null>;
    /**
     * Retrieve a all the survey records
     *
     * @return The survey record or null if not found
     *
     */
    getAll(agentContext: AgentContext): Promise<SurveyRecord[]>;
    /**
     * Retrieve a all the survey records by query
     *
     * @param query The query in JSON format, eg: {connectionId:21321, threadId:312312 }
     * @return The survey record or null if not found
     *
     */
    findAllByQuery(agentContext: AgentContext, query: Query<SurveyRecord>): Promise<SurveyRecord[]>;
}
