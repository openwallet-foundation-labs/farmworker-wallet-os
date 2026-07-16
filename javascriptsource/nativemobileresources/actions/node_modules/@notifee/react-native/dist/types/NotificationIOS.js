"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOSIntentIdentifier = exports.IOSNotificationSetting = exports.IOSShowPreviewsSetting = void 0;
/**
 * An enum representing the show previews notification setting for this app on the device.
 *
 * Value is greater than 0 if previews are to be shown, compare against an exact value
 * (e.g. WHEN_AUTHENTICATED) for more granular control.
 *
 * @platform ios
 */
var IOSShowPreviewsSetting;
(function (IOSShowPreviewsSetting) {
    /**
     * This setting is not supported on this device. Usually this means that the iOS version required
     * for this setting (iOS 11+) has not been met.
     */
    IOSShowPreviewsSetting[IOSShowPreviewsSetting["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
    /**
     * Never show previews.
     */
    IOSShowPreviewsSetting[IOSShowPreviewsSetting["NEVER"] = 0] = "NEVER";
    /**
     * Always show previews even if the device is currently locked.
     */
    IOSShowPreviewsSetting[IOSShowPreviewsSetting["ALWAYS"] = 1] = "ALWAYS";
    /**
     * Only show previews when the device is unlocked.
     */
    IOSShowPreviewsSetting[IOSShowPreviewsSetting["WHEN_AUTHENTICATED"] = 2] = "WHEN_AUTHENTICATED";
})(IOSShowPreviewsSetting || (exports.IOSShowPreviewsSetting = IOSShowPreviewsSetting = {}));
/**
 * An enum representing a notification setting for this app on the device.
 *
 * Value is greater than 0 if setting enabled, compare against an exact value (e.g. NOT_SUPPORTED) for more
 * granular control.
 *
 * @platform ios
 */
var IOSNotificationSetting;
(function (IOSNotificationSetting) {
    /**
     * This setting is not supported on this device. Usually this means that the iOS version required
     * for this setting has not been met.
     */
    IOSNotificationSetting[IOSNotificationSetting["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
    /**
     * This setting is currently disabled by the user.
     */
    IOSNotificationSetting[IOSNotificationSetting["DISABLED"] = 0] = "DISABLED";
    /**
     * This setting is currently enabled.
     */
    IOSNotificationSetting[IOSNotificationSetting["ENABLED"] = 1] = "ENABLED";
})(IOSNotificationSetting || (exports.IOSNotificationSetting = IOSNotificationSetting = {}));
/**
 * TODO docs, used to provide context to Siri
 *
 * @platform ios
 */
var IOSIntentIdentifier;
(function (IOSIntentIdentifier) {
    IOSIntentIdentifier[IOSIntentIdentifier["START_AUDIO_CALL"] = 0] = "START_AUDIO_CALL";
    IOSIntentIdentifier[IOSIntentIdentifier["START_VIDEO_CALL"] = 1] = "START_VIDEO_CALL";
    IOSIntentIdentifier[IOSIntentIdentifier["SEARCH_CALL_HISTORY"] = 2] = "SEARCH_CALL_HISTORY";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_AUDIO_SOURCE_IN_CAR"] = 3] = "SET_AUDIO_SOURCE_IN_CAR";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_CLIMATE_SETTINGS_IN_CAR"] = 4] = "SET_CLIMATE_SETTINGS_IN_CAR";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_DEFROSTER_SETTINGS_IN_CAR"] = 5] = "SET_DEFROSTER_SETTINGS_IN_CAR";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_SEAT_SETTINGS_IN_CAR"] = 6] = "SET_SEAT_SETTINGS_IN_CAR";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_PROFILE_IN_CAR"] = 7] = "SET_PROFILE_IN_CAR";
    IOSIntentIdentifier[IOSIntentIdentifier["SAVE_PROFILE_IN_CAR"] = 8] = "SAVE_PROFILE_IN_CAR";
    IOSIntentIdentifier[IOSIntentIdentifier["START_WORKOUT"] = 9] = "START_WORKOUT";
    IOSIntentIdentifier[IOSIntentIdentifier["PAUSE_WORKOUT"] = 10] = "PAUSE_WORKOUT";
    IOSIntentIdentifier[IOSIntentIdentifier["END_WORKOUT"] = 11] = "END_WORKOUT";
    IOSIntentIdentifier[IOSIntentIdentifier["CANCEL_WORKOUT"] = 12] = "CANCEL_WORKOUT";
    IOSIntentIdentifier[IOSIntentIdentifier["RESUME_WORKOUT"] = 13] = "RESUME_WORKOUT";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_RADIO_STATION"] = 14] = "SET_RADIO_STATION";
    IOSIntentIdentifier[IOSIntentIdentifier["SEND_MESSAGE"] = 15] = "SEND_MESSAGE";
    IOSIntentIdentifier[IOSIntentIdentifier["SEARCH_FOR_MESSAGES"] = 16] = "SEARCH_FOR_MESSAGES";
    IOSIntentIdentifier[IOSIntentIdentifier["SET_MESSAGE_ATTRIBUTE"] = 17] = "SET_MESSAGE_ATTRIBUTE";
    IOSIntentIdentifier[IOSIntentIdentifier["SEND_PAYMENT"] = 18] = "SEND_PAYMENT";
    IOSIntentIdentifier[IOSIntentIdentifier["REQUEST_PAYMENT"] = 19] = "REQUEST_PAYMENT";
    IOSIntentIdentifier[IOSIntentIdentifier["SEARCH_FOR_PHOTOS"] = 20] = "SEARCH_FOR_PHOTOS";
    IOSIntentIdentifier[IOSIntentIdentifier["START_PHOTO_PLAYBACK"] = 21] = "START_PHOTO_PLAYBACK";
    IOSIntentIdentifier[IOSIntentIdentifier["LIST_RIDE_OPTIONS"] = 22] = "LIST_RIDE_OPTIONS";
    IOSIntentIdentifier[IOSIntentIdentifier["REQUEST_RIDE"] = 23] = "REQUEST_RIDE";
    IOSIntentIdentifier[IOSIntentIdentifier["GET_RIDE_STATUS"] = 24] = "GET_RIDE_STATUS";
})(IOSIntentIdentifier || (exports.IOSIntentIdentifier = IOSIntentIdentifier = {}));
//# sourceMappingURL=NotificationIOS.js.map