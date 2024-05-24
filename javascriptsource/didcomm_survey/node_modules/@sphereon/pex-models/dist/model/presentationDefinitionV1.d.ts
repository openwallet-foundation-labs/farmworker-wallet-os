import { SubmissionRequirement } from './submissionRequirement';
import { Format } from './format';
import { InputDescriptorV1 } from './inputDescriptorV1';
export interface PresentationDefinitionV1 {
    id: string;
    name?: string;
    purpose?: string;
    format?: Format;
    submission_requirements?: Array<SubmissionRequirement>;
    input_descriptors: Array<InputDescriptorV1>;
}
