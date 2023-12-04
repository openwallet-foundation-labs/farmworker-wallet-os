import { AgentMessage } from '../../../../../agent/AgentMessage';
export interface DiscloseProtocolOptions {
    protocolId: string;
    roles?: string[];
}
export declare class DiscloseProtocol {
    constructor(options: DiscloseProtocolOptions);
    protocolId: string;
    roles?: string[];
}
export interface DiscoverFeaturesDiscloseMessageOptions {
    id?: string;
    threadId: string;
    protocols: DiscloseProtocolOptions[];
}
export declare class V1DiscloseMessage extends AgentMessage {
    constructor(options: DiscoverFeaturesDiscloseMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
    protocols: DiscloseProtocol[];
}
