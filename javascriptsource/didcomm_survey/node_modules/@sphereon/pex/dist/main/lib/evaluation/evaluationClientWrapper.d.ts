import { Format, PresentationSubmission } from '@sphereon/pex-models';
import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { Status } from '../ConstraintUtils';
import { PresentationSubmissionLocation } from '../signing';
import { IInternalPresentationDefinition } from '../types';
import { EvaluationResults, SelectResults, SubmissionRequirementMatch } from './core';
import { EvaluationClient } from './evaluationClient';
export declare class EvaluationClientWrapper {
    private _client;
    constructor();
    getEvaluationClient(): EvaluationClient;
    selectFrom(presentationDefinition: IInternalPresentationDefinition, wrappedVerifiableCredentials: WrappedVerifiableCredential[], opts?: {
        holderDIDs?: string[];
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): SelectResults;
    private remapMatches;
    private extractMatches;
    /**
     * Since this is without SubmissionRequirements object, each InputDescriptor has to have at least one corresponding VerifiableCredential
     * @param marked: info logs for `MarkForSubmissionEvaluation` handler
     * @param pd
     * @private
     */
    private checkWithoutSubmissionRequirements;
    private matchSubmissionRequirements;
    private matchWithoutSubmissionRequirements;
    private mapMatchingDescriptors;
    evaluate(pd: IInternalPresentationDefinition, wvcs: WrappedVerifiableCredential[], opts?: {
        holderDIDs?: string[];
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        presentationSubmission?: PresentationSubmission;
        generatePresentationSubmission?: boolean;
    }): EvaluationResults;
    private formatNotInfo;
    submissionFrom(pd: IInternalPresentationDefinition, vcs: WrappedVerifiableCredential[], opts?: {
        presentationSubmissionLocation?: PresentationSubmissionLocation;
    }): PresentationSubmission;
    private updatePresentationSubmission;
    private updatePresentationSubmissionToExternal;
    private matchUserSelectedVcs;
    private evaluateRequirements;
    private countMatchingInputDescriptors;
    private handleCount;
    private removeDuplicateSubmissionRequirementMatches;
    fillSelectableCredentialsToVerifiableCredentialsMapping(selectResults: SelectResults, wrappedVcs: WrappedVerifiableCredential[]): void;
    determineAreRequiredCredentialsPresent(presentationDefinition: IInternalPresentationDefinition, matchSubmissionRequirements: SubmissionRequirementMatch[] | undefined, parentMsr?: SubmissionRequirementMatch): Status;
    private determineSubmissionRequirementStatus;
    private getPickRuleStatus;
    private updateSubmissionRequirementMatchPathToAlias;
    private updatePresentationSubmissionPathToVpPath;
    private replacePathWithAlias;
    private createIdToVcMap;
    private countGroupIDs;
}
