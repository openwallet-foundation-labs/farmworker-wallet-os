"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialsForRequest = void 0;
const decode_1 = require("@sd-jwt/decode");
const pex_models_1 = require("@sphereon/pex-models");
const jsonpath_1 = __importDefault(require("jsonpath"));
const error_1 = require("../../../error");
const utils_1 = require("../../../utils");
const sd_jwt_vc_1 = require("../../sd-jwt-vc");
const vc_1 = require("../../vc");
const DifPresentationExchangeError_1 = require("../DifPresentationExchangeError");
const transform_1 = require("./transform");
async function getCredentialsForRequest(
// PEX instance with hasher defined
pex, presentationDefinition, credentialRecords) {
    var _a;
    const encodedCredentials = credentialRecords.map((c) => (0, transform_1.getSphereonOriginalVerifiableCredential)(c));
    const selectResultsRaw = pex.selectFrom(presentationDefinition, encodedCredentials);
    const selectResults = Object.assign(Object.assign({}, selectResultsRaw), { 
        // Map the encoded credential to their respective w3c credential record
        verifiableCredential: (_a = selectResultsRaw.verifiableCredential) === null || _a === void 0 ? void 0 : _a.map((selectedEncoded) => {
            const credentialRecordIndex = encodedCredentials.findIndex((encoded) => {
                if (typeof selectedEncoded === 'string' &&
                    selectedEncoded.includes('~') &&
                    typeof encoded === 'string' &&
                    encoded.includes('~')) {
                    // FIXME: pex applies SD-JWT, so we actually can't match the record anymore :(
                    // We take the first part of the sd-jwt, as that will never change, and should
                    // be unique on it's own
                    const [encodedJwt] = encoded.split('~');
                    const [selectedEncodedJwt] = selectedEncoded.split('~');
                    return encodedJwt === selectedEncodedJwt;
                }
                else {
                    return (0, utils_1.deepEquality)(selectedEncoded, encoded);
                }
            });
            if (credentialRecordIndex === -1) {
                throw new DifPresentationExchangeError_1.DifPresentationExchangeError('Unable to find credential in credential records.');
            }
            const credentialRecord = credentialRecords[credentialRecordIndex];
            if (credentialRecord instanceof sd_jwt_vc_1.SdJwtVcRecord) {
                // selectedEncoded always string when SdJwtVcRecord
                // Get the decoded payload from the the selected credential, this already has SD applied
                const { jwt, disclosures } = (0, decode_1.decodeSdJwtSync)(selectedEncoded, utils_1.Hasher.hash);
                const prettyClaims = (0, decode_1.getClaimsSync)(jwt.payload, disclosures, utils_1.Hasher.hash);
                return {
                    type: vc_1.ClaimFormat.SdJwtVc,
                    credentialRecord,
                    disclosedPayload: prettyClaims,
                };
            }
            else if (credentialRecord instanceof vc_1.W3cCredentialRecord) {
                return {
                    type: credentialRecord.credential.claimFormat,
                    credentialRecord,
                };
            }
            else {
                throw new error_1.CredoError(`Unrecognized credential record type`);
            }
        }) });
    const presentationSubmission = {
        requirements: [],
        areRequirementsSatisfied: false,
        name: presentationDefinition.name,
        purpose: presentationDefinition.purpose,
    };
    // If there's no submission requirements, ALL input descriptors MUST be satisfied
    if (!presentationDefinition.submission_requirements || presentationDefinition.submission_requirements.length === 0) {
        presentationSubmission.requirements = getSubmissionRequirementsForAllInputDescriptors(presentationDefinition.input_descriptors, selectResults);
    }
    else {
        presentationSubmission.requirements = getSubmissionRequirements(presentationDefinition, selectResults);
    }
    // There may be no requirements if we filter out all optional ones. To not makes things too complicated, we see it as an error
    // for now if a request is made that has no required requirements (but only e.g. min: 0, which means we don't need to disclose anything)
    // I see this more as the fault of the presentation definition, as it should have at least some requirements.
    if (presentationSubmission.requirements.length === 0) {
        throw new DifPresentationExchangeError_1.DifPresentationExchangeError('Presentation Definition does not require any credentials. Optional credentials are not included in the presentation submission.');
    }
    if (selectResultsRaw.areRequiredCredentialsPresent === 'error') {
        return presentationSubmission;
    }
    return Object.assign(Object.assign({}, presentationSubmission), { 
        // If all requirements are satisfied, the presentation submission is satisfied
        areRequirementsSatisfied: presentationSubmission.requirements.every((requirement) => requirement.isRequirementSatisfied) });
}
exports.getCredentialsForRequest = getCredentialsForRequest;
function getSubmissionRequirements(presentationDefinition, selectResults) {
    var _a;
    const submissionRequirements = [];
    // There are submission requirements, so we need to select the input_descriptors
    // based on the submission requirements
    for (const submissionRequirement of (_a = presentationDefinition.submission_requirements) !== null && _a !== void 0 ? _a : []) {
        // Check: if the submissionRequirement uses `from_nested`, as we don't support this yet
        if (submissionRequirement.from_nested) {
            throw new DifPresentationExchangeError_1.DifPresentationExchangeError("Presentation definition contains requirement using 'from_nested', which is not supported yet.");
        }
        // Check if there's a 'from'. If not the structure is not as we expect it
        if (!submissionRequirement.from) {
            throw new DifPresentationExchangeError_1.DifPresentationExchangeError("Missing 'from' in submission requirement match");
        }
        if (submissionRequirement.rule === pex_models_1.Rules.All) {
            const selectedSubmission = getSubmissionRequirementRuleAll(submissionRequirement, presentationDefinition, selectResults);
            submissionRequirements.push(selectedSubmission);
        }
        else {
            const selectedSubmission = getSubmissionRequirementRulePick(submissionRequirement, presentationDefinition, selectResults);
            submissionRequirements.push(selectedSubmission);
        }
    }
    // Submission may have requirement that doesn't require a credential to be submitted (e.g. min: 0)
    // We use minimization strategy, and thus only disclose the minimum amount of information
    const requirementsWithCredentials = submissionRequirements.filter((requirement) => requirement.needsCount > 0);
    return requirementsWithCredentials;
}
function getSubmissionRequirementsForAllInputDescriptors(inputDescriptors, selectResults) {
    const submissionRequirements = [];
    for (const inputDescriptor of inputDescriptors) {
        const submission = getSubmissionForInputDescriptor(inputDescriptor, selectResults);
        submissionRequirements.push({
            rule: pex_models_1.Rules.Pick,
            needsCount: 1,
            submissionEntry: [submission],
            isRequirementSatisfied: submission.verifiableCredentials.length >= 1,
        });
    }
    return submissionRequirements;
}
function getSubmissionRequirementRuleAll(submissionRequirement, presentationDefinition, selectResults) {
    var _a;
    // Check if there's a 'from'. If not the structure is not as we expect it
    if (!submissionRequirement.from)
        throw new DifPresentationExchangeError_1.DifPresentationExchangeError("Missing 'from' in submission requirement match.");
    const selectedSubmission = {
        rule: pex_models_1.Rules.All,
        needsCount: 0,
        name: submissionRequirement.name,
        purpose: submissionRequirement.purpose,
        submissionEntry: [],
        isRequirementSatisfied: false,
    };
    for (const inputDescriptor of presentationDefinition.input_descriptors) {
        // We only want to get the submission if the input descriptor belongs to the group
        if (!((_a = inputDescriptor.group) === null || _a === void 0 ? void 0 : _a.includes(submissionRequirement.from)))
            continue;
        const submission = getSubmissionForInputDescriptor(inputDescriptor, selectResults);
        // Rule ALL, so for every input descriptor that matches in this group, we need to add it
        selectedSubmission.needsCount += 1;
        selectedSubmission.submissionEntry.push(submission);
    }
    return Object.assign(Object.assign({}, selectedSubmission), { 
        // If all submissions have a credential, the requirement is satisfied
        isRequirementSatisfied: selectedSubmission.submissionEntry.every((submission) => submission.verifiableCredentials.length >= 1) });
}
function getSubmissionRequirementRulePick(submissionRequirement, presentationDefinition, selectResults) {
    var _a, _b, _c;
    // Check if there's a 'from'. If not the structure is not as we expect it
    if (!submissionRequirement.from) {
        throw new DifPresentationExchangeError_1.DifPresentationExchangeError("Missing 'from' in submission requirement match.");
    }
    const selectedSubmission = {
        rule: pex_models_1.Rules.Pick,
        needsCount: (_b = (_a = submissionRequirement.count) !== null && _a !== void 0 ? _a : submissionRequirement.min) !== null && _b !== void 0 ? _b : 1,
        name: submissionRequirement.name,
        purpose: submissionRequirement.purpose,
        // If there's no count, min, or max we assume one credential is required for submission
        // however, the exact behavior is not specified in the spec
        submissionEntry: [],
        isRequirementSatisfied: false,
    };
    const satisfiedSubmissions = [];
    const unsatisfiedSubmissions = [];
    for (const inputDescriptor of presentationDefinition.input_descriptors) {
        // We only want to get the submission if the input descriptor belongs to the group
        if (!((_c = inputDescriptor.group) === null || _c === void 0 ? void 0 : _c.includes(submissionRequirement.from)))
            continue;
        const submission = getSubmissionForInputDescriptor(inputDescriptor, selectResults);
        if (submission.verifiableCredentials.length >= 1) {
            satisfiedSubmissions.push(submission);
        }
        else {
            unsatisfiedSubmissions.push(submission);
        }
        // If we have found enough credentials to satisfy the requirement, we could stop
        // but the user may not want the first x that match, so we continue and return all matches
        // if (satisfiedSubmissions.length === selectedSubmission.needsCount) break
    }
    return Object.assign(Object.assign({}, selectedSubmission), { 
        // If there are enough satisfied submissions, the requirement is satisfied
        isRequirementSatisfied: satisfiedSubmissions.length >= selectedSubmission.needsCount, 
        // if the requirement is satisfied, we only need to return the satisfied submissions
        // however if the requirement is not satisfied, we include all entries so the wallet could
        // render which credentials are missing.
        submission: satisfiedSubmissions.length >= selectedSubmission.needsCount
            ? satisfiedSubmissions
            : [...satisfiedSubmissions, ...unsatisfiedSubmissions] });
}
function getSubmissionForInputDescriptor(inputDescriptor, selectResults) {
    var _a;
    // https://github.com/Sphereon-Opensource/PEX/issues/116
    // If the input descriptor doesn't contain a name, the name of the match will be the id of the input descriptor that satisfied it
    const matchesForInputDescriptor = (_a = selectResults.matches) === null || _a === void 0 ? void 0 : _a.filter((m) => m.name === inputDescriptor.id ||
        // FIXME: this is not collision proof as the name doesn't have to be unique
        m.name === inputDescriptor.name);
    const submissionEntry = {
        inputDescriptorId: inputDescriptor.id,
        name: inputDescriptor.name,
        purpose: inputDescriptor.purpose,
        verifiableCredentials: [],
    };
    // return early if no matches.
    if (!(matchesForInputDescriptor === null || matchesForInputDescriptor === void 0 ? void 0 : matchesForInputDescriptor.length))
        return submissionEntry;
    // FIXME: This can return multiple credentials for multiple input_descriptors,
    // which I think is a bug in the PEX library
    // Extract all credentials from the match
    const verifiableCredentials = matchesForInputDescriptor.flatMap((matchForInputDescriptor) => extractCredentialsFromMatch(matchForInputDescriptor, selectResults.verifiableCredential));
    submissionEntry.verifiableCredentials = verifiableCredentials;
    return submissionEntry;
}
function extractCredentialsFromMatch(match, availableCredentials) {
    const verifiableCredentials = [];
    for (const vcPath of match.vc_path) {
        const [verifiableCredential] = jsonpath_1.default.query({ verifiableCredential: availableCredentials }, vcPath);
        verifiableCredentials.push(verifiableCredential);
    }
    return verifiableCredentials;
}
//# sourceMappingURL=credentialSelection.js.map