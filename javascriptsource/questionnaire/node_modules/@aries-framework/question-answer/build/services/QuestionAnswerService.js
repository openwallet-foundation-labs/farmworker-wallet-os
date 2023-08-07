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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAnswerService = void 0;
const core_1 = require("@aries-framework/core");
const QuestionAnswerEvents_1 = require("../QuestionAnswerEvents");
const QuestionAnswerRole_1 = require("../QuestionAnswerRole");
const messages_1 = require("../messages");
const models_1 = require("../models");
const repository_1 = require("../repository");
let QuestionAnswerService = class QuestionAnswerService {
    constructor(questionAnswerRepository, eventEmitter, logger) {
        this.questionAnswerRepository = questionAnswerRepository;
        this.eventEmitter = eventEmitter;
        this.logger = logger;
    }
    /**
     * Create a question message and a new QuestionAnswer record for the questioner role
     *
     * @param question text for question message
     * @param details optional details for question message
     * @param connectionId connection for QuestionAnswer record
     * @param validResponses array of valid responses for question
     * @returns question message and QuestionAnswer record
     */
    async createQuestion(agentContext, connectionId, config) {
        const questionMessage = new messages_1.QuestionMessage({
            questionText: config.question,
            questionDetail: config === null || config === void 0 ? void 0 : config.detail,
            signatureRequired: false,
            validResponses: config.validResponses,
        });
        const questionAnswerRecord = await this.createRecord({
            questionText: questionMessage.questionText,
            questionDetail: questionMessage.questionDetail,
            threadId: questionMessage.threadId,
            connectionId: connectionId,
            role: QuestionAnswerRole_1.QuestionAnswerRole.Questioner,
            signatureRequired: false,
            state: models_1.QuestionAnswerState.QuestionSent,
            validResponses: questionMessage.validResponses,
        });
        await this.questionAnswerRepository.save(agentContext, questionAnswerRecord);
        this.eventEmitter.emit(agentContext, {
            type: QuestionAnswerEvents_1.QuestionAnswerEventTypes.QuestionAnswerStateChanged,
            payload: { previousState: null, questionAnswerRecord },
        });
        return { questionMessage, questionAnswerRecord };
    }
    /**
     * receive question message and create record for responder role
     *
     * @param messageContext the message context containing a question message
     * @returns QuestionAnswer record
     */
    async processReceiveQuestion(messageContext) {
        const { message: questionMessage } = messageContext;
        this.logger.debug(`Receiving question message with id ${questionMessage.id}`);
        const connection = messageContext.assertReadyConnection();
        const questionRecord = await this.findByThreadAndConnectionId(messageContext.agentContext, connection.id, questionMessage.id);
        if (questionRecord) {
            throw new core_1.AriesFrameworkError(`Question answer record with thread Id ${questionMessage.id} already exists.`);
        }
        const questionAnswerRecord = await this.createRecord({
            questionText: questionMessage.questionText,
            questionDetail: questionMessage.questionDetail,
            connectionId: connection === null || connection === void 0 ? void 0 : connection.id,
            threadId: questionMessage.threadId,
            role: QuestionAnswerRole_1.QuestionAnswerRole.Responder,
            signatureRequired: false,
            state: models_1.QuestionAnswerState.QuestionReceived,
            validResponses: questionMessage.validResponses,
        });
        await this.questionAnswerRepository.save(messageContext.agentContext, questionAnswerRecord);
        this.eventEmitter.emit(messageContext.agentContext, {
            type: QuestionAnswerEvents_1.QuestionAnswerEventTypes.QuestionAnswerStateChanged,
            payload: { previousState: null, questionAnswerRecord },
        });
        return questionAnswerRecord;
    }
    /**
     * create answer message, check that response is valid
     *
     * @param questionAnswerRecord record containing question and valid responses
     * @param response response used in answer message
     * @returns answer message and QuestionAnswer record
     */
    async createAnswer(agentContext, questionAnswerRecord, response) {
        const answerMessage = new messages_1.AnswerMessage({ response: response, threadId: questionAnswerRecord.threadId });
        questionAnswerRecord.assertState(models_1.QuestionAnswerState.QuestionReceived);
        questionAnswerRecord.response = response;
        if (questionAnswerRecord.validResponses.some((e) => e.text === response)) {
            await this.updateState(agentContext, questionAnswerRecord, models_1.QuestionAnswerState.AnswerSent);
        }
        else {
            throw new core_1.AriesFrameworkError(`Response does not match valid responses`);
        }
        return { answerMessage, questionAnswerRecord };
    }
    /**
     * receive answer as questioner
     *
     * @param messageContext the message context containing an answer message message
     * @returns QuestionAnswer record
     */
    async receiveAnswer(messageContext) {
        const { message: answerMessage } = messageContext;
        this.logger.debug(`Receiving answer message with id ${answerMessage.id}`);
        const connection = messageContext.assertReadyConnection();
        const questionAnswerRecord = await this.findByThreadAndConnectionId(messageContext.agentContext, connection.id, answerMessage.threadId);
        if (!questionAnswerRecord) {
            throw new core_1.AriesFrameworkError(`Question Answer record with thread Id ${answerMessage.threadId} not found.`);
        }
        questionAnswerRecord.assertState(models_1.QuestionAnswerState.QuestionSent);
        questionAnswerRecord.assertRole(QuestionAnswerRole_1.QuestionAnswerRole.Questioner);
        questionAnswerRecord.response = answerMessage.response;
        await this.updateState(messageContext.agentContext, questionAnswerRecord, models_1.QuestionAnswerState.AnswerReceived);
        return questionAnswerRecord;
    }
    /**
     * Update the record to a new state and emit an state changed event. Also updates the record
     * in storage.
     *
     * @param questionAnswerRecord The question answer record to update the state for
     * @param newState The state to update to
     *
     */
    async updateState(agentContext, questionAnswerRecord, newState) {
        const previousState = questionAnswerRecord.state;
        questionAnswerRecord.state = newState;
        await this.questionAnswerRepository.update(agentContext, questionAnswerRecord);
        this.eventEmitter.emit(agentContext, {
            type: QuestionAnswerEvents_1.QuestionAnswerEventTypes.QuestionAnswerStateChanged,
            payload: {
                previousState,
                questionAnswerRecord: questionAnswerRecord,
            },
        });
    }
    async createRecord(options) {
        const questionMessageRecord = new repository_1.QuestionAnswerRecord({
            questionText: options.questionText,
            questionDetail: options.questionDetail,
            connectionId: options.connectionId,
            threadId: options.threadId,
            role: options.role,
            signatureRequired: options.signatureRequired,
            state: options.state,
            validResponses: options.validResponses,
        });
        return questionMessageRecord;
    }
    /**
     * Retrieve a question answer record by connection id and thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @throws {RecordNotFoundError} If no record is found
     * @throws {RecordDuplicateError} If multiple records are found
     * @returns The question answer record
     */
    getByThreadAndConnectionId(agentContext, connectionId, threadId) {
        return this.questionAnswerRepository.getSingleByQuery(agentContext, {
            connectionId,
            threadId,
        });
    }
    /**
     * Retrieve a question answer record by thread id
     *
     * @param connectionId The connection id
     * @param threadId The thread id
     * @returns The question answer record or null if not found
     */
    findByThreadAndConnectionId(agentContext, connectionId, threadId) {
        return this.questionAnswerRepository.findSingleByQuery(agentContext, {
            connectionId,
            threadId,
        });
    }
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @throws {RecordNotFoundError} If no record is found
     * @return The question answer record
     *
     */
    getById(agentContext, questionAnswerId) {
        return this.questionAnswerRepository.getById(agentContext, questionAnswerId);
    }
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @return The question answer record or null if not found
     *
     */
    findById(agentContext, questionAnswerId) {
        return this.questionAnswerRepository.findById(agentContext, questionAnswerId);
    }
    /**
     * Retrieve a question answer record by id
     *
     * @param questionAnswerId The questionAnswer record id
     * @return The question answer record or null if not found
     *
     */
    getAll(agentContext) {
        return this.questionAnswerRepository.getAll(agentContext);
    }
    async findAllByQuery(agentContext, query) {
        return this.questionAnswerRepository.findByQuery(agentContext, query);
    }
};
QuestionAnswerService = __decorate([
    (0, core_1.injectable)(),
    __param(2, (0, core_1.inject)(core_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [repository_1.QuestionAnswerRepository,
        core_1.EventEmitter, Object])
], QuestionAnswerService);
exports.QuestionAnswerService = QuestionAnswerService;
//# sourceMappingURL=QuestionAnswerService.js.map