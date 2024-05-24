import { Checked, hasErrors, Status } from '../../ConstraintUtils';
export const validate = (validations) => {
    const validateResults = validations.map((validation) => mapper(validation));
    function toChecked(validation) {
        return new Checked(validation.tag, Status.ERROR, validation.message);
    }
    function toCheckedSuccess(tag) {
        return new Checked(tag, Status.INFO, 'ok');
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
        if (checked.status !== Status.INFO) {
            accumulator.push(checked);
        }
        return accumulator;
    };
    const validated = validateResults.reduce(accumulateErrors, []);
    if (hasErrors(validated)) {
        return validated;
    }
    else {
        return [toCheckedSuccess('root')];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3ZhbGlkYXRpb24vY29yZS92YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFnQm5FLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZ0IsQ0FBSSxXQUE0QixFQUFhLEVBQUU7SUFDbEYsTUFBTSxlQUFlLEdBQWMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFdkYsU0FBUyxTQUFTLENBQUMsVUFBeUI7UUFDMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQVc7UUFDbkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsU0FBUyxNQUFNLENBQUMsVUFBeUI7UUFDdkMsSUFBSSxNQUFNLENBQUM7UUFFWCxJQUFJLENBQUM7WUFDSCxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUMsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxXQUFzQixFQUFFLE9BQWdCLEVBQWEsRUFBRTtRQUMvRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFjLGVBQWUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFMUUsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN6QixPQUFPLFNBQXNCLENBQUM7SUFDaEMsQ0FBQztTQUFNLENBQUM7UUFDTixPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=