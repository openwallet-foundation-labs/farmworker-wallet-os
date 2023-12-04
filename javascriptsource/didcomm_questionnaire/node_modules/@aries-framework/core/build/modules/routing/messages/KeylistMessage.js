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
exports.Keylist = exports.KeylistMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * Used to notify the recipient of keys in use by the mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist
 */
class KeylistMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        super();
        this.type = KeylistMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
        }
    }
}
KeylistMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/coordinate-mediation/1.0/keylist');
__decorate([
    (0, messageType_1.IsValidMessageType)(KeylistMessage.type),
    __metadata("design:type", Object)
], KeylistMessage.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Keylist),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Array)
], KeylistMessage.prototype, "updates", void 0);
exports.KeylistMessage = KeylistMessage;
class Keylist {
    constructor(options) {
        return options;
    }
}
exports.Keylist = Keylist;
//# sourceMappingURL=KeylistMessage.js.map