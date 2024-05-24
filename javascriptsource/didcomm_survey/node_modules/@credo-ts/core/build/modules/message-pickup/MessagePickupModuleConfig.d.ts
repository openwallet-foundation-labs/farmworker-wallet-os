import type { MessagePickupProtocol } from './protocol/MessagePickupProtocol';
import type { MessagePickupRepository } from './storage/MessagePickupRepository';
/**
 * MessagePickupModuleConfigOptions defines the interface for the options of the MessagePickupModuleConfig class.
 * This can contain optional parameters that have default values in the config class itself.
 */
export interface MessagePickupModuleConfigOptions<MessagePickupProtocols extends MessagePickupProtocol[]> {
    /**
     * Maximum number of messages to retrieve in a single batch message pickup
     *
     * @default 10
     */
    maximumBatchSize?: number;
    /**
     * Message pickup protocols to make available to the message pickup module. Only one protocol should be registered for each
     * protocol version.
     *
     * When not provided, V1MessagePickupProtocol and V2MessagePickupProtocol` are registered by default.
     *
     * @default
     * ```
     * [V1MessagePickupProtocol, V2MessagePickupProtocol]
     * ```
     */
    protocols: MessagePickupProtocols;
    /**
     * Allows to specify a custom pickup message queue. It defaults to an in-memory queue
     *
     */
    messagePickupRepository?: MessagePickupRepository;
}
export declare class MessagePickupModuleConfig<MessagePickupProtocols extends MessagePickupProtocol[]> {
    private options;
    constructor(options: MessagePickupModuleConfigOptions<MessagePickupProtocols>);
    /** See {@link MessagePickupModuleConfig.maximumBatchSize} */
    get maximumBatchSize(): number;
    /** See {@link MessagePickupModuleConfig.protocols} */
    get protocols(): MessagePickupProtocols;
    /** See {@link MessagePickupModuleConfig.messagePickupRepository} */
    get messagePickupRepository(): MessagePickupRepository | undefined;
}
