import type { AgentContext } from '../../../agent';
import type { SdJwtVcRecord } from '../../sd-jwt-vc';
import type { W3cJsonPresentation } from '../../vc/models/presentation/W3cJsonPresentation';
import type { VerifiablePresentation } from '../models';
import type { OriginalVerifiableCredential as SphereonOriginalVerifiableCredential, OriginalVerifiablePresentation as SphereonOriginalVerifiablePresentation, W3CVerifiablePresentation as SphereonW3CVerifiablePresentation } from '@sphereon/ssi-types';
import { W3cCredentialRecord, W3cJsonLdVerifiablePresentation, W3cJwtVerifiablePresentation } from '../../vc';
export declare function getSphereonOriginalVerifiableCredential(credentialRecord: W3cCredentialRecord | SdJwtVcRecord): SphereonOriginalVerifiableCredential;
export declare function getSphereonOriginalVerifiablePresentation(verifiablePresentation: VerifiablePresentation): SphereonOriginalVerifiablePresentation;
export declare function getVerifiablePresentationFromEncoded(agentContext: AgentContext, encodedVerifiablePresentation: string | W3cJsonPresentation | SphereonW3CVerifiablePresentation): W3cJsonLdVerifiablePresentation | W3cJwtVerifiablePresentation | import("../../sd-jwt-vc").SdJwtVc<import("../../sd-jwt-vc").SdJwtVcHeader, import("../../sd-jwt-vc").SdJwtVcPayload>;
