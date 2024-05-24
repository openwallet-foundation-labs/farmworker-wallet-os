"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRequirementVB = void 0;
const validationBundler_1 = require("./validationBundler");
class SubmissionRequirementVB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'submission_requirements');
        this.ruleIsMandatoryMsg = 'rule is a mandatory field';
        this.needsOneFromOrFromNestedMsg = 'needs exactly one of from or from_nested';
        this.fromNestedShouldBeArrayMsg = 'The value of the from_nested property MUST be an array';
        this.isCountPositiveIntMsg = 'count must be a practical positive number';
        this.isMinPositiveIntMsg = 'min must be a practical positive number';
        this.isMaxPositiveIntMsg = 'max must be a practical positive number';
        this.ruleShouldBePickOrAllMsg = 'rule should be either pick or all';
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
exports.SubmissionRequirementVB = SubmissionRequirementVB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWlzc2lvblJlcXVpcmVtZW50VkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9zdWJtaXNzaW9uUmVxdWlyZW1lbnRWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSwyREFBd0Q7QUFFeEQsTUFBYSx1QkFBd0IsU0FBUSxxQ0FBd0M7SUFTbkYsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFUN0IsdUJBQWtCLEdBQUcsMkJBQTJCLENBQUM7UUFDakQsZ0NBQTJCLEdBQUcsMENBQTBDLENBQUM7UUFDekUsK0JBQTBCLEdBQUcsd0RBQXdELENBQUM7UUFDdEYsMEJBQXFCLEdBQUcsMkNBQTJDLENBQUM7UUFDcEUsd0JBQW1CLEdBQUcseUNBQXlDLENBQUM7UUFDaEUsd0JBQW1CLEdBQUcseUNBQXlDLENBQUM7UUFDaEUsNkJBQXdCLEdBQUcsbUNBQW1DLENBQUM7SUFJaEYsQ0FBQztJQUVNLGNBQWMsQ0FBQyxHQUE0QjtRQUNoRCxJQUFJLFdBQVcsR0FBd0MsRUFBRSxDQUFDO1FBQzFELElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2xDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2hELFdBQVcsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5RyxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsR0FBNEI7UUFDbEUsT0FBTztZQUNMO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxlQUFlO2dCQUNsRCxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjthQUNqQyxFQUFFLHFCQUFxQjtZQUN4QjtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsdUJBQXVCLENBQUMsd0JBQXdCO2dCQUMzRCxPQUFPLEVBQUUsSUFBSSxDQUFDLDJCQUEyQjthQUMxQyxFQUFFLHVCQUF1QjtZQUMxQjtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsdUJBQXVCLENBQUMsdUJBQXVCO2dCQUMxRCxPQUFPLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjthQUN6QyxFQUFFLHFCQUFxQjtZQUV4Qiw2RkFBNkY7WUFDN0YsNEdBQTRHO1lBQzVHLHlDQUF5QztZQUV6QztnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtnQkFDbEMsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUI7YUFDcEMsRUFBRSx5QkFBeUI7WUFDNUI7Z0JBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUN6QixNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7Z0JBQ2hDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CO2FBQ2xDLEVBQUUseUJBQXlCO1lBQzVCO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDekIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2dCQUNoQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjthQUNsQyxFQUFFLHlCQUF5QjtZQUM1QjtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsdUJBQXVCLENBQUMscUJBQXFCO2dCQUN4RCxPQUFPLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjthQUN2QyxFQUFFLG1CQUFtQjtTQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVTLFFBQVEsQ0FBQyxLQUFhO1FBQzlCLGtDQUFrQztRQUNsQyxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDL0QsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQWEsRUFBRSxHQUE0QjtRQUNuRSxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBc0MsQ0FBQztRQUNyRSxPQUFPLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEgsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEtBQWE7UUFDcEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxhQUFhLENBQUM7SUFDcEQsQ0FBQztJQUVELGtCQUFrQixDQUFDLEVBQXlCO1FBQzFDLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDaEUsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQXlCO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDN0QsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQXlCO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDNUQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBeUI7UUFDdEQsT0FBTyxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRU8sTUFBTSxDQUFDLHdCQUF3QixDQUFDLEVBQXlCO1FBQy9ELE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU07SUFDL0QsQ0FBQztJQUVPLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxFQUF5QjtRQUM5RCxPQUFPLEVBQUUsQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTyxNQUFNLENBQUMscUJBQXFCLENBQUMsRUFBeUI7UUFDNUQsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7QUFwSEQsMERBb0hDIn0=