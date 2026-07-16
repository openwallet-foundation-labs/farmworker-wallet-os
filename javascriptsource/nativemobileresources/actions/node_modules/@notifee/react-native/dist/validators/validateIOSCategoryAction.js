"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateIOSCategoryAction;
const utils_1 = require("../utils");
const validateIOSInput_1 = __importDefault(require("./validateIOSInput"));
function validateIOSCategoryAction(action) {
    if (!(0, utils_1.isObject)(action)) {
        throw new Error('"action" expected an object value');
    }
    if (!(0, utils_1.isString)(action.id) || action.id.length === 0) {
        throw new Error('"action.id" expected a valid string value.');
    }
    if (!(0, utils_1.isString)(action.title) || action.title.length === 0) {
        throw new Error('"action.title" expected a valid string value.');
    }
    const out = {
        id: action.id,
        title: action.title,
        destructive: false,
        foreground: false,
        authenticationRequired: false,
    };
    if ((0, utils_1.objectHasProperty)(action, 'input') && !(0, utils_1.isUndefined)(action.input)) {
        if (action.input === true) {
            out.input = true;
        }
        else {
            try {
                out.input = (0, validateIOSInput_1.default)(action.input);
            }
            catch (e) {
                throw new Error(`'action' ${e.message}.`);
            }
        }
    }
    if ((0, utils_1.objectHasProperty)(action, 'destructive')) {
        if (!(0, utils_1.isBoolean)(action.destructive)) {
            throw new Error("'destructive' expected a boolean value.");
        }
        out.destructive = action.destructive;
    }
    if ((0, utils_1.objectHasProperty)(action, 'foreground')) {
        if (!(0, utils_1.isBoolean)(action.foreground)) {
            throw new Error("'foreground' expected a boolean value.");
        }
        out.foreground = action.foreground;
    }
    if ((0, utils_1.objectHasProperty)(action, 'authenticationRequired')) {
        if (!(0, utils_1.isBoolean)(action.authenticationRequired)) {
            throw new Error("'authenticationRequired' expected a boolean value.");
        }
        out.authenticationRequired = action.authenticationRequired;
    }
    return out;
}
//# sourceMappingURL=validateIOSCategoryAction.js.map