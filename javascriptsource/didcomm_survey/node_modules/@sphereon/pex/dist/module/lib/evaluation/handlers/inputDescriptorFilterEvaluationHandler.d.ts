import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class InputDescriptorFilterEvaluationHandler extends AbstractEvaluationHandler {
    private static FILTER_CACHE;
    private static DEFAULT_MAX_FILTER_CACHE_SIZE;
    private static DEFAULT_FILTER_CACHE_TTL;
    private static DEFAULT_RESET_CACHE_SIZE;
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    private createNoFieldResults;
    private createResponse;
    private createResultObject;
    private evaluateFilter;
    private transformDateFormat;
    static keepCacheSizeInCheck(opts?: {
        ttl?: number;
        maxCacheSize?: number;
        resetCacheSize?: number;
    }): void;
}
