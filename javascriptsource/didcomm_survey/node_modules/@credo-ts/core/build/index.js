"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.LinkedAttachment = exports.MessageValidator = exports.Hasher = exports.isLinkedAttachment = exports.encodeAttachment = exports.replaceLegacyDidSovPrefix = exports.IsValidMessageType = exports.parseMessageType = exports.DateTransformer = exports.equalsIgnoreOrder = exports.asArray = exports.isDid = exports.deepEquality = exports.Buffer = exports.TypedArrayEncoder = exports.isValidJweStructure = exports.isJsonObject = exports.JsonTransformer = exports.JsonEncoder = exports.ReturnRouteTypes = exports.ServiceDecorator = exports.AttachmentData = exports.Attachment = exports.TransportService = exports.InjectionSymbols = exports.joinUriParts = exports.getDirFromFilePath = exports.Repository = exports.DidCommMessageRepository = exports.DidCommMessageRole = exports.DidCommMessageRecord = exports.KeyDerivationMethod = exports.DidCommMimeType = exports.getOutboundMessageContext = exports.MessageSender = exports.Dispatcher = exports.AgentMessage = exports.AgentConfig = exports.MessageHandlerRegistry = exports.FeatureRegistry = exports.EventEmitter = exports.BaseAgent = exports.Agent = exports.MessageReceiver = void 0;
// reflect-metadata used for class-transformer + class-validator
require("reflect-metadata");
var MessageReceiver_1 = require("./agent/MessageReceiver");
Object.defineProperty(exports, "MessageReceiver", { enumerable: true, get: function () { return MessageReceiver_1.MessageReceiver; } });
var Agent_1 = require("./agent/Agent");
Object.defineProperty(exports, "Agent", { enumerable: true, get: function () { return Agent_1.Agent; } });
var BaseAgent_1 = require("./agent/BaseAgent");
Object.defineProperty(exports, "BaseAgent", { enumerable: true, get: function () { return BaseAgent_1.BaseAgent; } });
__exportStar(require("./agent"), exports);
var EventEmitter_1 = require("./agent/EventEmitter");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return EventEmitter_1.EventEmitter; } });
var FeatureRegistry_1 = require("./agent/FeatureRegistry");
Object.defineProperty(exports, "FeatureRegistry", { enumerable: true, get: function () { return FeatureRegistry_1.FeatureRegistry; } });
var MessageHandlerRegistry_1 = require("./agent/MessageHandlerRegistry");
Object.defineProperty(exports, "MessageHandlerRegistry", { enumerable: true, get: function () { return MessageHandlerRegistry_1.MessageHandlerRegistry; } });
__exportStar(require("./agent/models"), exports);
var AgentConfig_1 = require("./agent/AgentConfig");
Object.defineProperty(exports, "AgentConfig", { enumerable: true, get: function () { return AgentConfig_1.AgentConfig; } });
var AgentMessage_1 = require("./agent/AgentMessage");
Object.defineProperty(exports, "AgentMessage", { enumerable: true, get: function () { return AgentMessage_1.AgentMessage; } });
var Dispatcher_1 = require("./agent/Dispatcher");
Object.defineProperty(exports, "Dispatcher", { enumerable: true, get: function () { return Dispatcher_1.Dispatcher; } });
var MessageSender_1 = require("./agent/MessageSender");
Object.defineProperty(exports, "MessageSender", { enumerable: true, get: function () { return MessageSender_1.MessageSender; } });
var getOutboundMessageContext_1 = require("./agent/getOutboundMessageContext");
Object.defineProperty(exports, "getOutboundMessageContext", { enumerable: true, get: function () { return getOutboundMessageContext_1.getOutboundMessageContext; } });
var types_1 = require("./types");
Object.defineProperty(exports, "DidCommMimeType", { enumerable: true, get: function () { return types_1.DidCommMimeType; } });
Object.defineProperty(exports, "KeyDerivationMethod", { enumerable: true, get: function () { return types_1.KeyDerivationMethod; } });
__exportStar(require("./storage/BaseRecord"), exports);
var didcomm_1 = require("./storage/didcomm");
Object.defineProperty(exports, "DidCommMessageRecord", { enumerable: true, get: function () { return didcomm_1.DidCommMessageRecord; } });
Object.defineProperty(exports, "DidCommMessageRole", { enumerable: true, get: function () { return didcomm_1.DidCommMessageRole; } });
Object.defineProperty(exports, "DidCommMessageRepository", { enumerable: true, get: function () { return didcomm_1.DidCommMessageRepository; } });
var Repository_1 = require("./storage/Repository");
Object.defineProperty(exports, "Repository", { enumerable: true, get: function () { return Repository_1.Repository; } });
__exportStar(require("./storage/RepositoryEvents"), exports);
__exportStar(require("./storage/migration"), exports);
var path_1 = require("./utils/path");
Object.defineProperty(exports, "getDirFromFilePath", { enumerable: true, get: function () { return path_1.getDirFromFilePath; } });
Object.defineProperty(exports, "joinUriParts", { enumerable: true, get: function () { return path_1.joinUriParts; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "InjectionSymbols", { enumerable: true, get: function () { return constants_1.InjectionSymbols; } });
__exportStar(require("./wallet"), exports);
var TransportService_1 = require("./agent/TransportService");
Object.defineProperty(exports, "TransportService", { enumerable: true, get: function () { return TransportService_1.TransportService; } });
var Attachment_1 = require("./decorators/attachment/Attachment");
Object.defineProperty(exports, "Attachment", { enumerable: true, get: function () { return Attachment_1.Attachment; } });
Object.defineProperty(exports, "AttachmentData", { enumerable: true, get: function () { return Attachment_1.AttachmentData; } });
var ServiceDecorator_1 = require("./decorators/service/ServiceDecorator");
Object.defineProperty(exports, "ServiceDecorator", { enumerable: true, get: function () { return ServiceDecorator_1.ServiceDecorator; } });
var TransportDecorator_1 = require("./decorators/transport/TransportDecorator");
Object.defineProperty(exports, "ReturnRouteTypes", { enumerable: true, get: function () { return TransportDecorator_1.ReturnRouteTypes; } });
__exportStar(require("./plugins"), exports);
__exportStar(require("./transport"), exports);
__exportStar(require("./modules/basic-messages"), exports);
__exportStar(require("./modules/common"), exports);
__exportStar(require("./modules/credentials"), exports);
__exportStar(require("./modules/discover-features"), exports);
__exportStar(require("./modules/message-pickup"), exports);
__exportStar(require("./modules/problem-reports"), exports);
__exportStar(require("./modules/proofs"), exports);
__exportStar(require("./modules/connections"), exports);
__exportStar(require("./modules/routing"), exports);
__exportStar(require("./modules/oob"), exports);
__exportStar(require("./modules/dids"), exports);
__exportStar(require("./modules/vc"), exports);
__exportStar(require("./modules/cache"), exports);
__exportStar(require("./modules/dif-presentation-exchange"), exports);
__exportStar(require("./modules/sd-jwt-vc"), exports);
var utils_1 = require("./utils");
Object.defineProperty(exports, "JsonEncoder", { enumerable: true, get: function () { return utils_1.JsonEncoder; } });
Object.defineProperty(exports, "JsonTransformer", { enumerable: true, get: function () { return utils_1.JsonTransformer; } });
Object.defineProperty(exports, "isJsonObject", { enumerable: true, get: function () { return utils_1.isJsonObject; } });
Object.defineProperty(exports, "isValidJweStructure", { enumerable: true, get: function () { return utils_1.isValidJweStructure; } });
Object.defineProperty(exports, "TypedArrayEncoder", { enumerable: true, get: function () { return utils_1.TypedArrayEncoder; } });
Object.defineProperty(exports, "Buffer", { enumerable: true, get: function () { return utils_1.Buffer; } });
Object.defineProperty(exports, "deepEquality", { enumerable: true, get: function () { return utils_1.deepEquality; } });
Object.defineProperty(exports, "isDid", { enumerable: true, get: function () { return utils_1.isDid; } });
Object.defineProperty(exports, "asArray", { enumerable: true, get: function () { return utils_1.asArray; } });
Object.defineProperty(exports, "equalsIgnoreOrder", { enumerable: true, get: function () { return utils_1.equalsIgnoreOrder; } });
Object.defineProperty(exports, "DateTransformer", { enumerable: true, get: function () { return utils_1.DateTransformer; } });
__exportStar(require("./logger"), exports);
__exportStar(require("./error"), exports);
__exportStar(require("./wallet/error"), exports);
var messageType_1 = require("./utils/messageType");
Object.defineProperty(exports, "parseMessageType", { enumerable: true, get: function () { return messageType_1.parseMessageType; } });
Object.defineProperty(exports, "IsValidMessageType", { enumerable: true, get: function () { return messageType_1.IsValidMessageType; } });
Object.defineProperty(exports, "replaceLegacyDidSovPrefix", { enumerable: true, get: function () { return messageType_1.replaceLegacyDidSovPrefix; } });
__exportStar(require("./agent/Events"), exports);
__exportStar(require("./crypto"), exports);
// TODO: clean up util exports
var attachment_1 = require("./utils/attachment");
Object.defineProperty(exports, "encodeAttachment", { enumerable: true, get: function () { return attachment_1.encodeAttachment; } });
Object.defineProperty(exports, "isLinkedAttachment", { enumerable: true, get: function () { return attachment_1.isLinkedAttachment; } });
var Hasher_1 = require("./utils/Hasher");
Object.defineProperty(exports, "Hasher", { enumerable: true, get: function () { return Hasher_1.Hasher; } });
var MessageValidator_1 = require("./utils/MessageValidator");
Object.defineProperty(exports, "MessageValidator", { enumerable: true, get: function () { return MessageValidator_1.MessageValidator; } });
var LinkedAttachment_1 = require("./utils/LinkedAttachment");
Object.defineProperty(exports, "LinkedAttachment", { enumerable: true, get: function () { return LinkedAttachment_1.LinkedAttachment; } });
const parseInvitation_1 = require("./utils/parseInvitation");
const uuid_1 = require("./utils/uuid");
const utils = {
    uuid: uuid_1.uuid,
    isValidUuid: uuid_1.isValidUuid,
    parseInvitationUrl: parseInvitation_1.parseInvitationUrl,
};
exports.utils = utils;
//# sourceMappingURL=index.js.map