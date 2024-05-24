import { DocumentFormat, IPresentation, IVerifiableCredential, IVerifiablePresentation, JwtDecodedVerifiableCredential, JwtDecodedVerifiablePresentation, OriginalVerifiableCredential, OriginalVerifiablePresentation, UniformVerifiablePresentation, W3CVerifiableCredential, W3CVerifiablePresentation, WrappedVerifiableCredential, WrappedVerifiablePresentation, SdJwtDecodedVerifiableCredential, SdJwtDecodedVerifiableCredentialPayload, ICredential, isWrappedSdJwtVerifiableCredential, isWrappedSdJwtVerifiablePresentation, isWrappedW3CVerifiableCredential, isWrappedW3CVerifiablePresentation, Hasher, AsyncHasher } from '../types';
export declare class CredentialMapper {
    /**
     * Decodes a compact SD-JWT vc to it's decoded variant. This method can be used when the hasher implementation used is Async, and therefore not suitable for usage
     * with the other decode methods.
     */
    static decodeSdJwtVcAsync(compactSdJwtVc: string, hasher: AsyncHasher): Promise<SdJwtDecodedVerifiableCredential>;
    /**
     * Decodes a Verifiable Presentation to a uniform format.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding.
     */
    static decodeVerifiablePresentation(presentation: OriginalVerifiablePresentation, hasher?: Hasher): JwtDecodedVerifiablePresentation | IVerifiablePresentation | SdJwtDecodedVerifiableCredential;
    /**
     * Decodes a Verifiable Credential to a uniform format.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static decodeVerifiableCredential(credential: OriginalVerifiableCredential, hasher?: Hasher): JwtDecodedVerifiableCredential | IVerifiableCredential | SdJwtDecodedVerifiableCredential;
    /**
     * Converts a presentation to a wrapped presentation.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static toWrappedVerifiablePresentation(originalPresentation: OriginalVerifiablePresentation, opts?: {
        maxTimeSkewInMS?: number;
        hasher?: Hasher;
    }): WrappedVerifiablePresentation;
    /**
     * Converts a list of credentials to a list of wrapped credentials.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static toWrappedVerifiableCredentials(verifiableCredentials: OriginalVerifiableCredential[], opts?: {
        maxTimeSkewInMS?: number;
        hasher?: Hasher;
    }): WrappedVerifiableCredential[];
    /**
     * Converts a credential to a wrapped credential.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static toWrappedVerifiableCredential(verifiableCredential: OriginalVerifiableCredential, opts?: {
        maxTimeSkewInMS?: number;
        hasher?: Hasher;
    }): WrappedVerifiableCredential;
    static isJwtEncoded(original: OriginalVerifiableCredential | OriginalVerifiablePresentation): original is string;
    static isSdJwtEncoded(original: OriginalVerifiableCredential | OriginalVerifiablePresentation): original is string;
    static isW3cCredential(credential: ICredential | SdJwtDecodedVerifiableCredential): credential is ICredential;
    static isCredential(original: OriginalVerifiableCredential | OriginalVerifiablePresentation): original is OriginalVerifiableCredential;
    static isPresentation(original: OriginalVerifiableCredential | OriginalVerifiablePresentation): original is OriginalVerifiablePresentation;
    static hasProof(original: OriginalVerifiableCredential | OriginalVerifiablePresentation | string): boolean;
    static isW3cPresentation(presentation: UniformVerifiablePresentation | IPresentation | SdJwtDecodedVerifiableCredential): presentation is IPresentation;
    static isSdJwtDecodedCredentialPayload(credential: ICredential | SdJwtDecodedVerifiableCredentialPayload): credential is SdJwtDecodedVerifiableCredentialPayload;
    static areOriginalVerifiableCredentialsEqual(firstOriginal: OriginalVerifiableCredential, secondOriginal: OriginalVerifiableCredential): boolean;
    private static isJsonLdAsString;
    static isSdJwtDecodedCredential(original: OriginalVerifiableCredential | OriginalVerifiablePresentation | ICredential | IPresentation): original is SdJwtDecodedVerifiableCredential;
    static isJwtDecodedCredential(original: OriginalVerifiableCredential): original is JwtDecodedVerifiableCredential;
    static isJwtDecodedPresentation(original: OriginalVerifiablePresentation): original is JwtDecodedVerifiablePresentation;
    static isWrappedSdJwtVerifiableCredential: typeof isWrappedSdJwtVerifiableCredential;
    static isWrappedSdJwtVerifiablePresentation: typeof isWrappedSdJwtVerifiablePresentation;
    static isWrappedW3CVerifiableCredential: typeof isWrappedW3CVerifiableCredential;
    static isWrappedW3CVerifiablePresentation: typeof isWrappedW3CVerifiablePresentation;
    static jwtEncodedPresentationToUniformPresentation(jwt: string, makeCredentialsUniform?: boolean, opts?: {
        maxTimeSkewInMS?: number;
    }): IPresentation;
    static jwtDecodedPresentationToUniformPresentation(decoded: JwtDecodedVerifiablePresentation, makeCredentialsUniform?: boolean, opts?: {
        maxTimeSkewInMS?: number;
    }): IVerifiablePresentation;
    static toUniformCredential(verifiableCredential: OriginalVerifiableCredential, opts?: {
        maxTimeSkewInMS?: number;
    }): IVerifiableCredential;
    static toUniformPresentation(presentation: OriginalVerifiablePresentation, opts?: {
        maxTimeSkewInMS?: number;
        addContextIfMissing?: boolean;
    }): IVerifiablePresentation;
    static jwtEncodedCredentialToUniformCredential(jwt: string, opts?: {
        maxTimeSkewInMS?: number;
    }): IVerifiableCredential;
    static jwtDecodedCredentialToUniformCredential(decoded: JwtDecodedVerifiableCredential, opts?: {
        maxTimeSkewInMS?: number;
    }): IVerifiableCredential;
    static toExternalVerifiableCredential(verifiableCredential: any): IVerifiableCredential;
    static storedCredentialToOriginalFormat(credential: OriginalVerifiableCredential): W3CVerifiableCredential;
    static storedPresentationToOriginalFormat(presentation: OriginalVerifiablePresentation): W3CVerifiablePresentation;
    static toCompactJWT(jwtDocument: W3CVerifiableCredential | JwtDecodedVerifiableCredential | W3CVerifiablePresentation | JwtDecodedVerifiablePresentation | string): string;
    static detectDocumentType(document: W3CVerifiableCredential | W3CVerifiablePresentation | JwtDecodedVerifiableCredential | JwtDecodedVerifiablePresentation | SdJwtDecodedVerifiableCredential): DocumentFormat;
    private static hasJWTProofType;
    private static getFirstProof;
}
//# sourceMappingURL=credential-mapper.d.ts.map