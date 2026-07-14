"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateAndroidFullScreenAction;
const utils_1 = require("../utils");
const LAUNCH_ACTIVITY_DEFAULT_VALUE = 'default';
const PRESS_ACTION_DEFAULT_VALUE = 'default';
function validateAndroidFullScreenAction(fullScreenAction) {
    if (!(0, utils_1.isObject)(fullScreenAction)) {
        throw new Error("'fullScreenAction' expected an object value.");
    }
    if (!(0, utils_1.isString)(fullScreenAction.id) || fullScreenAction.id.length === 0) {
        throw new Error("'id' expected a non-empty string value.");
    }
    const out = {
        id: fullScreenAction.id,
    };
    if (!(0, utils_1.isUndefined)(fullScreenAction.launchActivity)) {
        if (!(0, utils_1.isString)(fullScreenAction.launchActivity)) {
            throw new Error("'launchActivity' expected a string value.");
        }
        out.launchActivity = fullScreenAction.launchActivity;
    }
    else if (fullScreenAction.id === PRESS_ACTION_DEFAULT_VALUE) {
        // Set default value for launchActivity
        out.launchActivity = LAUNCH_ACTIVITY_DEFAULT_VALUE;
    }
    if (!(0, utils_1.isUndefined)(fullScreenAction.launchActivityFlags)) {
        if (!(0, utils_1.isArray)(fullScreenAction.launchActivityFlags)) {
            throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
        }
        // quick sanity check on first item only
        if (fullScreenAction.launchActivityFlags.length) {
            if (!(0, utils_1.isNumber)(fullScreenAction.launchActivityFlags[0])) {
                throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
            }
        }
        out.launchActivityFlags = fullScreenAction.launchActivityFlags;
    }
    if (!(0, utils_1.isUndefined)(fullScreenAction.mainComponent)) {
        if (!(0, utils_1.isString)(fullScreenAction.mainComponent)) {
            throw new Error("'mainComponent' expected a string value.");
        }
        out.mainComponent = fullScreenAction.mainComponent;
    }
    return out;
}
//# sourceMappingURL=validateAndroidFullScreenAction.js.map