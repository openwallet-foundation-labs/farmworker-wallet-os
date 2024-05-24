import type { ClaimFormat } from '../ClaimFormat';
import { W3cJsonLdVerifiableCredential } from '../../data-integrity/models/W3cJsonLdVerifiableCredential';
import { W3cJwtVerifiableCredential } from '../../jwt-vc/W3cJwtVerifiableCredential';
export declare function W3cVerifiableCredentialTransformer(): PropertyDecorator;
export type W3cVerifiableCredential<Format extends ClaimFormat.JwtVc | ClaimFormat.LdpVc | unknown = unknown> = Format extends ClaimFormat.JwtVc ? W3cJwtVerifiableCredential : Format extends ClaimFormat.LdpVc ? W3cJsonLdVerifiableCredential : W3cJsonLdVerifiableCredential | W3cJwtVerifiableCredential;
