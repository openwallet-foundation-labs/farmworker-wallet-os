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
exports.V2RequestPresentationMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const Attachment_1 = require("../../../../../decorators/attachment/Attachment");
const messageType_1 = require("../../../../../utils/messageType");
const uuid_1 = require("../../../../../utils/uuid");
const ProofFormatSpec_1 = require("../../../models/ProofFormatSpec");
class V2RequestPresentationMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a, _b, _c;
        super();
        this.type = V2RequestPresentationMessage.type.messageTypeUri;
        this.willConfirm = false;
        this.presentMultiple = false;
        if (options) {
            this.formats = [];
            this.requestAttachments = [];
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.comment = options.comment;
            this.goal = options.goal;
            this.goalCode = options.goalCode;
            this.willConfirm = (_b = options.willConfirm) !== null && _b !== void 0 ? _b : true;
            this.presentMultiple = (_c = options.presentMultiple) !== null && _c !== void 0 ? _c : false;
            this.requestAttachments = options.requestAttachments;
            this.formats = options.formats;
        }
    }
    getRequestAttachmentById(id) {
        return this.requestAttachments.find((attachment) => attachment.id === id);
    }
}
V2RequestPresentationMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/present-proof/2.0/request-presentation');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2RequestPresentationMessage.type),
    __metadata("design:type", Object)
], V2RequestPresentationMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2RequestPresentationMessage.prototype, "comment", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'goal_code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2RequestPresentationMessage.prototype, "goalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], V2RequestPresentationMessage.prototype, "goal", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'will_confirm' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], V2RequestPresentationMessage.prototype, "willConfirm", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'present_multiple' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], V2RequestPresentationMessage.prototype, "presentMultiple", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'formats' }),
    (0, class_transformer_1.Type)(() => ProofFormatSpec_1.ProofFormatSpec),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(ProofFormatSpec_1.ProofFormatSpec, { each: true }),
    __metadata("design:type", Array)
], V2RequestPresentationMessage.prototype, "formats", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'request_presentations~attach' }),
    (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(Attachment_1.Attachment, { each: true }),
    __metadata("design:type", Array)
], V2RequestPresentationMessage.prototype, "requestAttachments", void 0);
exports.V2RequestPresentationMessage = V2RequestPresentationMessage;
//# sourceMappingURL=V2RequestPresentationMessage.js.map