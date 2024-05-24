"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyApi = void 0;
const core_1 = require("@credo-ts/core");
const handlers_1 = require("./handlers");
const services_1 = require("./services");
let SurveyApi = class SurveyApi {
    constructor(surveyService, messageSender, connectionService, agentContext) {
        this.surveyService = surveyService;
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.agentContext = agentContext;
        this.agentContext.dependencyManager.registerMessageHandlers([
            new handlers_1.RequestMessageHandler(this.surveyService),
            new handlers_1.ResponseMessageHandler(this.surveyService),
        ]);
    }
    /**
     * Create a question message with possible valid responses, then send message to the
     * holder
     *
     * @param connectionId connection to send the question message to
     * @param config config for creating question message
     * @returns Questionnaire record
     */
    async sendRequest(connectionId, config) {
        const connection = await this.connectionService.getById(this.agentContext, connectionId);
        connection.assertReady();
        const { requestMessage, surveyRecord } = await this.surveyService.createSurvey(this.agentContext, connectionId, {
            expirationDate: config.expirationDate,
            threadId: config.threadId,
            request: config.request
        });
        const outboundMessageContext = await (0, core_1.getOutboundMessageContext)(this.agentContext, {
            message: requestMessage,
            associatedRecord: surveyRecord,
            connectionRecord: connection,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return surveyRecord;
    }
    /**
     * Create an response message as the holder and send it in response to a request message
     *
     * @param surveryRecordId the id of the survey record
     * @param response response included in the response message
     * @returns Survey record
     */
    async sendResponse(surveryRecordId, response) {
        const surveyRecord = await this.surveyService.getById(this.agentContext, surveryRecordId);
        const { responseMessage, surveyResponseRecord } = await this.surveyService.createResponse(this.agentContext, surveyRecord, response);
        const connection = await this.connectionService.getById(this.agentContext, surveyRecord.connectionId);
        const outboundMessageContext = await (0, core_1.getOutboundMessageContext)(this.agentContext, {
            message: responseMessage,
            associatedRecord: surveyResponseRecord,
            connectionRecord: connection,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return surveyResponseRecord;
    }
    /**
     * Get all Survey records
     *
     * @returns list containing all Survey records
     */
    getAll() {
        return this.surveyService.getAll(this.agentContext);
    }
    /**
     * Get all Survey records by specified query params
     *
     * @returns list containing all Survey records matching specified query params
     */
    findAllByQuery(query) {
        return this.surveyService.findAllByQuery(this.agentContext, query);
    }
    /**
     * Retrieve a Survey record by id
     *
     * @param surveyId The survey record id
     * @return The survery record or null if not found
     *
     */
    findById(surveyId) {
        return this.surveyService.findById(this.agentContext, surveyId);
    }
};
SurveyApi = __decorate([
    (0, core_1.injectable)(),
    __metadata("design:paramtypes", [services_1.SurveyService,
        core_1.MessageSender,
        core_1.ConnectionService,
        core_1.AgentContext])
], SurveyApi);
exports.SurveyApi = SurveyApi;
//# sourceMappingURL=SurveyApi.js.map