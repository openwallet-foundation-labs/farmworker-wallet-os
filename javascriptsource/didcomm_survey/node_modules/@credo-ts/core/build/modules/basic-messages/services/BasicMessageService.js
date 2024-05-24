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
exports.BasicMessageService = void 0;
const EventEmitter_1 = require("../../../agent/EventEmitter");
const plugins_1 = require("../../../plugins");
const BasicMessageEvents_1 = require("../BasicMessageEvents");
const BasicMessageRole_1 = require("../BasicMessageRole");
const messages_1 = require("../messages");
const repository_1 = require("../repository");
let BasicMessageService = class BasicMessageService {
    constructor(basicMessageRepository, eventEmitter) {
        this.basicMessageRepository = basicMessageRepository;
        this.eventEmitter = eventEmitter;
    }
    async createMessage(agentContext, message, connectionRecord, parentThreadId) {
        const basicMessage = new messages_1.BasicMessage({ content: message });
        // If no parentThreadid is defined, there is no need to explicitly send a thread decorator
        if (parentThreadId) {
            basicMessage.setThread({ parentThreadId });
        }
        const basicMessageRecord = new repository_1.BasicMessageRecord({
            sentTime: basicMessage.sentTime.toISOString(),
            content: basicMessage.content,
            connectionId: connectionRecord.id,
            role: BasicMessageRole_1.BasicMessageRole.Sender,
            threadId: basicMessage.threadId,
            parentThreadId,
        });
        await this.basicMessageRepository.save(agentContext, basicMessageRecord);
        this.emitStateChangedEvent(agentContext, basicMessageRecord, basicMessage);
        return { message: basicMessage, record: basicMessageRecord };
    }
    /**
     * @todo use connection from message context
     */
    async save({ message, agentContext }, connection) {
        var _a;
        const basicMessageRecord = new repository_1.BasicMessageRecord({
            sentTime: message.sentTime.toISOString(),
            content: message.content,
            connectionId: connection.id,
            role: BasicMessageRole_1.BasicMessageRole.Receiver,
            threadId: message.threadId,
            parentThreadId: (_a = message.thread) === null || _a === void 0 ? void 0 : _a.parentThreadId,
        });
        await this.basicMessageRepository.save(agentContext, basicMessageRecord);
        this.emitStateChangedEvent(agentContext, basicMessageRecord, message);
    }
    emitStateChangedEvent(agentContext, basicMessageRecord, basicMessage) {
        this.eventEmitter.emit(agentContext, {
            type: BasicMessageEvents_1.BasicMessageEventTypes.BasicMessageStateChanged,
            payload: { message: basicMessage, basicMessageRecord: basicMessageRecord.clone() },
        });
    }
    async findAllByQuery(agentContext, query) {
        return this.basicMessageRepository.findByQuery(agentContext, query);
    }
    async getById(agentContext, basicMessageRecordId) {
        return this.basicMessageRepository.getById(agentContext, basicMessageRecordId);
    }
    async getByThreadId(agentContext, threadId) {
        return this.basicMessageRepository.getSingleByQuery(agentContext, { threadId });
    }
    async findAllByParentThreadId(agentContext, parentThreadId) {
        return this.basicMessageRepository.findByQuery(agentContext, { parentThreadId });
    }
    async deleteById(agentContext, basicMessageRecordId) {
        const basicMessageRecord = await this.getById(agentContext, basicMessageRecordId);
        return this.basicMessageRepository.delete(agentContext, basicMessageRecord);
    }
};
BasicMessageService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [repository_1.BasicMessageRepository, EventEmitter_1.EventEmitter])
], BasicMessageService);
exports.BasicMessageService = BasicMessageService;
//# sourceMappingURL=BasicMessageService.js.map