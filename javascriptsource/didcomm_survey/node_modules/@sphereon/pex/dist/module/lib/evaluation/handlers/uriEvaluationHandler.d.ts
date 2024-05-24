import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class UriEvaluationHandler extends AbstractEvaluationHandler {
    static matchAll: any;
    constructor(client: EvaluationClient);
    getName(): string;
    private static HASHLINK_URL_ENCODED_REGEX;
    private static HASHLINK_QUERY_URL_REGEX;
    handle(definition: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    private evaluateUris;
    private static buildVcContextAndSchemaUris;
    private createSuccessResultObject;
    private createErrorResultObject;
    private createWarnResultObject;
    private createResult;
    private static containsHashlink;
}
