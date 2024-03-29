"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionProblemReportReason = void 0;
/**
 * Connection error code in RFC 160.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0160-connection-protocol/README.md#errors
 */
var ConnectionProblemReportReason;
(function (ConnectionProblemReportReason) {
    ConnectionProblemReportReason["RequestNotAccepted"] = "request_not_accepted";
    ConnectionProblemReportReason["RequestProcessingError"] = "request_processing_error";
    ConnectionProblemReportReason["ResponseNotAccepted"] = "response_not_accepted";
    ConnectionProblemReportReason["ResponseProcessingError"] = "response_processing_error";
})(ConnectionProblemReportReason = exports.ConnectionProblemReportReason || (exports.ConnectionProblemReportReason = {}));
//# sourceMappingURL=ConnectionProblemReportReason.js.map