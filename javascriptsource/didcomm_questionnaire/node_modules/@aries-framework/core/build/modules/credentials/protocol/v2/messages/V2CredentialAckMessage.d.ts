import type { AckMessageOptions } from '../../../../common';
import { AckMessage } from '../../../../common';
export type V2CredentialAckMessageOptions = AckMessageOptions;
/**
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0015-acks/README.md#explicit-acks
 */
export declare class V2CredentialAckMessage extends AckMessage {
    /**
     * Create new CredentialAckMessage instance.
     * @param options
     */
    constructor(options: V2CredentialAckMessageOptions);
    readonly type: string;
    static readonly type: import("../../../../../utils/messageType").ParsedMessageType;
}
