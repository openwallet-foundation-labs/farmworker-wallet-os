import { PresentationStatus } from './presentationStatus';
export interface PresentationStatusWrapper {
    definition_id: string;
    statuses: Array<PresentationStatus>;
}
