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
exports.EnvelopeService = void 0;
const constants_1 = require("../constants");
const crypto_1 = require("../crypto");
const messages_1 = require("../modules/routing/messages");
const plugins_1 = require("../plugins");
let EnvelopeService = class EnvelopeService {
    constructor(logger) {
        this.logger = logger;
    }
    async packMessage(agentContext, payload, keys) {
        const { recipientKeys, routingKeys, senderKey } = keys;
        let recipientKeysBase58 = recipientKeys.map((key) => key.publicKeyBase58);
        const routingKeysBase58 = routingKeys.map((key) => key.publicKeyBase58);
        const senderKeyBase58 = senderKey && senderKey.publicKeyBase58;
        // pass whether we want to use legacy did sov prefix
        const message = payload.toJSON({ useDidSovPrefixWhereAllowed: agentContext.config.useDidSovPrefixWhereAllowed });
        this.logger.debug(`Pack outbound message ${message['@type']}`);
        let encryptedMessage = await agentContext.wallet.pack(message, recipientKeysBase58, senderKeyBase58 !== null && senderKeyBase58 !== void 0 ? senderKeyBase58 : undefined);
        // If the message has routing keys (mediator) pack for each mediator
        for (const routingKeyBase58 of routingKeysBase58) {
            const forwardMessage = new messages_1.ForwardMessage({
                // Forward to first recipient key
                to: recipientKeysBase58[0],
                message: encryptedMessage,
            });
            recipientKeysBase58 = [routingKeyBase58];
            this.logger.debug('Forward message created', forwardMessage);
            const forwardJson = forwardMessage.toJSON({
                useDidSovPrefixWhereAllowed: agentContext.config.useDidSovPrefixWhereAllowed,
            });
            // Forward messages are anon packed
            encryptedMessage = await agentContext.wallet.pack(forwardJson, [routingKeyBase58], undefined);
        }
        return encryptedMessage;
    }
    async unpackMessage(agentContext, encryptedMessage) {
        const decryptedMessage = await agentContext.wallet.unpack(encryptedMessage);
        const { recipientKey, senderKey, plaintextMessage } = decryptedMessage;
        return {
            recipientKey: recipientKey ? crypto_1.Key.fromPublicKeyBase58(recipientKey, crypto_1.KeyType.Ed25519) : undefined,
            senderKey: senderKey ? crypto_1.Key.fromPublicKeyBase58(senderKey, crypto_1.KeyType.Ed25519) : undefined,
            plaintextMessage,
        };
    }
};
EnvelopeService = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object])
], EnvelopeService);
exports.EnvelopeService = EnvelopeService;
//# sourceMappingURL=EnvelopeService.js.map