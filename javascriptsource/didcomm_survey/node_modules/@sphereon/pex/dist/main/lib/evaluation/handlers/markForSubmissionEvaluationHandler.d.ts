import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types/Internal.types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class MarkForSubmissionEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    private retrieveNoErrorStatus;
    private produceSuccessResults;
    private produceErrorResults;
}
