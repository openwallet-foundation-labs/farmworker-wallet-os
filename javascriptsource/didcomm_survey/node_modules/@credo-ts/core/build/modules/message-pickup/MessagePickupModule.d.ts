import type { MessagePickupModuleConfigOptions } from './MessagePickupModuleConfig';
import type { MessagePickupProtocol } from './protocol/MessagePickupProtocol';
import type { FeatureRegistry } from '../../agent/FeatureRegistry';
import type { ApiModule, DependencyManager } from '../../plugins';
import type { Optional } from '../../utils';
import type { Constructor } from '../../utils/mixins';
import { MessagePickupApi } from './MessagePickupApi';
import { MessagePickupModuleConfig } from './MessagePickupModuleConfig';
import { V1MessagePickupProtocol, V2MessagePickupProtocol } from './protocol';
/**
 * Default protocols that will be registered if the `protocols` property is not configured.
 */
export type DefaultMessagePickupProtocols = [V1MessagePickupProtocol, V2MessagePickupProtocol];
export type MessagePickupModuleOptions<MessagePickupProtocols extends MessagePickupProtocol[]> = Optional<MessagePickupModuleConfigOptions<MessagePickupProtocols>, 'protocols'>;
export declare class MessagePickupModule<MessagePickupProtocols extends MessagePickupProtocol[] = DefaultMessagePickupProtocols> implements ApiModule {
    readonly config: MessagePickupModuleConfig<MessagePickupProtocols>;
    readonly api: Constructor<MessagePickupApi<MessagePickupProtocols>>;
    constructor(config?: MessagePickupModuleOptions<MessagePickupProtocols>);
    /**
     * Registers the dependencies of the message pickup answer module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
