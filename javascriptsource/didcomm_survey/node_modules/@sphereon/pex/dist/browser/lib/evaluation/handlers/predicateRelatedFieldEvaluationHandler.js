"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredicateRelatedFieldEvaluationHandler = void 0;
const pex_models_1 = require("@sphereon/pex-models");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const Messages_1 = __importDefault(require("../../types/Messages"));
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class PredicateRelatedFieldEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'PredicateRelatedFieldEvaluation';
    }
    handle(pd) {
        // PresentationDefinitionV2 is the common denominator
        pd.input_descriptors.forEach((inDesc, index) => {
            if (inDesc.constraints) {
                this.examinePredicateRelatedField(index, inDesc.constraints);
            }
        });
        // this.updatePresentationSubmission(pdV1);
    }
    examinePredicateRelatedField(input_descriptor_idx, constraints) {
        if (constraints === null || constraints === void 0 ? void 0 : constraints.fields) {
            for (let i = 0; i < constraints.fields.length; i++) {
                for (let j = 0; j < this.getResults().length; j++) {
                    this.examinePredicateForFilterEvaluationResult(this.getResults(), j, input_descriptor_idx, constraints, i);
                }
            }
        }
    }
    examinePredicateForFilterEvaluationResult(results, resultIdx, input_descriptor_idx, constraints, fieldIdx) {
        var _a;
        const resultInputDescriptorIdx = this.retrieveResultInputDescriptorIdx(results[resultIdx].input_descriptor_path);
        if (results[resultIdx].payload &&
            results[resultIdx].payload.result &&
            results[resultIdx].payload.result.path &&
            results[resultIdx].evaluator === 'FilterEvaluation' &&
            input_descriptor_idx === resultInputDescriptorIdx &&
            constraints &&
            constraints.fields &&
            constraints.fields[fieldIdx] &&
            constraints.fields[fieldIdx].predicate &&
            constraints.fields[fieldIdx].path &&
            ((_a = constraints.fields[fieldIdx].path) === null || _a === void 0 ? void 0 : _a.includes(this.concatenatePath(results[resultIdx].payload.result.path)))) {
            const evaluationResult = Object.assign({}, results[resultIdx].payload.result);
            const resultObject = this.createResultObject(input_descriptor_idx, resultIdx, evaluationResult, results);
            if (constraints.fields[fieldIdx].predicate === pex_models_1.Optionality.Required) {
                results.push(resultObject);
            }
            else {
                resultObject.payload['value'] = true;
                results.push(resultObject);
            }
        }
    }
    retrieveResultInputDescriptorIdx(input_descriptor_path) {
        const inputDescriptorText = '$.input_descriptors[';
        const startIdx = input_descriptor_path.indexOf(inputDescriptorText);
        const startWithIdx = input_descriptor_path.substring(startIdx + inputDescriptorText.length);
        const endIdx = startWithIdx.indexOf(']');
        const idx = startWithIdx.substring(0, endIdx);
        return parseInt(idx);
    }
    concatenatePath(path) {
        let completePath = '';
        for (let i = 0; i < path.length; i++) {
            if (typeof path[i] === 'number') {
                completePath = completePath.substring(0, completePath.length - 1);
                completePath += '[*].';
            }
            else {
                completePath += path[i] + '.';
            }
        }
        return completePath.substring(0, completePath.length - 1);
    }
    createResultObject(input_descriptor_idx, resultIdx, evaluationResult, results) {
        return {
            input_descriptor_path: `$.input_descriptors[${input_descriptor_idx}]`,
            verifiable_credential_path: results[resultIdx].verifiable_credential_path,
            evaluator: this.getName(),
            status: ConstraintUtils_1.Status.INFO,
            message: Messages_1.default.INPUT_CANDIDATE_IS_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
            payload: evaluationResult,
        };
    }
}
exports.PredicateRelatedFieldEvaluationHandler = PredicateRelatedFieldEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlUmVsYXRlZEZpZWxkRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9wcmVkaWNhdGVSZWxhdGVkRmllbGRFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBb0c7QUFFcEcsMkRBQStDO0FBRS9DLG9FQUErQztBQUkvQywyRUFBd0U7QUFFeEUsTUFBYSxzQ0FBdUMsU0FBUSxxREFBeUI7SUFDbkYsWUFBWSxNQUF3QjtRQUNsQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLGlDQUFpQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxNQUFNLENBQUMsRUFBbUM7UUFDL0MscURBQXFEO1FBQ3BELEVBQXVDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUM5RyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsMkNBQTJDO0lBQzdDLENBQUM7SUFFTyw0QkFBNEIsQ0FBQyxvQkFBNEIsRUFBRSxXQUEwQztRQUMzRyxJQUFJLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxNQUFNLEVBQUUsQ0FBQztZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUs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