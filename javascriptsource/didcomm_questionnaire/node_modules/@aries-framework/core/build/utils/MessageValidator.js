"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidator = void 0;
const class_validator_1 = require("class-validator");
const error_1 = require("../error");
const ValidationErrorUtils_1 = require("../error/ValidationErrorUtils");
class MessageValidator {
    /**
     *
     * @param classInstance the class instance to validate
     * @returns void
     * @throws array of validation errors {@link ValidationError}
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    static validateSync(classInstance) {
        // NOTE: validateSync returns an Array of errors.
        // We have to transform that into an error of choice and throw that.
        const errors = (0, class_validator_1.validateSync)(classInstance);
        if ((0, ValidationErrorUtils_1.isValidationErrorArray)(errors)) {
            throw new error_1.ClassValidationError('Failed to validate class.', {
                classType: classInstance.constructor.name,
                validationErrors: errors,
            });
        }
        else if (errors.length !== 0) {
            throw new error_1.ClassValidationError('An unknown validation error occurred.', {
                classType: Object.prototype.constructor(classInstance).name,
            });
        }
    }
}
exports.MessageValidator = MessageValidator;
//# sourceMappingURL=MessageValidator.js.map