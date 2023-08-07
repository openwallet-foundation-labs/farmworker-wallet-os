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
exports.V1BatchPickupMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const messageType_1 = require("../../../../../utils/messageType");
/**
 * A message to request to have multiple waiting messages sent inside a `batch` message.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0212-pickup/README.md#batch-pickup
 */
class V1BatchPickupMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new BatchPickupMessage instance.
     *
     * @param options
     */
    constructor(options) {
        super();
        this.type = V1BatchPickupMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.batchSize = options.batchSize;
        }
    }
}
V1BatchPickupMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/messagepickup/1.0/batch-pickup');
__decorate([
    (0, messageType_1.IsValidMessageType)(V1BatchPickupMessage.type),
    __metadata("design:type", Object)
], V1BatchPickupMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)({ name: 'batch_size' }),
    __metadata("design:type", Number)
], V1BatchPickupMessage.prototype, "batchSize", void 0);
exports.V1BatchPickupMessage = V1BatchPickupMessage;
//# sourceMappingURL=V1BatchPickupMessage.js.map