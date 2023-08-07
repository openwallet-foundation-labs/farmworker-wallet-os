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
exports.QuestionAnswerApi = void 0;
const core_1 = require("@aries-framework/core");
const handlers_1 = require("./handlers");
const models_1 = require("./models");
const services_1 = require("./services");
let QuestionAnswerApi = class QuestionAnswerApi {
    constructor(questionAnswerService, messageSender, connectionService, agentContext) {
        this.questionAnswerService = questionAnswerService;
        this.messageSender = messageSender;
        this.connectionService = connectionService;
        this.agentContext = agentContext;
        this.agentContext.dependencyManager.registerMessageHandlers([
            new handlers_1.QuestionMessageHandler(this.questionAnswerService),
            new handlers_1.AnswerMessageHandler(this.questionAnswerService),
        ]);
    }
    /**
     * Create a question message with possible valid responses, then send message to the
     * holder
     *
     * @param connectionId connection to send the question message to
     * @param config config for creating question message
     * @returns QuestionAnswer record
     */
    async sendQuestion(connectionId, config) {
        const connection = await this.connectionService.getById(this.agentContext, connectionId);
        connection.assertReady();
        const { questionMessage, questionAnswerRecord } = await this.questionAnswerService.createQuestion(this.agentContext, connectionId, {
            question: config.question,
            validResponses: config.validResponses.map((item) => new models_1.ValidResponse(item)),
            detail: config === null || config === void 0 ? void 0 : config.detail,
        });
        const outboundMessageContext = new core_1.OutboundMessageContext(questionMessage, {
            agentContext: this.agentContext,
            connection,
            associatedRecord: questionAnswerRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return questionAnswerRecord;
    }
    /**
     * Create an answer message as the holder and send it in response to a question message
     *
     * @param questionRecordId the id of the questionAnswer record
     * @param response response included in the answer message
     * @returns QuestionAnswer record
     */
    async sendAnswer(questionRecordId, response) {
        const questionRecord = await this.questionAnswerService.getById(this.agentContext, questionRecordId);
        const { answerMessage, questionAnswerRecord } = await this.questionAnswerService.createAnswer(this.agentContext, questionRecord, response);
        const connection = await this.connectionService.getById(this.agentContext, questionRecord.connectionId);
        const outboundMessageContext = new core_1.OutboundMessageContext(answerMessage, {
            agentContext: this.agentContext,
            connection,
            associatedRecord: questionAnswerRecord,
        });
        await this.messageSender.sendMessage(outboundMessageContext);
        return questionAnswerRecord;
    }
    /**
     * Get all QuestionAnswer records
     *
     * @returns list containing all QuestionAnswer records
     */
    getAll() {
        return this.questionAnswerService.getAll(this.agentContext);
    }
    /**
     * Get all QuestionAnswer records by specified query params
     *
     * @returns list containing all QuestionAnswer records matching specified query params
     */
    findAllByQuery(query) {
        return this.questionAnswerService.findAllByQuery(this.agentContext, query);
    }
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @return The question answer record or null if not found
     *
     */
    findById(questionAnswerId) {
        return this.questionAnswerService.findById(this.agentContext, questionAnswerId);
    }
};
QuestionAnswerApi = __decorate([
    (0, core_1.injectable)(),
    __metadata("design:paramtypes", [services_1.QuestionAnswerService,
        core_1.MessageSender,
        core_1.ConnectionService,
        core_1.AgentContext])
], QuestionAnswerApi);
exports.QuestionAnswerApi = QuestionAnswerApi;
//# sourceMappingURL=QuestionAnswerApi.js.map