import { Callback } from './callback';
import { PresentationDefinitionV2 } from './presentationDefinitionV2';
import { PresentationDefinitionV1 } from './presentationDefinitionV1';
import { Challenge } from './challenge';
import { Thread } from './thread';
export interface PresentationDefinitionWrapper {
    thread: Thread;
    presentation_definition_v1?: PresentationDefinitionV1;
    presentation_definition_v2?: PresentationDefinitionV2;
    challenge: Challenge;
    callback: Callback;
}
