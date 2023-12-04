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
exports.V2CredentialProblemReportMessage = void 0;
const messageType_1 = require("../../../../../utils/messageType");
const ProblemReportMessage_1 = require("../../../../problem-reports/messages/ProblemReportMessage");
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
class V2CredentialProblemReportMessage extends ProblemReportMessage_1.ProblemReportMessage {
    /**
     * Create new CredentialProblemReportMessage instance.
     * @param options
     */
    constructor(options) {
        super(options);
        this.type = V2CredentialProblemReportMessage.type.messageTypeUri;
    }
}
V2CredentialProblemReportMessage.type = (0, messageType_1.parseMessageType)('https://didcomm.org/issue-credential/2.0/problem-report');
__decorate([
    (0, messageType_1.IsValidMessageType)(V2CredentialProblemReportMessage.type),
    __metadata("design:type", Object)
], V2CredentialProblemReportMessage.prototype, "type", void 0);
exports.V2CredentialProblemReportMessage = V2CredentialProblemReportMessage;
//# sourceMappingURL=V2CredentialProblemReportMessage.js.map