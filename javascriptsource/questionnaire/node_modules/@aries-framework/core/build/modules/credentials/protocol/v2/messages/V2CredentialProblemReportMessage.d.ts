import type { ProblemReportMessageOptions } from '../../../../problem-reports/messages/ProblemReportMessage';
import { ProblemReportMessage } from '../../../../problem-reports/messages/ProblemReportMessage';
export type V2CredentialProblemReportMessageOptions = ProblemReportMessageOptions;
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
export declare class V2CredentialProblemReportMessage extends ProblemReportMessage {
    /**
     * Create new CredentialProblemReportMessage instance.
     * @param options
     */
    constructor(options: V2CredentialProblemReportMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
}
