"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSITypesBuilder = void 0;
const ssi_types_1 = require("@sphereon/ssi-types");
const utils_1 = require("../utils");
const Internal_types_1 = require("./Internal.types");
class SSITypesBuilder {
    static modelEntityToInternalPresentationDefinitionV1(p) {
        const pd = SSITypesBuilder.createCopyAndModifyPresentationDefinition(p);
        return new Internal_types_1.InternalPresentationDefinitionV1(pd.id, pd.input_descriptors, pd.format, pd.name, pd.purpose, pd.submission_requirements);
    }
    static modelEntityInternalPresentationDefinitionV2(p) {
        const pd = SSITypesBuilder.createCopyAndModifyPresentationDefinition(p);
        return new Internal_types_1.InternalPresentationDefinitionV2(pd.id, pd.input_descriptors, pd.format, pd.frame, pd.name, pd.purpose, pd.submission_requirements);
    }
    static createCopyAndModifyPresentationDefinition(p) {
        const pd = JSON.parse(JSON.stringify(p));
        utils_1.JsonPathUtils.changePropertyNameRecursively(pd, '_const', 'const');
        utils_1.JsonPathUtils.changePropertyNameRecursively(pd, '_enum', 'enum');
        utils_1.JsonPathUtils.changeSpecialPathsRecursively(pd);
        return pd;
    }
    static mapExternalVerifiablePresentationToWrappedVP(presentation, hasher) {
        return ssi_types_1.CredentialMapper.toWrappedVerifiablePresentation(presentation, { hasher });
    }
    static mapExternalVerifiableCredentialsToWrappedVcs(verifiableCredentials, hasher) {
        return ssi_types_1.CredentialMapper.toWrappedVerifiableCredentials(Array.isArray(verifiableCredentials) ? verifiableCredentials : [verifiableCredentials], {
            hasher,
        });
    }
    static toInternalPresentationDefinition(presentationDefinition) {
        const presentationDefinitionCopy = JSON.parse(JSON.stringify(presentationDefinition));
        const versionResult = (0, utils_1.definitionVersionDiscovery)(presentationDefinitionCopy);
        if (versionResult.error)
            throw versionResult.error;
        if (versionResult.version == Internal_types_1.PEVersion.v1) {
            return SSITypesBuilder.modelEntityToInternalPresentationDefinitionV1(presentationDefinitionCopy);
        }
        return SSITypesBuilder.modelEntityInternalPresentationDefinitionV2(presentationDefinitionCopy);
    }
}
exports.SSITypesBuilder = SSITypesBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NJVHlwZXNCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3R5cGVzL1NTSVR5cGVzQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxtREFRNkI7QUFFN0Isb0NBQXFFO0FBRXJFLHFEQU8wQjtBQUUxQixNQUFhLGVBQWU7SUFDbkIsTUFBTSxDQUFDLDZDQUE2QyxDQUFDLENBQU87UUFDakUsTUFBTSxFQUFFLEdBQVMsZUFBZSxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBUyxDQUFDO1FBQ3RGLE9BQU8sSUFBSSxpREFBZ0MsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN2SSxDQUFDO0lBRU0sTUFBTSxDQUFDLDJDQUEyQyxDQUFDLENBQU87UUFDL0QsTUFBTSxFQUFFLEdBQVMsZUFBZSxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBNkIsQ0FBQztRQUMxRyxPQUFPLElBQUksaURBQWdDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNqSixDQUFDO0lBRUQsTUFBTSxDQUFDLHlDQUF5QyxDQUFDLENBQTBCO1FBQ3pFLE1BQU0sRUFBRSxHQUE0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxxQkFBYSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUscUJBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLHFCQUFhLENBQUMsNkJBQTZCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsTUFBTSxDQUFDLDRDQUE0QyxDQUNqRCxZQUErRSxFQUMvRSxNQUFlO1FBRWYsT0FBTyw0QkFBZ0IsQ0FBQywrQkFBK0IsQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxNQUFNLENBQUMsNENBQTRDLENBQ2pELHFCQUFvRixFQUNwRixNQUFlO1FBRWYsT0FBTyw0QkFBZ0IsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7WUFDN0ksTUFBTTtTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsZ0NBQWdDLENBQUMsc0JBQStDO1FBQ3JGLE1BQU0sMEJBQTBCLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDL0csTUFBTSxhQUFhLEdBQXNCLElBQUEsa0NBQTBCLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRyxJQUFJLGFBQWEsQ0FBQyxLQUFLO1lBQUUsTUFBTSxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSwwQkFBUyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLE9BQU8sZUFBZSxDQUFDLDZDQUE2QyxDQUFDLDBCQUFzRCxDQUFDLENBQUM7UUFDL0gsQ0FBQztRQUNELE9BQU8sZUFBZSxDQUFDLDJDQUEyQyxDQUFDLDBCQUFzRCxDQUFDLENBQUM7SUFDN0gsQ0FBQztDQUNGO0FBNUNELDBDQTRDQyJ9