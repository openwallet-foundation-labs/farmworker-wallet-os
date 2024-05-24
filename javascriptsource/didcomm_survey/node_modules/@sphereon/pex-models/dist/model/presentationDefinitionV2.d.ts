import { SubmissionRequirement } from './submissionRequirement';
import { Format } from './format';
import { InputDescriptorV2 } from './inputDescriptorV2';
export interface PresentationDefinitionV2 {
    id: string;
    name?: string;
    purpose?: string;
    format?: Format;
    submission_requirements?: Array<SubmissionRequirement>;
    input_descriptors: Array<InputDescriptorV2>;
    frame?: object;
}
