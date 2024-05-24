import { JSONPath as jp } from '@astronautlabs/jsonpath';
import { CredentialMapper, OriginalType, } from '@sphereon/ssi-types';
import { nanoid } from 'nanoid';
import { Status } from '../../ConstraintUtils';
import { PEVersion } from '../../types';
import PexMessages from '../../types/Messages';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class UriEvaluationHandler extends AbstractEvaluationHandler {
    static matchAll = require('string.prototype.matchall');
    constructor(client) {
        super(client);
    }
    getName() {
        return 'UriEvaluation';
    }
    static HASHLINK_URL_ENCODED_REGEX = /hl:[a-zA-Z0-9]+:[a-zA-Z0-9]+/g;
    static HASHLINK_QUERY_URL_REGEX = /https*?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(hl=[a-zA-Z0-9]+)/g;
    handle(definition, wrappedVcs) {
        // This filter is removed in V2
        definition.input_descriptors.forEach((inDesc, descriptorIdx) => {
            const uris = definition.getVersion() !== PEVersion.v2 ? inDesc.schema.map((so) => so.uri) : [];
            wrappedVcs.forEach((wvc, wrappedVCIdx) => {
                const vcUris = UriEvaluationHandler.buildVcContextAndSchemaUris(wvc.credential, definition.getVersion());
                this.evaluateUris(wvc, vcUris, uris, descriptorIdx, wrappedVCIdx, definition.getVersion());
            });
        });
        const definitionAllowsDataIntegrity = definition.format?.di || definition.format?.di_vc || definition.format?.di_vp;
        const descriptorMap = this.getResults()
            .filter((result) => result.status === Status.INFO)
            .map((result) => {
            let format = result.payload?.format;
            // This checks if the new data integrity format should be used.
            // That may be the case if the input descriptor points to credentials that are in ldp_vc or ldp format,
            // and the presentation definition allows data integrity.
            if (definitionAllowsDataIntegrity && (format === 'ldp_vc' || format === 'ldp')) {
                const wvcs = jp.nodes(wrappedVcs, result.verifiable_credential_path).map((node) => node.value);
                // check if all vc's have a data integrity proof
                const vcDataIntegrityProofs = wvcs.map((vc) => {
                    if (vc.type !== OriginalType.JSONLD || !vc.credential.proof)
                        return [];
                    const proofs = Array.isArray(vc.credential.proof) ? vc.credential.proof : [vc.credential.proof];
                    const dataIntegrityProofs = proofs.filter((proof) => proof.type === 'DataIntegrityProof' && proof.cryptosuite !== undefined);
                    return dataIntegrityProofs;
                });
                // determine the common cryptosuites of all vc's
                const commonCryptosuites = vcDataIntegrityProofs.reduce((a, b) => a.filter((c) => b.includes(c)));
                // the input descriptor should also allow data integrity
                const inputDescriptor = jp.nodes(definition, result.input_descriptor_path)[0].value;
                const inputDescriptorAllowsDataIntegrity = !inputDescriptor['format'] || inputDescriptor?.format?.di || inputDescriptor?.format?.di_vc || inputDescriptor?.format?.di_vp;
                if (commonCryptosuites.length > 0 && inputDescriptorAllowsDataIntegrity) {
                    format = 'di_vc';
                }
            }
            const inputDescriptor = jp.nodes(definition, result.input_descriptor_path)[0].value;
            return {
                id: inputDescriptor.id,
                format,
                path: result.verifiable_credential_path,
            };
        });
        // The presentation submission is being created in this handler, then updated in subsequent handler.
        // TODO: This approach needs to be refactored for a new Major version.
        // Also there is no apparent need for the indirection and state in this class.
        // Simply do the first loops and amend the presentation submission in every loop.
        if (this.client.generatePresentationSubmission && (!this.presentationSubmission || Object.keys(this.presentationSubmission).length === 0)) {
            this.presentationSubmission = {
                id: nanoid(),
                definition_id: definition.id,
                descriptor_map: descriptorMap,
            };
        }
    }
    evaluateUris(wvc, verifiableCredentialUris, inputDescriptorsUris, idIdx, vcIdx, pdVersion) {
        let hasAnyMatch = false;
        if (pdVersion === PEVersion.v1) {
            for (let i = 0; i < inputDescriptorsUris.length; i++) {
                if (UriEvaluationHandler.containsHashlink(inputDescriptorsUris[i])) {
                    this.getResults().push(this.createWarnResultObject(idIdx, vcIdx));
                }
            }
            for (let i = 0; i < verifiableCredentialUris.length; i++) {
                if (inputDescriptorsUris.find((el) => el === verifiableCredentialUris[i]) != undefined) {
                    hasAnyMatch = true;
                }
            }
        }
        else {
            hasAnyMatch = true;
        }
        if (hasAnyMatch) {
            this.getResults().push(this.createSuccessResultObject(wvc, inputDescriptorsUris, idIdx, vcIdx));
        }
        else {
            this.getResults().push(this.createErrorResultObject(wvc, inputDescriptorsUris, idIdx, vcIdx));
        }
    }
    static buildVcContextAndSchemaUris(credential, version) {
        const uris = [];
        // W3C credential
        if (CredentialMapper.isW3cCredential(credential)) {
            if (Array.isArray(credential['@context'])) {
                credential['@context'].forEach((value) => uris.push(value));
            }
            else {
                uris.push(credential['@context']);
            }
            if (Array.isArray(credential.credentialSchema) && credential.credentialSchema.length > 0) {
                credential.credentialSchema.forEach((element) => uris.push(element.id));
            }
            else if (credential.credentialSchema) {
                uris.push(credential.credentialSchema.id);
            }
            if (version === PEVersion.v1) {
                // JWT VC Profile and MS Entry Verified ID do use the schema from V1 to match against types in the VC
                Array.isArray(credential.type)
                    ? credential.type.forEach((type) => uris.push(type))
                    : credential.type
                        ? uris.push(credential.type)
                        : undefined;
            }
        }
        // NOTE: we add the `vct` field of an SD-JWT to the list of uris, to allow SD-JWT
        // to work with PEX v1 in the same way that JWT vcs can work with pex v1. If we don't
        // add this, then SD-JWTs can only be used with PEX v2.
        if (CredentialMapper.isSdJwtDecodedCredential(credential)) {
            if (version === PEVersion.v1) {
                uris.push(credential.decodedPayload.vct);
            }
        }
        return uris;
    }
    createSuccessResultObject(wvc, inputDescriptorsUris, idIdx, vcIdx) {
        const result = this.createResult(idIdx, vcIdx);
        result.status = Status.INFO;
        result.message = PexMessages.URI_EVALUATION_PASSED;
        result.payload = {
            format: wvc.format,
            vcContext: CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential['@context'] : undefined,
            vcCredentialSchema: CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential.credentialSchema : undefined,
            inputDescriptorsUris,
        };
        return result;
    }
    createErrorResultObject(wvc, inputDescriptorsUris, idIdx, vcIdx) {
        const result = this.createResult(idIdx, vcIdx);
        result.status = Status.ERROR;
        result.message = PexMessages.URI_EVALUATION_DIDNT_PASS;
        result.payload = {
            format: wvc.format,
            vcContext: CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential['@context'] : undefined,
            vcCredentialSchema: CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential.credentialSchema : undefined,
            inputDescriptorsUris,
        };
        return result;
    }
    createWarnResultObject(idIdx, vcIdx) {
        const result = this.createResult(idIdx, vcIdx);
        result.status = Status.WARN;
        result.message = PexMessages.URI_EVALUATION_DIDNT_PASS;
        result.payload = PexMessages.INPUT_DESCRIPTOR_CONTEXT_CONTAINS_HASHLINK_VERIFICATION_NOT_SUPPORTED;
        return result;
    }
    createResult(idIdx, vcIdx) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `$[${vcIdx}]`,
            evaluator: this.getName(),
            status: Status.INFO,
            message: undefined,
        };
    }
    static containsHashlink(url) {
        return !(this.matchAll(url, UriEvaluationHandler.HASHLINK_QUERY_URL_REGEX).next().done &&
            this.matchAll(url, UriEvaluationHandler.HASHLINK_URL_ENCODED_REGEX).next().done);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy91cmlFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFDTCxnQkFBZ0IsRUFHaEIsWUFBWSxHQUdiLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVoQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFxRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0csT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFJL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFeEUsTUFBTSxPQUFPLG9CQUFxQixTQUFRLHlCQUF5QjtJQUNqRSxNQUFNLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBRXZELFlBQVksTUFBd0I7UUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVPLE1BQU0sQ0FBQywwQkFBMEIsR0FBRywrQkFBK0IsQ0FBQztJQUNwRSxNQUFNLENBQUMsd0JBQXdCLEdBQ3JDLHVIQUF1SCxDQUFDO0lBRW5ILE1BQU0sQ0FBQyxVQUEyQyxFQUFFLFVBQXlDO1FBQ2xHLCtCQUErQjtRQUNJLFVBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUF5QixFQUFFLGFBQXFCLEVBQUUsRUFBRTtZQUM1SCxNQUFNLElBQUksR0FBYSxVQUFVLENBQUMsVUFBVSxFQUFFLEtB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