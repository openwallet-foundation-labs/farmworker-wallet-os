import type { ConnectionProblemReportReason } from './ConnectionProblemReportReason';
import type { ProblemReportErrorOptions } from '../../problem-reports';
import { ProblemReportError } from '../../problem-reports';
import { ConnectionProblemReportMessage } from '../messages';
interface ConnectionProblemReportErrorOptions extends ProblemReportErrorOptions {
    problemCode: ConnectionProblemReportReason;
}
export declare class ConnectionProblemReportError extends ProblemReportError {
    message: string;
    problemReport: ConnectionProblemReportMessage;
    constructor(message: string, { problemCode }: ConnectionProblemReportErrorOptions);
}
export {};
