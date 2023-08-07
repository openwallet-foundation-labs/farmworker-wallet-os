import type { AgentDependencies } from '../agent/AgentDependencies';
import type { Response } from 'node-fetch';
import { OutOfBandInvitation } from '../modules/oob/messages';
/**
 * Parses URL containing encoded invitation and returns invitation message.
 *
 * @param invitationUrl URL containing encoded invitation
 *
 * @returns OutOfBandInvitation
 */
export declare const parseInvitationUrl: (invitationUrl: string) => OutOfBandInvitation;
export declare const oobInvitationFromShortUrl: (response: Response) => Promise<OutOfBandInvitation>;
/**
 * Parses URL containing encoded invitation and returns invitation message. Compatible with
 * parsing short Urls
 *
 * @param invitationUrl URL containing encoded invitation
 *
 * @param dependencies Agent dependencies containing fetch
 *
 * @returns OutOfBandInvitation
 */
export declare const parseInvitationShortUrl: (invitationUrl: string, dependencies: AgentDependencies) => Promise<OutOfBandInvitation>;
