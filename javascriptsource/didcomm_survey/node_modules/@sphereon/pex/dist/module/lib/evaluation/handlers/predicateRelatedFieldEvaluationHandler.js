import { Optionality } from '@sphereon/pex-models';
import { Status } from '../../ConstraintUtils';
import PexMessages from '../../types/Messages';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export class PredicateRelatedFieldEvaluationHandler extends AbstractEvaluationHandler {
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
        if (constraints?.fields) {
            for (let i = 0; i < constraints.fields.length; i++) {
                for (let j = 0; j < this.getResults().length; j++) {
                    this.examinePredicateForFilterEvaluationResult(this.getResults(), j, input_descriptor_idx, constraints, i);
                }
            }
        }
    }
    examinePredicateForFilterEvaluationResult(results, resultIdx, input_descriptor_idx, constraints, fieldIdx) {
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
            constraints.fields[fieldIdx].path?.includes(this.concatenatePath(results[resultIdx].payload.result.path))) {
            const evaluationResult = { ...results[resultIdx].payload.result };
            const resultObject = this.createResultObject(input_descriptor_idx, resultIdx, evaluationResult, results);
            if (constraints.fields[fieldIdx].predicate === Optionality.Required) {
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
            status: Status.INFO,
            message: PexMessages.INPUT_CANDIDATE_IS_ELIGIBLE_FOR_PRESENTATION_SUBMISSION,
            payload: evaluationResult,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlUmVsYXRlZEZpZWxkRXZhbHVhdGlvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvZXZhbHVhdGlvbi9oYW5kbGVycy9wcmVkaWNhdGVSZWxhdGVkRmllbGRFdmFsdWF0aW9uSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQW1ELFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBHLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQyxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUkvQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV4RSxNQUFNLE9BQU8sc0NBQXVDLFNBQVEseUJBQXlCO0lBQ25GLFlBQVksTUFBd0I7UUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxpQ0FBaUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQW1DO1FBQy9DLHFEQUFxRDtRQUNwRCxFQUF1QyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQXlCLEVBQUUsS0FBYSxFQUFFLEVBQUU7WUFDOUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9ELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILDJDQUEyQztJQUM3QyxDQUFDO0lBRU8sNEJBQTRCLENBQUMsb0JBQTRCLEVBQUUsV0FBMEM7UUFDM0csSUFBSSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxF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