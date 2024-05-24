import { ICredential } from '@sphereon/ssi-types';
import { DiscoveredVersion, IPresentationDefinition } from '../types';
export declare function getSubjectIdsAsString(vc: ICredential): string[];
export declare function getIssuerString(vc: ICredential): string;
export declare function definitionVersionDiscovery(presentationDefinition: IPresentationDefinition): DiscoveredVersion;
export declare function uniformDIDMethods(dids?: string[], opts?: {
    removePrefix: 'did:';
}): string[];
export declare function isRestrictedDID(DID: string, restrictToDIDMethods: string[]): boolean;
export declare function filterToRestrictedDIDs(DIDs: string[], restrictToDIDMethods: string[]): string[];
