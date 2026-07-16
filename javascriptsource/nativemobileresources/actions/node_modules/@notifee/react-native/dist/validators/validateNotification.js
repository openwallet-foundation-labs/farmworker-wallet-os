"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlatformSpecificNotification = void 0;
exports.default = validateNotification;
const utils_1 = require("../utils");
const validateAndroidNotification_1 = __importDefault(require("./validateAndroidNotification"));
const validateIOSNotification_1 = __importDefault(require("./validateIOSNotification"));
const react_native_1 = require("react-native");
/**
 * Validate platform-specific notification
 *
 * Only throws a validation error if the device is on the same platform
 * Otherwise, will show a debug log in the console
 */
const validatePlatformSpecificNotification = (out, specifiedPlatform) => {
    try {
        if (specifiedPlatform === 'ios') {
            return (0, validateIOSNotification_1.default)(out.ios);
        }
        else {
            return (0, validateAndroidNotification_1.default)(out.android);
        }
    }
    catch (error) {
        const isRunningOnSamePlatform = specifiedPlatform === react_native_1.Platform.OS;
        if (isRunningOnSamePlatform) {
            throw error;
        }
        else {
            console.debug(`Invalid ${specifiedPlatform} notification ->`, error);
            return {};
        }
    }
};
exports.validatePlatformSpecificNotification = validatePlatformSpecificNotification;
function validateNotification(notification) {
    if (!(0, utils_1.isObject)(notification)) {
        throw new Error("'notification' expected an object value.");
    }
    // Defaults
    const out = {
        id: '',
        data: {},
    };
    if (utils_1.isAndroid) {
        /* istanbul ignore next */
        out.android = {};
    }
    else if (utils_1.isIOS) {
        out.ios = {};
    }
    /**
     * id
     */
    if ((0, utils_1.objectHasProperty)(notification, 'id')) {
        if (!(0, utils_1.isString)(notification.id) || !notification.id) {
            throw new Error("'notification.id' invalid notification ID, expected a unique string value.");
        }
        out.id = notification.id;
    }
    else {
        out.id = (0, utils_1.generateId)();
    }
    /**
     * title
     */
    if ((0, utils_1.objectHasProperty)(notification, 'title')) {
        if (notification.title !== undefined && !(0, utils_1.isString)(notification.title)) {
            throw new Error("'notification.title' expected a string value or undefined.");
        }
        out.title = notification.title;
    }
    /**
     * body
     */
    if ((0, utils_1.objectHasProperty)(notification, 'body')) {
        if (notification.body !== undefined && !(0, utils_1.isString)(notification.body)) {
            throw new Error("'notification.body' expected a string value or undefined.");
        }
        out.body = notification.body;
    }
    /**
     * subtitle
     */
    if ((0, utils_1.objectHasProperty)(notification, 'subtitle')) {
        if (notification.subtitle !== undefined && !(0, utils_1.isString)(notification.subtitle)) {
            throw new Error("'notification.subtitle' expected a string value or undefined.");
        }
        out.subtitle = notification.subtitle;
    }
    /**
     * data
     */
    if ((0, utils_1.objectHasProperty)(notification, 'data') && notification.data !== undefined) {
        if (!(0, utils_1.isObject)(notification.data)) {
            throw new Error("'notification.data' expected an object value containing key/value pairs.");
        }
        const entries = Object.entries(notification.data);
        for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            if (!(0, utils_1.isString)(value) && !(0, utils_1.isNumber)(value) && !(0, utils_1.isObject)(value)) {
                throw new Error(`'notification.data' value for key "${key}" is invalid, expected a string value.`);
            }
        }
        out.data = notification.data;
    }
    /**
     * android
     */
    const validatedAndroid = (0, exports.validatePlatformSpecificNotification)(notification, 'android');
    if (utils_1.isAndroid) {
        out.android = validatedAndroid;
    }
    /**
     * ios
     */
    const validatedIOS = (0, exports.validatePlatformSpecificNotification)(notification, 'ios');
    if (utils_1.isIOS) {
        out.ios = validatedIOS;
    }
    return out;
}
//# sourceMappingURL=validateNotification.js.map