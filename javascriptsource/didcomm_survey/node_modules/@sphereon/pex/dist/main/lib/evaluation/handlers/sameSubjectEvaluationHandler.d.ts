import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class SameSubjectEvaluationHandler extends AbstractEvaluationHandler {
    private fieldIds;
    private sameSubject;
    private messages;
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    private mapSameSubjectFieldIdsToInputDescriptors;
    private generateErrorResults;
    private countSameSubjectOccurrences;
    private mapCredentialsToResultObjecs;
}
