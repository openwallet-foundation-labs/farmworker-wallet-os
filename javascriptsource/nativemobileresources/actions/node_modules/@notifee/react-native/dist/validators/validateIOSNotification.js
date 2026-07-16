"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateIOSNotification;
const utils_1 = require("../utils");
const validateIOSCommunicationInfo_1 = __importDefault(require("./iosCommunicationInfo/validateIOSCommunicationInfo"));
const validateIOSAttachment_1 = __importDefault(require("./validateIOSAttachment"));
function validateIOSNotification(ios) {
    const out = {
        foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
            banner: true,
            list: true,
        },
    };
    if ((0, utils_1.isUndefined)(ios)) {
        return out;
    }
    /* Skip validating if Android in release */
    if (utils_1.isAndroid && !__DEV__)
        return out;
    /**
     * attachments
     */
    if ((0, utils_1.objectHasProperty)(ios, 'attachments')) {
        if (!(0, utils_1.isArray)(ios.attachments)) {
            throw new Error("'notification.ios.attachments' expected an array value.");
        }
        const attachments = [];
        for (let i = 0; i < ios.attachments.length; i++) {
            try {
                attachments.push((0, validateIOSAttachment_1.default)(ios.attachments[i]));
            }
            catch (e) {
                throw new Error(`'notification.ios.attachments' invalid IOSNotificationAttachment. ${e.message}.`);
            }
        }
        if (attachments.length) {
            out.attachments = attachments;
        }
    }
    /**
     * communicationInfo
     */
    if ((0, utils_1.objectHasProperty)(ios, 'communicationInfo') && !(0, utils_1.isUndefined)(ios.communicationInfo)) {
        try {
            out.communicationInfo = (0, validateIOSCommunicationInfo_1.default)(ios.communicationInfo);
        }
        catch (e) {
            throw new Error(`'ios.communicationInfo' ${e.message}`);
        }
    }
    /**
     * interruptionLevel
     */
    if ((0, utils_1.objectHasProperty)(ios, 'interruptionLevel')) {
        if ((0, utils_1.isString)(ios.interruptionLevel) &&
            ['active', 'critical', 'passive', 'timeSensitive'].includes(ios.interruptionLevel)) {
            out.interruptionLevel = ios.interruptionLevel;
        }
        else {
            throw new Error("'notification.ios.interruptionLevel' must be a string value: 'active','critical','passive','timeSensitive'.");
        }
    }
    /**
     * critical
     */
    if ((0, utils_1.objectHasProperty)(ios, 'critical')) {
        if (!(0, utils_1.isBoolean)(ios.critical)) {
            throw new Error("'notification.ios.critical' must be a boolean value if specified.");
        }
        else {
            out.critical = ios.critical;
        }
    }
    /**
     * criticalVolume
     */
    if ((0, utils_1.objectHasProperty)(ios, 'criticalVolume')) {
        if (!(0, utils_1.isNumber)(ios.criticalVolume)) {
            throw new Error("'notification.ios.criticalVolume' must be a number value if specified.");
        }
        else {
            if (ios.criticalVolume < 0 || ios.criticalVolume > 1) {
                throw new Error("'notification.ios.criticalVolume' must be a float value between 0.0 and 1.0.");
            }
            out.criticalVolume = ios.criticalVolume;
        }
    }
    /**
     * sound
     */
    if ((0, utils_1.objectHasProperty)(ios, 'sound')) {
        if ((0, utils_1.isString)(ios.sound)) {
            out.sound = ios.sound;
        }
        else {
            throw new Error("'notification.sound' must be a string value if specified.");
        }
    }
    /**
     * badgeCount
     */
    if ((0, utils_1.objectHasProperty)(ios, 'badgeCount')) {
        if (!(0, utils_1.isNumber)(ios.badgeCount) || ios.badgeCount < 0) {
            throw new Error("'notification.ios.badgeCount' expected a number value >=0.");
        }
        out.badgeCount = ios.badgeCount;
    }
    /**
     * categoryId
     */
    if ((0, utils_1.objectHasProperty)(ios, 'categoryId')) {
        if (!(0, utils_1.isString)(ios.categoryId)) {
            throw new Error("'notification.ios.categoryId' expected a of string value");
        }
        out.categoryId = ios.categoryId;
    }
    /**
     * groupId
     */
    if ((0, utils_1.objectHasProperty)(ios, 'threadId')) {
        if (!(0, utils_1.isString)(ios.threadId)) {
            throw new Error("'notification.ios.threadId' expected a string value.");
        }
        out.threadId = ios.threadId;
    }
    /**
     * summaryArgument
     */
    if ((0, utils_1.objectHasProperty)(ios, 'summaryArgument')) {
        if (!(0, utils_1.isString)(ios.summaryArgument)) {
            throw new Error("'notification.ios.summaryArgument' expected a string value.");
        }
        out.summaryArgument = ios.summaryArgument;
    }
    /**
     * summaryArgumentCount
     */
    if ((0, utils_1.objectHasProperty)(ios, 'summaryArgumentCount')) {
        if (!(0, utils_1.isNumber)(ios.summaryArgumentCount) || ios.summaryArgumentCount <= 0) {
            throw new Error("'notification.ios.summaryArgumentCount' expected a positive number greater than 0.");
        }
        out.summaryArgumentCount = ios.summaryArgumentCount;
    }
    /**
     * launchImageName
     */
    if ((0, utils_1.objectHasProperty)(ios, 'launchImageName')) {
        if (!(0, utils_1.isString)(ios.launchImageName)) {
            throw new Error("'notification.ios.launchImageName' expected a string value.");
        }
        out.launchImageName = ios.launchImageName;
    }
    /**
     * sound
     */
    if ((0, utils_1.objectHasProperty)(ios, 'sound')) {
        if (!(0, utils_1.isString)(ios.sound)) {
            throw new Error("'notification.ios.sound' expected a string value.");
        }
        out.sound = ios.sound;
    }
    /**
     * ForegroundPresentationOptions
     */
    if ((0, utils_1.objectHasProperty)(ios, 'foregroundPresentationOptions')) {
        if (!(0, utils_1.isObject)(ios.foregroundPresentationOptions)) {
            throw new Error("'notification.ios.foregroundPresentationOptions' expected a valid IOSForegroundPresentationOptions object.");
        }
        if ((0, utils_1.objectHasProperty)(ios.foregroundPresentationOptions, 'alert')) {
            if (!(0, utils_1.isBoolean)(ios.foregroundPresentationOptions.alert)) {
                throw new Error("'notification.ios.foregroundPresentationOptions.alert' expected a boolean value.");
            }
            out.foregroundPresentationOptions.alert = ios.foregroundPresentationOptions.alert;
        }
        if ((0, utils_1.objectHasProperty)(ios.foregroundPresentationOptions, 'sound')) {
            if (!(0, utils_1.isBoolean)(ios.foregroundPresentationOptions.sound)) {
                throw new Error("'notification.ios.foregroundPresentationOptions.sound' expected a boolean value.");
            }
            out.foregroundPresentationOptions.sound = ios.foregroundPresentationOptions.sound;
        }
        if ((0, utils_1.objectHasProperty)(ios.foregroundPresentationOptions, 'badge')) {
            if (!(0, utils_1.isBoolean)(ios.foregroundPresentationOptions.badge)) {
                throw new Error("'notification.ios.foregroundPresentationOptions.badge' expected a boolean value.");
            }
            out.foregroundPresentationOptions.badge = ios.foregroundPresentationOptions.badge;
        }
        if ((0, utils_1.objectHasProperty)(ios.foregroundPresentationOptions, 'banner')) {
            if (!(0, utils_1.isBoolean)(ios.foregroundPresentationOptions.banner)) {
                throw new Error("'notification.ios.foregroundPresentationOptions.banner' expected a boolean value.");
            }
            out.foregroundPresentationOptions.banner = ios.foregroundPresentationOptions.banner;
        }
        if ((0, utils_1.objectHasProperty)(ios.foregroundPresentationOptions, 'list')) {
            if (!(0, utils_1.isBoolean)(ios.foregroundPresentationOptions.list)) {
                throw new Error("'notification.ios.foregroundPresentationOptions.list' expected a boolean value.");
            }
            out.foregroundPresentationOptions.list = ios.foregroundPresentationOptions.list;
        }
    }
    return out;
}
//# sourceMappingURL=validateIOSNotification.js.map