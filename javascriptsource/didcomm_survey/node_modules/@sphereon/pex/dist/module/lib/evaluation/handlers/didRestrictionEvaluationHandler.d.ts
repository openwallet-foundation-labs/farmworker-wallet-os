import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class DIDRestrictionEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    private getIssuerIdFromWrappedVerifiableCredential;
    private generateErrorResult;
    private generateSuccessResult;
}
