"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndroidBigPictureStyle = validateAndroidBigPictureStyle;
exports.validateAndroidBigTextStyle = validateAndroidBigTextStyle;
exports.validateAndroidInboxStyle = validateAndroidInboxStyle;
exports.validateAndroidPerson = validateAndroidPerson;
exports.validateAndroidMessagingStyleMessage = validateAndroidMessagingStyleMessage;
exports.validateAndroidMessagingStyle = validateAndroidMessagingStyle;
/*
 * Copyright (c) 2016-present Invertase Limited
 */
const react_native_1 = require("react-native");
const NotificationAndroid_1 = require("../types/NotificationAndroid");
const utils_1 = require("../utils");
/**
 * Validates a BigPictureStyle
 */
function validateAndroidBigPictureStyle(style) {
    if ((!(0, utils_1.isString)(style.picture) && !(0, utils_1.isNumber)(style.picture) && !(0, utils_1.isObject)(style.picture)) ||
        ((0, utils_1.isString)(style.picture) && !style.picture.length)) {
        throw new Error("'notification.android.style' BigPictureStyle: 'picture' expected a number or object created using the 'require()' method or a valid string URL.");
    }
    // Defaults
    const out = {
        type: NotificationAndroid_1.AndroidStyle.BIGPICTURE,
        picture: style.picture,
    };
    if ((0, utils_1.isNumber)(style.picture) || (0, utils_1.isObject)(style.picture)) {
        const image = react_native_1.Image.resolveAssetSource(style.picture);
        out.picture = image.uri;
    }
    if ((0, utils_1.objectHasProperty)(style, 'largeIcon')) {
        if (style.largeIcon !== null &&
            !(0, utils_1.isString)(style.largeIcon) &&
            !(0, utils_1.isNumber)(style.largeIcon) &&
            !(0, utils_1.isObject)(style.largeIcon)) {
            throw new Error("'notification.android.style' BigPictureStyle: 'largeIcon' expected a React Native ImageResource value or a valid string URL.");
        }
        if ((0, utils_1.isNumber)(style.largeIcon) || (0, utils_1.isObject)(style.largeIcon)) {
            const image = react_native_1.Image.resolveAssetSource(style.largeIcon);
            out.largeIcon = image.uri;
        }
        else {
            out.largeIcon = style.largeIcon;
        }
    }
    if ((0, utils_1.objectHasProperty)(style, 'title')) {
        if (!(0, utils_1.isString)(style.title)) {
            throw new Error("'notification.android.style' BigPictureStyle: 'title' expected a string value.");
        }
        out.title = style.title;
    }
    if ((0, utils_1.objectHasProperty)(style, 'summary')) {
        if (!(0, utils_1.isString)(style.summary)) {
            throw new Error("'notification.android.style' BigPictureStyle: 'summary' expected a string value.");
        }
        out.summary = style.summary;
    }
    return out;
}
/**
 * Validates a BigTextStyle
 */
function validateAndroidBigTextStyle(style) {
    if (!(0, utils_1.isString)(style.text) || !style.text) {
        throw new Error("'notification.android.style' BigTextStyle: 'text' expected a valid string value.");
    }
    // Defaults
    const out = {
        type: NotificationAndroid_1.AndroidStyle.BIGTEXT,
        text: style.text,
    };
    if ((0, utils_1.objectHasProperty)(style, 'title')) {
        if (!(0, utils_1.isString)(style.title)) {
            throw new Error("'notification.android.style' BigTextStyle: 'title' expected a string value.");
        }
        out.title = style.title;
    }
    if ((0, utils_1.objectHasProperty)(style, 'summary')) {
        if (!(0, utils_1.isString)(style.summary)) {
            throw new Error("'notification.android.style' BigTextStyle: 'summary' expected a string value.");
        }
        out.summary = style.summary;
    }
    return out;
}
/**
 * Validates a InboxStyle
 */
function validateAndroidInboxStyle(style) {
    if (!(0, utils_1.isArray)(style.lines)) {
        throw new Error("'notification.android.style' InboxStyle: 'lines' expected an array.");
    }
    for (let i = 0; i < style.lines.length; i++) {
        const line = style.lines[i];
        if (!(0, utils_1.isString)(line)) {
            throw new Error(`'notification.android.style' InboxStyle: 'lines' expected a string value at array index ${i}.`);
        }
    }
    const out = {
        type: NotificationAndroid_1.AndroidStyle.INBOX,
        lines: style.lines,
    };
    if ((0, utils_1.objectHasProperty)(style, 'title')) {
        if (!(0, utils_1.isString)(style.title)) {
            throw new Error("'notification.android.style' InboxStyle: 'title' expected a string value.");
        }
        out.title = style.title;
    }
    if ((0, utils_1.objectHasProperty)(style, 'summary')) {
        if (!(0, utils_1.isString)(style.summary)) {
            throw new Error("'notification.android.style' InboxStyle: 'summary' expected a string value.");
        }
        out.summary = style.summary;
    }
    return out;
}
/**
 * Validates an AndroidPerson
 */
function validateAndroidPerson(person) {
    if (!(0, utils_1.isString)(person.name)) {
        throw new Error("'person.name' expected a string value.");
    }
    const out = {
        name: person.name,
        bot: false,
        important: false,
    };
    if ((0, utils_1.objectHasProperty)(person, 'id')) {
        if (!(0, utils_1.isString)(person.id)) {
            throw new Error("'person.id' expected a string value.");
        }
        out.id = person.id;
    }
    if ((0, utils_1.objectHasProperty)(person, 'bot')) {
        if (!(0, utils_1.isBoolean)(person.bot)) {
            throw new Error("'person.bot' expected a boolean value.");
        }
        out.bot = person.bot;
    }
    if ((0, utils_1.objectHasProperty)(person, 'important')) {
        if (!(0, utils_1.isBoolean)(person.important)) {
            throw new Error("'person.important' expected a boolean value.");
        }
        out.important = person.important;
    }
    if ((0, utils_1.objectHasProperty)(person, 'icon')) {
        if (!(0, utils_1.isString)(person.icon)) {
            throw new Error("'person.icon' expected a string value.");
        }
        out.icon = person.icon;
    }
    if ((0, utils_1.objectHasProperty)(person, 'uri')) {
        if (!(0, utils_1.isString)(person.uri)) {
            throw new Error("'person.uri' expected a string value.");
        }
        out.uri = person.uri;
    }
    return out;
}
function validateAndroidMessagingStyleMessage(message) {
    //text, timestamp, person
    if (!(0, utils_1.isString)(message.text)) {
        throw new Error("'message.text' expected a string value.");
    }
    if (!(0, utils_1.isNumber)(message.timestamp)) {
        throw new Error("'message.timestamp' expected a number value.");
    }
    const out = {
        text: message.text,
        timestamp: message.timestamp,
    };
    if ((0, utils_1.objectHasProperty)(message, 'person') && message.person !== undefined) {
        try {
            out.person = validateAndroidPerson(message.person);
        }
        catch (e) {
            throw new Error(`'message.person' is invalid. ${e.message}`);
        }
    }
    return out;
}
/**
 * Validates a MessagingStyle
 */
function validateAndroidMessagingStyle(style) {
    if (!(0, utils_1.isObject)(style.person)) {
        throw new Error("'notification.android.style' MessagingStyle: 'person' an object value.");
    }
    let person;
    const messages = [];
    try {
        person = validateAndroidPerson(style.person);
    }
    catch (e) {
        throw new Error(`'notification.android.style' MessagingStyle: ${e.message}.`);
    }
    if (!(0, utils_1.isArray)(style.messages)) {
        throw new Error("'notification.android.style' MessagingStyle: 'messages' expected an array value.");
    }
    for (let i = 0; i < style.messages.length; i++) {
        try {
            messages.push(validateAndroidMessagingStyleMessage(style.messages[i]));
        }
        catch (e) {
            throw new Error(`'notification.android.style' MessagingStyle: invalid message at index ${i}. ${e.message}`);
        }
    }
    const out = {
        type: NotificationAndroid_1.AndroidStyle.MESSAGING,
        person,
        messages,
        group: false,
    };
    if ((0, utils_1.objectHasProperty)(style, 'title')) {
        if (!(0, utils_1.isString)(style.title)) {
            throw new Error("'notification.android.style' MessagingStyle: 'title' expected a string value.");
        }
        out.title = style.title;
    }
    if ((0, utils_1.objectHasProperty)(style, 'group')) {
        if (!(0, utils_1.isBoolean)(style.group)) {
            throw new Error("'notification.android.style' MessagingStyle: 'group' expected a boolean value.");
        }
        out.group = style.group;
    }
    return out;
}
//# sourceMappingURL=validateAndroidStyle.js.map