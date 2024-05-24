import type { Routing } from './ConnectionService';
import type { AgentContext } from '../../../agent';
import type { ResolvedDidCommService } from '../../didcomm';
import type { DidDocument, PeerDidNumAlgo } from '../../dids';
import type { DidDoc } from '../models';
import { Key } from '../../../crypto';
export declare function convertToNewDidDocument(didDoc: DidDoc): DidDocument;
export declare function routingToServices(routing: Routing): ResolvedDidCommService[];
export declare function getDidDocumentForCreatedDid(agentContext: AgentContext, did: string): Promise<DidDocument>;
/**
 * Asserts that the keys we are going to use for creating a did document haven't already been used in another did document
 * Due to how DIDComm v1 works (only reference the key not the did in encrypted message) we can't have multiple dids containing
 * the same key as we won't know which did (and thus which connection) a message is intended for.
 */
export declare function assertNoCreatedDidExistsForKeys(agentContext: AgentContext, recipientKeys: Key[]): Promise<void>;
export declare function createPeerDidFromServices(agentContext: AgentContext, services: ResolvedDidCommService[], numAlgo: PeerDidNumAlgo): Promise<DidDocument>;
