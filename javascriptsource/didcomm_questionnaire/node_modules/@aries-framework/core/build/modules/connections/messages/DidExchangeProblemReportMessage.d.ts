import type { ProblemReportMessageOptions } from '../../problem-reports/messages/ProblemReportMessage';
import { ProblemReportMessage } from '../../problem-reports/messages/ProblemReportMessage';
export type DidExchangeProblemReportMessageOptions = ProblemReportMessageOptions;
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
export declare class DidExchangeProblemReportMessage extends ProblemReportMessage {
    constructor(options: DidExchangeProblemReportMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
