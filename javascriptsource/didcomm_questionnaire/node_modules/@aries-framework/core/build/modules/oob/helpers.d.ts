import { ConnectionInvitationMessage } from '../connections';
import { OutOfBandInvitation } from './messages';
export declare function convertToNewInvitation(oldInvitation: ConnectionInvitationMessage): OutOfBandInvitation;
export declare function convertToOldInvitation(newInvitation: OutOfBandInvitation): ConnectionInvitationMessage;
