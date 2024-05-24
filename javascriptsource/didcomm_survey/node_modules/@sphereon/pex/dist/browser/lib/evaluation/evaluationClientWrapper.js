"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationClientWrapper = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const pex_models_1 = require("@sphereon/pex-models");
const ssi_types_1 = require("@sphereon/ssi-types");
const ConstraintUtils_1 = require("../ConstraintUtils");
const signing_1 = require("../signing");
const utils_1 = require("../utils");
const evaluationClient_1 = require("./evaluationClient");
class EvaluationClientWrapper {
    constructor() {
        this._client = new evaluationClient_1.EvaluationClient();
    }
    getEvaluationClient() {
        return this._client;
    }
    selectFrom(presentationDefinition, wrappedVerifiableCredentials, opts) {
        var _a;
        let selectResults;
        this._client.evaluate(presentationDefinition, wrappedVerifiableCredentials, opts);
        const warnings = [...this.formatNotInfo(ConstraintUtils_1.Status.WARN)];
        const errors = [...this.formatNotInfo(ConstraintUtils_1.Status.ERROR)];
        if (presentationDefinition.submission_requirements) {
            const info = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.payload.group && result.status !== ConstraintUtils_1.Status.ERROR);
            const marked = Array.from(new Set(info));
            let matchSubmissionRequirements;
            try {
                matchSubmissionRequirements = this.matchSubmissionRequirements(presentationDefinition, presentationDefinition.submission_requirements, marked);
            }
            catch (e) {
                const matchingError = { status: ConstraintUtils_1.Status.ERROR, message: JSON.stringify(e), tag: 'matchSubmissionRequirements' };
                return {
                    errors: errors ? [...errors, matchingError] : [matchingError],
                    warnings: warnings,
                    areRequiredCredentialsPresent: ConstraintUtils_1.Status.ERROR,
                };
            }
            const matches = this.extractMatches(matchSubmissionRequirements);
            const credentials = matches.map((e) => jsonpath_1.JSONPath.nodes(this._client.wrappedVcs.map((wrapped) => wrapped.original), e)[0].value);
            const areRequiredCredentialsPresent = this.determineAreRequiredCredentialsPresent(presentationDefinition, matchSubmissionRequirements);
            selectResults = {
                errors: areRequiredCredentialsPresent === ConstraintUtils_1.Status.INFO ? [] : errors,
                matches: [...matchSubmissionRequirements],
                areRequiredCredentialsPresent,
                verifiableCredential: credentials,
                warnings,
            };
        }
        else {
            const marked = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.status !== ConstraintUtils_1.Status.ERROR);
            const checkWithoutSRResults = this.checkWithoutSubmissionRequirements(marked, presentationDefinition);
            if (!checkWithoutSRResults.length) {
                const matchSubmissionRequirements = this.matchWithoutSubmissionRequirements(marked, presentationDefinition);
                const matches = this.extractMatches(matchSubmissionRequirements);
                const credentials = matches.map((e) => jsonpath_1.JSONPath.nodes(this._client.wrappedVcs.map((wrapped) => wrapped.original), e)[0].value);
                selectResults = {
                    errors: [],
                    matches: [...matchSubmissionRequirements],
                    areRequiredCredentialsPresent: ConstraintUtils_1.Status.INFO,
                    verifiableCredential: credentials,
                    warnings,
                };
            }
            else {
                return {
                    errors: errors,
                    matches: [],
                    areRequiredCredentialsPresent: ConstraintUtils_1.Status.ERROR,
                    verifiableCredential: wrappedVerifiableCredentials.map((value) => value.original),
                    warnings: warnings,
                };
            }
        }
        this.fillSelectableCredentialsToVerifiableCredentialsMapping(selectResults, wrappedVerifiableCredentials);
        selectResults.areRequiredCredentialsPresent = this.determineAreRequiredCredentialsPresent(presentationDefinition, selectResults === null || selectResults === void 0 ? void 0 : selectResults.matches);
        this.remapMatches(wrappedVerifiableCredentials.map((wrapped) => wrapped.original), selectResults.matches, selectResults === null || selectResults === void 0 ? void 0 : selectResults.verifiableCredential);
        (_a = selectResults.matches) === null || _a === void 0 ? void 0 : _a.forEach((m) => {
            this.updateSubmissionRequirementMatchPathToAlias(m, 'verifiableCredential');
        });
        if (selectResults.areRequiredCredentialsPresent === ConstraintUtils_1.Status.INFO) {
            selectResults.errors = [];
        }
        else {
            selectResults.errors = errors;
            selectResults.warnings = warnings;
            selectResults.verifiableCredential = wrappedVerifiableCredentials.map((value) => value.original);
        }
        return selectResults;
    }
    remapMatches(verifiableCredentials, submissionRequirementMatches, vcsToSend) {
        submissionRequirementMatches === null || submissionRequirementMatches === void 0 ? void 0 : submissionRequirementMatches.forEach((srm) => {
            if (srm.from_nested) {
                this.remapMatches(verifiableCredentials, srm.from_nested, vcsToSend);
            }
            else {
                srm.vc_path.forEach((match, index, matches) => {
                    const vc = jsonpath_1.JSONPath.query(verifiableCredentials, match)[0];
                    const newIndex = vcsToSend === null || vcsToSend === void 0 ? void 0 : vcsToSend.findIndex((svc) => JSON.stringify(svc) === JSON.stringify(vc));
                    if (newIndex === -1) {
                        throw new Error(`The index of the VerifiableCredential in your current call can't be found in your previously submitted credentials. Are you trying to send a new Credential?\nverifiableCredential: ${vc}`);
                    }
                    matches[index] = `$[${newIndex}]`;
                });
                srm.name;
            }
        });
    }
    extractMatches(matchSubmissionRequirements) {
        const matches = [];
        matchSubmissionRequirements.forEach((e) => {
            matches.push(...e.vc_path);
            if (e.from_nested) {
                matches.push(...this.extractMatches(e.from_nested));
            }
        });
        return Array.from(new Set(matches));
    }
    /**
     * Since this is without SubmissionRequirements object, each InputDescriptor has to have at least one corresponding VerifiableCredential
     * @param marked: info logs for `MarkForSubmissionEvaluation` handler
     * @param pd
     * @private
     */
    checkWithoutSubmissionRequirements(marked, pd) {
        const checkResult = [];
        if (!pd.input_descriptors) {
            return [];
        }
        if (!marked.length) {
            return [
                {
                    input_descriptor_path: '',
                    evaluator: 'checkWithoutSubmissionRequirement',
                    verifiable_credential_path: '',
                    status: ConstraintUtils_1.Status.ERROR,
                    payload: `Not all the InputDescriptors are addressed`,
                },
            ];
        }
        const inputDescriptors = pd.input_descriptors;
        const markedInputDescriptorPaths = utils_1.ObjectUtils.getDistinctFieldInObject(marked, 'input_descriptor_path');
        if (markedInputDescriptorPaths.length !== inputDescriptors.length) {
            const inputDescriptorsFromLogs = markedInputDescriptorPaths.map((value) => utils_1.JsonPathUtils.extractInputField(pd, [value])[0].value).map((value) => value.id);
            for (let i = 0; i < pd.input_descriptors.length; i++) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (inputDescriptorsFromLogs.indexOf(pd.input_descriptors[i].id) == -1) {
                    checkResult.push({
                        input_descriptor_path: `$.input_descriptors[${i}]`,
                        evaluator: 'checkWithoutSubmissionRequirement',
                        verifiable_credential_path: '',
                        status: ConstraintUtils_1.Status.ERROR,
                        payload: `Not all the InputDescriptors are addressed`,
                    });
                }
            }
        }
        return checkResult;
    }
    matchSubmissionRequirements(pd, submissionRequirements, marked) {
        const submissionRequirementMatches = [];
        for (const sr of submissionRequirements) {
            // Create a default SubmissionRequirementMatch object
            const srm = {
                name: pd.name || pd.id,
                rule: sr.rule,
                vc_path: [],
            };
            if (sr.from) {
                srm.from = sr.from;
            }
            // Assign min, max, and count regardless of 'from' or 'from_nested'
            sr.min ? (srm.min = sr.min) : undefined;
            sr.max ? (srm.max = sr.max) : undefined;
            sr.count ? (srm.count = sr.count) : undefined;
            if (sr.from) {
                const matchingDescriptors = this.mapMatchingDescriptors(pd, sr, marked);
                if (matchingDescriptors) {
                    srm.vc_path.push(...matchingDescriptors.vc_path);
                    srm.name = matchingDescriptors.name;
                    submissionRequirementMatches.push(srm);
                }
            }
            else if (sr.from_nested) {
                // Recursive call to matchSubmissionRequirements for nested requirements
                try {
                    srm.from_nested = this.matchSubmissionRequirements(pd, sr.from_nested, marked);
                    submissionRequirementMatches.push(srm);
                }
                catch (err) {
                    throw new Error(`Error in handling value of from_nested: ${sr.from_nested}: err: ${err}`);
                }
            }
            else {
                // Throw an error if neither 'from' nor 'from_nested' is found
                throw new Error("Invalid SubmissionRequirement object: Must contain either 'from' or 'from_nested'");
            }
        }
        return submissionRequirementMatches;
    }
    matchWithoutSubmissionRequirements(marked, pd) {
        const submissionRequirementMatches = [];
        const partitionedIdToVcMap = this.createIdToVcMap(marked);
        for (const [idPath, sameIdVcs] of partitionedIdToVcMap.entries()) {
            if (!sameIdVcs || !sameIdVcs.length) {
                continue;
            }
            for (const vcPath of sameIdVcs) {
                const idRes = utils_1.JsonPathUtils.extractInputField(pd, [idPath]);
                if (idRes.length) {
                    submissionRequirementMatches.push({
                        name: idRes[0].value.name || idRes[0].value.id,
                        rule: pex_models_1.Rules.All,
                        vc_path: [vcPath],
                    });
                }
            }
        }
        return this.removeDuplicateSubmissionRequirementMatches(submissionRequirementMatches);
    }
    mapMatchingDescriptors(pd, sr, marked) {
        var _a;
        const srm = { rule: sr.rule, vc_path: [] };
        if (sr === null || sr === void 0 ? void 0 : sr.from) {
            srm.from = sr.from;
            // updating the srm.name everytime and since we have only one, we're sending the last one
            for (const m of marked) {
                const inDesc = jsonpath_1.JSONPath.query(pd, m.input_descriptor_path)[0];
                if (inDesc.group && inDesc.group.indexOf(sr.from) === -1) {
                    continue;
                }
                srm.name = inDesc.name || inDesc.id;
                if (m.payload.group.includes(sr.from)) {
                    if (((_a = srm.vc_path) === null || _a === void 0 ? void 0 : _a.indexOf(m.verifiable_credential_path)) === -1) {
                        srm.vc_path.push(m.verifiable_credential_path);
                    }
                }
            }
        }
        return srm;
    }
    evaluate(pd, wvcs, opts) {
        var _a, _b, _c, _d;
        this._client.evaluate(pd, wvcs, opts);
        const result = {
            areRequiredCredentialsPresent: ConstraintUtils_1.Status.INFO,
            // TODO: we should handle the string case
            verifiableCredential: wvcs.map((wrapped) => wrapped.original),
        };
        result.warnings = this.formatNotInfo(ConstraintUtils_1.Status.WARN);
        result.errors = this.formatNotInfo(ConstraintUtils_1.Status.ERROR);
        this._client.assertPresentationSubmission();
        if ((_a = this._client.presentationSubmission) === null || _a === void 0 ? void 0 : _a.descriptor_map.length) {
            const len = (_b = this._client.presentationSubmission) === null || _b === void 0 ? void 0 : _b.descriptor_map.length;
            for (let i = 0; i < len; i++) {
                this._client.presentationSubmission.descriptor_map[i] &&
                    this._client.presentationSubmission.descriptor_map.push(this._client.presentationSubmission.descriptor_map[i]);
            }
            this._client.presentationSubmission.descriptor_map.splice(0, len); // cut the array and leave only the non-empty values
            result.value = JSON.parse(JSON.stringify(this._client.presentationSubmission));
        }
        if (this._client.generatePresentationSubmission) {
            this.updatePresentationSubmissionPathToVpPath(result.value);
        }
        result.verifiableCredential = this._client.wrappedVcs.map((wrapped) => wrapped.original);
        result.areRequiredCredentialsPresent = ((_d = (_c = result.value) === null || _c === void 0 ? void 0 : _c.descriptor_map) === null || _d === void 0 ? void 0 : _d.length) ? ConstraintUtils_1.Status.INFO : ConstraintUtils_1.Status.ERROR;
        return result;
    }
    formatNotInfo(status) {
        return this._client.results
            .filter((result) => result.status === status)
            .map((x) => {
            const vcPath = x.verifiable_credential_path.substring(1);
            return {
                tag: x.evaluator,
                status: x.status,
                message: `${x.message}: ${x.input_descriptor_path}: $.verifiableCredential${vcPath}`,
            };
        });
    }
    submissionFrom(pd, vcs, opts) {
        if (!this._client.results.length) {
            throw Error('You need to call evaluate() before pex.presentationFrom()');
        }
        if (!this._client.generatePresentationSubmission) {
            return this._client.presentationSubmission;
        }
        if (pd.submission_requirements) {
            const marked = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.payload.group && result.status !== ConstraintUtils_1.Status.ERROR);
            const [updatedMarked, upIdx] = this.matchUserSelectedVcs(marked, vcs);
            const groupCount = new Map();
            //TODO instanceof fails in some cases, need to check how to fix it
            if ('input_descriptors' in pd) {
                pd.input_descriptors.forEach((e) => {
                    if (e.group) {
                        e.group.forEach((key) => {
                            if (groupCount.has(key)) {
                                groupCount.set(key, groupCount.get(key) + 1);
                            }
                            else {
                                groupCount.set(key, 1);
                            }
                        });
                    }
                });
            }
            const result = this.evaluateRequirements(pd.submission_requirements, updatedMarked, groupCount, 0);
            const finalIdx = upIdx.filter((ui) => result[1].find((r) => r.verifiable_credential_path === ui[1]));
            this.updatePresentationSubmission(finalIdx);
            this.updatePresentationSubmissionPathToVpPath();
            if ((opts === null || opts === void 0 ? void 0 : opts.presentationSubmissionLocation) === signing_1.PresentationSubmissionLocation.EXTERNAL) {
                this.updatePresentationSubmissionToExternal();
            }
            return this._client.presentationSubmission;
        }
        const marked = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.status !== ConstraintUtils_1.Status.ERROR);
        const updatedIndexes = this.matchUserSelectedVcs(marked, vcs);
        this.updatePresentationSubmission(updatedIndexes[1]);
        this.updatePresentationSubmissionPathToVpPath();
        if ((opts === null || opts === void 0 ? void 0 : opts.presentationSubmissionLocation) === signing_1.PresentationSubmissionLocation.EXTERNAL) {
            this.updatePresentationSubmissionToExternal();
        }
        return this._client.presentationSubmission;
    }
    updatePresentationSubmission(updatedIndexes) {
        if (!this._client.generatePresentationSubmission) {
            return; // never update a supplied submission
        }
        this._client.presentationSubmission.descriptor_map = this._client.presentationSubmission.descriptor_map
            .filter((descriptor) => updatedIndexes.find((ui) => ui[0] === descriptor.path))
            .map((descriptor) => {
            const result = updatedIndexes.find((ui) => ui[0] === descriptor.path);
            if (result) {
                descriptor.path = result[1];
            }
            return descriptor;
        });
    }
    updatePresentationSubmissionToExternal() {
        const descriptors = this._client.presentationSubmission.descriptor_map;
        this._client.presentationSubmission.descriptor_map = descriptors.map((descriptor) => {
            if (descriptor.path_nested) {
                return descriptor;
            }
            // sd-jwt doesn't use path_nested and format is the same for vc or vp
            else if (descriptor.format === 'vc+sd-jwt') {
                return descriptor;
            }
            const format = descriptor.format;
            const nestedDescriptor = Object.assign({}, descriptor);
            nestedDescriptor.path_nested = Object.assign({}, descriptor);
            nestedDescriptor.path = '$';
            // todo: We really should also look at the context of the VP, to determine whether it is jwt_vp vs jwt_vp_json instead of relying on the VC type
            if (format.startsWith('ldp_')) {
                nestedDescriptor.format = 'ldp_vp';
            }
            else if (format.startsWith('di_')) {
                nestedDescriptor.format = 'di_vp';
            }
            else if (format === 'jwt_vc') {
                nestedDescriptor.format = 'jwt_vp';
                nestedDescriptor.path_nested.path = nestedDescriptor.path_nested.path.replace('$.verifiableCredential[', '$.vp.verifiableCredential[');
            }
            else if (format === 'jwt_vc_json') {
                nestedDescriptor.format = 'jwt_vp_json';
                nestedDescriptor.path_nested.path = nestedDescriptor.path_nested.path.replace('$.verifiableCredential[', '$.vp.verifiableCredential[');
            }
            return nestedDescriptor;
        });
    }
    matchUserSelectedVcs(marked, vcs) {
        const userSelected = vcs.map((vc, index) => [index, JSON.stringify(vc.original)]);
        const allCredentials = this._client.wrappedVcs.map((vc, index) => [index, JSON.stringify(vc.original)]);
        const updatedIndexes = [];
        userSelected.forEach((us, i) => {
            allCredentials.forEach((ac, j) => {
                if (ac[1] === us[1]) {
                    updatedIndexes.push([`$[${j}]`, `$[${i}]`]);
                }
            });
        });
        marked = marked
            .filter((m) => updatedIndexes.find((ui) => ui[0] === m.verifiable_credential_path))
            .map((m) => {
            const index = updatedIndexes.find((ui) => ui[0] === m.verifiable_credential_path);
            if (index) {
                m.verifiable_credential_path = index[1];
            }
            return m;
        });
        return [marked, updatedIndexes];
    }
    evaluateRequirements(submissionRequirement, marked, groupCount, level) {
        let total = 0;
        const result = [];
        for (const sr of submissionRequirement) {
            if (sr.from) {
                if (sr.rule === pex_models_1.Rules.All) {
                    const [count, matched] = this.countMatchingInputDescriptors(sr, marked);
                    if (count !== (groupCount.get(sr.from) || 0)) {
                        throw Error(`Not all input descriptors are members of group ${sr.from}`);
                    }
                    total++;
                    result.push(...matched);
                }
                else if (sr.rule === pex_models_1.Rules.Pick) {
                    const [count, matched] = this.countMatchingInputDescriptors(sr, marked);
                    try {
                        this.handleCount(sr, count, level);
                        total++;
                    }
                    catch (error) {
                        if (level === 0)
                            throw error;
                    }
                    result.push(...matched);
                }
            }
            else if (sr.from_nested) {
                const [count, matched] = this.evaluateRequirements(sr.from_nested, marked, groupCount, ++level);
                total += count;
                result.push(...matched);
                this.handleCount(sr, count, level);
            }
        }
        return [total, result];
    }
    countMatchingInputDescriptors(submissionRequirement, marked) {
        let count = 0;
        const matched = [];
        for (const m of marked) {
            if (m.payload.group.includes(submissionRequirement.from)) {
                matched.push(m);
                count++;
            }
        }
        return [count, matched];
    }
    handleCount(submissionRequirement, count, level) {
        if (submissionRequirement.count) {
            if (count !== submissionRequirement.count) {
                throw Error(`Count: expected: ${submissionRequirement.count} actual: ${count} at level: ${level}`);
            }
        }
        if (submissionRequirement.min) {
            if (count < submissionRequirement.min) {
                throw Error(`Min: expected: ${submissionRequirement.min} actual: ${count} at level: ${level}`);
            }
        }
        if (submissionRequirement.max) {
            if (count > submissionRequirement.max) {
                throw Error(`Max: expected: ${submissionRequirement.max} actual: ${count} at level: ${level}`);
            }
        }
    }
    removeDuplicateSubmissionRequirementMatches(matches) {
        return matches.filter((match, index) => {
            const _match = JSON.stringify(match);
            return (index ===
                matches.findIndex((obj) => {
                    return JSON.stringify(obj) === _match;
                }));
        });
    }
    fillSelectableCredentialsToVerifiableCredentialsMapping(selectResults, wrappedVcs) {
        var _a;
        if (selectResults) {
            (_a = selectResults.verifiableCredential) === null || _a === void 0 ? void 0 : _a.forEach((selectableCredential) => {
                var _a;
                const foundIndex = wrappedVcs.findIndex((wrappedVc) => ssi_types_1.CredentialMapper.areOriginalVerifiableCredentialsEqual(wrappedVc.original, selectableCredential));
                if (foundIndex === -1) {
                    throw new Error('index is not right');
                }
                (_a = selectResults.vcIndexes) === null || _a === void 0 ? void 0 : _a.push(foundIndex);
            });
        }
    }
    determineAreRequiredCredentialsPresent(presentationDefinition, matchSubmissionRequirements, parentMsr) {
        if (!matchSubmissionRequirements || !matchSubmissionRequirements.length) {
            return ConstraintUtils_1.Status.ERROR;
        }
        // collect child statuses
        const childStatuses = matchSubmissionRequirements.map((m) => this.determineSubmissionRequirementStatus(presentationDefinition, m));
        // decide status based on child statuses and parent's rule
        if (!parentMsr) {
            if (childStatuses.includes(ConstraintUtils_1.Status.ERROR)) {
                return ConstraintUtils_1.Status.ERROR;
            }
            else if (childStatuses.includes(ConstraintUtils_1.Status.WARN)) {
                return ConstraintUtils_1.Status.WARN;
            }
            else {
                return ConstraintUtils_1.Status.INFO;
            }
        }
        else {
            if (parentMsr.rule === pex_models_1.Rules.All && childStatuses.includes(ConstraintUtils_1.Status.ERROR)) {
                return ConstraintUtils_1.Status.ERROR;
            }
            const nonErrStatCount = childStatuses.filter((status) => status !== ConstraintUtils_1.Status.ERROR).length;
            if (parentMsr.count) {
                return parentMsr.count > nonErrStatCount ? ConstraintUtils_1.Status.ERROR : parentMsr.count < nonErrStatCount ? ConstraintUtils_1.Status.WARN : ConstraintUtils_1.Status.INFO;
            }
            else {
                if (parentMsr.min && parentMsr.min > nonErrStatCount) {
                    return ConstraintUtils_1.Status.ERROR;
                }
                else if (parentMsr.max && parentMsr.max < nonErrStatCount) {
                    return ConstraintUtils_1.Status.WARN;
                }
            }
        }
        return ConstraintUtils_1.Status.INFO;
    }
    determineSubmissionRequirementStatus(pd, m) {
        if (m.from && m.from_nested) {
            throw new Error('Invalid submission_requirement object: MUST contain either a from or from_nested property.');
        }
        if (!m.from && !m.from_nested && m.vc_path.length !== 1) {
            return ConstraintUtils_1.Status.ERROR;
        }
        if (m.from) {
            const groupCount = this.countGroupIDs(pd.input_descriptors, m.from);
            switch (m.rule) {
                case pex_models_1.Rules.All:
                    // Ensure that all descriptors associated with `m.from` are satisfied.
                    return m.vc_path.length === groupCount ? ConstraintUtils_1.Status.INFO : ConstraintUtils_1.Status.WARN;
                case pex_models_1.Rules.Pick:
                    return this.getPickRuleStatus(m);
                default:
                    return ConstraintUtils_1.Status.ERROR;
            }
        }
        else if (m.from_nested) {
            return this.determineAreRequiredCredentialsPresent(pd, m.from_nested, m);
        }
        return ConstraintUtils_1.Status.INFO;
    }
    getPickRuleStatus(m) {
        if (m.vc_path.length === 0) {
            return ConstraintUtils_1.Status.ERROR;
        }
        if (m.count && m.vc_path.length !== m.count) {
            return m.vc_path.length > m.count ? ConstraintUtils_1.Status.WARN : ConstraintUtils_1.Status.ERROR;
        }
        if (m.min && m.vc_path.length < m.min) {
            return ConstraintUtils_1.Status.ERROR;
        }
        if (m.max && m.vc_path.length > m.max) {
            return ConstraintUtils_1.Status.WARN;
        }
        return ConstraintUtils_1.Status.INFO;
    }
    updateSubmissionRequirementMatchPathToAlias(submissionRequirementMatch, alias) {
        const vc_path = [];
        submissionRequirementMatch.vc_path.forEach((m) => {
            vc_path.push(m.replace('$', '$.' + alias));
        });
        submissionRequirementMatch.vc_path = vc_path;
        if (submissionRequirementMatch.from_nested) {
            submissionRequirementMatch.from_nested.forEach((f) => {
                this.updateSubmissionRequirementMatchPathToAlias(f, alias);
            });
        }
    }
    updatePresentationSubmissionPathToVpPath(presentationSubmission) {
        const descriptorMap = presentationSubmission
            ? presentationSubmission.descriptor_map
            : this._client.generatePresentationSubmission
                ? this._client.presentationSubmission.descriptor_map
                : undefined;
        descriptorMap === null || descriptorMap === void 0 ? void 0 : descriptorMap.forEach((d) => {
            // NOTE: currently we only support a single VP for a single PD, so that means an SD-JWT will always have the path '$'.
            // If there is more consensus on whether a PD can result in one submission with multiple VPs, we could tweak this logic
            // to keep supporting arrays (so it will just stay as the input format) if there's multiple SD-JWTs that are included
            // in the presentation submission (we would allow the presentationFrom and verifiablePresentationFrom to just return
            // an array of VPs, while still one submission is returned. This will also help with creating multiple VPs for JWT credentials)
            // See https://github.com/decentralized-identity/presentation-exchange/issues/462
            // Also see: https://github.com/openid/OpenID4VP/issues/69
            if (d.format === 'vc+sd-jwt') {
                d.path = '$';
            }
            else {
                this.replacePathWithAlias(d, 'verifiableCredential');
            }
        });
    }
    replacePathWithAlias(descriptor, alias) {
        descriptor.path = descriptor.path.replace(`$[`, `$.${alias}[`);
        if (descriptor.path_nested) {
            this.replacePathWithAlias(descriptor.path_nested, alias);
        }
    }
    createIdToVcMap(marked) {
        const partitionedResults = new Map();
        const partitionedBasedOnId = new Map();
        for (let i = 0; i < marked.length; i++) {
            const currentIdPath = marked[i].input_descriptor_path;
            if (partitionedBasedOnId.has(currentIdPath)) {
                const partBasedOnId = partitionedBasedOnId.get(currentIdPath);
                if (partBasedOnId) {
                    partBasedOnId.push(marked[i]);
                }
            }
            else {
                partitionedBasedOnId.set(currentIdPath, [marked[i]]);
            }
        }
        for (const [idPath, sameVcCheckResults] of partitionedBasedOnId.entries()) {
            const vcPaths = [];
            for (let i = 0; i < sameVcCheckResults.length; i++) {
                if (vcPaths.indexOf(sameVcCheckResults[i].verifiable_credential_path) === -1) {
                    vcPaths.push(sameVcCheckResults[i].verifiable_credential_path);
                }
            }
            partitionedResults.set(idPath, vcPaths);
        }
        return partitionedResults;
    }
    countGroupIDs(input_descriptors, from) {
        let count = 0;
        for (const descriptor of input_descriptors) {
            if (descriptor.group && descriptor.group.includes(from)) {
                count++;
            }
        }
        return count;
    }
}
exports.EvaluationClientWrapper = EvaluationClientWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbkNsaWVudFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9ldmFsdWF0aW9uQ2xpZW50V3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBeUQ7QUFDekQscURBQXNKO0FBQ3RKLG1EQU02QjtBQUU3Qix3REFBcUQ7QUFDckQsd0NBQTREO0FBRTVELG9DQUFzRDtBQUd0RCx5REFBc0Q7QUFFdEQsTUFBYSx1QkFBdUI7SUFHbEM7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUNBQWdCLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sVUFBVSxDQUNmLHNCQUF1RCxFQUN2RCw0QkFBMkQsRUFDM0QsSUFLQzs7UUFFRCxJQUFJLGFBQTRCLENBQUM7UUFFakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEYsTUFBTSxRQUFRLEdBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sTUFBTSxHQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVoRSxJQUFJLHNCQUFzQixDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDbkQsTUFBTSxJQUFJLEdBQXlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDNUQsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssNkJBQTZCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sS0FB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