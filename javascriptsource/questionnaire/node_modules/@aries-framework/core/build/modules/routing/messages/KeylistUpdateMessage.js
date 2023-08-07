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
exports.KeylistUpdateMessage = exports.KeylistUpdate = exports.KeylistUpdateAction = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
var KeylistUpdateAction;
(function (KeylistUpdateAction) {
    KeylistUpdateAction["add"] = "add";
    KeylistUpdateAction["remove"] = "remove";
})(KeylistUpdateAction = exports.KeylistUpdateAction || (exports.KeylistUpdateAction = {}));
class KeylistUpdate {
    constructor(options) {
        if (options) {
            this.recipientKey = options.recipientKey;
            this.action = options.action;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'recipient_key' }),
    __metadata("design:type", String)
], KeylistUpdate.prototype, "recipientKey", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(KeylistUpdateAction),
    __metadata("design:type", String)
], KeylistUpdate.prototype, "action", void 0);
exports.KeylistUpdate = KeylistUpdate;
/**
 * Used to notify the mediator of keys in use by the recipient.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist-update
 */
class KeylistUpdateMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        super();
        this.type = KeylistUpdateMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.updates = options.updates;
        }
    }
}
KeylistUpdateMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/coordinate-mediation/1.0/keylist-update');
__decorate([
    (0, messageType_1.IsValidMessageType)(KeylistUpdateMessage.type),
    __metadata("design:type", Object)
], KeylistUpdateMessage.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => KeylistUpdate),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(KeylistUpdate, { each: true }),
    __metadata("design:type", Array)
], KeylistUpdateMessage.prototype, "updates", void 0);
exports.KeylistUpdateMessage = KeylistUpdateMessage;
//# sourceMappingURL=KeylistUpdateMessage.js.map