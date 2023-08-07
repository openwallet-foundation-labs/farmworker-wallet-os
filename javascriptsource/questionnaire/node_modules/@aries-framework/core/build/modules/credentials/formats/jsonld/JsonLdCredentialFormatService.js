"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLdCredentialFormatService = void 0;
const Attachment_1 = require("../../../../decorators/attachment/Attachment");
const error_1 = require("../../../../error");
const utils_1 = require("../../../../utils");
const JsonTransformer_1 = require("../../../../utils/JsonTransformer");
const DidDocument_1 = require("../../../dids/domain/DidDocument");
const DidResolverService_1 = require("../../../dids/services/DidResolverService");
const vc_1 = require("../../../vc");
const W3cJsonLdCredentialService_1 = require("../../../vc/data-integrity/W3cJsonLdCredentialService");
const CredentialFormatSpec_1 = require("../../models/CredentialFormatSpec");
const JsonLdCredentialDetail_1 = require("./JsonLdCredentialDetail");
const JSONLD_VC_DETAIL = 'aries/ld-proof-vc-detail@v1.0';
const JSONLD_VC = 'aries/ld-proof-vc@v1.0';
class JsonLdCredentialFormatService {
    constructor() {
        this.formatKey = 'jsonld';
        this.credentialRecordType = 'w3c';
        this.areCredentialsEqual = (message1, message2) => {
            const obj1 = message1.getDataAsJson();
            const obj2 = message2.getDataAsJson();
            return (0, utils_1.areObjectsEqual)(obj1, obj2);
        };
    }
    /**
     * Create a {@link AttachmentFormats} object dependent on the message type.
     *
     * @param options The object containing all the options for the proposed credential
     * @returns object containing associated attachment, formats and filtersAttach elements
     *
     */
    async createProposal(agentContext, { credentialFormats }) {
        const format = new CredentialFormatSpec_1.CredentialFormatSpec({
            format: JSONLD_VC_DETAIL,
        });
        const jsonLdFormat = credentialFormats.jsonld;
        if (!jsonLdFormat) {
            throw new error_1.AriesFrameworkError('Missing jsonld payload in createProposal');
        }
        // this does the validation
        JsonTransformer_1.JsonTransformer.fromJSON(jsonLdFormat.credential, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
        // jsonLdFormat is now of type JsonLdFormatDataCredentialDetail
        const attachment = this.getFormatData(jsonLdFormat, format.attachmentId);
        return { format, attachment };
    }
    /**
     * Method called on reception of a propose credential message
     * @param options the options needed to accept the proposal
     */
    async processProposal(agentContext, { attachment }) {
        const credProposalJson = attachment.getDataAsJson();
        if (!credProposalJson) {
            throw new error_1.AriesFrameworkError('Missing jsonld credential proposal data payload');
        }
        // validation is done in here
        JsonTransformer_1.JsonTransformer.fromJSON(credProposalJson, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
    }
    async acceptProposal(agentContext, { attachmentId, proposalAttachment }) {
        // if the offer has an attachment Id use that, otherwise the generated id of the formats object
        const format = new CredentialFormatSpec_1.CredentialFormatSpec({
            attachmentId,
            format: JSONLD_VC_DETAIL,
        });
        const credentialProposal = proposalAttachment.getDataAsJson();
        JsonTransformer_1.JsonTransformer.fromJSON(credentialProposal, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
        const offerData = credentialProposal;
        const attachment = this.getFormatData(offerData, format.attachmentId);
        return { format, attachment };
    }
    /**
     * Create a {@link AttachmentFormats} object dependent on the message type.
     *
     * @param options The object containing all the options for the credential offer
     * @returns object containing associated attachment, formats and offersAttach elements
     *
     */
    async createOffer(agentContext, { credentialFormats, attachmentId }) {
        // if the offer has an attachment Id use that, otherwise the generated id of the formats object
        const format = new CredentialFormatSpec_1.CredentialFormatSpec({
            attachmentId,
            format: JSONLD_VC_DETAIL,
        });
        const jsonLdFormat = credentialFormats === null || credentialFormats === void 0 ? void 0 : credentialFormats.jsonld;
        if (!jsonLdFormat) {
            throw new error_1.AriesFrameworkError('Missing jsonld payload in createOffer');
        }
        // validate
        JsonTransformer_1.JsonTransformer.fromJSON(jsonLdFormat.credential, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
        const attachment = this.getFormatData(jsonLdFormat, format.attachmentId);
        return { format, attachment };
    }
    async processOffer(agentContext, { attachment }) {
        const credentialOfferJson = attachment.getDataAsJson();
        if (!credentialOfferJson) {
            throw new error_1.AriesFrameworkError('Missing jsonld credential offer data payload');
        }
        JsonTransformer_1.JsonTransformer.fromJSON(credentialOfferJson, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
    }
    async acceptOffer(agentContext, { attachmentId, offerAttachment }) {
        const credentialOffer = offerAttachment.getDataAsJson();
        // validate
        JsonTransformer_1.JsonTransformer.fromJSON(credentialOffer, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
        const format = new CredentialFormatSpec_1.CredentialFormatSpec({
            attachmentId,
            format: JSONLD_VC_DETAIL,
        });
        const attachment = this.getFormatData(credentialOffer, format.attachmentId);
        return { format, attachment };
    }
    /**
     * Create a credential attachment format for a credential request.
     *
     * @param options The object containing all the options for the credential request is derived
     * @returns object containing associated attachment, formats and requestAttach elements
     *
     */
    async createRequest(agentContext, { credentialFormats }) {
        const jsonLdFormat = credentialFormats === null || credentialFormats === void 0 ? void 0 : credentialFormats.jsonld;
        const format = new CredentialFormatSpec_1.CredentialFormatSpec({
            format: JSONLD_VC_DETAIL,
        });
        if (!jsonLdFormat) {
            throw new error_1.AriesFrameworkError('Missing jsonld payload in createRequest');
        }
        // this does the validation
        JsonTransformer_1.JsonTransformer.fromJSON(jsonLdFormat.credential, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
        const attachment = this.getFormatData(jsonLdFormat, format.attachmentId);
        return { format, attachment };
    }
    async processRequest(agentContext, { attachment }) {
        const requestJson = attachment.getDataAsJson();
        if (!requestJson) {
            throw new error_1.AriesFrameworkError('Missing jsonld credential request data payload');
        }
        // validate
        JsonTransformer_1.JsonTransformer.fromJSON(requestJson, JsonLdCredentialDetail_1.JsonLdCredentialDetail);
    }
    async acceptRequest(agentContext, { credentialFormats, attachmentId, requestAttachment }) {
        var _a, _b;
        const w3cJsonLdCredentialService = agentContext.dependencyManager.resolve(W3cJsonLdCredentialService_1.W3cJsonLdCredentialService);
        // sign credential here. credential to be signed is received as the request attachment
        // (attachment in the request message from holder to issuer)
        const credentialRequest = requestAttachment.getDataAsJson();
        const verificationMethod = (_b = (_a = credentialFormats === null || credentialFormats === void 0 ? void 0 : credentialFormats.jsonld) === null || _a === void 0 ? void 0 : _a.verificationMethod) !== null && _b !== void 0 ? _b : (await this.deriveVerificationMethod(agentContext, credentialRequest.credential, credentialRequest));
        if (!verificationMethod) {
            throw new error_1.AriesFrameworkError('Missing verification method in credential data');
        }
        const format = new CredentialFormatSpec_1.CredentialFormatSpec({
            attachmentId,
            format: JSONLD_VC,
        });
        const options = credentialRequest.options;
        // Get a list of fields found in the options that are not supported at the moment
        const unsupportedFields = ['challenge', 'domain', 'credentialStatus', 'created'];
        const foundFields = unsupportedFields.filter((field) => options[field] !== undefined);
        if (foundFields.length > 0) {
            throw new error_1.AriesFrameworkError(`Some fields are not currently supported in credential options: ${foundFields.join(', ')}`);
        }
        const credential = JsonTransformer_1.JsonTransformer.fromJSON(credentialRequest.credential, vc_1.W3cCredential);
        const verifiableCredential = await w3cJsonLdCredentialService.signCredential(agentContext, {
            format: vc_1.ClaimFormat.LdpVc,
            credential,
            proofType: credentialRequest.options.proofType,
            verificationMethod: verificationMethod,
        });
        const attachment = this.getFormatData(JsonTransformer_1.JsonTransformer.toJSON(verifiableCredential), format.attachmentId);
        return { format, attachment };
    }
    /**
     * Derive a verification method using the issuer from the given verifiable credential
     * @param credentialAsJson the verifiable credential we want to sign
     * @return the verification method derived from this credential and its associated issuer did, keys etc.
     */
    async deriveVerificationMethod(agentContext, credentialAsJson, credentialRequest) {
        const didResolver = agentContext.dependencyManager.resolve(DidResolverService_1.DidResolverService);
        const w3cJsonLdCredentialService = agentContext.dependencyManager.resolve(W3cJsonLdCredentialService_1.W3cJsonLdCredentialService);
        const credential = JsonTransformer_1.JsonTransformer.fromJSON(credentialAsJson, vc_1.W3cCredential);
        // extract issuer from vc (can be string or Issuer)
        let issuerDid = credential.issuer;
        if (typeof issuerDid !== 'string') {
            issuerDid = issuerDid.id;
        }
        // this will throw an error if the issuer did is invalid
        const issuerDidDocument = await didResolver.resolveDidDocument(agentContext, issuerDid);
        // find first key which matches proof type
        const proofType = credentialRequest.options.proofType;
        // actually gets the key type(s)
        const keyType = w3cJsonLdCredentialService.getVerificationMethodTypesByProofType(proofType);
        if (!keyType || keyType.length === 0) {
            throw new error_1.AriesFrameworkError(`No Key Type found for proofType ${proofType}`);
        }
        const verificationMethod = await (0, DidDocument_1.findVerificationMethodByKeyType)(keyType[0], issuerDidDocument);
        if (!verificationMethod) {
            throw new error_1.AriesFrameworkError(`Missing verification method for key type ${keyType}`);
        }
        return verificationMethod.id;
    }
    /**
     * Processes an incoming credential - retrieve metadata, retrieve payload and store it in the Indy wallet
     * @param options the issue credential message wrapped inside this object
     * @param credentialRecord the credential exchange record for this credential
     */
    async processCredential(agentContext, { credentialRecord, attachment, requestAttachment }) {
        const w3cCredentialService = agentContext.dependencyManager.resolve(vc_1.W3cCredentialService);
        const credentialAsJson = attachment.getDataAsJson();
        const credential = JsonTransformer_1.JsonTransformer.fromJSON(credentialAsJson, vc_1.W3cJsonLdVerifiableCredential);
        const requestAsJson = requestAttachment.getDataAsJson();
        // Verify the credential request matches the credential
        this.verifyReceivedCredentialMatchesRequest(credential, requestAsJson);
        // verify signatures of the credential
        const result = await w3cCredentialService.verifyCredential(agentContext, { credential });
        if (result && !result.isValid) {
            throw new error_1.AriesFrameworkError(`Failed to validate credential, error = ${result.error}`);
        }
        const verifiableCredential = await w3cCredentialService.storeCredential(agentContext, {
            credential,
        });
        credentialRecord.credentials.push({
            credentialRecordType: this.credentialRecordType,
            credentialRecordId: verifiableCredential.id,
        });
    }
    verifyReceivedCredentialMatchesRequest(credential, request) {
        const jsonCredential = JsonTransformer_1.JsonTransformer.toJSON(credential);
        delete jsonCredential.proof;
        if (Array.isArray(credential.proof)) {
            throw new error_1.AriesFrameworkError('Credential proof arrays are not supported');
        }
        if (request.options.created && credential.proof.created !== request.options.created) {
            throw new error_1.AriesFrameworkError('Received credential proof created does not match created from credential request');
        }
        if (credential.proof.domain !== request.options.domain) {
            throw new error_1.AriesFrameworkError('Received credential proof domain does not match domain from credential request');
        }
        if (credential.proof.challenge !== request.options.challenge) {
            throw new error_1.AriesFrameworkError('Received credential proof challenge does not match challenge from credential request');
        }
        if (credential.proof.type !== request.options.proofType) {
            throw new error_1.AriesFrameworkError('Received credential proof type does not match proof type from credential request');
        }
        if (credential.proof.proofPurpose !== request.options.proofPurpose) {
            throw new error_1.AriesFrameworkError('Received credential proof purpose does not match proof purpose from credential request');
        }
        // Check whether the received credential (minus the proof) matches the credential request
        if (!(0, utils_1.areObjectsEqual)(jsonCredential, request.credential)) {
            throw new error_1.AriesFrameworkError('Received credential does not match credential request');
        }
        // TODO: add check for the credentialStatus once this is supported in AFJ
    }
    supportsFormat(format) {
        const supportedFormats = [JSONLD_VC_DETAIL, JSONLD_VC];
        return supportedFormats.includes(format);
    }
    async deleteCredentialById() {
        throw new Error('Not implemented.');
    }
    async shouldAutoRespondToProposal(agentContext, { offerAttachment, proposalAttachment }) {
        return this.areCredentialsEqual(proposalAttachment, offerAttachment);
    }
    async shouldAutoRespondToOffer(agentContext, { offerAttachment, proposalAttachment }) {
        return this.areCredentialsEqual(proposalAttachment, offerAttachment);
    }
    async shouldAutoRespondToRequest(agentContext, { offerAttachment, requestAttachment }) {
        return this.areCredentialsEqual(offerAttachment, requestAttachment);
    }
    async shouldAutoRespondToCredential(agentContext, { requestAttachment, credentialAttachment }) {
        const credentialJson = credentialAttachment.getDataAsJson();
        const w3cCredential = JsonTransformer_1.JsonTransformer.fromJSON(credentialJson, vc_1.W3cJsonLdVerifiableCredential);
        const request = requestAttachment.getDataAsJson();
        try {
            // This check is also done in the processCredential method, but we do it here as well
            // to be certain we don't skip the check
            this.verifyReceivedCredentialMatchesRequest(w3cCredential, request);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Returns an object of type {@link Attachment} for use in credential exchange messages.
     * It looks up the correct format identifier and encodes the data as a base64 attachment.
     *
     * @param data The data to include in the attach object
     * @param id the attach id from the formats component of the message
     */
    getFormatData(data, id) {
        const attachment = new Attachment_1.Attachment({
            id,
            mimeType: 'application/json',
            data: new Attachment_1.AttachmentData({
                base64: utils_1.JsonEncoder.toBase64(data),
            }),
        });
        return attachment;
    }
}
exports.JsonLdCredentialFormatService = JsonLdCredentialFormatService;
//# sourceMappingURL=JsonLdCredentialFormatService.js.map