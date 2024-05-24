import { JSONPath as jp } from '@astronautlabs/jsonpath';
import { Optionality } from '@sphereon/pex-models';
import validateFilterv1 from '../validateFilterv1.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import validateFilterv2 from '../validateFilterv2.js';
import { ValidationBundler } from './validationBundler';
export class FieldsVB extends ValidationBundler {
    mustHaveValidJsonPathsMsg = 'field object "path" property must contain array of valid json paths';
    pathObjMustHaveValidJsonPathMsg = 'field object "path" property must contain valid json paths.';
    filterMustBeValidJsonSchemaMsg = 'field object "filter" property must be valid json schema';
    filterIsMustInPresenceOfPredicateMsg = 'field object must have a "filter" property if "predicate" is present';
    filterIsNotValidJsonSchemaDescriptorMsg = 'could not parse "filter" object as a valid json schema descriptor.';
    purposeShouldBeANonEmptyStringMsg = 'purpose should be a non empty string';
    shouldBeKnownOptionMsg = 'Unknown predicate property';
    constructor(parentTag) {
        super(parentTag, 'fields');
    }
    getValidations(fields) {
        let validations = [];
        if (fields) {
            for (let srInd = 0; srInd < fields.length; srInd++) {
                validations = [...validations, ...this.getValidationsFor(fields[srInd], srInd)];
            }
        }
        return validations;
    }
    getValidationsFor(field, indx) {
        return [
            {
                tag: this.getMyTag(indx),
                target: field,
                predicate: this.mustHaveValidJsonPaths(),
                message: this.mustHaveValidJsonPathsMsg,
            },
            {
                tag: this.getMyTag(indx),
                target: field,
                predicate: this.filterMustBeValidJsonSchema(),
                message: this.filterMustBeValidJsonSchemaMsg,
            },
            {
                tag: this.getMyTag(indx),
                target: field,
                predicate: this.filterIsMustInPresenceOfPredicate(),
                message: this.filterIsMustInPresenceOfPredicateMsg,
            },
            {
                tag: this.getMyTag(indx),
                target: field,
                predicate: (field) => FieldsVB.optionalNonEmptyString(field?.purpose),
                message: this.purposeShouldBeANonEmptyStringMsg,
            },
            {
                tag: this.getMyTag(indx),
                target: field,
                predicate: (field) => FieldsVB.shouldBeKnownOption(field?.predicate),
                message: this.shouldBeKnownOptionMsg,
            },
        ];
    }
    getMyTag(srInd) {
        // TODO extract to make it generic
        return this.parentTag + '.' + this.myTag + '[' + srInd + ']';
    }
    mustHaveValidJsonPaths() {
        return (fieldObj) => fieldObj.path != null && fieldObj.path.length > 0 && this._validateJsonPaths(fieldObj.path);
    }
    _validateJsonPaths(jsonPath) {
        const invalidPaths = [];
        jsonPath.forEach((path) => {
            try {
                jp.parse(path);
            }
            catch (err) {
                invalidPaths.push(path);
            }
        });
        if (invalidPaths.length > 0) {
            throw this.toChecked(this.pathObjMustHaveValidJsonPathMsg + ' Got: ' + JSON.stringify(invalidPaths));
        }
        return true;
    }
    filterMustBeValidJsonSchema() {
        return (fieldObj) => this._validateFilter(fieldObj.filter);
    }
    _validateFilter(filter) {
        if (filter == null) {
            return true;
        }
        let valid = false;
        try {
            valid = validateFilterv2(filter);
            if (!valid) {
                valid = validateFilterv1(filter);
            }
        }
        catch (err) {
            throw this.toChecked(this.filterIsNotValidJsonSchemaDescriptorMsg + ' Got ' + JSON.stringify(filter));
        }
        return valid;
    }
    filterIsMustInPresenceOfPredicate() {
        return (fieldObj) => !(fieldObj.predicate != null && fieldObj.filter == null);
    }
    static optionalNonEmptyString(str) {
        // TODO extract to generic utils or use something like lodash
        return str == null || str.length > 0;
    }
    static shouldBeKnownOption(option) {
        // TODO can be be extracted as a generic function
        return option == null || option == Optionality.Required || option == Optionality.Preferred;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9maWVsZHNWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxJQUFJLEVBQUUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBd0MsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFLekYsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiLE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxPQUFPLFFBQVMsU0FBUSxpQkFBd0M7SUFDbkQseUJBQXlCLEdBQUcscUVBQXFFLENBQUM7SUFDbEcsK0JBQStCLEdBQUcsNkRBQTZELENBQUM7SUFDaEcsOEJBQThCLEdBQUcsMERBQTBELENBQUM7SUFDNUYsb0NBQW9DLEdBQUcsc0VBQXNFLENBQUM7SUFDOUcsdUNBQXVDLEdBQUcsb0VBQW9FLENBQUM7SUFDL0csaUNBQWlDLEdBQUcsc0NBQXNDLENBQUM7SUFDM0Usc0JBQXNCLEdBQUcsNEJBQTRCLENBQUM7SUFFdkUsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxjQUFjLENBQUMsTUFBNkI7UUFDakQsSUFBSSxXQUFXLEdBQW9DLEVBQUUsQ0FBQztRQUN0RCxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1gsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDbkQsV0FBVyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMs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