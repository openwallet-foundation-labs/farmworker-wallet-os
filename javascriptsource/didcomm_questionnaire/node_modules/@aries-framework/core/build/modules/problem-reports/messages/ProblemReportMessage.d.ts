import { AgentMessage } from '../../../agent/AgentMessage';
export declare enum WhoRetriesStatus {
    You = "YOU",
    Me = "ME",
    Both = "BOTH",
    None = "NONE"
}
export declare enum ImpactStatus {
    Message = "MESSAGE",
    Thread = "THREAD",
    Connection = "CONNECTION"
}
export declare enum WhereStatus {
    Cloud = "CLOUD",
    Edge = "EDGE",
    Wire = "WIRE",
    Agency = "AGENCY"
}
export declare enum OtherStatus {
    You = "YOU",
    Me = "ME",
    Other = "OTHER"
}
export interface DescriptionOptions {
    en: string;
    code: string;
}
export interface FixHintOptions {
    en: string;
}
export interface ProblemReportMessageOptions {
    id?: string;
    description: DescriptionOptions;
    problemItems?: string[];
    whoRetries?: WhoRetriesStatus;
    fixHint?: FixHintOptions;
    impact?: ImpactStatus;
    where?: WhereStatus;
    noticedTime?: string;
    trackingUri?: string;
    escalationUri?: string;
}
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/main/features/0035-report-problem/README.md
 */
export declare class ProblemReportMessage extends AgentMessage {
    /**
     * Create new ReportProblem instance.
     * @param options
     */
    constructor(options: ProblemReportMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    description: DescriptionOptions;
    problemItems?: string[];
    whoRetries?: WhoRetriesStatus;
    fixHint?: FixHintOptions;
    where?: WhereStatus;
    impact?: ImpactStatus;
    noticedTime?: string;
    trackingUri?: string;
    escalationUri?: string;
}
