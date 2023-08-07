import { AgentMessage } from '@aries-framework/core';
export declare class AnswerMessage extends AgentMessage {
    /**
     * Create new AnswerMessage instance.
     * @param options
     */
    constructor(options: {
        id?: string;
        response: string;
        threadId: string;
    });
    readonly type: string;
    static readonly type: import("@aries-framework/core/build/utils/messageType").ParsedMessageType;
    response: string;
}
