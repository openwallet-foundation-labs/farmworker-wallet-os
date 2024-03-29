import type { ProblemReportErrorOptions } from '../../../../problem-reports';
import type { CredentialProblemReportReason } from '../../../models/CredentialProblemReportReason';
import { ProblemReportError } from '../../../../problem-reports/errors/ProblemReportError';
import { V2CredentialProblemReportMessage } from '../messages/V2CredentialProblemReportMessage';
export interface V2CredentialProblemReportErrorOptions extends ProblemReportErrorOptions {
    problemCode: CredentialProblemReportReason;
}
export declare class V2CredentialProblemReportError extends ProblemReportError {
    problemReport: V2CredentialProblemReportMessage;
    constructor(message: string, { problemCode }: V2CredentialProblemReportErrorOptions);
}
