import type { ResolvedDidCommService } from '../../modules/didcomm';
export interface ServiceDecoratorOptions {
    recipientKeys: string[];
    routingKeys?: string[];
    serviceEndpoint: string;
}
/**
 * Represents `~service` decorator
 *
 * Based on specification Aries RFC 0056: Service Decorator
 * @see https://github.com/hyperledger/aries-rfcs/tree/master/features/0056-service-decorator
 */
export declare class ServiceDecorator {
    constructor(options: ServiceDecoratorOptions);
    recipientKeys: string[];
    routingKeys?: string[];
    serviceEndpoint: string;
    get resolvedDidCommService(): ResolvedDidCommService;
}
