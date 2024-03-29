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
exports.DidCommMessageRepository = void 0;
const EventEmitter_1 = require("../../agent/EventEmitter");
const constants_1 = require("../../constants");
const plugins_1 = require("../../plugins");
const messageType_1 = require("../../utils/messageType");
const Repository_1 = require("../Repository");
const DidCommMessageRecord_1 = require("./DidCommMessageRecord");
let DidCommMessageRepository = class DidCommMessageRepository extends Repository_1.Repository {
    constructor(storageService, eventEmitter) {
        super(DidCommMessageRecord_1.DidCommMessageRecord, storageService, eventEmitter);
    }
    async saveAgentMessage(agentContext, { role, agentMessage, associatedRecordId }) {
        const didCommMessageRecord = new DidCommMessageRecord_1.DidCommMessageRecord({
            message: agentMessage.toJSON(),
            role,
            associatedRecordId,
        });
        await this.save(agentContext, didCommMessageRecord);
    }
    async saveOrUpdateAgentMessage(agentContext, options) {
        const { messageName, protocolName, protocolMajorVersion } = (0, messageType_1.parseMessageType)(options.agentMessage.type);
        const record = await this.findSingleByQuery(agentContext, {
            associatedRecordId: options.associatedRecordId,
            messageName: messageName,
            protocolName: protocolName,
            protocolMajorVersion: String(protocolMajorVersion),
        });
        if (record) {
            record.message = options.agentMessage.toJSON();
            record.role = options.role;
            await this.update(agentContext, record);
            return;
        }
        await this.saveAgentMessage(agentContext, options);
    }
    async getAgentMessage(agentContext, { associatedRecordId, messageClass }) {
        const record = await this.getSingleByQuery(agentContext, {
            associatedRecordId,
            messageName: messageClass.type.messageName,
            protocolName: messageClass.type.protocolName,
            protocolMajorVersion: String(messageClass.type.protocolMajorVersion),
        });
        return record.getMessageInstance(messageClass);
    }
    async findAgentMessage(agentContext, { associatedRecordId, messageClass }) {
        var _a;
        const record = await this.findSingleByQuery(agentContext, {
            associatedRecordId,
            messageName: messageClass.type.messageName,
            protocolName: messageClass.type.protocolName,
            protocolMajorVersion: String(messageClass.type.protocolMajorVersion),
        });
        return (_a = record === null || record === void 0 ? void 0 : record.getMessageInstance(messageClass)) !== null && _a !== void 0 ? _a : null;
    }
};
DidCommMessageRepository = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.StorageService)),
    __metadata("design:paramtypes", [Object, EventEmitter_1.EventEmitter])
], DidCommMessageRepository);
exports.DidCommMessageRepository = DidCommMessageRepository;
//# sourceMappingURL=DidCommMessageRepository.js.map