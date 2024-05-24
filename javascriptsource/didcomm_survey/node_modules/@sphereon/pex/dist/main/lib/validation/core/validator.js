"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ConstraintUtils_1 = require("../../ConstraintUtils");
const validate = (validations) => {
    const validateResults = validations.map((validation) => mapper(validation));
    function toChecked(validation) {
        return new ConstraintUtils_1.Checked(validation.tag, ConstraintUtils_1.Status.ERROR, validation.message);
    }
    function toCheckedSuccess(tag) {
        return new ConstraintUtils_1.Checked(tag, ConstraintUtils_1.Status.INFO, 'ok');
    }
    function mapper(validation) {
        let result;
        try {
            if (validation.predicate(validation.target)) {
                result = toCheckedSuccess(validation.tag);
            }
            else {
                result = toChecked(validation);
            }
        }
        catch (error) {
            result = toChecked(validation);
        }
        return result;
    }
    const accumulateErrors = (accumulator, checked) => {
        if (checked.status !== ConstraintUtils_1.Status.INFO) {
            accumulator.push(checked);
        }
        return accumulator;
    };
    const validated = validateResults.reduce(accumulateErrors, []);
    if ((0, ConstraintUtils_1.hasErrors)(validated)) {
        return validated;
    }
    else {
        return [toCheckedSuccess('root')];
    }
};
exports.validate = validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3ZhbGlkYXRpb24vY29yZS92YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQW1FO0FBZ0I1RCxNQUFNLFFBQVEsR0FBZ0IsQ0FBSSxXQUE0QixFQUFhLEVBQUU7SUFDbEYsTUFBTSxlQUFlLEdBQWMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFdkYsU0FBUyxTQUFTLENBQUMsVUFBeUI7UUFDMUMsT0FBTyxJQUFJLHlCQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSx3QkFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsR0FBVztRQUNuQyxPQUFPLElBQUkseUJBQU8sQ0FBQyxHQUFHLEVBQUUsd0JBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFNBQVMsTUFBTSxDQUFDLFVBQXlCO1FBQ3ZDLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxDQUFDO1lBQ0gsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUM1QyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsV0FBc0IsRUFBRSxPQUFnQixFQUFhLEVBQUU7UUFDL0UsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQWMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUxRSxJQUFJLElBQUEsMkJBQVMsRUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sU0FBc0IsQ0FBQztJQUNoQyxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7QUFDSCxDQUFDLENBQUM7QUF4Q1csUUFBQSxRQUFRLFlBd0NuQiJ9