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
exports.InMemoryMessagePickupRepository = void 0;
const constants_1 = require("../../../constants");
const plugins_1 = require("../../../plugins");
const uuid_1 = require("../../../utils/uuid");
let InMemoryMessagePickupRepository = class InMemoryMessagePickupRepository {
    constructor(logger) {
        this.logger = logger;
        this.messages = [];
    }
    getAvailableMessageCount(options) {
        const { connectionId, recipientDid } = options;
        const messages = this.messages.filter((msg) => msg.connectionId === connectionId &&
            (recipientDid === undefined || msg.recipientDids.includes(recipientDid)) &&
            msg.state === 'pending');
        return messages.length;
    }
    takeFromQueue(options) {
        const { connectionId, recipientDid, limit, deleteMessages } = options;
        let messages = this.messages.filter((msg) => msg.connectionId === connectionId &&
            msg.state === 'pending' &&
            (recipientDid === undefined || msg.recipientDids.includes(recipientDid)));
        const messagesToTake = limit !== null && limit !== void 0 ? limit : messages.length;
        messages = messages.slice(0, messagesToTake);
        this.logger.debug(`Taking ${messagesToTake} messages from queue for connection ${connectionId}`);
        // Mark taken messages in order to prevent them of being retrieved again
        messages.forEach((msg) => {
            const index = this.messages.findIndex((item) => item.id === msg.id);
            if (index !== -1)
                this.messages[index].state = 'sending';
        });
        if (deleteMessages) {
            this.removeMessages({ connectionId, messageIds: messages.map((msg) => msg.id) });
        }
        return messages;
    }
    addMessage(options) {
        const { connectionId, recipientDids, payload } = options;
        const id = (0, uuid_1.uuid)();
        this.messages.push({
            id,
            connectionId,
            encryptedMessage: payload,
            recipientDids,
            state: 'pending',
        });
        return id;
    }
    removeMessages(options) {
        const { messageIds } = options;
        for (const messageId of messageIds) {
            const messageIndex = this.messages.findIndex((item) => item.id === messageId);
            if (messageIndex > -1)
                this.messages.splice(messageIndex, 1);
        }
    }
};
InMemoryMessagePickupRepository = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object])
], InMemoryMessagePickupRepository);
exports.InMemoryMessagePickupRepository = InMemoryMessagePickupRepository;
//# sourceMappingURL=InMemoryMessagePickupRepository.js.map