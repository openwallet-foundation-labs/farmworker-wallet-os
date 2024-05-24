import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class SubjectIsHolderEvaluationHandler extends AbstractEvaluationHandler {
    private readonly fieldIdzInputDescriptorsSameSubjectRequired;
    private readonly fieldIdzInputDescriptorsSameSubjectPreferred;
    private readonly fieldIds;
    private readonly isHolder;
    private credentialsSubjectsByPath;
    private credentialsByPath;
    private messages;
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    /**
     * We have input descriptor to field ids mapping. This function gets a (reverse) map from field id to input descriptor
     */
    private findIsHolderFieldIdsToInputDescriptorsSets;
    private evaluateFields;
    private findAllCredentialSubjects;
    private confirmAllFieldSetHasSameSubject;
    private mapCredentialPathsToInputDescriptors;
    private createResult;
}
