"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsVB = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const pex_models_1 = require("@sphereon/pex-models");
const validateFilterv1_js_1 = __importDefault(require("../validateFilterv1.js"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validateFilterv2_js_1 = __importDefault(require("../validateFilterv2.js"));
const validationBundler_1 = require("./validationBundler");
class FieldsVB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'fields');
        this.mustHaveValidJsonPathsMsg = 'field object "path" property must contain array of valid json paths';
        this.pathObjMustHaveValidJsonPathMsg = 'field object "path" property must contain valid json paths.';
        this.filterMustBeValidJsonSchemaMsg = 'field object "filter" property must be valid json schema';
        this.filterIsMustInPresenceOfPredicateMsg = 'field object must have a "filter" property if "predicate" is present';
        this.filterIsNotValidJsonSchemaDescriptorMsg = 'could not parse "filter" object as a valid json schema descriptor.';
        this.purposeShouldBeANonEmptyStringMsg = 'purpose should be a non empty string';
        this.shouldBeKnownOptionMsg = 'Unknown predicate property';
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
                predicate: (field) => FieldsVB.optionalNonEmptyString(field === null || field === void 0 ? void 0 : field.purpose),
                message: this.purposeShouldBeANonEmptyStringMsg,
            },
            {
                tag: this.getMyTag(indx),
                target: field,
                predicate: (field) => FieldsVB.shouldBeKnownOption(field === null || field === void 0 ? void 0 : field.predicate),
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
                jsonpath_1.JSONPath.parse(path);
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
            valid = (0, validateFilterv2_js_1.default)(filter);
            if (!valid) {
                valid = (0, validateFilterv1_js_1.default)(filter);
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
        return option == null || option == pex_models_1.Optionality.Required || option == pex_models_1.Optionality.Preferred;
    }
}
exports.FieldsVB = FieldsVB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9maWVsZHNWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBeUQ7QUFDekQscURBQXlGO0FBS3pGLGlGQUFzRDtBQUN0RCw2REFBNkQ7QUFDN0QsYUFBYTtBQUNiLGlGQUFzRDtBQUV0RCwyREFBd0Q7QUFFeEQsTUFBYSxRQUFTLFNBQVEscUNBQXdDO0lBU3BFLFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQVRaLDhCQUF5QixHQUFHLHFFQUFxRSxDQUFDO1FBQ2xHLG9DQUErQixHQUFHLDZEQUE2RCxDQUFDO1FBQ2hHLG1DQUE4QixHQUFHLDBEQUEwRCxDQUFDO1FBQzVGLHlDQUFvQyxHQUFHLHNFQUFzRSxDQUFDO1FBQzlHLDRDQUF1QyxHQUFHLG9FQUFvRSxDQUFDO1FBQy9HLHNDQUFpQyxHQUFHLHNDQUFzQyxDQUFDO1FBQzNFLDJCQUFzQixHQUFHLDRCQUE0QixDQUFDO0lBSXZFLENBQUM7SUFFTSxjQUFjLENBQUMsTUFBNkI7UUFDakQsSUFBSSxXQUFXLEdBQW9DLEVBQUUsQ0FBQztRQUN0RCxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1gsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDbkQsV0FBVyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEYsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU0saUJBQWlCLENBQUMsS0FBd0IsRUFBRSxJQUFZO1FBQzdE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