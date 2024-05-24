import { JSONPath as jp } from '@astronautlabs/jsonpath';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { JsonPathUtils } from '../../utils';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
const AJV_FIELD_FILTER = new Ajv({
    verbose: false,
    code: { source: false, lines: true, esm: false },
    allowUnionTypes: true,
    allErrors: true,
    strict: false,
});
addFormats(AJV_FIELD_FILTER);
export class InputDescriptorFilterEvaluationHandler extends AbstractEvaluationHandler {
    static FILTER_CACHE = new Map();
    static DEFAULT_MAX_FILTER_CACHE_SIZE = 100;
    static DEFAULT_FILTER_CACHE_TTL = 1000 * 30; // 30 seconds
    static DEFAULT_RESET_CACHE_SIZE = InputDescriptorFilterEvaluationHandler.DEFAULT_MAX_FILTER_CACHE_SIZE / 2;
    constructor(client) {
        super(client);
        InputDescriptorFilterEvaluationHandler.keepCacheSizeInCheck();
    }
    getName() {
        return 'FilterEvaluation';
    }
    handle(pd, wrappedVcs) {
        const fields = jp.nodes(pd, '$..fields[*]');
        wrappedVcs.forEach((wvc, vcIndex) => {
            this.createNoFieldResults(pd, vcIndex, wvc);
            fields.forEach((field) => {
                let inputField = [];
                if (field.value.path) {
                    inputField = JsonPathUtils.extractInputField(wvc.decoded, field.value.path);
                }
                let resultFound = false;
                for (const inputFieldKey of inputField) {
                    if (this.evaluateFilter(inputFieldKey, field.value)) {
                        resultFound = true;
                        const payload = { result: { ...inputField[0] }, valid: true, format: wvc.format };
                        this.getResults().push({
                            ...this.createResultObject(jp.stringify(field.path.slice(0, 3)), vcIndex, payload),
                        });
                    }
                }
                if (!resultFound) {
                    if (!inputField.length) {
                        const payload = { valid: false, format: wvc.format };
                        this.createResponse(field, vcIndex, payload, PexMessages.INPUT_CANDIDATE_DOESNT_CONTAIN_PROPERTY);
                    }
                    else {
                        const payload = { result: { ...inputField[0] }, valid: false, format: wvc.format };
                        this.createResponse(field, vcIndex, payload, PexMessages.INPUT_CANDIDATE_FAILED_FILTER_EVALUATION);
                    }
                }
            });
        });
        this.updatePresentationSubmission(pd);
    }
    createNoFieldResults(pd, vcIndex, credential) {
        // PresentationDefinitionV2 is the common denominator
        const noFields = pd.input_descriptors
            .map((inDesc, index) => {
            return { index, inDesc };
        })
            .filter((el) => el.inDesc.constraints?.fields === undefined || el.inDesc.constraints?.fields?.length === 0);
        noFields.forEach((noField) => {
            const payload = { result: [], valid: true, format: credential.format };
            this.getResults().push({
                ...this.createResultObject(`$.input_descriptors[${noField.index}]`, vcIndex, payload),
            });
        });
    }
    createResponse(field, vcIndex, payload, message) {
        this.getResults().push({
            // TODO: why does this code assume a path to contain certain elements in the path?
            ...this.createResultObject(jp.stringify(field.path.slice(0, 3)), vcIndex, payload),
            ['status']: Status.ERROR,
            ['message']: message,
        });
    }
    createResultObject(path, vcIndex, payload) {
        return {
            input_descriptor_path: path,
            verifiable_credential_path: `$[${vcIndex}]`,
            evaluator: this.getName(),
            status: Status.INFO,
            message: PexMessages.INPUT_CANDIDATE_IS_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
            payload,
        };
    }
    evaluateFilter(result, field) {
        if (field.filter?.format && field.filter.format === 'date') {
            this.transformDateFormat(result);
        }
        let evalResult = true;
        if (field.filter) {
            const successCacheKey = JSON.stringify({ filter: field.filter, value: result.value });
            const now = Date.now();
            evalResult = InputDescriptorFilterEvaluationHandler.FILTER_CACHE.get(successCacheKey)?.value;
            if (evalResult === undefined) {
                InputDescriptorFilterEvaluationHandler.keepCacheSizeInCheck();
                evalResult = AJV_FIELD_FILTER.validate(field.filter, result.value);
                InputDescriptorFilterEvaluationHandler.FILTER_CACHE.set(successCacheKey, {
                    value: evalResult,
                    ts: now + InputDescriptorFilterEvaluationHandler.DEFAULT_FILTER_CACHE_TTL,
                });
            }
        }
        return evalResult;
    }
    transformDateFormat(result) {
        const date = new Date(result.value);
        let month = date.getUTCMonth() + 1 + '';
        if (month.length === 1) {
            month = '0' + month;
        }
        let day = date.getUTCDate() + '';
        if (day.length === 1) {
            day = '0' + day;
        }
        result.value = date.getUTCFullYear() + '-' + month + '-' + day;
        result.value = date.toISOString().substring(0, date.toISOString().indexOf('T'));
    }
    static keepCacheSizeInCheck(opts) {
        const ttl = opts?.ttl ?? InputDescriptorFilterEvaluationHandler.DEFAULT_FILTER_CACHE_TTL;
        const maxCacheSize = opts?.maxCacheSize ?? InputDescriptorFilterEvaluationHandler.DEFAULT_MAX_FILTER_CACHE_SIZE;
        const resetCacheSize = opts?.resetCacheSize ?? InputDescriptorFilterEvaluationHandler.DEFAULT_RESET_CACHE_SIZE;
        const now = Date.now();
        for (const [key, result] of InputDescriptorFilterEvaluationHandler.FILTER_CACHE) {
            if (result.ts + ttl < now) {
                InputDescriptorFilterEvaluationHandler.FILTER_CACHE.delete(key);
            }
        }
        const size = InputDescriptorFilterEvaluationHandler.FILTER_CACHE.size;
        if (size > maxCacheSize) {
            const keys = InputDescriptorFilterEvaluationHandler.FILTER_CACHE.keys();
            // Since we cannot use a WeakMap, as the key is constructed on the fly and thus has no references, we need to clear the cache to avoid memory leaks
            for (let nr = 0; nr < size - resetCacheSize; nr++) {
                // would be wise to have sorted on oldest ts
                InputDescriptorFilterEvaluationHandler.FILTER_CACHE.delete(keys.next().value);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXREZXNjcmlwdG9yRmlsdGVyRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9pbnB1dERlc2NyaXB0b3JGaWx0ZXJFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3pELE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQztBQUN0QixPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFFckMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJNUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFeEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUMvQixPQUFPLEVBQUUsS0FBSztJQUNkLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0lBQ2hELGVBQWUsRUFBRSxJQUFJO0lBQ3JCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU3QixNQUFNLE9BQU8sc0NBQXVDLFNBQVEseUJBQXlCO0lBQzNFLE1BQU0sQ0FBQyxZQUFZLEdBQWdELElBQUksR0FBRyxFQUFFLENBQUM7SUFDN0UsTUFBTSxDQUFDLDZCQUE2QixHQUFHLEdBQUcsQ0FBQztJQUMzQyxNQUFNLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWE7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