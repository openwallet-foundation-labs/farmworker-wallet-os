import { Callback } from './callback';
import { PresentationSubmission } from './presentationSubmission';
import { Challenge } from './challenge';
export interface PresentationWrapper {
    presentation_submission: PresentationSubmission;
    challenge: Challenge;
    callback: Callback;
}
