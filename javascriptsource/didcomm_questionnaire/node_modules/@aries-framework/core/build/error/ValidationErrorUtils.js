"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidationErrorArray = void 0;
const class_validator_1 = require("class-validator");
function isValidationErrorArray(e) {
    if (Array.isArray(e)) {
        const isErrorArray = e.length > 0 && e.every((err) => err instanceof class_validator_1.ValidationError);
        return isErrorArray;
    }
    return false;
}
exports.isValidationErrorArray = isValidationErrorArray;
//# sourceMappingURL=ValidationErrorUtils.js.map