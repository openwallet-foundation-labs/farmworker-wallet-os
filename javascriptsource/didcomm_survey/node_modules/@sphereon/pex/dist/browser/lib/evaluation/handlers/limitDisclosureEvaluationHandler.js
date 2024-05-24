"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitDisclosureEvaluationHandler = void 0;
const pex_models_1 = require("@sphereon/pex-models");
const ssi_types_1 = require("@sphereon/ssi-types");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const utils_1 = require("../../utils");
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class LimitDisclosureEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'LimitDisclosureEvaluation';
    }
    handle(pd, wrappedVcs) {
        // PresentationDefinitionV2 is the common denominator
        pd.input_descriptors.forEach((inDesc, index) => {
            var _a, _b, _c;
            if (((_a = inDesc.constraints) === null || _a === void 0 ? void 0 : _a.fields) &&
                (((_b = inDesc.constraints) === null || _b === void 0 ? void 0 : _b.limit_disclosure) === pex_models_1.Optionality.Required || ((_c = inDesc.constraints) === null || _c === void 0 ? void 0 : _c.limit_disclosure) === pex_models_1.Optionality.Preferred)) {
                this.evaluateLimitDisclosure(wrappedVcs, inDesc.constraints, index);
            }
        });
    }
    isLimitDisclosureSupported(wvc, vcIdx, idIdx, optionality) {
        if (wvc.format === 'vc+sd-jwt')
            return true;
        const limitDisclosureSignatures = this.client.limitDisclosureSignatureSuites;
        const proof = wvc.decoded.proof;
        if (!proof || Array.isArray(proof) || !proof.type) {
            // todo: Support/inspect array based proofs
            return false;
        }
        const signatureSuite = proof.cryptosuite ? `${proof.type}.${proof.cryptosuite}` : proof.type;
        if (!(limitDisclosureSignatures === null || limitDisclosureSignatures === void 0 ? void 0 : limitDisclosureSignatures.includes(signatureSuite))) {
            if (optionality == pex_models_1.Optionality.Required) {
                this.createLimitDisclosureNotSupportedResult(idIdx, vcIdx);
            }
            return false;
        }
        return true;
    }
    evaluateLimitDisclosure(wrappedVcs, constraints, idIdx) {
        const fields = constraints === null || constraints === void 0 ? void 0 : constraints.fields;
        const optionality = constraints.limit_disclosure;
        wrappedVcs.forEach((wvc, index) => {
            if (optionality && this.isLimitDisclosureSupported(wvc, index, idIdx, optionality)) {
                this.enforceLimitDisclosure(wvc, fields, idIdx, index, wrappedVcs, optionality);
            }
        });
    }
    enforceLimitDisclosure(wvc, fields, idIdx, index, wrappedVcs, limitDisclosure) {
        if (ssi_types_1.CredentialMapper.isWrappedSdJwtVerifiableCredential(wvc)) {
            const presentationFrame = this.createSdJwtPresentationFrame(wvc.credential, fields, idIdx, index);
            // We update the SD-JWT to it's presentation format (remove disclosures, update pretty payload, etc..), except
            // we don't create or include the (optional) KB-JWT yet, this is done when we create the presentation
            if (presentationFrame) {
                (0, utils_1.applySdJwtLimitDisclosure)(wvc.credential, presentationFrame);
                wvc.decoded = wvc.credential.decodedPayload;
                // We need to overwrite the original, as that is returned in the selectFrom method
                // But we also want to keep the format of the original credential.
                wvc.original = ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(wvc.original) ? wvc.credential : wvc.credential.compactSdJwtVc;
                this.createSuccessResult(idIdx, `$[${index}]`, limitDisclosure);
            }
        }
        else if (ssi_types_1.CredentialMapper.isW3cCredential(wvc.credential)) {
            const internalCredentialToSend = this.createVcWithRequiredFields(wvc.credential, fields, idIdx, index);
            /* When verifiableCredentialToSend is null/undefined an error is raised, the credential will
             * remain untouched and the verifiable credential won't be submitted.
             */
            if (internalCredentialToSend) {
                wrappedVcs[index].credential = internalCredentialToSend;
                this.createSuccessResult(idIdx, `$[${index}]`, limitDisclosure);
            }
        }
        else {
            throw new Error(`Unsupported format for selective disclosure ${wvc.format}`);
        }
    }
    createSdJwtPresentationFrame(vc, fields, idIdx, vcIdx) {
        // Mapping of key -> true to indicate which values should be disclosed in an SD-JWT
        // Can be nested array / object
        const presentationFrame = {};
        for (const field of fields) {
            if (field.path) {
                const inputField = utils_1.JsonPathUtils.extractInputField(vc.decodedPayload, field.path);
                // We set the value to true at the path in the presentation frame,
                if (inputField.length > 0) {
                    const selectedField = inputField[0];
                    utils_1.JsonPathUtils.setValue(presentationFrame, selectedField.path, true);
                }
                else {
                    this.createMandatoryFieldNotFoundResult(idIdx, vcIdx, field.path);
                    return undefined;
                }
            }
        }
        return presentationFrame;
    }
    createVcWithRequiredFields(vc, fields, idIdx, vcIdx) {
        let credentialToSend = {};
        credentialToSend = Object.assign(credentialToSend, vc);
        credentialToSend.credentialSubject = {};
        for (const field of fields) {
            if (field.path) {
                const inputField = utils_1.JsonPathUtils.extractInputField(vc, field.path);
                if (inputField.length > 0) {
                    credentialToSend = this.copyResultPathToDestinationCredential(inputField[0], vc, credentialToSend);
                }
                else {
                    this.createMandatoryFieldNotFoundResult(idIdx, vcIdx, field.path);
                    return undefined;
                }
            }
        }
        return credentialToSend;
    }
    copyResultPathToDestinationCredential(requiredField, internalCredential, internalCredentialToSend) {
        //TODO: ESSIFI-186
        let credentialSubject = Object.assign({}, internalCredential.credentialSubject);
        requiredField.path.forEach((e) => {
            if (credentialSubject[e]) {
                credentialSubject = { [e]: credentialSubject[e] };
            }
        });
        internalCredentialToSend.credentialSubject = Object.assign(Object.assign({}, internalCredentialToSend.credentialSubject), credentialSubject);
        return internalCredentialToSend;
    }
    createSuccessResult(idIdx, path, limitDisclosure) {
        return this.getResults().push({
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `${path}`,
            evaluator: this.getName(),
            status: limitDisclosure === pex_models_1.Optionality.Required ? ConstraintUtils_1.Status.INFO : ConstraintUtils_1.Status.WARN,
            message: Messages_1.default.LIMIT_DISCLOSURE_APPLIED,
            payload: undefined,
        });
    }
    createMandatoryFieldNotFoundResult(idIdx, vcIdx, path) {
        return this.getResults().push({
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `$[${vcIdx}]`,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.ERROR,
            message: Messages_1.default.VERIFIABLE_CREDENTIAL_MANDATORY_FIELD_NOT_PRESENT,
            payload: path,
        });
    }
    createLimitDisclosureNotSupportedResult(idIdx, vcIdx) {
        return this.getResults().push({
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `$[${vcIdx}]`,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.ERROR,
            message: Messages_1.default.LIMIT_DISCLOSURE_NOT_SUPPORTED,
        });
    }
}
exports.LimitDisclosureEvaluationHandler = LimitDisclosureEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXREaXNjbG9zdXJlRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9saW1pdERpc2Nsb3N1cmVFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBNkc7QUFDN0csbURBUzZCO0FBRTdCLDJEQUErQztBQUUvQyxvRUFBK0M7QUFDL0MsdUNBQXVFO0FBR3ZFLDJFQUF3RTtBQUV4RSxNQUFhLGdDQUFpQyxTQUFRLHFEQUF5QjtJQUM3RSxZQUFZLE1BQXdCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sMkJBQTJCLENBQUM7SUFDckMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFtQyxFQUFFLFVBQXlDO1FBQzFGLHFEQUFxRDtRQUNwRCxFQUF1QyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQXlCLEVBQUUsS0FBYSxFQUFFLEVBQUU7O1lBQzlHLElBQ0UsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxXQUFXLDBDQUFFLE1BQU07Z0JBQzFCLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxXQUFXLDBDQUFFLGdCQUFnQixNQUFLLHdCQUFXLENBQUMsUUFBUSxJQUFJLENBQUEsTUFBQSxNQUFNLENBQUMsV0FBVywwQ0FBRSxnQkFBZ0IsTUFBSyx3QkFBVyxDQUFDLFNBQVMsQ0FBQyxFQUNqSSxDQUFDO2dCQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RSxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sMEJBQTBCLENBQUMsR0FBZ0MsRUFBRSxLQUFhLEVBQUUsS0FBYSxFQUFFLFdBQXdCO1FBQ3pILElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxXQUFXO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFNUMsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDO1FBQzdFLE1BQU0sS0FBSyxHQUFJLEdBQUcsQ0FBQyxPQUFpQyxDQUFDLEtBQUssQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsMkNBQTJDO1lBQzNDLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDN0YsSUFBSSxDQUFDLENBQUEseUJBQXlCLGFBQXpCLHlCQUF5Qix1QkFBekIseUJBQXlCLENBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFBLEVBQUUsQ0FBQztZQUN6RCxJQUFJLFdBQVcsSUFBSSx3QkFBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsdUNBQXVDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxVQUF5QyxFQUFFLFdBQTBDLEVBQUUsS0FBYTtRQUNsSSxNQUFNLE1BQU0sR0FBRyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsTUFBbUIsQ0FBQztRQUNoRCxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNoQyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDbkYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbEYsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHNCQUFzQixDQUM1QixHQUFnQyxFQUNoQyxNQUFpQixFQUNqQixLQUFhLEVBQ2IsS0FBYSxFQUNiLFVBQXlDLEVBQ3pDLGVBQTRCO1FBRTVCLElBQUksNEJBQWdCLENBQUMsa0NBQWtDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3RCxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFbEcsOEdBQThHO1lBQzlHLHFHQUFxRztZQUNyRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3RCLElBQUEsaUNBQXlCLEVBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM3RCxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO2dCQUM1QyxrRkFBa0Y7Z0JBQ2xGLGtFQUFrRTtnQkFDbEUsR0FBRyxDQUFDLFFBQVEsR0FBRyw0QkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO2dCQUV4SCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUssS0FBSyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDbEUsQ0FBQztRQUNILENBQUM7YUFBTSxJQUFJLDRCQUFnQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUM1RCxNQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkc7O2VBRUc7WUFDSCxJQUFJLHdCQUF3QixFQUFFLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEdBQUcsd0JBQXdCLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxLQUFLLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNsRSxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDO0lBQ0gsQ0FBQztJQUVPLDRCQUE0QixDQUNsQyxFQUFvQyxFQUNwQyxNQUFpQixFQUNqQixLQUFhLEVBQ2IsS0FBYTtRQUViLG1GQUFtRjtRQUNuRiwrQkFBK0I7UUFDL0IsTUFBTSxpQkFBaUIsR0FBMkIsRUFBRSxDQUFDO1FBRXJELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7WUFDM0IsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxVQUFVLEdBQUcscUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbEYsa0VBQWtFO2dCQUNsRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzFCLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMscUJBQWEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEUsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEUsT0FBTyxTQUFTLENBQUM7Z0JBQ25CLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEVBQXlCLEVBQUUsTUFBaUIsRUFBRSxLQUFhLEVBQUUsS0FBYTtRQUMzRyxJQUFJLGdCQUFnQixHQUEwQixFQUEyQixDQUFDO1FBQzFFLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsZ0JBQWdCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBRXhDLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7WUFDM0IsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxVQUFVLEdBQUcscUJBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzFCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3JHLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLENBQUMsa0NBQWtDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xFLE9BQU8sU0FBUyxDQUFDO2dCQUNuQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFTyxxQ0FBcUMsQ0FDM0MsYUFBd0QsRUFDeEQsa0JBQStCLEVBQy9CLHdCQUErQztRQUUvQyxrQkFBa0I7UUFDbEIsSUFBSSxpQkFBaUIscUJBQStDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFFLENBQUM7UUFDM0csYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMvQixJQUFJLGlCQUFpQixDQUFDLENBQTZCLENBQUMsRUFBRSxDQUFDO2dCQUNyRCxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBNkIsQ0FBQyxFQUE4QixDQUFDO1lBQzVHLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILHdCQUF3QixDQUFDLGlCQUFpQixtQ0FDckMsd0JBQXdCLENBQUMsaUJBQWlCLEdBQzFDLGlCQUFpQixDQUNyQixDQUFDO1FBQ0YsT0FBTyx3QkFBd0IsQ0FBQztJQUNsQyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsS0FBYSxFQUFFLElBQVksRUFBRSxlQUE0QjtRQUNuRixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDNUIscUJBQXFCLEVBQUUsdUJBQXVCLEtBQUssR0FBRztZQUN0RCwwQkFBMEIsRUFBRSxHQUFHLElBQUksRUFBRTtZQUNyQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN6QixNQUFNLEVBQUUsZUFBZSxLQUFLLHdCQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQU0sQ0FBQyxJQUFJO1lBQzVFLE9BQU8sRUFBRSxrQkFBVyxDQUFDLHdCQUF3QjtZQUM3QyxPQUFPLEVBQUUsU0FBUztTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0NBQWtDLENBQUMsS0FBYSxFQUFFLEtBQWEsRUFBRSxJQUFjO1FBQ3JGLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztZQUM1QixxQkFBcUIsRUFBRSx1QkFBdUIsS0FBSyxHQUFHO1lBQ3RELDBCQUEwQixFQUFFLEtBQUssS0FBSyxHQUFHO1lBQ3pDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSx3QkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLGtCQUFXLENBQUMsaURBQWlEO1lBQ3RFLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVDQUF1QyxDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQzFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQztZQUM1QixxQkFBcUIsRUFBRSx1QkFBdUIsS0FBSyxHQUFHO1lBQ3RELDBCQUEwQixFQUFFLEtBQUssS0FBSyxHQUFHO1lBQ3pDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSx3QkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLGtCQUFXLENBQUMsOEJBQThCO1NBQ3BELENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXpMRCw0RUF5TEMifQ==