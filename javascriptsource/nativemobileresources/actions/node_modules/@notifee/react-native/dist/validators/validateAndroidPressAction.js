"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateAndroidPressAction;
const utils_1 = require("../utils");
const LAUNCH_ACTIVITY_DEFAULT_VALUE = 'default';
const PRESS_ACTION_DEFAULT_VALUE = 'default';
function validateAndroidPressAction(pressAction) {
    if (!(0, utils_1.isObject)(pressAction)) {
        throw new Error("'pressAction' expected an object value.");
    }
    if (!(0, utils_1.isString)(pressAction.id) || pressAction.id.length === 0) {
        throw new Error("'id' expected a non-empty string value.");
    }
    const out = {
        id: pressAction.id,
    };
    if (!(0, utils_1.isUndefined)(pressAction.launchActivity)) {
        if (!(0, utils_1.isString)(pressAction.launchActivity)) {
            throw new Error("'launchActivity' expected a string value.");
        }
        out.launchActivity = pressAction.launchActivity;
    }
    else if (pressAction.id === PRESS_ACTION_DEFAULT_VALUE) {
        // Set default value for launchActivity
        out.launchActivity = LAUNCH_ACTIVITY_DEFAULT_VALUE;
    }
    if (!(0, utils_1.isUndefined)(pressAction.launchActivityFlags)) {
        if (!(0, utils_1.isArray)(pressAction.launchActivityFlags)) {
            throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
        }
        // quick sanity check on first item only
        if (pressAction.launchActivityFlags.length) {
            if (!(0, utils_1.isNumber)(pressAction.launchActivityFlags[0])) {
                throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
            }
        }
        out.launchActivityFlags = pressAction.launchActivityFlags;
    }
    if (!(0, utils_1.isUndefined)(pressAction.mainComponent)) {
        if (!(0, utils_1.isString)(pressAction.mainComponent)) {
            throw new Error("'mainComponent' expected a string value.");
        }
        out.mainComponent = pressAction.mainComponent;
    }
    return out;
}
//# sourceMappingURL=validateAndroidPressAction.js.map