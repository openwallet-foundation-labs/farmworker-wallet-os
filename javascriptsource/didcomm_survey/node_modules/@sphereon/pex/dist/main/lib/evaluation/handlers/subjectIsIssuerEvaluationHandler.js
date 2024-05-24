"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectIsIssuerEvaluationHandler = void 0;
const pex_models_1 = require("@sphereon/pex-models");
const ssi_types_1 = require("@sphereon/ssi-types");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const utils_1 = require("../../utils");
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class SubjectIsIssuerEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'SubjectIsIssuerEvaluation';
    }
    handle(pd, wrappedVcs) {
        // PresentationDefinitionV2 is the common denominator
        pd.input_descriptors.forEach((inputDescriptor, index) => {
            const constraints = inputDescriptor.constraints;
            if ((constraints === null || constraints === void 0 ? void 0 : constraints.subject_is_issuer) === pex_models_1.Optionality.Required) {
                // @todo: Huh, this should also be checked when preferred, but without any errors
                this.checkSubjectIsIssuer(inputDescriptor.id, wrappedVcs, index);
            }
            else {
                // Why is this here?
                this.getResults().push(...wrappedVcs.map((wvc, vcIndex) => this.generateSuccessResult(index, `$[${vcIndex}]`, wvc, 'not applicable')));
            }
        });
        this.updatePresentationSubmission(pd);
    }
    checkSubjectIsIssuer(inputDescriptorId, wrappedVcs, idIdx) {
        this.client.presentationSubmission.descriptor_map.forEach((currentDescriptor) => {
            if (currentDescriptor.id === inputDescriptorId) {
                const mappings = utils_1.JsonPathUtils.extractInputField(wrappedVcs.map((wvc) => wvc.credential), [currentDescriptor.path]);
                for (const mapping of mappings) {
                    const issuer = (0, utils_1.getIssuerString)(mapping.value);
                    if (mapping && mapping.value && (0, utils_1.getSubjectIdsAsString)(mapping.value).every((item) => item === issuer)) {
                        this.getResults().push(this.generateSuccessResult(idIdx, currentDescriptor.path, ssi_types_1.CredentialMapper.toWrappedVerifiableCredential(mapping.value)));
                    }
                    else {
                        this.getResults().push(this.generateErrorResult(idIdx, currentDescriptor.path, ssi_types_1.CredentialMapper.toWrappedVerifiableCredential(mapping.value)));
                    }
                }
            }
        });
    }
    generateErrorResult(idIdx, vcPath, wvc) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.ERROR,
            message: Messages_1.default.SUBJECT_IS_NOT_ISSUER,
            verifiable_credential_path: vcPath,
            payload: {
                format: wvc.format,
            },
        };
    }
    generateSuccessResult(idIdx, vcPath, wvc, message) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.INFO,
            message: message !== null && message !== void 0 ? message : Messages_1.default.SUBJECT_IS_ISSUER,
            verifiable_credential_path: vcPath,
            payload: {
                format: wvc.format,
            },
        };
    }
}
exports.SubjectIsIssuerEvaluationHandler = SubjectIsIssuerEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViamVjdElzSXNzdWVyRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9zdWJqZWN0SXNJc3N1ZXJFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBaUY7QUFDakYsbURBQTJHO0FBRTNHLDJEQUErQztBQUUvQyxvRUFBK0M7QUFDL0MsdUNBQW9GO0FBSXBGLDJFQUF3RTtBQUV4RSxNQUFhLGdDQUFpQyxTQUFRLHFEQUF5QjtJQUM3RSxZQUFZLE1BQXdCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sMkJBQTJCLENBQUM7SUFDckMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFtQyxFQUFFLFVBQXlDO1FBQzFGLHFEQUFxRDtRQUNwRCxFQUF1QyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM1RixNQUFNLFdBQVcsR0FBOEMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUMzRixJQUFJLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLGlCQUFpQixNQUFLLHdCQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVELGlGQUFpRjtnQkFDakYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25FLENBQUM7aUJBQU0sQ0FBQztnQkFDTixvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxL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