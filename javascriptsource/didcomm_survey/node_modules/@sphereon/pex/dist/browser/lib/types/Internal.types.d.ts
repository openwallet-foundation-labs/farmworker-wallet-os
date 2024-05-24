import { Format, InputDescriptorV1, InputDescriptorV2, PresentationDefinitionV1, PresentationDefinitionV2, SubmissionRequirement } from '@sphereon/pex-models';
import { IVerifiableCredential, IVerifiablePresentation } from '@sphereon/ssi-types';
export type PathComponent = string | number;
export interface IInternalPresentationDefinition {
    format?: Format;
    id: string;
    name?: string;
    purpose?: string;
    submission_requirements?: Array<SubmissionRequirement>;
    getVersion(): PEVersion;
}
export declare class InternalPresentationDefinitionV1 implements PresentationDefinitionV1, IInternalPresentationDefinition {
    input_descriptors: Array<InputDescriptorV1>;
    constructor(id: string, input_descriptors: Array<InputDescriptorV1>, format?: Format, name?: string, purpose?: string, submission_requirements?: Array<SubmissionRequirement>);
    format?: Format | undefined;
    id: string;
    name?: string | undefined;
    purpose?: string | undefined;
    submission_requirements?: SubmissionRequirement[] | undefined;
    getVersion(): PEVersion;
}
export declare class InternalPresentationDefinitionV2 implements PresentationDefinitionV2, IInternalPresentationDefinition {
    format?: Format;
    frame?: any;
    id: string;
    input_descriptors: Array<InputDescriptorV2>;
    name?: string;
    purpose?: string;
    submission_requirements?: Array<SubmissionRequirement>;
    constructor(id: string, input_descriptors: Array<InputDescriptorV2>, format?: Format, frame?: any, name?: string, purpose?: string, submission_requirements?: Array<SubmissionRequirement>);
    getVersion(): PEVersion;
}
export interface DiscoveredVersion {
    version?: PEVersion;
    error?: string;
}
export type IPresentationDefinition = PresentationDefinitionV1 | PresentationDefinitionV2;
export type InputFieldType = IVerifiablePresentation | IVerifiableCredential | IVerifiableCredential[] | IInternalPresentationDefinition | PresentationDefinitionV1 | PresentationDefinitionV2 | unknown;
export declare enum PEVersion {
    v1 = "v1",
    v2 = "v2"
}
