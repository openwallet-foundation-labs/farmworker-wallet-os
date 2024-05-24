import { DidExchangeState } from './DidExchangeState';
/**
 * Connection states as defined in RFC 0160.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md#states
 */
export declare enum ConnectionState {
    Null = "null",
    Invited = "invited",
    Requested = "requested",
    Responded = "responded",
    Complete = "complete"
}
export declare function rfc0160StateFromDidExchangeState(didExchangeState: DidExchangeState): ConnectionState;
