import type { AckMessageOptions } from '../../common/messages/AckMessage';
import { AckMessage } from '../../common/messages/AckMessage';
export type DidRotateAckMessageOptions = AckMessageOptions;
export declare class DidRotateAckMessage extends AckMessage {
    /**
     * Create new CredentialAckMessage instance.
     * @param options
     */
    constructor(options: DidRotateAckMessageOptions);
    readonly type: string;
    static readonly type: import("../../../utils/messageType").ParsedMessageType;
}
