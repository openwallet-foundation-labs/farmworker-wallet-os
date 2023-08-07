import { AgentMessage } from '@aries-framework/core';
import { ValidResponse } from '../models';
export declare class QuestionMessage extends AgentMessage {
    /**
     * Create new QuestionMessage instance.
     * @param options
     */
    constructor(options: {
        questionText: string;
        questionDetail?: string;
        validResponses: ValidResponse[];
        signatureRequired?: boolean;
        id?: string;
        nonce?: string;
    });
    readonly type: string;
    static readonly type: import("@aries-framework/core/build/utils/messageType").ParsedMessageType;
    nonce?: string;
    signatureRequired?: boolean;
    validResponses: ValidResponse[];
    questionText: string;
    questionDetail?: string;
}
