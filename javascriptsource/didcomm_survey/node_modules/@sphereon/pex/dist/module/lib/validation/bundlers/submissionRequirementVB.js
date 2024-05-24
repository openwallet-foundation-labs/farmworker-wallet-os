import { ValidationBundler } from './validationBundler';
export class SubmissionRequirementVB extends ValidationBundler {
    ruleIsMandatoryMsg = 'rule is a mandatory field';
    needsOneFromOrFromNestedMsg = 'needs exactly one of from or from_nested';
    fromNestedShouldBeArrayMsg = 'The value of the from_nested property MUST be an array';
    isCountPositiveIntMsg = 'count must be a practical positive number';
    isMinPositiveIntMsg = 'min must be a practical positive number';
    isMaxPositiveIntMsg = 'max must be a practical positive number';
    ruleShouldBePickOrAllMsg = 'rule should be either pick or all';
    constructor(parentTag) {
        super(parentTag, 'submission_requirements');
    }
    getValidations(srs) {
        let validations = [];
        if (srs != null && srs.length > 0) {
            for (let srInd = 0; srInd < srs.length; srInd++) {
                validations = [...validations, ...this.getMyValidations(srInd, srs), ...this.getSubValidations(srInd, srs)];
            }
        }
        return validations;
    }
    getMyValidations(srInd, srs) {
        return [
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: SubmissionRequirementVB.ruleIsMandatory,
                message: this.ruleIsMandatoryMsg,
            }, // Validation 4.2.1.A
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: SubmissionRequirementVB.needsOneFromOrFromNested,
                message: this.needsOneFromOrFromNestedMsg,
            }, // Validation 4.2.1.B.A
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: SubmissionRequirementVB.fromNestedShouldBeArray,
                message: this.fromNestedShouldBeArrayMsg,
            }, // Validation 4.2.1.D
            // TODO Validation 4.2.1.E All objects in from_nested should be of type SubmissionRequirement
            //      See if it can be implemented in pe-api yamls. currently in typescript type of this variable is 'any'
            //      i.e. from_nested?: Array<object>;
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: this.isCountPositiveInt,
                message: this.isCountPositiveIntMsg,
            }, // Validation 4.2.2.B.A.A
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: this.isMinPositiveInt,
                message: this.isMinPositiveIntMsg,
            }, // Validation 4.2.2.B.B.A
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: this.isMaxPositiveInt,
                message: this.isMaxPositiveIntMsg,
            }, // Validation 4.2.2.B.C.A
            {
                tag: this.getMyTag(srInd),
                target: srs[srInd],
                predicate: SubmissionRequirementVB.ruleShouldBePickOrAll,
                message: this.ruleShouldBePickOrAllMsg,
            }, // Validation 4.2.4
        ];
    }
    getMyTag(srInd) {
        // TODO extract to make it generic
        return this.parentTag + '.' + this.myTag + '[' + srInd + ']';
    }
    getSubValidations(srInd, srs) {
        const fromNested = srs[srInd].from_nested;
        return fromNested != null ? new SubmissionRequirementVB(this.getFromNestedTag(srInd)).getValidations(fromNested) : [];
    }
    getFromNestedTag(srInd) {
        return this.getMyTag(srInd) + '.' + 'from_nested';
    }
    isCountPositiveInt(sr) {
        return sr.rule !== 'pick' || sr.count == null || 0 < sr.count;
    }
    isMinPositiveInt(sr) {
        return sr.rule !== 'pick' || sr.min == null || 0 <= sr.min;
    }
    isMaxPositiveInt(sr) {
        return sr.rule !== 'pick' || sr.max == null || 0 < sr.max;
    }
    static ruleIsMandatory(sr) {
        return sr.rule != null;
    }
    static needsOneFromOrFromNested(sr) {
        return (sr.from == null) !== (sr.from_nested == null); // XOR
    }
    static fromNestedShouldBeArray(sr) {
        return sr.from_nested == null || Array.isArray(sr.from_nested);
    }
    static ruleShouldBePickOrAll(sr) {
        return sr.rule === 'pick' || sr.rule === 'all';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWlzc2lvblJlcXVpcmVtZW50VkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9zdWJtaXNzaW9uUmVxdWlyZW1lbnRWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQXdDO0lBQ2xFLGtCQUFrQixHQUFHLDJCQUEyQixDQUFDO0lBQ2pELDJCQUEyQixHQUFHLDBDQUEwQyxDQUFDO0lBQ3pFLDBCQUEwQixHQUFHLHdEQUF3RCxDQUFDO0lBQ3RGLHFCQUFxQixHQUFHLDJDQUEyQyxDQUFDO0lBQ3BFLG1CQUFtQixHQUFHLHlDQUF5QyxDQUFDO0lBQ2hFLG1CQUFtQixHQUFHLHlDQUF5QyxDQUFDO0lBQ2hFLHdCQUF3QixHQUFHLG1DQUFtQyxDQUFDO0lBRWhGLFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxjQUFjLENBQUMsR0FBNEI7UUFDaEQsSUFBSSxXQUFXLEdBQXdDLEVBQUUsQ0FBQztRQUMxRCxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNsQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNoRCxXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUcsQ0FBQztRQUNILENBQUM7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