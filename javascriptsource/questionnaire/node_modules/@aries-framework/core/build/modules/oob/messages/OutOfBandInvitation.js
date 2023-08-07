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
exports.OutOfBandInvitation = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const query_string_1 = require("query-string");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const Attachment_1 = require("../../../decorators/attachment/Attachment");
const error_1 = require("../../../error");
const JsonEncoder_1 = require("../../../utils/JsonEncoder");
const JsonTransformer_1 = require("../../../utils/JsonTransformer");
const messageType_1 = require("../../../utils/messageType");
const validators_1 = require("../../../utils/validators");
const peerDidNumAlgo2_1 = require("../../dids/methods/peer/peerDidNumAlgo2");
const OutOfBandDidCommService_1 = require("../domain/OutOfBandDidCommService");
class OutOfBandInvitation extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = OutOfBandInvitation.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.label = options.label;
            this.goalCode = options.goalCode;
            this.goal = options.goal;
            this.accept = options.accept;
            this.handshakeProtocols = options.handshakeProtocols;
            this.services = options.services;
            this.imageUrl = options.imageUrl;
            this.appendedAttachments = options.appendedAttachments;
        }
    }
    addRequest(message) {
        if (!this.requests)
            this.requests = [];
        const requestAttachment = new Attachment_1.Attachment({
            id: this.generateId(),
            mimeType: 'application/json',
            data: new Attachment_1.AttachmentData({
                base64: JsonEncoder_1.JsonEncoder.toBase64(message.toJSON()),
            }),
        });
        this.requests.push(requestAttachment);
    }
    getRequests() {
        var _a;
        return (_a = this.requests) === null || _a === void 0 ? void 0 : _a.map((request) => request.getDataAsJson());
    }
    toUrl({ domain }) {
        const invitationJson = this.toJSON();
        const encodedInvitation = JsonEncoder_1.JsonEncoder.toBase64URL(invitationJson);
        const invitationUrl = `${domain}?oob=${encodedInvitation}`;
        return invitationUrl;
    }
    static fromUrl(invitationUrl) {
        const parsedUrl = (0, query_string_1.parseUrl)(invitationUrl).query;
        const encodedInvitation = parsedUrl['oob'];
        if (typeof encodedInvitation === 'string') {
            const invitationJson = JsonEncoder_1.JsonEncoder.fromBase64(encodedInvitation);
            const invitation = this.fromJson(invitationJson);
            return invitation;
        }
        else {
            throw new error_1.AriesFrameworkError('InvitationUrl is invalid. It needs to contain one, and only one, of the following parameters; `oob`');
        }
    }
    static fromJson(json) {
        return JsonTransformer_1.JsonTransformer.fromJSON(json, OutOfBandInvitation);
    }
    get invitationDids() {
        const dids = this.getServices().map((didOrService) => {
            if (typeof didOrService === 'string') {
                return didOrService;
            }
            return (0, peerDidNumAlgo2_1.outOfBandServiceToNumAlgo2Did)(didOrService);
        });
        return dids;
    }
    // shorthand for services without the need to deal with the String DIDs
    getServices() {
        return this.services.map((service) => {
            if (service instanceof String)
                return service.toString();
            return service;
        });
    }
    getDidServices() {
        return this.getServices().filter((service) => typeof service === 'string');
    }
    getInlineServices() {
        return this.getServices().filter((service) => typeof service !== 'string');
    }
}
OutOfBandInvitation.type = (0, messageType_1.parseMessageType)('https://didcomm.org/out-of-band/1.1/invitation');
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, messageType_1.replaceLegacyDidSovPrefix)(value), {
        toClassOnly: true,
    }),
    (0, messageType_1.IsValidMessageType)(OutOfBandInvitation.type),
    __metadata("design:type", Object)
], OutOfBandInvitation.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'goal_code' }),
    __metadata("design:type", String)
], OutOfBandInvitation.prototype, "goalCode", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.map(messageType_1.replaceLegacyDidSovPrefix), { toClassOnly: true }),
    (0, class_transformer_1.Expose)({ name: 'handshake_protocols' }),
    __metadata("design:type", Array)
], OutOfBandInvitation.prototype, "handshakeProtocols", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'requests~attach' }),
    (0, class_transformer_1.Type)(() => Attachment_1.Attachment),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({
        each: true,
    }),
    (0, class_validator_1.IsInstance)(Attachment_1.Attachment, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], OutOfBandInvitation.prototype, "requests", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    OutOfBandServiceTransformer(),
    (0, validators_1.IsStringOrInstance)(OutOfBandDidCommService_1.OutOfBandDidCommService, { each: true }),
    (0, class_validator_1.ValidateNested)({ each: true })
    // eslint-disable-next-line @typescript-eslint/ban-types
    ,
    __metadata("design:type", Array)
], OutOfBandInvitation.prototype, "services", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], OutOfBandInvitation.prototype, "imageUrl", void 0);
exports.OutOfBandInvitation = OutOfBandInvitation;
/**
 * Decorator that transforms services json to corresponding class instances
 * @note Because of ValidateNested limitation, this produces instances of String for DID services except plain js string
 */
function OutOfBandServiceTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            return value.map((service) => {
                // did
                if (typeof service === 'string')
                    return new String(service);
                // inline didcomm service
                return JsonTransformer_1.JsonTransformer.fromJSON(service, OutOfBandDidCommService_1.OutOfBandDidCommService);
            });
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            return value.map((service) => typeof service === 'string' || service instanceof String ? service.toString() : JsonTransformer_1.JsonTransformer.toJSON(service));
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
//# sourceMappingURL=OutOfBandInvitation.js.map