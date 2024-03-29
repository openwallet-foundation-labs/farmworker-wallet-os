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
exports.MediationGrantMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * A route grant message is a signal from the mediator to the recipient that permission is given to distribute the
 * included information as an inbound route.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#mediation-grant
 */
class MediationGrantMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = MediationGrantMessage.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.endpoint = options.endpoint;
            this.routingKeys = options.routingKeys;
            this.setThread({
                threadId: options.threadId,
            });
        }
    }
}
MediationGrantMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/coordinate-mediation/1.0/mediate-grant');
__decorate([
    (0, messageType_1.IsValidMessageType)(MediationGrantMessage.type),
    __metadata("design:type", Object)
], MediationGrantMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)({ name: 'routing_keys' }),
    __metadata("design:type", Array)
], MediationGrantMessage.prototype, "routingKeys", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MediationGrantMessage.prototype, "endpoint", void 0);
exports.MediationGrantMessage = MediationGrantMessage;
//# sourceMappingURL=MediationGrantMessage.js.map