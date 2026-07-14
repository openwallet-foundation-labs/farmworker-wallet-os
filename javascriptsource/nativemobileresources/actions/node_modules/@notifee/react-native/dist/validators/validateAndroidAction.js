"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateAndroidAction;
const utils_1 = require("../utils");
const validateAndroidPressAction_1 = __importDefault(require("./validateAndroidPressAction"));
const validateAndroidInput_1 = __importDefault(require("./validateAndroidInput"));
function validateAndroidAction(action) {
    if (!(0, utils_1.isObject)(action)) {
        throw new Error("'action' expected an object value.");
    }
    if (!(0, utils_1.isString)(action.title) || !action.title) {
        throw new Error("'action.title' expected a string value.");
    }
    let pressAction;
    try {
        pressAction = (0, validateAndroidPressAction_1.default)(action.pressAction);
    }
    catch (e) {
        throw new Error(`'action' ${e.message}.`);
    }
    const out = {
        title: action.title,
        pressAction,
    };
    if ((0, utils_1.objectHasProperty)(action, 'icon') && !(0, utils_1.isUndefined)(action.icon)) {
        if (!(0, utils_1.isString)(action.icon) || !action.icon) {
            throw new Error("'action.icon' expected a string value.");
        }
        out.icon = action.icon;
    }
    if ((0, utils_1.objectHasProperty)(action, 'input') && !(0, utils_1.isUndefined)(action.input)) {
        if (action.input === true) {
            out.input = (0, validateAndroidInput_1.default)();
        }
        else {
            try {
                out.input = (0, validateAndroidInput_1.default)(action.input);
            }
            catch (e) {
                throw new Error(`'action.input' ${e.message}.`);
            }
        }
    }
    return out;
}
//# sourceMappingURL=validateAndroidAction.js.map