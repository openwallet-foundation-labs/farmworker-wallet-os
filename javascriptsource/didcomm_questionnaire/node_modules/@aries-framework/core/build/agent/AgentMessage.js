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
exports.AgentMessage = void 0;
const class_transformer_1 = require("class-transformer");
const AckDecoratorExtension_1 = require("../decorators/ack/AckDecoratorExtension");
const AttachmentExtension_1 = require("../decorators/attachment/AttachmentExtension");
const L10nDecoratorExtension_1 = require("../decorators/l10n/L10nDecoratorExtension");
const ServiceDecoratorExtension_1 = require("../decorators/service/ServiceDecoratorExtension");
const ThreadDecoratorExtension_1 = require("../decorators/thread/ThreadDecoratorExtension");
const TimingDecoratorExtension_1 = require("../decorators/timing/TimingDecoratorExtension");
const TransportDecoratorExtension_1 = require("../decorators/transport/TransportDecoratorExtension");
const JsonTransformer_1 = require("../utils/JsonTransformer");
const messageType_1 = require("../utils/messageType");
const BaseMessage_1 = require("./BaseMessage");
const Decorated = (0, ThreadDecoratorExtension_1.ThreadDecorated)((0, L10nDecoratorExtension_1.L10nDecorated)((0, TransportDecoratorExtension_1.TransportDecorated)((0, TimingDecoratorExtension_1.TimingDecorated)((0, AckDecoratorExtension_1.AckDecorated)((0, AttachmentExtension_1.AttachmentDecorated)((0, ServiceDecoratorExtension_1.ServiceDecorated)(BaseMessage_1.BaseMessage)))))));
class AgentMessage extends Decorated {
    constructor() {
        super(...arguments);
        /**
         * Whether the protocol RFC was initially written using the legacy did:prefix instead of the
         * new https://didcomm.org message type prefix.
         *
         * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0348-transition-msg-type-to-https/README.md
         */
        this.allowDidSovPrefix = false;
    }
    toJSON({ useDidSovPrefixWhereAllowed } = {}) {
        const json = JsonTransformer_1.JsonTransformer.toJSON(this);
        // If we have `useDidSovPrefixWhereAllowed` enabled, we want to replace the new https://didcomm.org prefix with the legacy did:sov prefix.
        // However, we only do this if the protocol RFC was initially written with the did:sov message type prefix
        // See https://github.com/hyperledger/aries-rfcs/blob/main/features/0348-transition-msg-type-to-https/README.md
        if (this.allowDidSovPrefix && useDidSovPrefixWhereAllowed) {
            (0, messageType_1.replaceNewDidCommPrefixWithLegacyDidSovOnMessage)(json);
        }
        return json;
    }
    is(Class) {
        return this.type === Class.type.messageTypeUri;
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], AgentMessage.prototype, "allowDidSovPrefix", void 0);
exports.AgentMessage = AgentMessage;
//# sourceMappingURL=AgentMessage.js.map