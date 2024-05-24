import { Optionality } from '@sphereon/pex-models';
import { CredentialMapper } from '@sphereon/ssi-types';
import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { getIssuerString, getSubjectIdsAsString, JsonPathUtils } from '../../utils';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class SubjectIsIssuerEvaluationHandler extends AbstractEvaluationHandler {
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
            if (constraints?.subject_is_issuer === Optionality.Required) {
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
                const mappings = JsonPathUtils.extractInputField(wrappedVcs.map((wvc) => wvc.credential), [currentDescriptor.path]);
                for (const mapping of mappings) {
                    const issuer = getIssuerString(mapping.value);
                    if (mapping && mapping.value && getSubjectIdsAsString(mapping.value).every((item) => item === issuer)) {
                        this.getResults().push(this.generateSuccessResult(idIdx, currentDescriptor.path, CredentialMapper.toWrappedVerifiableCredential(mapping.value)));
                    }
                    else {
                        this.getResults().push(this.generateErrorResult(idIdx, currentDescriptor.path, CredentialMapper.toWrappedVerifiableCredential(mapping.value)));
                    }
                }
            }
        });
    }
    generateErrorResult(idIdx, vcPath, wvc) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            evaluator: this.getName(),
            status: Status.ERROR,
            message: PexMessages.SUBJECT_IS_NOT_ISSUER,
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
            status: Status.INFO,
            message: message ?? PexMessages.SUBJECT_IS_ISSUER,
            verifiable_credential_path: vcPath,
            payload: {
                format: wvc.format,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViamVjdElzSXNzdWVyRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9zdWJqZWN0SXNJc3N1ZXJFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdDLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBc0QsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJcEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFeEUsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLHlCQUF5QjtJQUM3RSxZQUFZLE1BQXdCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sMkJBQTJCLENBQUM7SUFDckMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFtQyxFQUFFLFVBQXlDO1FBQzFGLHFEQUFxRDtRQUNwRCxFQUF1QyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM1RixNQUFNLFdBQVcsR0FBOEMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUMzRixJQUFJLFdBQVcsRUFBRSxpQkFBaUIsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVELGlGQUFpRjtnQkFDakYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lB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