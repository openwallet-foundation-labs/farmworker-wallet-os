/**
 * Return route types.
 */
export declare enum ReturnRouteTypes {
    /** No messages should be returned over this connection. */
    none = "none",
    /**  All messages for this key should be returned over this connection. */
    all = "all",
    /** Send all messages matching this thread over this connection. */
    thread = "thread"
}
/**
 * Represents `~transport` decorator
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0092-transport-return-route/README.md
 */
export declare class TransportDecorator {
    constructor(partial?: Partial<TransportDecorator>);
    returnRoute?: ReturnRouteTypes;
    returnRouteThread?: string;
}
