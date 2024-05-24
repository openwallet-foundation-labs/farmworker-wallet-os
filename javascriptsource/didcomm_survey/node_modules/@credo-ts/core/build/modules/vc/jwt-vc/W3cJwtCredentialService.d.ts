import type { AgentContext } from '../../../agent/context';
import type { W3cJwtSignCredentialOptions, W3cJwtSignPresentationOptions, W3cJwtVerifyCredentialOptions, W3cJwtVerifyPresentationOptions } from '../W3cCredentialServiceOptions';
import type { W3cVerifyCredentialResult, W3cVerifyPresentationResult } from '../models';
import { JwsService } from '../../../crypto';
import { W3cJwtVerifiableCredential } from './W3cJwtVerifiableCredential';
import { W3cJwtVerifiablePresentation } from './W3cJwtVerifiablePresentation';
/**
 * Supports signing and verification of credentials according to the [Verifiable Credential Data Model](https://www.w3.org/TR/vc-data-model)
 * using [Json Web Tokens](https://www.w3.org/TR/vc-data-model/#json-web-token).
 */
export declare class W3cJwtCredentialService {
    private jwsService;
    constructor(jwsService: JwsService);
    /**
     * Signs a credential
     */
    signCredential(agentContext: AgentContext, options: W3cJwtSignCredentialOptions): Promise<W3cJwtVerifiableCredential>;
    /**
     * Verifies the signature(s) of a credential
     *
     * @param credential the credential to be verified
     * @returns the verification result
     */
    verifyCredential(agentContext: AgentContext, options: W3cJwtVerifyCredentialOptions): Promise<W3cVerifyCredentialResult>;
    /**
     * Signs a presentation including the credentials it includes
     *
     * @param presentation the presentation to be signed
     * @returns the signed presentation
     */
    signPresentation(agentContext: AgentContext, options: W3cJwtSignPresentationOptions): Promise<W3cJwtVerifiablePresentation>;
    /**
     * Verifies a presentation including the credentials it includes
     *
     * @param presentation the presentation to be verified
     * @returns the verification result
     */
    verifyPresentation(agentContext: AgentContext, options: W3cJwtVerifyPresentationOptions): Promise<W3cVerifyPresentationResult>;
    private resolveVerificationMethod;
    /**
     * This method tries to find the verification method associated with the JWT credential or presentation.
     * This verification method can then be used to verify the credential or presentation signature.
     *
     * The following methods are used to extract the verification method:
     *  - verification method is resolved based on the `kid` in the protected header
     *    - either as absolute reference (e.g. `did:example:123#key-1`)
     *    - or as relative reference to the `iss` of the JWT (e.g. `iss` is `did:example:123` and `kid` is `#key-1`)
     *  - the did document is resolved based on the `iss` field, after which the verification method is extracted based on the `alg`
     *    used to sign the JWT and the specified `purpose`. Only a single verification method may be present, and in all other cases,
     *    an error is thrown.
     *
     * The signer (`iss`) of the JWT is verified against the `controller` of the verificationMethod resolved in the did
     * document. This means if the `iss` of a credential is `did:example:123` and the controller of the verificationMethod
     * is `did:example:456`, an error is thrown to prevent the JWT from successfully being verified.
     *
     * In addition the JWT must conform to one of the following rules:
     *   - MUST be a credential and have an `iss` field and MAY have an absolute or relative `kid`
     *   - MUST not be a credential AND ONE of the following:
     *      - have an `iss` field and MAY have an absolute or relative `kid`
     *      - does not have an `iss` field and MUST have an absolute `kid`
     */
    private getVerificationMethodForJwtCredential;
}
