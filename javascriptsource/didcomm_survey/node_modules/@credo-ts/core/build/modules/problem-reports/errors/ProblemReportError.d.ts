import { CredoError } from '../../../error/CredoError';
import { ProblemReportMessage } from '../messages/ProblemReportMessage';
export interface ProblemReportErrorOptions {
    problemCode: string;
}
export declare class ProblemReportError extends CredoError {
    problemReport: ProblemReportMessage;
    constructor(message: string, { problemCode }: ProblemReportErrorOptions);
}
