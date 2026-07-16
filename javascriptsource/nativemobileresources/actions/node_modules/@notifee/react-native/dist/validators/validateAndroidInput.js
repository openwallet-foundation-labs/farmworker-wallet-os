"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateAndroidInput;
const utils_1 = require("../utils");
function validateAndroidInput(input) {
    const out = {
        allowFreeFormInput: true,
        allowGeneratedReplies: true,
    };
    if (!input) {
        return out;
    }
    if ((0, utils_1.objectHasProperty)(input, 'allowFreeFormInput')) {
        if (!(0, utils_1.isBoolean)(input.allowFreeFormInput)) {
            throw new Error("'input.allowFreeFormInput' expected a boolean value.");
        }
        out.allowFreeFormInput = input.allowFreeFormInput;
    }
    if ((0, utils_1.objectHasProperty)(input, 'allowGeneratedReplies')) {
        if (!(0, utils_1.isBoolean)(input.allowGeneratedReplies)) {
            throw new Error("'input.allowGeneratedReplies' expected a boolean value.");
        }
        out.allowGeneratedReplies = input.allowGeneratedReplies;
    }
    if (!out.allowFreeFormInput && (!input.choices || input.choices.length === 0)) {
        throw new Error("'input.allowFreeFormInput' when false, you must provide at least one choice.");
    }
    if ((0, utils_1.objectHasProperty)(input, 'choices')) {
        if (!(0, utils_1.isArrayOfStrings)(input.choices) || input.choices.length === 0) {
            throw new Error("'input.choices' expected an array of string values.");
        }
        out.choices = input.choices;
    }
    if ((0, utils_1.objectHasProperty)(input, 'editableChoices')) {
        if (!(0, utils_1.isBoolean)(input.editableChoices)) {
            throw new Error("'input.editableChoices' expected a boolean value.");
        }
        out.editableChoices = input.editableChoices;
    }
    if ((0, utils_1.objectHasProperty)(input, 'placeholder')) {
        if (!(0, utils_1.isString)(input.placeholder)) {
            throw new Error("'input.placeholder' expected a string value.");
        }
        out.placeholder = input.placeholder;
    }
    if (out.editableChoices && !out.allowFreeFormInput) {
        throw new Error("'input.editableChoices' when true, allowFreeFormInput must also be true.");
    }
    return out;
}
//# sourceMappingURL=validateAndroidInput.js.map