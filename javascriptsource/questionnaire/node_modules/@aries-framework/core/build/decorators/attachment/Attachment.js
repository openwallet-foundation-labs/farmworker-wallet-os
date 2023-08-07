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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = exports.AttachmentData = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const error_1 = require("../../error");
const JsonEncoder_1 = require("../../utils/JsonEncoder");
const uuid_1 = require("../../utils/uuid");
/**
 * A JSON object that gives access to the actual content of the attachment
 */
class AttachmentData {
    constructor(options) {
        if (options) {
            this.base64 = options.base64;
            this.json = options.json;
            this.links = options.links;
            this.jws = options.jws;
            this.sha256 = options.sha256;
        }
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachmentData.prototype, "base64", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AttachmentData.prototype, "json", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], AttachmentData.prototype, "links", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
    // Signed attachments use JWS detached format
    ,
    __metadata("design:type", Object)
], AttachmentData.prototype, "jws", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHash)('sha256'),
    __metadata("design:type", String)
], AttachmentData.prototype, "sha256", void 0);
exports.AttachmentData = AttachmentData;
/**
 * Represents DIDComm attachment
 * https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0017-attachments/README.md
 */
class Attachment {
    constructor(options) {
        var _a;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.description = options.description;
            this.filename = options.filename;
            this.mimeType = options.mimeType;
            this.lastmodTime = options.lastmodTime;
            this.byteCount = options.byteCount;
            this.data = new AttachmentData(options.data);
        }
    }
    /*
     * Helper function returning JSON representation of attachment data (if present). Tries to obtain the data from .base64 or .json, throws an error otherwise
     */
    getDataAsJson() {
        if (typeof this.data.base64 === 'string') {
            return JsonEncoder_1.JsonEncoder.fromBase64(this.data.base64);
        }
        else if (this.data.json) {
            return this.data.json;
        }
        else {
            throw new error_1.AriesFrameworkError('No attachment data found in `json` or `base64` data fields.');
        }
    }
    addJws(jws) {
        // Remove payload if user provided a non-detached JWS
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = jws, { payload } = _a, detachedJws = __rest(_a, ["payload"]);
        // If no JWS yet, assign to current JWS
        if (!this.data.jws) {
            this.data.jws = detachedJws;
        }
        // Is already jws array, add to it
        else if ('signatures' in this.data.jws) {
            this.data.jws.signatures.push(detachedJws);
        }
        // If already single JWS, transform to general jws format
        else {
            this.data.jws = {
                signatures: [this.data.jws, detachedJws],
            };
        }
    }
}
__decorate([
    (0, class_transformer_1.Expose)({ name: '@id' }),
    __metadata("design:type", String)
], Attachment.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Attachment.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Attachment.prototype, "filename", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'mime-type' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMimeType)(),
    __metadata("design:type", String)
], Attachment.prototype, "mimeType", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'lastmod_time' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date
    /**
     * Optional, and mostly relevant when content is included by reference instead of by value. Lets the receiver guess how expensive it will be, in time, bandwidth, and storage, to fully fetch the attachment.
     */
    )
], Attachment.prototype, "lastmodTime", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'byte_count' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Attachment.prototype, "byteCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => AttachmentData),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(AttachmentData),
    __metadata("design:type", AttachmentData
    /*
     * Helper function returning JSON representation of attachment data (if present). Tries to obtain the data from .base64 or .json, throws an error otherwise
     */
    )
], Attachment.prototype, "data", void 0);
exports.Attachment = Attachment;
//# sourceMappingURL=Attachment.js.map