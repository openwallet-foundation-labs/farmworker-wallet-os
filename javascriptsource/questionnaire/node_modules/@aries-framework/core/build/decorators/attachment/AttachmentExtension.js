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
exports.AttachmentDecorated = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Attachment_1 = require("./Attachment");
function AttachmentDecorated(Base) {
    class AttachmentDecoratorExtension extends Base {
        getAppendedAttachmentById(id) {
            var _a;
            return (_a = this.appendedAttachments) === null || _a === void 0 ? void 0 : _a.find((attachment) => attachment.id === id);
        }
        addAppendedAttachment(attachment) {
            if (this.appendedAttachments) {
                this.appendedAttachments.push(attachment);
            }
            else {
                this.appendedAttachments = [attachment];
            }
        }
    }
    __decorate([
        (0, class_transformer_1.Expose)({ name: '~attach' }),
        (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.IsInstance)(Attachment_1.Attachment, { each: true }),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Array)
    ], AttachmentDecoratorExtension.prototype, "appendedAttachments", void 0);
    return AttachmentDecoratorExtension;
}
exports.AttachmentDecorated = AttachmentDecorated;
//# sourceMappingURL=AttachmentExtension.js.map