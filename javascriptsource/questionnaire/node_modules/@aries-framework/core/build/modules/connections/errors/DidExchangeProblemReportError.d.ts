import type { DidExchangeProblemReportReason } from './DidExchangeProblemReportReason';
import type { ProblemReportErrorOptions } from '../../problem-reports';
import { ProblemReportError } from '../../problem-reports';
import { DidExchangeProblemReportMessage } from '../messages';
interface DidExchangeProblemReportErrorOptions extends ProblemReportErrorOptions {
    problemCode: DidExchangeProblemReportReason;
}
export declare class DidExchangeProblemReportError extends ProblemReportError {
    message: string;
    problemReport: DidExchangeProblemReportMessage;
    constructor(message: string, { problemCode }: DidExchangeProblemReportErrorOptions);
}
export {};
