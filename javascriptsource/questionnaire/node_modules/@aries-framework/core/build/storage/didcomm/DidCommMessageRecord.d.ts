import type { DidCommMessageRole } from './DidCommMessageRole';
import type { ConstructableAgentMessage } from '../../agent/AgentMessage';
import type { JsonObject } from '../../types';
import { BaseRecord } from '../BaseRecord';
export type DefaultDidCommMessageTags = {
    role: DidCommMessageRole;
    associatedRecordId?: string;
    protocolName: string;
    messageName: string;
    protocolMajorVersion: string;
    protocolMinorVersion: string;
    messageType: string;
    messageId: string;
    threadId: string;
};
export interface DidCommMessageRecordProps {
    role: DidCommMessageRole;
    message: JsonObject;
    id?: string;
    createdAt?: Date;
    associatedRecordId?: string;
}
export declare class DidCommMessageRecord extends BaseRecord<DefaultDidCommMessageTags> {
    message: JsonObject;
    role: DidCommMessageRole;
    /**
     * The id of the record that is associated with this message record.
     *
     * E.g. if the connection record wants to store an invitation message
     * the associatedRecordId will be the id of the connection record.
     */
    associatedRecordId?: string;
    static readonly type = "DidCommMessageRecord";
    readonly type = "DidCommMessageRecord";
    constructor(props: DidCommMessageRecordProps);
    getTags(): {
        role: DidCommMessageRole;
        associatedRecordId: string | undefined;
        threadId: string;
        protocolName: string;
        messageName: string;
        protocolMajorVersion: string;
        protocolMinorVersion: string;
        messageType: string;
        messageId: string;
    };
    getMessageInstance<MessageClass extends ConstructableAgentMessage = ConstructableAgentMessage>(messageClass: MessageClass): InstanceType<MessageClass>;
}
