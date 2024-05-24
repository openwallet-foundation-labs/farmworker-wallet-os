import type { ProblemReportMessageOptions } from '../../problem-reports/messages/ProblemReportMessage';
import { ProblemReportMessage } from '../../problem-reports/messages/ProblemReportMessage';
export type ConnectionProblemReportMessageOptions = ProblemReportMessageOptions;
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
export declare class ConnectionProblemReportMessage extends ProblemReportMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new ConnectionProblemReportMessage instance.
     * @param options
     */
    constructor(options: ConnectionProblemReportMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
