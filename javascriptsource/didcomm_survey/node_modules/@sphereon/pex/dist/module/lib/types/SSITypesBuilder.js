import { CredentialMapper, } from '@sphereon/ssi-types';
import { definitionVersionDiscovery, JsonPathUtils } from '../utils';
import { InternalPresentationDefinitionV1, InternalPresentationDefinitionV2, PEVersion, } from './Internal.types';
export class SSITypesBuilder {
    static modelEntityToInternalPresentationDefinitionV1(p) {
        const pd = SSITypesBuilder.createCopyAndModifyPresentationDefinition(p);
        return new InternalPresentationDefinitionV1(pd.id, pd.input_descriptors, pd.format, pd.name, pd.purpose, pd.submission_requirements);
    }
    static modelEntityInternalPresentationDefinitionV2(p) {
        const pd = SSITypesBuilder.createCopyAndModifyPresentationDefinition(p);
        return new InternalPresentationDefinitionV2(pd.id, pd.input_descriptors, pd.format, pd.frame, pd.name, pd.purpose, pd.submission_requirements);
    }
    static createCopyAndModifyPresentationDefinition(p) {
        const pd = JSON.parse(JSON.stringify(p));
        JsonPathUtils.changePropertyNameRecursively(pd, '_const', 'const');
        JsonPathUtils.changePropertyNameRecursively(pd, '_enum', 'enum');
        JsonPathUtils.changeSpecialPathsRecursively(pd);
        return pd;
    }
    static mapExternalVerifiablePresentationToWrappedVP(presentation, hasher) {
        return CredentialMapper.toWrappedVerifiablePresentation(presentation, { hasher });
    }
    static mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials, hasher) {
        return CredentialMapper.toWrappedVerifiableCredentials(Array.isArray(verifiableCredentials) ? verifiableCredentials : [verifiableCredentials], {
            hasher,
        });
    }
    static toInternalPresentationDefinition(presentationDefinition) {
        const presentationDefinitionCopy = JSON.parse(JSON.stringify(presentationDefinition));
        const versionResult = definitionVersionDiscovery(presentationDefinitionCopy);
        if (versionResult.error)
            throw versionResult.error;
        if (versionResult.version == PEVersion.v1) {
            return SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinitionCopy);
        }
        return SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinitionCopy);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NJVHlwZXNCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3R5cGVzL1NTSVR5cGVzQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQ0wsZ0JBQWdCLEdBT2pCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVyRSxPQUFPLEVBR0wsZ0NBQWdDLEVBQ2hDLGdDQUFnQyxFQUVoQyxTQUFTLEdBQ1YsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQixNQUFNLE9BQU8sZUFBZTtJQUNuQixNQUFNLENBQUMsNkNBQTZDLENBQUMsQ0FBTztRQUNqRSxNQUFNLEVBQUUsR0FBUyxlQUFlLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFTLENBQUM7UUFDdEYsT0FBTyxJQUFJLGdDQUFnQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7SUFFTSxNQUFNLENBQUMsMkNBQTJDLENBQUMsQ0FBTztRQUMvRCxNQUFNLEVBQUUsR0FBUyxlQUFlLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUE2QixDQUFDO1FBQzFHLE9BQU8sSUFBSSxnQ0FBZ0MsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ2pKLENBQUM7SUFFRCxNQUFNLENBQUMseUNBQXlDLENBQUMsQ0FBMEI7UUFDekUsTUFBTSxFQUFFLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxNQUFNLENBQUMsNENBQTRDLENBQ2pELFlBQStFLEVBQy9FLE1BQWU7UUFFZixPQUFPLGdCQUFnQixDQUFDLCtCQUErQixDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELE1BQU0sQ0FBQyw0Q0FBNEMsQ0FDakQscUJBQW9GLEVBQ3BGLE1BQWU7UUFFZixPQUFPLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUM3SSxNQUFNO1NBQ1AsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxzQkFBK0M7UUFDckYsTUFBTSwwQkFBMEIsR0FBNEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUMvRyxNQUFNLGFBQWEsR0FBc0IsMEJBQTBCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRyxJQUFJLGFBQWEsQ0FBQyxLQUFLO1lBQUUsTUFBTSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsT0FBTyxlQUFlLENBQUMsNkNBQTZDLENBQUMsMEJBQXNELENBQUMsQ0FBQztRQUMvSCxDQUFDO1FBQ0QsT0FBTyxlQUFlLENBQUMsMkNBQTJDLENBQUMsMEJBQXNELENBQUMsQ0FBQztJQUM3SCxDQUFDO0NBQ0YifQ==