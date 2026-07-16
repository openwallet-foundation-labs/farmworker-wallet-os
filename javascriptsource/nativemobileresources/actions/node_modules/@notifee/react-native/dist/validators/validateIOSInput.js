"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateIOSInput;
const utils_1 = require("../utils");
function validateIOSInput(input) {
    const out = {};
    // default value
    if (!input) {
        return out;
    }
    // if true, empty object
    if ((0, utils_1.isBoolean)(input)) {
        return out;
    }
    if (!(0, utils_1.isObject)(input)) {
        throw new Error('expected an object value.');
    }
    if ((0, utils_1.objectHasProperty)(input, 'buttonText') && !(0, utils_1.isUndefined)(input.buttonText)) {
        if (!(0, utils_1.isString)(input.buttonText)) {
            throw new Error("'buttonText' expected a string value.");
        }
        out.buttonText = input.buttonText;
    }
    if ((0, utils_1.objectHasProperty)(input, 'placeholderText') && !(0, utils_1.isUndefined)(input.placeholderText)) {
        if (!(0, utils_1.isString)(input.placeholderText)) {
            throw new Error("'placeholderText' expected a string value.");
        }
        out.placeholderText = input.placeholderText;
    }
    return out;
}
//# sourceMappingURL=validateIOSInput.js.map