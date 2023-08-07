import { AriesFrameworkError } from './AriesFrameworkError';
export declare class RecordNotFoundError extends AriesFrameworkError {
    constructor(message: string, { recordType, cause }: {
        recordType: string;
        cause?: Error;
    });
}
