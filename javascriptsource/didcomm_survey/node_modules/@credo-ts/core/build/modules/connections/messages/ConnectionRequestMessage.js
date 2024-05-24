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
exports.ConnectionRequestMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
const models_1 = require("../models");
/**
 * Message to communicate the DID document to the other agent when creating a connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#1-connection-request
 */
class ConnectionRequestMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new ConnectionRequestMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.allowDidSovPrefix = true;
        this.type = ConnectionRequestMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.label = options.label;
            this.imageUrl = options.imageUrl;
            this.connection = new models_1.Connection({
                did: options.did,
                didDoc: options.didDoc,
            });
        }
    }
}
ConnectionRequestMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/connections/1.0/request');
__decorate([
    (0, messageType_1.IsValidMessageType)(ConnectionRequestMessage.type),
    __metadata("design:type", Object)
], ConnectionRequestMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConnectionRequestMessage.prototype, "label", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => models_1.Connection),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(models_1.Connection),
    __metadata("design:type", models_1.Connection)
], ConnectionRequestMessage.prototype, "connection", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ConnectionRequestMessage.prototype, "imageUrl", void 0);
exports.ConnectionRequestMessage = ConnectionRequestMessage;
//# sourceMappingURL=ConnectionRequestMessage.js.map