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
exports.ProblemReportMessage = exports.OtherStatus = exports.WhereStatus = exports.ImpactStatus = exports.WhoRetriesStatus = void 0;
// Create a base ProblemReportMessage message class and add it to the messages directory
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const AgentMessage_1 = require("../../../agent/AgentMessage");
const messageType_1 = require("../../../utils/messageType");
var WhoRetriesStatus;
(function (WhoRetriesStatus) {
    WhoRetriesStatus["You"] = "YOU";
    WhoRetriesStatus["Me"] = "ME";
    WhoRetriesStatus["Both"] = "BOTH";
    WhoRetriesStatus["None"] = "NONE";
})(WhoRetriesStatus = exports.WhoRetriesStatus || (exports.WhoRetriesStatus = {}));
var ImpactStatus;
(function (ImpactStatus) {
    ImpactStatus["Message"] = "MESSAGE";
    ImpactStatus["Thread"] = "THREAD";
    ImpactStatus["Connection"] = "CONNECTION";
})(ImpactStatus = exports.ImpactStatus || (exports.ImpactStatus = {}));
var WhereStatus;
(function (WhereStatus) {
    WhereStatus["Cloud"] = "CLOUD";
    WhereStatus["Edge"] = "EDGE";
    WhereStatus["Wire"] = "WIRE";
    WhereStatus["Agency"] = "AGENCY";
})(WhereStatus = exports.WhereStatus || (exports.WhereStatus = {}));
var OtherStatus;
(function (OtherStatus) {
    OtherStatus["You"] = "YOU";
    OtherStatus["Me"] = "ME";
    OtherStatus["Other"] = "OTHER";
})(OtherStatus = exports.OtherStatus || (exports.OtherStatus = {}));
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
class ProblemReportMessage extends AgentMessage_1.AgentMessage {
    /**
     * Create new ReportProblem instance.
     * @param options
     */
    constructor(options) {
        super();
        this.type = ProblemReportMessage.type.messageTypeUri;
        if (options) {
            this.id = options.id || this.generateId();
            this.description = options.description;
            this.problemItems = options.problemItems;
            this.whoRetries = options.whoRetries;
            this.fixHint = options.fixHint;
            this.impact = options.impact;
            this.where = options.where;
            this.noticedTime = options.noticedTime;
            this.trackingUri = options.trackingUri;
            this.escalationUri = options.escalationUri;
        }
    }
}
ProblemReportMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/notification/1.0/problem-report');
__decorate([
    (0, messageType_1.IsValidMessageType)(ProblemReportMessage.type),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'problem_items' }),
    __metadata("design:type", Array)
], ProblemReportMessage.prototype, "problemItems", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(WhoRetriesStatus),
    (0, class_transformer_1.Expose)({ name: 'who_retries' }),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "whoRetries", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)({ name: 'fix_hint' }),
    __metadata("design:type", Object)
], ProblemReportMessage.prototype, "fixHint", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(WhereStatus),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "where", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ImpactStatus),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "impact", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'noticed_time' }),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "noticedTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'tracking_uri' }),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "trackingUri", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'escalation_uri' }),
    __metadata("design:type", String)
], ProblemReportMessage.prototype, "escalationUri", void 0);
exports.ProblemReportMessage = ProblemReportMessage;
//# sourceMappingURL=ProblemReportMessage.js.map