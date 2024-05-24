import { ObjectValidationUtils } from '../../utils';
import { ConstraintsVB } from './constraintsVB';
import { ValidationBundler } from './validationBundler';
export class InputDescriptorsV2VB extends ValidationBundler {
    idMustBeNonEmptyStringMsg = 'input descriptor id must be non-empty string';
    nameShouldBeNonEmptyStringMsg = 'input descriptor name should be non-empty string';
    purposeShouldBeNonEmptyStringMsg = 'input descriptor purpose should be non-empty string';
    constructor(parentTag) {
        super(parentTag, 'input_descriptor');
    }
    getValidations(inputDescriptors) {
        let validations = [];
        validations.push({
            tag: this.getTag(),
            target: inputDescriptors,
            predicate: (inDescs) => this.shouldNotHaveSchema(inDescs),
            message: 'input descriptor should not have schema property',
        }, {
            tag: this.getTag(),
            target: inputDescriptors,
            predicate: (inDescs) => this.shouldHaveUniqueIds(inDescs),
            message: 'input descriptor ids must be unique',
        }, {
            tag: this.getTag(),
            target: inputDescriptors,
            predicate: (inDescs) => this.shouldHaveUniqueFieldsIds(inDescs),
            message: 'fields id must be unique',
        });
        inputDescriptors.forEach((inputDescriptor, inDescInd) => {
            validations = [
                ...validations,
                ...this.getValidationFor(inputDescriptor, inDescInd),
                ...this.constraintsValidations(inputDescriptor, inDescInd),
            ];
        });
        return validations;
    }
    getValidationFor(inputDescriptor, inDescInd) {
        return [
            {
                tag: this.getMyTag(inDescInd),
                target: inputDescriptor,
                predicate: (inDesc) => ObjectValidationUtils.nonEmptyString(inDesc?.id),
                message: this.idMustBeNonEmptyStringMsg,
            },
            {
                tag: this.getMyTag(inDescInd),
                target: inputDescriptor,
                predicate: (inDesc) => ObjectValidationUtils.optionalNonEmptyString(inDesc?.name),
                message: this.nameShouldBeNonEmptyStringMsg,
            },
            {
                tag: this.getMyTag(inDescInd),
                target: inputDescriptor,
                predicate: (inDesc) => ObjectValidationUtils.optionalNonEmptyString(inDesc?.purpose),
                message: this.purposeShouldBeNonEmptyStringMsg,
            },
        ];
    }
    shouldHaveUniqueFieldsIds(inputDescriptors) {
        const nonUniqueInputDescriptorFieldsIds = [];
        const uniqueInputDescriptorFieldsIds = new Set();
        const tmp = [];
        inputDescriptors
            .map((e) => e.constraints?.fields)
            .forEach((e) => {
            if (e) {
                tmp.push(...e);
            }
        });
        tmp.forEach((e) => {
            if (e.id) {
                nonUniqueInputDescriptorFieldsIds.push(e.id);
            }
        });
        nonUniqueInputDescriptorFieldsIds.forEach((id) => uniqueInputDescriptorFieldsIds.add(id));
        return nonUniqueInputDescriptorFieldsIds.length === uniqueInputDescriptorFieldsIds.size;
    }
    shouldHaveUniqueIds(inputDescriptors) {
        const nonUniqueInputDescriptorIds = [];
        const uniqueInputDescriptorIds = new Set();
        inputDescriptors.forEach((e) => nonUniqueInputDescriptorIds.push(e.id));
        nonUniqueInputDescriptorIds.forEach((e) => uniqueInputDescriptorIds.add(e));
        return nonUniqueInputDescriptorIds.length === uniqueInputDescriptorIds.size;
    }
    getMyTag(srInd) {
        // TODO extract to make it generic
        return this.parentTag + '.' + this.myTag + '[' + srInd + ']';
    }
    constraintsValidations(inputDescriptor, inDescInd) {
        if (inputDescriptor.constraints) {
            return new ConstraintsVB(this.getMyTag(inDescInd)).getValidations(inputDescriptor.constraints);
        }
        return [];
    }
    shouldNotHaveSchema(inputDescriptors) {
        let hasSchema = false;
        inputDescriptors.forEach((id) => {
            if (id['schema']) {
                hasSchema = true;
            }
        });
        return !hasSchema;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXREZXNjcmlwdG9yc1YyVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9pbnB1dERlc2NyaXB0b3JzVjJWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxpQkFBc0M7SUFDN0QseUJBQXlCLEdBQUcsOENBQThDLENBQUM7SUFDM0UsNkJBQTZCLEdBQUcsa0RBQWtELENBQUM7SUFDbkYsZ0NBQWdDLEdBQUcscURBQXFELENBQUM7SUFFMUcsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLGNBQWMsQ0FDbkIsZ0JBQXFDO1FBUXJDLElBQUksV0FBVyxHQU1ULEVBQUUsQ0FBQztRQUVULFdBQVcsQ0FBQyxJQUFJLENBQ2Q7WUFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLE9BQTRCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDOUUsT0FBTyxFQUFFLGtEQUFrRDtTQUM1RCxFQUNEO1lBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEIsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixTQUFTLEVBQUUsQ0FBQyxPQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO1lBQzlFLE9BQU8sRUFBRSxxQ0FBcUM7U0FDL0MsRUFDRDtZ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