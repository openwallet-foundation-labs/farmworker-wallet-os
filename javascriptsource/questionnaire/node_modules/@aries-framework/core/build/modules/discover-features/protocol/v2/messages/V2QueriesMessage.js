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
exports.V2QueriesMessage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../../../agent/AgentMessage");
const models_1 = require("../../../../../agent/models");
const messageType_1 = require("../../../../../utils/messageType");
class V2QueriesMessage extends AgentMessage_1.AgentMessage {
    constructor(options) {
        var _a;
        super();
        this.type = V2QueriesMessage.type.messageTypeUri;
        if (options) {
            this.id = (_a = options.id) !== null && _a !== void 0 ? _a : this.generateId();
            this.queries = options.queries.map((q) => new models_1.FeatureQuery(q));
        }
    }
}
V2QueriesMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/discover-features/2.0/queries');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2QueriesMessage.type),
    __metadata("design:type", Object)
], V2QueriesMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInstance)(models_1.FeatureQuery, { each: true }),
    (0, class_transformer_1.Type)(() => models_1.FeatureQuery),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], V2QueriesMessage.prototype, "queries", void 0);
exports.V2QueriesMessage = V2QueriesMessage;
//# sourceMappingURL=V2QueriesMessage.js.map