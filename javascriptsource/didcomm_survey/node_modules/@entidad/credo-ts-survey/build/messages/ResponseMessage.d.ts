import { AgentMessage } from '@credo-ts/core';
export declare class ResponseMessage extends AgentMessage {
    /**
     * Create new ResponseMessage instance.
     * @param options
     */
    constructor(options: {
        id?: string;
        threadId: string;
        response: string;
    });
    readonly type: string;
    static readonly type: import("@credo-ts/core/build/utils/messageType").ParsedMessageType;
    response: string;
}
