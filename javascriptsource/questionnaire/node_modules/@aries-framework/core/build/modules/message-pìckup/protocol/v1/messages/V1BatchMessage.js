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
exports.V1BatchMessage = exports.BatchMessageMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const BaseMessage_1 = require("../../../../../agent/BaseMessage");
const messageType_1 = require("../../../../../utils/messageType");
const uuid_1 = require("../../../../../utils/uuid");
class BatchMessageMessage {
    constructor(options) {
        if (options) {
            this.id = options.id || (0, uuid_1.uuid)();
            this.message = options.message;
        }
    }
}
__decorate([
    (0, class_validator_1.Matches)(BaseMessage_1.MessageIdRegExp),
    __metadata("design:type", String)
], BatchMessageMessage.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], BatchMessageMessage.prototype, "message", void 0);
exports.BatchMessageMessage = BatchMessageMessage;
/**
 * A message that contains multiple waiting messages.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0212-pickup/README.md#batch
 */
class V1BatchMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        super();
        this.type = V1BatchMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.messages = options.messages;
        }
    }
}
V1BatchMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/messagepickup/1.0/batch');
__decorate([
    (0, messageType_1.IsValidMessageType)(V1BatchMessage.type),
    __metadata("design:type", Object)
], V1BatchMessage.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => BatchMessageMessage),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(BatchMessageMessage, { each: true }),
    (0, class_transformer_1.Expose)({ name: 'messages~attach' }),
    __metadata("design:type", Array)
], V1BatchMessage.prototype, "messages", void 0);
exports.V1BatchMessage = V1BatchMessage;
//# sourceMappingURL=V1BatchMessage.js.map