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
exports.MediationRequestMessage = void 0;
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
/**
 * This message serves as a request from the recipient to the mediator, asking for the permission (and routing information)
 * to publish the endpoint as a mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#mediation-request
 */
class MediationRequestMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new BasicMessage instance.
     * sentTime will be assigned to new Date if not passed, id will be assigned to uuid/v4 if not passed
     * @param options
     */
    constructor(options) {
        super();
        this.type = MediationRequestMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.addLocale(options.locale || 'en');
        }
    }
}
MediationRequestMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/coordinate-mediation/1.0/mediate-request');
__decorate([
    (0, messageType_1.IsValidMessageType)(MediationRequestMessage.type),
    __metadata("design:type", Object)
], MediationRequestMessage.prototype, "type", void 0);
exports.MediationRequestMessage = MediationRequestMessage;
//# sourceMappingURL=MediationRequestMessage.js.map