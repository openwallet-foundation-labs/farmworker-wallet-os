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
exports.ConnectionProblemReportMessage = void 0;
const messageType_1 = require("../../../utils/messageType");
const ProblemReportMessage_1 = require("../../problem-reports/messages/ProblemReportMessage");
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
class ConnectionProblemReportMessage extends ProblemReportMessage_1.ProblemReportMessage {
    /**
     * Create new ConnectionProblemReportMessage instance.
     * @param options
     */
    constructor(options) {
        super(options);
        this.allowDidSovPrefix = true;
        this.type = ConnectionProblemReportMessage.type.messageTypeUri;
    }
}
ConnectionProblemReportMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/connection/1.0/problem-report');
__decorate([
    (0, messageType_1.IsValidMessageType)(ConnectionProblemReportMessage.type),
    __metadata("design:type", Object)
], ConnectionProblemReportMessage.prototype, "type", void 0);
exports.ConnectionProblemReportMessage = ConnectionProblemReportMessage;
//# sourceMappingURL=ConnectionProblemReportMessage.js.map