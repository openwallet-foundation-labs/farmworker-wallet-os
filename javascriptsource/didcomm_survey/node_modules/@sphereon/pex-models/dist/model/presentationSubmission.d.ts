import { Descriptor } from './descriptor';
export interface PresentationSubmission {
    id: string;
    definition_id: string;
    descriptor_map: Array<Descriptor>;
}
