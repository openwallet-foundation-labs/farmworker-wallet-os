import { JSONPath as jp } from '@astronautlabs/jsonpath';
import { Rules } from '@sphereon/pex-models';
import { CredentialMapper, } from '@sphereon/ssi-types';
import { Status } from '../ConstraintUtils';
import { PresentationSubmissionLocation } from '../signing';
import { JsonPathUtils, ObjectUtils } from '../utils';
import { EvaluationClient } from './evaluationClient';
export class EvaluationClientWrapper {
    _client;
    constructor() {
        this._client = new EvaluationClient();
    }
    getEvaluationClient() {
        return this._client;
    }
    selectFrom(presentationDefinition, wrappedVerifiableCredentials, opts) {
        let selectResults;
        this._client.evaluate(presentationDefinition, wrappedVerifiableCredentials, opts);
        const warnings = [...this.formatNotInfo(Status.WARN)];
        const errors = [...this.formatNotInfo(Status.ERROR)];
        if (presentationDefinition.submission_requirements) {
            const info = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.payload.group && result.status !== Status.ERROR);
            const marked = Array.from(new Set(info));
            let matchSubmissionRequirements;
            try {
                matchSubmissionRequirements = this.matchSubmissionRequirements(presentationDefinition, presentationDefinition.submission_requirements, marked);
            }
            catch (e) {
                const matchingError = { status: Status.ERROR, message: JSON.stringify(e), tag: 'matchSubmissionRequirements' };
                return {
                    errors: errors ? [...errors, matchingError] : [matchingError],
                    warnings: warnings,
                    areRequiredCredentialsPresent: Status.ERROR,
                };
            }
            const matches = this.extractMatches(matchSubmissionRequirements);
            const credentials = matches.map((e) => jp.nodes(this._client.wrappedVcs.map((wrapped) => wrapped.original), e)[0].value);
            const areRequiredCredentialsPresent = this.determineAreRequiredCredentialsPresent(presentationDefinition, matchSubmissionRequirements);
            selectResults = {
                errors: areRequiredCredentialsPresent === Status.INFO ? [] : errors,
                matches: [...matchSubmissionRequirements],
                areRequiredCredentialsPresent,
                verifiableCredential: credentials,
                warnings,
            };
        }
        else {
            const marked = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.status !== Status.ERROR);
            const checkWithoutSRResults = this.checkWithoutSubmissionRequirements(marked, presentationDefinition);
            if (!checkWithoutSRResults.length) {
                const matchSubmissionRequirements = this.matchWithoutSubmissionRequirements(marked, presentationDefinition);
                const matches = this.extractMatches(matchSubmissionRequirements);
                const credentials = matches.map((e) => jp.nodes(this._client.wrappedVcs.map((wrapped) => wrapped.original), e)[0].value);
                selectResults = {
                    errors: [],
                    matches: [...matchSubmissionRequirements],
                    areRequiredCredentialsPresent: Status.INFO,
                    verifiableCredential: credentials,
                    warnings,
                };
            }
            else {
                return {
                    errors: errors,
                    matches: [],
                    areRequiredCredentialsPresent: Status.ERROR,
                    verifiableCredential: wrappedVerifiableCredentials.map((value) => value.original),
                    warnings: warnings,
                };
            }
        }
        this.fillSelectableCredentialsToVerifiableCredentialsMapping(selectResults, wrappedVerifiableCredentials);
        selectResults.areRequiredCredentialsPresent = this.determineAreRequiredCredentialsPresent(presentationDefinition, selectResults?.matches);
        this.remapMatches(wrappedVerifiableCredentials.map((wrapped) => wrapped.original), selectResults.matches, selectResults?.verifiableCredential);
        selectResults.matches?.forEach((m) => {
            this.updateSubmissionRequirementMatchPathToAlias(m, 'verifiableCredential');
        });
        if (selectResults.areRequiredCredentialsPresent === Status.INFO) {
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
        submissionRequirementMatches?.forEach((srm) => {
            if (srm.from_nested) {
                this.remapMatches(verifiableCredentials, srm.from_nested, vcsToSend);
            }
            else {
                srm.vc_path.forEach((match, index, matches) => {
                    const vc = jp.query(verifiableCredentials, match)[0];
                    const newIndex = vcsToSend?.findIndex((svc) => JSON.stringify(svc) === JSON.stringify(vc));
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
                    status: Status.ERROR,
                    payload: `Not all the InputDescriptors are addressed`,
                },
            ];
        }
        const inputDescriptors = pd.input_descriptors;
        const markedInputDescriptorPaths = ObjectUtils.getDistinctFieldInObject(marked, 'input_descriptor_path');
        if (markedInputDescriptorPaths.length !== inputDescriptors.length) {
            const inputDescriptorsFromLogs = markedInputDescriptorPaths.map((value) => JsonPathUtils.extractInputField(pd, [value])[0].value).map((value) => value.id);
            for (let i = 0; i < pd.input_descriptors.length; i++) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (inputDescriptorsFromLogs.indexOf(pd.input_descriptors[i].id) == -1) {
                    checkResult.push({
                        input_descriptor_path: `$.input_descriptors[${i}]`,
                        evaluator: 'checkWithoutSubmissionRequirement',
                        verifiable_credential_path: '',
                        status: Status.ERROR,
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
                const idRes = JsonPathUtils.extractInputField(pd, [idPath]);
                if (idRes.length) {
                    submissionRequirementMatches.push({
                        name: idRes[0].value.name || idRes[0].value.id,
                        rule: Rules.All,
                        vc_path: [vcPath],
                    });
                }
            }
        }
        return this.removeDuplicateSubmissionRequirementMatches(submissionRequirementMatches);
    }
    mapMatchingDescriptors(pd, sr, marked) {
        const srm = { rule: sr.rule, vc_path: [] };
        if (sr?.from) {
            srm.from = sr.from;
            // updating the srm.name everytime and since we have only one, we're sending the last one
            for (const m of marked) {
                const inDesc = jp.query(pd, m.input_descriptor_path)[0];
                if (inDesc.group && inDesc.group.indexOf(sr.from) === -1) {
                    continue;
                }
                srm.name = inDesc.name || inDesc.id;
                if (m.payload.group.includes(sr.from)) {
                    if (srm.vc_path?.indexOf(m.verifiable_credential_path) === -1) {
                        srm.vc_path.push(m.verifiable_credential_path);
                    }
                }
            }
        }
        return srm;
    }
    evaluate(pd, wvcs, opts) {
        this._client.evaluate(pd, wvcs, opts);
        const result = {
            areRequiredCredentialsPresent: Status.INFO,
            // TODO: we should handle the string case
            verifiableCredential: wvcs.map((wrapped) => wrapped.original),
        };
        result.warnings = this.formatNotInfo(Status.WARN);
        result.errors = this.formatNotInfo(Status.ERROR);
        this._client.assertPresentationSubmission();
        if (this._client.presentationSubmission?.descriptor_map.length) {
            const len = this._client.presentationSubmission?.descriptor_map.length;
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
        result.areRequiredCredentialsPresent = result.value?.descriptor_map?.length ? Status.INFO : Status.ERROR;
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
            const marked = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.payload.group && result.status !== Status.ERROR);
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
            if (opts?.presentationSubmissionLocation === PresentationSubmissionLocation.EXTERNAL) {
                this.updatePresentationSubmissionToExternal();
            }
            return this._client.presentationSubmission;
        }
        const marked = this._client.results.filter((result) => result.evaluator === 'MarkForSubmissionEvaluation' && result.status !== Status.ERROR);
        const updatedIndexes = this.matchUserSelectedVcs(marked, vcs);
        this.updatePresentationSubmission(updatedIndexes[1]);
        this.updatePresentationSubmissionPathToVpPath();
        if (opts?.presentationSubmissionLocation === PresentationSubmissionLocation.EXTERNAL) {
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
            const nestedDescriptor = { ...descriptor };
            nestedDescriptor.path_nested = { ...descriptor };
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
                if (sr.rule === Rules.All) {
                    const [count, matched] = this.countMatchingInputDescriptors(sr, marked);
                    if (count !== (groupCount.get(sr.from) || 0)) {
                        throw Error(`Not all input descriptors are members of group ${sr.from}`);
                    }
                    total++;
                    result.push(...matched);
                }
                else if (sr.rule === Rules.Pick) {
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
        if (selectResults) {
            selectResults.verifiableCredential?.forEach((selectableCredential) => {
                const foundIndex = wrappedVcs.findIndex((wrappedVc) => CredentialMapper.areOriginalVerifiableCredentialsEqual(wrappedVc.original, selectableCredential));
                if (foundIndex === -1) {
                    throw new Error('index is not right');
                }
                selectResults.vcIndexes?.push(foundIndex);
            });
        }
    }
    determineAreRequiredCredentialsPresent(presentationDefinition, matchSubmissionRequirements, parentMsr) {
        if (!matchSubmissionRequirements || !matchSubmissionRequirements.length) {
            return Status.ERROR;
        }
        // collect child statuses
        const childStatuses = matchSubmissionRequirements.map((m) => this.determineSubmissionRequirementStatus(presentationDefinition, m));
        // decide status based on child statuses and parent's rule
        if (!parentMsr) {
            if (childStatuses.includes(Status.ERROR)) {
                return Status.ERROR;
            }
            else if (childStatuses.includes(Status.WARN)) {
                return Status.WARN;
            }
            else {
                return Status.INFO;
            }
        }
        else {
            if (parentMsr.rule === Rules.All && childStatuses.includes(Status.ERROR)) {
                return Status.ERROR;
            }
            const nonErrStatCount = childStatuses.filter((status) => status !== Status.ERROR).length;
            if (parentMsr.count) {
                return parentMsr.count > nonErrStatCount ? Status.ERROR : parentMsr.count < nonErrStatCount ? Status.WARN : Status.INFO;
            }
            else {
                if (parentMsr.min && parentMsr.min > nonErrStatCount) {
                    return Status.ERROR;
                }
                else if (parentMsr.max && parentMsr.max < nonErrStatCount) {
                    return Status.WARN;
                }
            }
        }
        return Status.INFO;
    }
    determineSubmissionRequirementStatus(pd, m) {
        if (m.from && m.from_nested) {
            throw new Error('Invalid submission_requirement object: MUST contain either a from or from_nested property.');
        }
        if (!m.from && !m.from_nested && m.vc_path.length !== 1) {
            return Status.ERROR;
        }
        if (m.from) {
            const groupCount = this.countGroupIDs(pd.input_descriptors, m.from);
            switch (m.rule) {
                case Rules.All:
                    // Ensure that all descriptors associated with `m.from` are satisfied.
                    return m.vc_path.length === groupCount ? Status.INFO : Status.WARN;
                case Rules.Pick:
                    return this.getPickRuleStatus(m);
                default:
                    return Status.ERROR;
            }
        }
        else if (m.from_nested) {
            return this.determineAreRequiredCredentialsPresent(pd, m.from_nested, m);
        }
        return Status.INFO;
    }
    getPickRuleStatus(m) {
        if (m.vc_path.length === 0) {
            return Status.ERROR;
        }
        if (m.count && m.vc_path.length !== m.count) {
            return m.vc_path.length > m.count ? Status.WARN : Status.ERROR;
        }
        if (m.min && m.vc_path.length < m.min) {
            return Status.ERROR;
        }
        if (m.max && m.vc_path.length > m.max) {
            return Status.WARN;
        }
        return Status.INFO;
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
        descriptorMap?.forEach((d) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbkNsaWVudFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9ldmFsdWF0aW9uQ2xpZW50V3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBb0YsS0FBSyxFQUF5QixNQUFNLHNCQUFzQixDQUFDO0FBQ3RKLE9BQU8sRUFDTCxnQkFBZ0IsR0FLakIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQVcsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVELE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXRELE1BQU0sT0FBTyx1QkFBdUI7SUFDMUIsT0FBTyxDQUFtQjtJQUVsQztRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxVQUFVLENBQ2Ysc0JBQXVELEVBQ3ZELDRCQUEyRCxFQUMzRCxJQUtDO1FBRUQsSUFBSSxhQUE0QixDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sUUFBUSxHQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sTUFBTSxHQUFjLENBQUMsR0FBRyxJQUFJLENB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