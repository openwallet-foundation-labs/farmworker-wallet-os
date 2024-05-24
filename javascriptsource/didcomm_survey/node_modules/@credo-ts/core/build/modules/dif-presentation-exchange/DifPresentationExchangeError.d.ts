import { CredoError } from '../../error';
export declare class DifPresentationExchangeError extends CredoError {
    additionalMessages?: Array<string>;
    constructor(message: string, { cause, additionalMessages }?: {
        cause?: Error;
        additionalMessages?: Array<string>;
    });
}
