import { AgentMessage } from '../../../agent/AgentMessage';
export declare class BasicMessage extends AgentMessage {
    readonly allowDidSovPrefix = true;
    /**
     * Create new BasicMessage instance.
     * sentTime will be assigned to new Date if not passed, id will be assigned to uuid/v4 if not passed
     * @param options
     */
    constructor(options: {
        content: string;
        sentTime?: Date;
        id?: string;
        locale?: string;
    });
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
    sentTime: Date;
    content: string;
}
