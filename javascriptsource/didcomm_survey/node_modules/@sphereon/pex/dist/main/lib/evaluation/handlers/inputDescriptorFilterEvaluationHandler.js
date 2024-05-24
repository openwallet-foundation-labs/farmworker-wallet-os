"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDescriptorFilterEvaluationHandler = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const utils_1 = require("../../utils");
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
const AJV_FIELD_FILTER = new ajv_1.default({
    verbose: false,
    code: { source: false, lines: true, esm: false },
    allowUnionTypes: true,
    allErrors: true,
    strict: false,
});
(0, ajv_formats_1.default)(AJV_FIELD_FILTER);
class InputDescriptorFilterEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
        InputDescriptorFilterEvaluationHandler.keepCacheSizeInCheck();
    }
    getName() {
        return 'FilterEvaluation';
    }
    handle(pd, wrappedVcs) {
        const fields = jsonpath_1.JSONPath.nodes(pd, '$..fields[*]');
        wrappedVcs.forEach((wvc, vcIndex) => {
            this.createNoFieldResults(pd, vcIndex, wvc);
            fields.forEach((field) => {
                let inputField = [];
                if (field.value.path) {
                    inputField = utils_1.JsonPathUtils.extractInputField(wvc.decoded, field.value.path);
                }
                let resultFound = false;
                for (const inputFieldKey of inputField) {
                    if (this.evaluateFilter(inputFieldKey, field.value)) {
                        resultFound = true;
                        const payload = { result: Object.assign({}, inputField[0]), valid: true, format: wvc.format };
                        this.getResults().push(Object.assign({}, this.createResultObject(jsonpath_1.JSONPath.stringify(field.path.slice(0, 3)), vcIndex, payload)));
                    }
                }
                if (!resultFound) {
                    if (!inputField.length) {
                        const payload = { valid: false, format: wvc.format };
                        this.createResponse(field, vcIndex, payload, Messages_1.default.INPUT_CANDIDATE_DOESNT_CONTAIN_PROPERTY);
                    }
                    else {
                        const payload = { result: Object.assign({}, inputField[0]), valid: false, format: wvc.format };
                        this.createResponse(field, vcIndex, payload, Messages_1.default.INPUT_CANDIDATE_FAILED_FILTER_EVALUATION);
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
            .filter((el) => { var _a, _b, _c; return ((_a = el.inDesc.constraints) === null || _a === void 0 ? void 0 : _a.fields) === undefined || ((_c = (_b = el.inDesc.constraints) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c.length) === 0; });
        noFields.forEach((noField) => {
            const payload = { result: [], valid: true, format: credential.format };
            this.getResults().push(Object.assign({}, this.createResultObject(`$.input_descriptors[${noField.index}]`, vcIndex, payload)));
        });
    }
    createResponse(field, vcIndex, payload, message) {
        this.getResults().push(Object.assign(Object.assign({}, this.createResultObject(jsonpath_1.JSONPath.stringify(field.path.slice(0, 3)), vcIndex, payload)), { ['status']: ConstraintUtils_1.Status.ERROR, ['message']: message }));
    }
    createResultObject(path, vcIndex, payload) {
        return {
            input_descriptor_path: path,
            verifiable_credential_path: `$[${vcIndex}]`,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.INFO,
            message: Messages_1.default.INPUT_CANDIDATE_IS_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
            payload,
        };
    }
    evaluateFilter(result, field) {
        var _a, _b;
        if (((_a = field.filter) === null || _a === void 0 ? void 0 : _a.format) && field.filter.format === 'date') {
            this.transformDateFormat(result);
        }
        let evalResult = true;
        if (field.filter) {
            const successCacheKey = JSON.stringify({ filter: field.filter, value: result.value });
            const now = Date.now();
            evalResult = (_b = InputDescriptorFilterEvaluationHandler.FILTER_CACHE.get(successCacheKey)) === null || _b === void 0 ? void 0 : _b.value;
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
        var _a, _b, _c;
        const ttl = (_a = opts === null || opts === void 0 ? void 0 : opts.ttl) !== null && _a !== void 0 ? _a : InputDescriptorFilterEvaluationHandler.DEFAULT_FILTER_CACHE_TTL;
        const maxCacheSize = (_b = opts === null || opts === void 0 ? void 0 : opts.maxCacheSize) !== null && _b !== void 0 ? _b : InputDescriptorFilterEvaluationHandler.DEFAULT_MAX_FILTER_CACHE_SIZE;
        const resetCacheSize = (_c = opts === null || opts === void 0 ? void 0 : opts.resetCacheSize) !== null && _c !== void 0 ? _c : InputDescriptorFilterEvaluationHandler.DEFAULT_RESET_CACHE_SIZE;
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
exports.InputDescriptorFilterEvaluationHandler = InputDescriptorFilterEvaluationHandler;
InputDescriptorFilterEvaluationHandler.FILTER_CACHE = new Map();
InputDescriptorFilterEvaluationHandler.DEFAULT_MAX_FILTER_CACHE_SIZE = 100;
InputDescriptorFilterEvaluationHandler.DEFAULT_FILTER_CACHE_TTL = 1000 * 30; // 30 seconds
InputDescriptorFilterEvaluationHandler.DEFAULT_RESET_CACHE_SIZE = InputDescriptorFilterEvaluationHandler.DEFAULT_MAX_FILTER_CACHE_SIZE / 2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXREZXNjcmlwdG9yRmlsdGVyRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9pbnB1dERlc2NyaXB0b3JGaWx0ZXJFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBeUQ7QUFHekQsOENBQXNCO0FBQ3RCLDhEQUFxQztBQUVyQywyREFBK0M7QUFFL0Msb0VBQStDO0FBQy9DLHVDQUE0QztBQUk1QywyRUFBd0U7QUFFeEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGFBQUcsQ0FBQztJQUMvQixPQUFPLEVBQUUsS0FBSztJQUNkLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO0lBQ2hELGVBQWUsRUFBRSxJQUFJO0lBQ3JCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFDSCxJQUFBLHFCQUFVLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU3QixNQUFhLHNDQUF1QyxTQUFRLHFEQUF5QjtJQU1uRixZQUFZLE1BQXdCO1FBQ2xDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNkLHNDQUFzQyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLGtCQUFrQixDQUFDO0lBQzVCLENBQUM7SUFFTSxNQUFNLENBQUMsRUFBbUMsRUFBRSxVQUF5QztRQUMxRixNQUFNLE1BQU0sR0FBMEQsbUJBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ25HLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFnQyxFQUFFLE9BQWUsRUFBRSxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxF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