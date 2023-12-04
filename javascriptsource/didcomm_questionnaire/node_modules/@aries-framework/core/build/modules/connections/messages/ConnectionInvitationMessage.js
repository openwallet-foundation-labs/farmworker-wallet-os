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
exports.ConnectionInvitationMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const query_string_1 = require("query-string");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const error_1 = require("../../../error");
const JsonEncoder_1 = require("../../../utils/JsonEncoder");
const JsonTransformer_1 = require("../../../utils/JsonTransformer");
const messageType_1 = require("../../../utils/messageType");
/**
 * Message to invite another agent to create a connection
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#0-invitation-to-connect
 */
class ConnectionInvitationMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new ConnectionInvitationMessage instance.
     * @param options
     */
    constructor(options) {
        super();
        this.allowDidSovPrefix = true;
        this.type = ConnectionInvitationMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.label = options.label;
            this.imageUrl = options.imageUrl;
            this.appendedAttachments = options.appendedAttachments;
            if (isDidInvitation(options)) {
                this.did = options.did;
            }
            else {
                this.recipientKeys = options.recipientKeys;
                this.serviceEndpoint = options.serviceEndpoint;
                this.routingKeys = options.routingKeys;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (options.did && (options.recipientKeys || options.routingKeys || options.serviceEndpoint)) {
                throw new error_1.AriesFrameworkError('either the did or the recipientKeys/serviceEndpoint/routingKeys must be set, but not both');
            }
        }
    }
    /**
     * Create an invitation url from this instance
     *
     * @param domain domain name to use for invitation url
     * @returns invitation url with base64 encoded invitation
     */
    toUrl({ domain, useDidSovPrefixWhereAllowed = false, }) {
        const invitationJson = this.toJSON({ useDidSovPrefixWhereAllowed });
        const encodedInvitation = JsonEncoder_1.JsonEncoder.toBase64URL(invitationJson);
        const invitationUrl = `${domain}?c_i=${encodedInvitation}`;
        return invitationUrl;
    }
    /**
     * Create a `ConnectionInvitationMessage` instance from the `c_i` or `d_m` parameter of an URL
     *
     * @param invitationUrl invitation url containing c_i or d_m parameter
     *
     * @throws Error when the url can not be decoded to JSON, or decoded message is not a valid 'ConnectionInvitationMessage'
     */
    static fromUrl(invitationUrl) {
        var _a;
        const parsedUrl = (0, query_string_1.parseUrl)(invitationUrl).query;
        const encodedInvitation = (_a = parsedUrl['c_i']) !== null && _a !== void 0 ? _a : parsedUrl['d_m'];
        if (typeof encodedInvitation === 'string') {
            const invitationJson = JsonEncoder_1.JsonEncoder.fromBase64(encodedInvitation);
            const invitation = JsonTransformer_1.JsonTransformer.fromJSON(invitationJson, ConnectionInvitationMessage);
            return invitation;
        }
        else {
            throw new error_1.AriesFrameworkError('InvitationUrl is invalid. Needs to be encoded with either c_i, d_m, or oob');
        }
    }
}
ConnectionInvitationMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/connections/1.0/invitation');
__decorate([
    (0, messageType_1.IsValidMessageType)(ConnectionInvitationMessage.type),
    (0, class_transformer_1.Transform)(({ value }) => (0, messageType_1.replaceLegacyDidSovPrefix)(value), {
        toClassOnly: true,
    }),
    __metadata("design:type", Object)
], ConnectionInvitationMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConnectionInvitationMessage.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.recipientKeys === undefined),
    __metadata("design:type", String)
], ConnectionInvitationMessage.prototype, "did", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        each: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateIf)((o) => o.did === undefined),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], ConnectionInvitationMessage.prototype, "recipientKeys", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((o) => o.did === undefined),
    __metadata("design:type", String)
], ConnectionInvitationMessage.prototype, "serviceEndpoint", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        each: true,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.did === undefined),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ConnectionInvitationMessage.prototype, "routingKeys", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ConnectionInvitationMessage.prototype, "imageUrl", void 0);
exports.ConnectionInvitationMessage = ConnectionInvitationMessage;
/**
 * Check whether an invitation is a `DIDInvitationData` object
 *
 * @param invitation invitation object
 */
function isDidInvitation(invitation) {
    return invitation.did !== undefined;
}
//# sourceMappingURL=ConnectionInvitationMessage.js.map