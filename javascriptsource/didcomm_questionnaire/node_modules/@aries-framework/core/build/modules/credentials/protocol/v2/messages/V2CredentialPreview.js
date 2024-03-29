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
exports.V2CredentialPreview = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const JsonTransformer_1 = require("../../../../../utils/JsonTransformer");
const messageType_1 = require("../../../../../utils/messageType");
const CredentialPreviewAttribute_1 = require("../../../models/CredentialPreviewAttribute");
/**
 * Credential preview inner message class.
 *
 * This is not a message but an inner object for other messages in this protocol. It is used construct a preview of the data for the credential.
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0453-issue-credential-v2#preview-credential
 */
class V2CredentialPreview {
    constructor(options) {
        this.type = V2CredentialPreview.type.messageTypeUri;
        if (options) {
            this.attributes = options.attributes.map((a) => new CredentialPreviewAttribute_1.CredentialPreviewAttribute(a));
        }
    }
    toJSON() {
        return JsonTransformer_1.JsonTransformer.toJSON(this);
    }
    /**
     * Create a credential preview from a record with name and value entries.
     *
     * @example
     * const preview = CredentialPreview.fromRecord({
     *   name: "Bob",
     *   age: "20"
     * })
     */
    static fromRecord(record) {
        const attributes = Object.entries(record).map(([name, value]) => new CredentialPreviewAttribute_1.CredentialPreviewAttribute({
            name,
            mimeType: 'text/plain',
            value,
        }));
        return new V2CredentialPreview({
            attributes,
        });
    }
}
V2CredentialPreview.type = (0, messageType_1.parseMessageType)('https://didcomm.org/issue-credential/2.0/credential-preview');
__decorate([
    (0, class_transformer_1.Expose)({ name: '@type' }),
    (0, messageType_1.IsValidMessageType)(V2CredentialPreview.type),
    (0, class_transformer_1.Transform)(({ value }) => (0, messageType_1.replaceLegacyDidSovPrefix)(value), {
        toClassOnly: true,
    }),
    __metadata("design:type", Object)
], V2CredentialPreview.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => CredentialPreviewAttribute_1.CredentialPreviewAttribute),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsInstance)(CredentialPreviewAttribute_1.CredentialPreviewAttribute, { each: true }),
    __metadata("design:type", Array)
], V2CredentialPreview.prototype, "attributes", void 0);
exports.V2CredentialPreview = V2CredentialPreview;
//# sourceMappingURL=V2CredentialPreview.js.map