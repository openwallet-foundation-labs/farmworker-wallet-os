import type { SdJwtVcRecord } from '../../sd-jwt-vc';
import type { DifPexInputDescriptorToCredentials } from '../models';
import { W3cCredentialRecord, ClaimFormat } from '../../vc';
export interface SdJwtVcPresentationToCreate {
    claimFormat: ClaimFormat.SdJwtVc;
    subjectIds: [];
    verifiableCredentials: [
        {
            credential: SdJwtVcRecord;
            inputDescriptorId: string;
        }
    ];
}
export interface JwtVpPresentationToCreate {
    claimFormat: ClaimFormat.JwtVp;
    subjectIds: [string];
    verifiableCredentials: Array<{
        credential: W3cCredentialRecord;
        inputDescriptorId: string;
    }>;
}
export interface LdpVpPresentationToCreate {
    claimFormat: ClaimFormat.LdpVp;
    subjectIds: undefined | [string];
    verifiableCredentials: Array<{
        credential: W3cCredentialRecord;
        inputDescriptorId: string;
    }>;
}
export type PresentationToCreate = SdJwtVcPresentationToCreate | JwtVpPresentationToCreate | LdpVpPresentationToCreate;
export declare function getPresentationsToCreate(credentialsForInputDescriptor: DifPexInputDescriptorToCredentials): PresentationToCreate[];
