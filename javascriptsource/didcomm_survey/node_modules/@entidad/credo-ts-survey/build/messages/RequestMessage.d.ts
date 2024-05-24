import { AgentMessage } from '@credo-ts/core';
import { SurveyModel } from '../models';
export declare class RequestMessage extends AgentMessage {
    /**
     * Create new RequestMessage instance.
     * @param options
     */
    constructor(options: {
        id?: string;
        signatureRequired?: boolean;
        request: SurveyModel;
        expirationDate?: string;
    });
    readonly type: string;
    static readonly type: import("@credo-ts/core/build/utils/messageType").ParsedMessageType;
    signatureRequired?: boolean;
    expirationDate?: string;
    request: SurveyModel;
}
