"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDescriptorsV1VB = void 0;
const utils_1 = require("../../utils");
const constraintsVB_1 = require("./constraintsVB");
const validationBundler_1 = require("./validationBundler");
class InputDescriptorsV1VB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'input_descriptor');
        this.idMustBeNonEmptyStringMsg = 'input descriptor id must be non-empty string';
        this.nameShouldBeNonEmptyStringMsg = 'input descriptor name should be non-empty string';
        this.purposeShouldBeNonEmptyStringMsg = 'input descriptor purpose should be non-empty string';
        this.shouldHaveValidSchemaURIMsg = 'schema should have valid URI';
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
                predicate: (inDesc) => utils_1.ObjectValidationUtils.nonEmptyString(inDesc === null || inDesc === void 0 ? void 0 : inDesc.id),
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
                predicate: (inDesc) => utils_1.ObjectValidationUtils.optionalNonEmptyString(inDesc === null || inDesc === void 0 ? void 0 : inDesc.name),
                message: this.nameShouldBeNonEmptyStringMsg,
            },
            {
                tag: this.getMyTag(inDescInd),
                target: inputDescriptor,
                predicate: (inDesc) => utils_1.ObjectValidationUtils.optionalNonEmptyString(inDesc === null || inDesc === void 0 ? void 0 : inDesc.purpose),
                message: this.purposeShouldBeNonEmptyStringMsg,
            },
        ];
    }
    shouldHaveUniqueFieldsIds(inputDescriptors) {
        const nonUniqueInputDescriptorFieldsIds = [];
        const uniqueInputDescriptorFieldsIds = new Set();
        const tmp = [];
        inputDescriptors
            .map((e) => { var _a; return (_a = e.constraints) === null || _a === void 0 ? void 0 : _a.fields; })
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
        else if (!utils_1.ObjectValidationUtils.nonEmptyString(uri)) {
            return false;
        }
        if (uri.startsWith('http://') || uri.startsWith('https://')) {
            try {
                new URL(uri);
            }
            catch (err) {
                return utils_1.ObjectValidationUtils.isValidDIDURI(uri);
            }
        }
        return true;
    }
    constraintsValidations(inputDescriptor, inDescInd) {
        if (inputDescriptor.constraints) {
            return new constraintsVB_1.ConstraintsVB(this.getMyTag(inDescInd)).getValidations(inputDescriptor.constraints);
        }
        return [];
    }
}
exports.InputDescriptorsV1VB = InputDescriptorsV1VB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXREZXNjcmlwdG9yc1YxVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9pbnB1dERlc2NyaXB0b3JzVjFWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBb0Q7QUFHcEQsbURBQWdEO0FBQ2hELDJEQUF3RDtBQUV4RCxNQUFhLG9CQUFxQixTQUFRLHFDQUFzQztJQU05RSxZQUFZLFNBQWlCO1FBQzNCLEtBQUssQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQU50Qiw4QkFBeUIsR0FBRyw4Q0FBOEMsQ0FBQztRQUMzRSxrQ0FBNkIsR0FBRyxrREFBa0QsQ0FBQztRQUNuRixxQ0FBZ0MsR0FBRyxxREFBcUQsQ0FBQztRQUN6RixnQ0FBMkIsR0FBRyw4QkFBOEIsQ0FBQztJQUk5RSxDQUFDO0lBRU0sY0FBYyxDQUNuQixnQkFBcUM7UUFRckMsSUFBSSxXQUFXLEdBTVQsRUFBRSxDQUFDO1FBRVQsV0FBVyxDQUFDLElBQUksQ0FDZDtZQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsU0FBUyxFQUFFLENBQUMsT0FBNEIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztZQUM5RSxPQUFPLEVBQUUscUNBQXFDO1NBQy9DLEVBQ0Q7WUFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLE9BQTRCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUM7WUFDcEYsT0FBTyxFQUFFLDBCQUEwQjtTQUNwQyxDQUNGLENBQUM7UUFFRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFD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