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
exports.V2ProposePresentationMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const Attachment_1 = require("../../../../../decorators/attachment/Attachment");
const messageType_1 = require("../../../../../utils/messageType");
const uuid_1 = require("../../../../../utils/uuid");
const ProofFormatSpec_1 = require("../../../models/ProofFormatSpec");
class V2ProposePresentationMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = V2ProposePresentationMessage.type.messageTypeUri;
        if (options) {
            this.formats = [];
            this.proposalAttachments = [];
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.comment = options.comment;
            this.goalCode = options.goalCode;
            this.goal = options.goal;
            this.formats = options.formats;
            this.proposalAttachments = options.proposalAttachments;
        }
    }
    getProposalAttachmentById(id) {
        return this.proposalAttachments.find((attachment) => attachment.id === id);
    }
}
V2ProposePresentationMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/present-proof/2.0/propose-presentation');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2ProposePresentationMessage.type),
    __metadata("design:type", Object)
], V2ProposePresentationMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2ProposePresentationMessage.prototype, "comment", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'goal_code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2ProposePresentationMessage.prototype, "goalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2ProposePresentationMessage.prototype, "goal", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => ProofFormatSpec_1.ProofFormatSpec),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(ProofFormatSpec_1.ProofFormatSpec, { each: true }),
    __metadata("design:type", Array)
], V2ProposePresentationMessage.prototype, "formats", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'proposals~attach' }),
    (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(Attachment_1.Attachment, { each: true }),
    __metadata("design:type", Array)
], V2ProposePresentationMessage.prototype, "proposalAttachments", void 0);
exports.V2ProposePresentationMessage = V2ProposePresentationMessage;
//# sourceMappingURL=V2ProposePresentationMessage.js.map