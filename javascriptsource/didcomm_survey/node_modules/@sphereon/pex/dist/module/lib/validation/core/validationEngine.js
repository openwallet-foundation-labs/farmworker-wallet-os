import { validate } from './index';
export class ValidationEngine {
    validate(validators) {
        let validations = [];
        for (const validator of validators) {
            validations = validations.concat(validator.bundler.getValidations(validator.target));
        }
        return validate(validations);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbkVuZ2luZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2NvcmUvdmFsaWRhdGlvbkVuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsUUFBUSxFQUF5QixNQUFNLFNBQVMsQ0FBQztBQU8xRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFFBQVEsQ0FBQyxVQUEwQjtRQUNqQyxJQUFJLFdBQVcsR0FBb0IsRUFBRSxDQUFDO1FBRXRDLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFLENBQUM7WUFDbkMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUVELE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRiJ9