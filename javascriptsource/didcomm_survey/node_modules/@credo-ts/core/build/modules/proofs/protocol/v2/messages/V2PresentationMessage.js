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
exports.V2PresentationMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const Attachment_1 = require("../../../../../decorators/attachment/Attachment");
const messageType_1 = require("../../../../../utils/messageType");
const uuid_1 = require("../../../../../utils/uuid");
const ProofFormatSpec_1 = require("../../../models/ProofFormatSpec");
class V2PresentationMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a, _b;
        super();
        this.type = V2PresentationMessage.type.messageTypeUri;
        this.lastPresentation = true;
        if (options) {
            this.formats = [];
            this.presentationAttachments = [];
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.comment = options.comment;
            this.goalCode = options.goalCode;
            this.goal = options.goal;
            this.lastPresentation = (_b = options.lastPresentation) !== null && _b !== void 0 ? _b : true;
            this.formats = options.formats;
            this.presentationAttachments = options.presentationAttachments;
        }
    }
    getPresentationAttachmentById(id) {
        return this.presentationAttachments.find((attachment) => attachment.id === id);
    }
}
V2PresentationMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/present-proof/2.0/presentation');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2PresentationMessage.type),
    __metadata("design:type", Object)
], V2PresentationMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2PresentationMessage.prototype, "comment", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'goal_code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2PresentationMessage.prototype, "goalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2PresentationMessage.prototype, "goal", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'last_presentation' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], V2PresentationMessage.prototype, "lastPresentation", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'formats' }),
    (0, class_transformer_1.Type)(() => ProofFormatSpec_1.ProofFormatSpec),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(ProofFormatSpec_1.ProofFormatSpec, { each: true }),
    __metadata("design:type", Array)
], V2PresentationMessage.prototype, "formats", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'presentations~attach' }),
    (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(Attachment_1.Attachment, { each: true }),
    __metadata("design:type", Array)
], V2PresentationMessage.prototype, "presentationAttachments", void 0);
exports.V2PresentationMessage = V2PresentationMessage;
//# sourceMappingURL=V2PresentationMessage.js.map