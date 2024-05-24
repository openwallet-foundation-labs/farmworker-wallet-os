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
exports.KeylistUpdateResponseMessage = exports.KeylistUpdated = exports.KeylistUpdateResult = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
const KeylistUpdateMessage_1 = require("./KeylistUpdateMessage");
var KeylistUpdateResult;
(function (KeylistUpdateResult) {
    KeylistUpdateResult["ClientError"] = "client_error";
    KeylistUpdateResult["ServerError"] = "server_error";
    KeylistUpdateResult["NoChange"] = "no_change";
    KeylistUpdateResult["Success"] = "success";
})(KeylistUpdateResult = exports.KeylistUpdateResult || (exports.KeylistUpdateResult = {}));
class KeylistUpdated {
    constructor(options) {
        if (options) {
            this.recipientKey = options.recipientKey;
            this.action = options.action;
            this.result = options.result;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'recipient_key' }),
    __metadata("design:type", String)
], KeylistUpdated.prototype, "recipientKey", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(KeylistUpdateMessage_1.KeylistUpdateAction),
    __metadata("design:type", String)
], KeylistUpdated.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(KeylistUpdateResult),
    __metadata("design:type", String)
], KeylistUpdated.prototype, "result", void 0);
exports.KeylistUpdated = KeylistUpdated;
/**
 * Used to notify an edge agent with the result of updating the routing keys in the mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist-update-response
 */
class KeylistUpdateResponseMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        super();
        this.type = KeylistUpdateResponseMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.updated = options.keylist;
            this.setThread({
                threadId: options.threadId,
            });
        }
    }
}
KeylistUpdateResponseMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/coordinate-mediation/1.0/keylist-update-response');
__decorate([
    (0, messageType_1.IsValidMessageType)(KeylistUpdateResponseMessage.type),
    __metadata("design:type", Object)
], KeylistUpdateResponseMessage.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => KeylistUpdated),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(KeylistUpdated, { each: true }),
    __metadata("design:type", Array)
], KeylistUpdateResponseMessage.prototype, "updated", void 0);
exports.KeylistUpdateResponseMessage = KeylistUpdateResponseMessage;
//# sourceMappingURL=KeylistUpdateResponseMessage.js.map