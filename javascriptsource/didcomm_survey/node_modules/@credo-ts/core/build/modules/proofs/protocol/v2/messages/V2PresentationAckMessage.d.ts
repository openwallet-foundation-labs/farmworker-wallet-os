import { AckMessage } from '../../../../common/messages/AckMessage';
export declare class V2PresentationAckMessage extends AckMessage {
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
}
