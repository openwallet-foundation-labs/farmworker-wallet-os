"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriEvaluationHandler = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const ssi_types_1 = require("@sphereon/ssi-types");
const nanoid_1 = require("nanoid");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const types_1 = require("../../types");
const Messages_1 = __importDefault(require("../../types/Messages"));
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class UriEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'UriEvaluation';
    }
    handle(definition, wrappedVcs) {
        var _a, _b, _c;
        // This filter is removed in V2
        definition.input_descriptors.forEach((inDesc, descriptorIdx) => {
            const uris = definition.getVersion() !== types_1.PEVersion.v2 ? inDesc.schema.map((so) => so.uri) : [];
            wrappedVcs.forEach((wvc, wrappedVCIdx) => {
                const vcUris = UriEvaluationHandler.buildVcContextAndSchemaUris(wvc.credential, definition.getVersion());
                this.evaluateUris(wvc, vcUris, uris, descriptorIdx, wrappedVCIdx, definition.getVersion());
            });
        });
        const definitionAllowsDataIntegrity = ((_a = definition.format) === null || _a === void 0 ? void 0 : _a.di) || ((_b = definition.format) === null || _b === void 0 ? void 0 : _b.di_vc) || ((_c = definition.format) === null || _c === void 0 ? void 0 : _c.di_vp);
        const descriptorMap = this.getResults()
            .filter((result) => result.status === ConstraintUtils_1.Status.INFO)
            .map((result) => {
            var _a, _b, _c, _d;
            let format = (_a = result.payload) === null || _a === void 0 ? void 0 : _a.format;
            // This checks if the new data integrity format should be used.
            // That may be the case if the input descriptor points to credentials that are in ldp_vc or ldp format,
            // and the presentation definition allows data integrity.
            if (definitionAllowsDataIntegrity && (format === 'ldp_vc' || format === 'ldp')) {
                const wvcs = jsonpath_1.JSONPath.nodes(wrappedVcs, result.verifiable_credential_path).map((node) => node.value);
                // check if all vc's have a data integrity proof
                const vcDataIntegrityProofs = wvcs.map((vc) => {
                    if (vc.type !== ssi_types_1.OriginalType.JSONLD || !vc.credential.proof)
                        return [];
                    const proofs = Array.isArray(vc.credential.proof) ? vc.credential.proof : [vc.credential.proof];
                    const dataIntegrityProofs = proofs.filter((proof) => proof.type === 'DataIntegrityProof' && proof.cryptosuite !== undefined);
                    return dataIntegrityProofs;
                });
                // determine the common cryptosuites of all vc's
                const commonCryptosuites = vcDataIntegrityProofs.reduce((a, b) => a.filter((c) => b.includes(c)));
                // the input descriptor should also allow data integrity
                const inputDescriptor = jsonpath_1.JSONPath.nodes(definition, result.input_descriptor_path)[0].value;
                const inputDescriptorAllowsDataIntegrity = !inputDescriptor['format'] || ((_b = inputDescriptor === null || inputDescriptor === void 0 ? void 0 : inputDescriptor.format) === null || _b === void 0 ? void 0 : _b.di) || ((_c = inputDescriptor === null || inputDescriptor === void 0 ? void 0 : inputDescriptor.format) === null || _c === void 0 ? void 0 : _c.di_vc) || ((_d = inputDescriptor === null || inputDescriptor === void 0 ? void 0 : inputDescriptor.format) === null || _d === void 0 ? void 0 : _d.di_vp);
                if (commonCryptosuites.length > 0 && inputDescriptorAllowsDataIntegrity) {
                    format = 'di_vc';
                }
            }
            const inputDescriptor = jsonpath_1.JSONPath.nodes(definition, result.input_descriptor_path)[0].value;
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
                id: (0, nanoid_1.nanoid)(),
                definition_id: definition.id,
                descriptor_map: descriptorMap,
            };
        }
    }
    evaluateUris(wvc, verifiableCredentialUris, inputDescriptorsUris, idIdx, vcIdx, pdVersion) {
        let hasAnyMatch = false;
        if (pdVersion === types_1.PEVersion.v1) {
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
        if (ssi_types_1.CredentialMapper.isW3cCredential(credential)) {
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
            if (version === types_1.PEVersion.v1) {
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
        if (ssi_types_1.CredentialMapper.isSdJwtDecodedCredential(credential)) {
            if (version === types_1.PEVersion.v1) {
                uris.push(credential.decodedPayload.vct);
            }
        }
        return uris;
    }
    createSuccessResultObject(wvc, inputDescriptorsUris, idIdx, vcIdx) {
        const result = this.createResult(idIdx, vcIdx);
        result.status = ConstraintUtils_1.Status.INFO;
        result.message = Messages_1.default.URI_EVALUATION_PASSED;
        result.payload = {
            format: wvc.format,
            vcContext: ssi_types_1.CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential['@context'] : undefined,
            vcCredentialSchema: ssi_types_1.CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential.credentialSchema : undefined,
            inputDescriptorsUris,
        };
        return result;
    }
    createErrorResultObject(wvc, inputDescriptorsUris, idIdx, vcIdx) {
        const result = this.createResult(idIdx, vcIdx);
        result.status = ConstraintUtils_1.Status.ERROR;
        result.message = Messages_1.default.URI_EVALUATION_DIDNT_PASS;
        result.payload = {
            format: wvc.format,
            vcContext: ssi_types_1.CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential['@context'] : undefined,
            vcCredentialSchema: ssi_types_1.CredentialMapper.isW3cCredential(wvc.credential) ? wvc.credential.credentialSchema : undefined,
            inputDescriptorsUris,
        };
        return result;
    }
    createWarnResultObject(idIdx, vcIdx) {
        const result = this.createResult(idIdx, vcIdx);
        result.status = ConstraintUtils_1.Status.WARN;
        result.message = Messages_1.default.URI_EVALUATION_DIDNT_PASS;
        result.payload = Messages_1.default.INPUT_DESCRIPTOR_CONTEXT_CONTAINS_HASHLINK_VERIFICATION_NOT_SUPPORTED;
        return result;
    }
    createResult(idIdx, vcIdx) {
        return {
            input_descriptor_path: `$.input_descriptors[${idIdx}]`,
            verifiable_credential_path: `$[${vcIdx}]`,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.INFO,
            message: undefined,
        };
    }
    static containsHashlink(url) {
        return !(this.matchAll(url, UriEvaluationHandler.HASHLINK_QUERY_URL_REGEX).next().done &&
            this.matchAll(url, UriEvaluationHandler.HASHLINK_URL_ENCODED_REGEX).next().done);
    }
}
exports.UriEvaluationHandler = UriEvaluationHandler;
UriEvaluationHandler.matchAll = require('string.prototype.matchall');
UriEvaluationHandler.HASHLINK_URL_ENCODED_REGEX = /hl:[a-zA-Z0-9]+:[a-zA-Z0-9]+/g;
UriEvaluationHandler.HASHLINK_QUERY_URL_REGEX = /https*?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(hl=[a-zA-Z0-9]+)/g;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJpRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy91cmlFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBeUQ7QUFFekQsbURBTzZCO0FBQzdCLG1DQUFnQztBQUVoQywyREFBK0M7QUFDL0MsdUNBQTJHO0FBQzNHLG9FQUErQztBQUkvQywyRUFBd0U7QUFFeEUsTUFBYSxvQkFBcUIsU0FBUSxxREFBeUI7SUFHakUsWUFBWSxNQUF3QjtRQUNsQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBTU0sTUFBTSxDQUFDLFVBQTJDLEVBQUUsVUFBeUM7O1FBQ2xHLCtCQUErQjtRQUNJLFVBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUF5QixFQUFFLGFBQXFCLEVBQUUsRUFBRTtZQUM1SCxNQUFNLElBQUksR0FBYSxVQUFVLENBQUMsVUFBVSxFQUFFLEtBQUssaUJBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6RyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBZ0MsRUFBRSxZQUFvQixFQUFFLEVBQUU7Z0JBQzVFLE1BQU0sTUFBTSxHQUFhLG9CQUFvQixDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ25ILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFF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