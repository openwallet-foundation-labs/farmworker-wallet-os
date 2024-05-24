import { ObjectValidationUtils } from '../../utils';
import { ConstraintsVB } from './constraintsVB';
import { ValidationBundler } from './validationBundler';
export class InputDescriptorsV1VB extends ValidationBundler {
    idMustBeNonEmptyStringMsg = 'input descriptor id must be non-empty string';
    nameShouldBeNonEmptyStringMsg = 'input descriptor name should be non-empty string';
    purposeShouldBeNonEmptyStringMsg = 'input descriptor purpose should be non-empty string';
    shouldHaveValidSchemaURIMsg = 'schema should have valid URI';
    constructor(parentTag) {
        super(parentTag, 'input_descriptor');
    }
    getValidations(inputDescriptors) {
        let validations = [];
        validations.push({
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
                predicate: this.isValidSchema(),
                message: this.shouldHaveValidSchemaURIMsg,
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
    isValidSchema() {
        // TODO extract to generic util or use built-in method
        return (inDesc) => {
            return (inDesc.schema.filter((schema) => this.isAValidURI(schema.uri) && (schema.required == null || typeof schema.required == 'boolean'))
                .length > 0);
        };
    }
    isAValidURI(uri) {
        if (!uri) {
            return false;
        }
        else if (!ObjectValidationUtils.nonEmptyString(uri)) {
            return false;
        }
        if (uri.startsWith('http://') || uri.startsWith('https://')) {
            try {
                new URL(uri);
            }
            catch (err) {
                return ObjectValidationUtils.isValidDIDURI(uri);
            }
        }
        return true;
    }
    constraintsValidations(inputDescriptor, inDescInd) {
        if (inputDescriptor.constraints) {
            return new ConstraintsVB(this.getMyTag(inDescInd)).getValidations(inputDescriptor.constraints);
        }
        return [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXREZXNjcmlwdG9yc1YxVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9pbnB1dERlc2NyaXB0b3JzVjFWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxpQkFBc0M7SUFDN0QseUJBQXlCLEdBQUcsOENBQThDLENBQUM7SUFDM0UsNkJBQTZCLEdBQUcsa0RBQWtELENBQUM7SUFDbkYsZ0NBQWdDLEdBQUcscURBQXFELENBQUM7SUFDekYsMkJBQTJCLEdBQUcsOEJBQThCLENBQUM7SUFFOUUsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLGNBQWMsQ0FDbkIsZ0JBQXFDO1FBUXJDLElBQUksV0FBVyxHQU1ULEVBQUUsQ0FBQztRQUVULFdBQVcsQ0FBQyxJQUFJLENBQ2Q7WUFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLE9BQTRCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDOUUsT0FBTyxFQUFFLHFDQUFxQztTQUMvQyxFQUNEO1lBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEIsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixTQUFTLEVBQUUsQ0FBQyxPQUE0QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDO1lBQ3BG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