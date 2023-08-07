import { AriesFrameworkError } from '../../../error/AriesFrameworkError';
import { ProblemReportMessage } from '../messages/ProblemReportMessage';
export interface ProblemReportErrorOptions {
    problemCode: string;
}
export declare class ProblemReportError extends AriesFrameworkError {
    problemReport: ProblemReportMessage;
    constructor(message: string, { problemCode }: ProblemReportErrorOptions);
}
