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
exports.ConnectionResponseMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const SignatureDecorator_1 = require("../../../decorators/signature/SignatureDecorator");
const messageType_1 = require("../../../utils/messageType");
/**
 * Message part of connection protocol used to complete the connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#2-connection-response
 */
class ConnectionResponseMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new ConnectionResponseMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.allowDidSovPrefix = true;
        this.type = ConnectionResponseMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.connectionSig = options.connectionSig;
            this.setThread({ threadId: options.threadId });
        }
    }
}
ConnectionResponseMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/connections/1.0/response');
__decorate([
    (0, messageType_1.IsValidMessageType)(ConnectionResponseMessage.type),
    __metadata("design:type", Object)
], ConnectionResponseMessage.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => SignatureDecorator_1.SignatureDecorator),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(SignatureDecorator_1.SignatureDecorator),
    (0, class_transformer_1.Expose)({ name: 'connection~sig' }),
    __metadata("design:type", SignatureDecorator_1.SignatureDecorator)
], ConnectionResponseMessage.prototype, "connectionSig", void 0);
exports.ConnectionResponseMessage = ConnectionResponseMessage;
//# sourceMappingURL=ConnectionResponseMessage.js.map