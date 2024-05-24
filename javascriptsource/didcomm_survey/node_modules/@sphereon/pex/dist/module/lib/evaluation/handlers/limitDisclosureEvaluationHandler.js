import { Optionality } from '@sphereon/pex-models';
import { CredentialMapper, } from '@sphereon/ssi-types';
import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { applySdJwtLimitDisclosure, JsonPathUtils } from '../../utils';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class LimitDisclosureEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'LimitDisclosureEvaluation';
    }
    handle(pd, wrappedVcs) {
        // PresentationDefinitionV2 is the common denominator
        pd.input_descriptors.forEach((inDesc, index) => {
            if (inDesc.constraints?.fields &&
                (inDesc.constraints?.limit_disclosure === Optionality.Required || inDesc.constraints?.limit_disclosure === Optionality.Preferred)) {
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
        if (!limitDisclosureSignatures?.includes(signatureSuite)) {
            if (optionality == Optionality.Required) {
                this.createLimitDisclosureNotSupportedResult(idIdx, vcIdx);
            }
            return false;
        }
        return true;
    }
    evaluateLimitDisclosure(wrappedVcs, constraints, idIdx) {
        const fields = constraints?.fields;
        const optionality = constraints.limit_disclosure;
        wrappedVcs.forEach((wvc, index) => {
            if (optionality && this.isLimitDisclosureSupported(wvc, index, idIdx, optionality)) {
                this.enforceLimitDisclosure(wvc, fields, idIdx, index, wrappedVcs, optionality);
            }
        });
    }
    enforceLimitDisclosure(wvc, fields, idIdx, index, wrappedVcs, limitDisclosure) {
        if (CredentialMapper.isWrappedSdJwtVerifiableCredential(wvc)) {
            const presentationFrame = this.createSdJwtPresentationFrame(wvc.credential, fields, idIdx, index);
            // We update the SD-JWT to it's presentation format (remove disclosures, update pretty payload, etc..), except
            // we don't create or include the (optional) KB-JWT yet, this is done when we create the presentation
            if (presentationFrame) {
                applySdJwtLimitDisclosure(wvc.credential, presentationFrame);
                wvc.decoded = wvc.credential.decodedPayload;
                // We need to overwrite the original, as that is returned in the selectFrom method
                // But we also want to keep the format of the original credential.
                wvc.original = CredentialMapper.isSdJwtDecodedCredential(wvc.original) ? wvc.credential : wvc.credential.compactSdJwtVc;
                this.createSuccessResult(idIdx, `$[${index}]`, limitDisclosure);
            }
        }
        else if (CredentialMapper.isW3cCredential(wvc.credential)) {
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
                const inputField = JsonPathUtils.extractInputField(vc.decodedPayload, field.path);
                // We set the value to true at the path in the presentation frame,
                if (inputField.length > 0) {
                    const selectedField = inputField[0];
                    JsonPathUtils.setValue(presentationFrame, selectedField.path, true);
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
                const inputField = JsonPathUtils.extractInputField(vc, field.path);
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
        let credentialSubject = { ...internalCredential.credentialSubject };
        requiredField.path.forEach((e) => {
            if (credentialSubject[e]) {
                credentialSubject = { [e]: credentialSubject[e] };
            }
        });
        internalCredentialToSend.credentialSubject = {
            ...internalCredentialToSend.credentialSubject,
            ...credentialSubject,
        };
        return internalCredentialToSend;
    }
    createSuccessResult(idIdx, path, limitDisclosure) {
        return this.getResults().push({
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `${path}`,
            evaluator: this.getName(),
            status: limitDisclosure === Optionality.Required ? Status.INFO : Status.WARN,
            message: PexMessages.LIMIT_DISCLOSURE_APPLIED,
            payload: undefined,
        });
    }
    createMandatoryFieldNotFoundResult(idIdx, vcIdx, path) {
        return this.getResults().push({
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `$[${vcIdx}]`,
            evaluator: this.getName(),
            status: Status.ERROR,
            message: PexMessages.VERIFIABLE_CREDENTIAL_MANDATORY_FIELD_NOT_PRESENT,
            payload: path,
        });
    }
    createLimitDisclosureNotSupportedResult(idIdx, vcIdx) {
        return this.getResults().push({
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `$[${vcIdx}]`,
            evaluator: this.getName(),
            status: Status.ERROR,
            message: PexMessages.LIMIT_DISCLOSURE_NOT_SUPPORTED,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXREaXNjbG9zdXJlRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9saW1pdERpc2Nsb3N1cmVFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQTRELFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdHLE9BQU8sRUFFTCxnQkFBZ0IsR0FPakIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV4RSxNQUFNLE9BQU8sZ0NBQWlDLFNBQVEseUJBQXlCO0lBQzdFLFlBQVksTUFBd0I7UUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTywyQkFBMkIsQ0FBQztJQUNyQyxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQW1DLEVBQUUsVUFBeUM7UUFDMUYscURBQXFEO1FBQ3BELEVBQXVDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUM5RyxJQUNFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTTtnQkFDMUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsS0FBSyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQ2pJLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFB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