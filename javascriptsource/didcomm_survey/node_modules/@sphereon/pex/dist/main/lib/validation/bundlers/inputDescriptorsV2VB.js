"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDescriptorsV2VB = void 0;
const utils_1 = require("../../utils");
const constraintsVB_1 = require("./constraintsVB");
const validationBundler_1 = require("./validationBundler");
class InputDescriptorsV2VB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'input_descriptor');
        this.idMustBeNonEmptyStringMsg = 'input descriptor id must be non-empty string';
        this.nameShouldBeNonEmptyStringMsg = 'input descriptor name should be non-empty string';
        this.purposeShouldBeNonEmptyStringMsg = 'input descriptor purpose should be non-empty string';
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
                predicate: (inDesc) => utils_1.ObjectValidationUtils.nonEmptyString(inDesc === null || inDesc === void 0 ? void 0 : inDesc.id),
                message: this.idMustBeNonEmptyStringMsg,
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
    constraintsValidations(inputDescriptor, inDescInd) {
        if (inputDescriptor.constraints) {
            return new constraintsVB_1.ConstraintsVB(this.getMyTag(inDescInd)).getValidations(inputDescriptor.constraints);
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
exports.InputDescriptorsV2VB = InputDescriptorsV2VB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXREZXNjcmlwdG9yc1YyVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9pbnB1dERlc2NyaXB0b3JzVjJWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FBb0Q7QUFHcEQsbURBQWdEO0FBQ2hELDJEQUF3RDtBQUV4RCxNQUFhLG9CQUFxQixTQUFRLHFDQUFzQztJQUs5RSxZQUFZLFNBQWlCO1FBQzNCLEtBQUssQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUx0Qiw4QkFBeUIsR0FBRyw4Q0FBOEMsQ0FBQztRQUMzRSxrQ0FBNkIsR0FBRyxrREFBa0QsQ0FBQztRQUNuRixxQ0FBZ0MsR0FBRyxxREFBcUQsQ0FBQztJQUkxRyxDQUFDO0lBRU0sY0FBYyxDQUNuQixnQkFBcUM7UUFRckMsSUFBSSxXQUFXLEdBTVQsRUFBRSxDQUFDO1FBRVQsV0FBVyxDQUFDLElBQUksQ0FDZDtZQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsU0FBUyxFQUFFLENBQUMsT0FBNEIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztZQUM5RSxPQUFPLEVBQUUsa0RBQWtEO1NBQzVELEVBQ0Q7WUFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLE9BQTRCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7WUFDOUUsT0FBTyxFQUFFLHFDQUFxQztTQUMvQyxFQUNEO1lBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEIsTUFBTSxFQUFFLGdCQUFnQjtZQUN4QixTQUFTLEVBQUUsQ0FBQyxPQUE0QixFQUFFLEVBQUUs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