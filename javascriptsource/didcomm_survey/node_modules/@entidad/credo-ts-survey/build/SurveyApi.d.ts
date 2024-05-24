import type { SurveyRecord } from './repository';
import { Query, AgentContext, ConnectionService, MessageSender } from '@credo-ts/core';
import { SurveyService } from './services';
import { SurveyModel } from './models/SurveyModel';
export declare class SurveyApi {
    private surveyService;
    private messageSender;
    private connectionService;
    private agentContext;
    constructor(surveyService: SurveyService, messageSender: MessageSender, connectionService: ConnectionService, agentContext: AgentContext);
    /**
     * Create a question message with possible valid responses, then send message to the
     * holder
     *
     * @param connectionId connection to send the question message to
     * @param config config for creating question message
     * @returns Questionnaire record
     */
    sendRequest(connectionId: string, config: {
        threadId: string;
        expirationDate?: string;
        request: SurveyModel;
    }): Promise<SurveyRecord>;
    /**
     * Create an response message as the holder and send it in response to a request message
     *
     * @param surveryRecordId the id of the survey record
     * @param response response included in the response message
     * @returns Survey record
     */
    sendResponse(surveryRecordId: string, response: string): Promise<SurveyRecord>;
    /**
     * Get all Survey records
     *
     * @returns list containing all Survey records
     */
    getAll(): Promise<SurveyRecord[]>;
    /**
     * Get all Survey records by specified query params
     *
     * @returns list containing all Survey records matching specified query params
     */
    findAllByQuery(query: Query<SurveyRecord>): Promise<SurveyRecord[]>;
    /**
     * Retrieve a Survey record by id
     *
     * @param surveyId The survey record id
     * @return The survery record or null if not found
     *
     */
    findById(surveyId: string): Promise<SurveyRecord | null>;
}
