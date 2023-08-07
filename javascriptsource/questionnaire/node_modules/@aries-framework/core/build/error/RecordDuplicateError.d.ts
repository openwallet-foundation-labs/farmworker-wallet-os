import { AriesFrameworkError } from './AriesFrameworkError';
export declare class RecordDuplicateError extends AriesFrameworkError {
    constructor(message: string, { recordType, cause }: {
        recordType: string;
        cause?: Error;
    });
}
