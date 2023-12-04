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
exports.LinkedAttachment = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Attachment_1 = require("../decorators/attachment/Attachment");
const attachment_1 = require("./attachment");
class LinkedAttachment {
    constructor(options) {
        this.attributeName = options.name;
        this.attachment = options.attachment;
        this.attachment.id = this.getId(options.attachment);
    }
    /**
     * Generates an ID based on the data in the attachment
     *
     * @param attachment the attachment that requires a hashlink
     * @returns the id
     */
    getId(attachment) {
        // Take the second element since the id property
        // of a decorator MUST not contain a colon and has a maximum size of 64 characters
        return (0, attachment_1.encodeAttachment)(attachment).split(':')[1].substring(0, 64);
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkedAttachment.prototype, "attributeName", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
    __metadata("design:type", Attachment_1.Attachment
    /**
     * Generates an ID based on the data in the attachment
     *
     * @param attachment the attachment that requires a hashlink
     * @returns the id
     */
    )
], LinkedAttachment.prototype, "attachment", void 0);
exports.LinkedAttachment = LinkedAttachment;
//# sourceMappingURL=LinkedAttachment.js.map