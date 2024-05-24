import { PresentationDefinitionV1 as PdV1, PresentationDefinitionV2 as PdV2 } from '@sphereon/pex-models';
import { Hasher, JwtDecodedVerifiablePresentation, OriginalVerifiableCredential, OriginalVerifiablePresentation, WrappedVerifiableCredential, WrappedVerifiablePresentation } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition, InternalPresentationDefinitionV1, InternalPresentationDefinitionV2, IPresentationDefinition } from './Internal.types';
export declare class SSITypesBuilder {
    static modelEntityToInternalPresentationDefinitionV1(p: PdV1): InternalPresentationDefinitionV1;
    static modelEntityInternalPresentationDefinitionV2(p: PdV2): InternalPresentationDefinitionV2;
    static createCopyAndModifyPresentationDefinition(p: IPresentationDefinition): IPresentationDefinition;
    static mapExternalVerifiablePresentationToWrappedVP(presentation: OriginalVerifiablePresentation | JwtDecodedVerifiablePresentation, hasher?: Hasher): WrappedVerifiablePresentation;
    static mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials: OriginalVerifiableCredential | OriginalVerifiableCredential[], hasher?: Hasher): WrappedVerifiableCredential[];
    static toInternalPresentationDefinition(presentationDefinition: IPresentationDefinition): IInternalPresentationDefinition;
}
