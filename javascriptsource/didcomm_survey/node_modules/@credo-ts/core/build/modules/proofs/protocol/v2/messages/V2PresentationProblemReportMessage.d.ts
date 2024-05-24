import { ProblemReportMessage } from '../../../../problem-reports/messages/ProblemReportMessage';
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
export declare class V2PresentationProblemReportMessage extends ProblemReportMessage {
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
}
