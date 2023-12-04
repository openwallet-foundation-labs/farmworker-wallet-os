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
exports.InMemoryMessageRepository = void 0;
const constants_1 = require("../constants");
const plugins_1 = require("../plugins");
let InMemoryMessageRepository = class InMemoryMessageRepository {
    constructor(logger) {
        this.messages = {};
        this.logger = logger;
    }
    getAvailableMessageCount(connectionId) {
        return this.messages[connectionId] ? this.messages[connectionId].length : 0;
    }
    takeFromQueue(connectionId, limit, keepMessages) {
        if (!this.messages[connectionId]) {
            return [];
        }
        const messagesToTake = limit !== null && limit !== void 0 ? limit : this.messages[connectionId].length;
        this.logger.debug(`Taking ${messagesToTake} messages from queue for connection ${connectionId}`);
        return keepMessages
            ? this.messages[connectionId].slice(0, messagesToTake)
            : this.messages[connectionId].splice(0, messagesToTake);
    }
    add(connectionId, payload) {
        if (!this.messages[connectionId]) {
            this.messages[connectionId] = [];
        }
        this.messages[connectionId].push(payload);
    }
};
InMemoryMessageRepository = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object])
], InMemoryMessageRepository);
exports.InMemoryMessageRepository = InMemoryMessageRepository;
//# sourceMappingURL=InMemoryMessageRepository.js.map