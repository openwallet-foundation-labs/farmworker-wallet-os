"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidForegroundServiceType = exports.AndroidLaunchActivityFlag = exports.AndroidImportance = exports.AndroidVisibility = exports.AndroidStyle = exports.AndroidGroupAlertBehavior = exports.AndroidFlags = exports.AndroidDefaults = exports.AndroidColor = exports.AndroidCategory = exports.AndroidBadgeIconType = exports.AndroidNotificationSetting = void 0;
/**
 * An interface representing the current android only notification-related settings for your app.
 *
 * This interface is returned from [`requestPermission`](/react-native/reference/requestpermission)
 * and [`getNotificationSettings`](/react-native/reference/getnotificationsettings).
 *
 * View the [Permissions](/react-native/android/permissions) documentation to learn more.
 *
 * @platform android
 */
var AndroidNotificationSetting;
(function (AndroidNotificationSetting) {
    /**
     * This setting is not supported on this device. Usually this means that the Android version required
     * for this setting has not been met.
     */
    AndroidNotificationSetting[AndroidNotificationSetting["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
    /**
     * This setting is currently disabled by the user.
     */
    AndroidNotificationSetting[AndroidNotificationSetting["DISABLED"] = 0] = "DISABLED";
    /**
     * This setting is currently enabled.
     */
    AndroidNotificationSetting[AndroidNotificationSetting["ENABLED"] = 1] = "ENABLED";
})(AndroidNotificationSetting || (exports.AndroidNotificationSetting = AndroidNotificationSetting = {}));
/**
 * Enum used to define how a notification badge is displayed in badge mode.
 *
 * View the [Badges](/react-native/android/appearance#badges) documentation for more information.
 *
 * @platform android
 */
var AndroidBadgeIconType;
(function (AndroidBadgeIconType) {
    /**
     * No badge is displayed, will always show as a number.
     */
    AndroidBadgeIconType[AndroidBadgeIconType["NONE"] = 0] = "NONE";
    /**
     * Shows the badge as the notifications `smallIcon`.
     */
    AndroidBadgeIconType[AndroidBadgeIconType["SMALL"] = 1] = "SMALL";
    /**
     * Shows the badge as the notifications `largeIcon` (if available).
     *
     * This is the default value used by a notification if not provided.
     */
    AndroidBadgeIconType[AndroidBadgeIconType["LARGE"] = 2] = "LARGE";
})(AndroidBadgeIconType || (exports.AndroidBadgeIconType = AndroidBadgeIconType = {}));
/**
 * Enum used to describe the category of a notification.
 *
 * Setting a category on a notification helps the device to understand what the notification is for,
 * or what impact it will have on the user. The category can be used for ranking and filtering
 * the notification, however has no visual impact on the notification.
 *
 * @platform android
 */
var AndroidCategory;
(function (AndroidCategory) {
    AndroidCategory["ALARM"] = "alarm";
    AndroidCategory["CALL"] = "call";
    AndroidCategory["EMAIL"] = "email";
    AndroidCategory["ERROR"] = "error";
    AndroidCategory["EVENT"] = "event";
    AndroidCategory["MESSAGE"] = "msg";
    AndroidCategory["NAVIGATION"] = "navigation";
    AndroidCategory["PROGRESS"] = "progress";
    AndroidCategory["PROMO"] = "promo";
    AndroidCategory["RECOMMENDATION"] = "recommendation";
    AndroidCategory["REMINDER"] = "reminder";
    AndroidCategory["SERVICE"] = "service";
    AndroidCategory["SOCIAL"] = "social";
    AndroidCategory["STATUS"] = "status";
    /**
     * Avoid using - generally used by the system.
     */
    AndroidCategory["SYSTEM"] = "sys";
    AndroidCategory["TRANSPORT"] = "transport";
})(AndroidCategory || (exports.AndroidCategory = AndroidCategory = {}));
/**
 * A set or predefined colors which can be used with Android Notifications.
 *
 * View the [Color](/react-native/android/appearance#color) documentation to learn more.
 *
 * @platform android
 */
var AndroidColor;
(function (AndroidColor) {
    AndroidColor["RED"] = "red";
    AndroidColor["BLUE"] = "blue";
    AndroidColor["GREEN"] = "green";
    AndroidColor["BLACK"] = "black";
    AndroidColor["WHITE"] = "white";
    AndroidColor["CYAN"] = "cyan";
    AndroidColor["MAGENTA"] = "magenta";
    AndroidColor["YELLOW"] = "yellow";
    AndroidColor["LIGHTGRAY"] = "lightgray";
    AndroidColor["DARKGRAY"] = "darkgray";
    AndroidColor["GRAY"] = "gray";
    AndroidColor["LIGHTGREY"] = "lightgrey";
    AndroidColor["DARKGREY"] = "darkgrey";
    AndroidColor["AQUA"] = "aqua";
    AndroidColor["FUCHSIA"] = "fuchsia";
    AndroidColor["LIME"] = "lime";
    AndroidColor["MAROON"] = "maroon";
    AndroidColor["NAVY"] = "navy";
    AndroidColor["OLIVE"] = "olive";
    AndroidColor["PURPLE"] = "purple";
    AndroidColor["SILVER"] = "silver";
    AndroidColor["TEAL"] = "teal";
})(AndroidColor || (exports.AndroidColor = AndroidColor = {}));
/**
 * On devices which do not support notification channels (API Level < 26), the notification
 * by default will use all methods to alert the user (depending on the importance).
 *
 * To override the default behaviour, provide an array of defaults to the notification.
 *
 * On API Levels >= 26, this has no effect and notifications will use the channel behaviour.
 *
 * @platform android API Level < 26
 */
var AndroidDefaults;
(function (AndroidDefaults) {
    /**
     * All options will be used, where possible.
     */
    AndroidDefaults[AndroidDefaults["ALL"] = -1] = "ALL";
    /**
     * The notification will use lights to alert the user.
     */
    AndroidDefaults[AndroidDefaults["LIGHTS"] = 4] = "LIGHTS";
    /**
     * The notification will use sound to alert the user.
     */
    AndroidDefaults[AndroidDefaults["SOUND"] = 1] = "SOUND";
    /**
     * The notification will vibrate to alert the user.
     */
    AndroidDefaults[AndroidDefaults["VIBRATE"] = 2] = "VIBRATE";
})(AndroidDefaults || (exports.AndroidDefaults = AndroidDefaults = {}));
/**
 * Enum used to set any additional flags supported on Android.
 * See Android's [setFlag()](https://developer.android.com/reference/android/app/Notification.Builder#setFlag(int,%20boolean)) documentation.
 */
var AndroidFlags;
(function (AndroidFlags) {
    /**
     * The audio will be repeated until the notification is cancelled or the notification window is opened.
     * This will be set for you by setting `loopSound`.
     */
    AndroidFlags[AndroidFlags["FLAG_INSISTENT"] = 4] = "FLAG_INSISTENT";
    /**
     * Prevents the notification from being canceled when the user clicks the Clear all button.
     * This will be set for you by setting `ongoing`.
     */
    AndroidFlags[AndroidFlags["FLAG_NO_CLEAR"] = 32] = "FLAG_NO_CLEAR";
})(AndroidFlags || (exports.AndroidFlags = AndroidFlags = {}));
/**
 * Enum used to describe how a notification alerts the user when it apart of a group.
 *
 * View the [Grouping & Sorting](/react-native/android/grouping-and-sorting#group-behaviour) documentation to
 * learn more.
 *
 * @platform android
 */
var AndroidGroupAlertBehavior;
(function (AndroidGroupAlertBehavior) {
    /**
     * All notifications will alert.
     */
    AndroidGroupAlertBehavior[AndroidGroupAlertBehavior["ALL"] = 0] = "ALL";
    /**
     * Only the summary notification will alert the user when displayed. The children of the group will not alert.
     */
    AndroidGroupAlertBehavior[AndroidGroupAlertBehavior["SUMMARY"] = 1] = "SUMMARY";
    /**
     * Children of a group will alert the user. The summary notification will not alert when displayed.
     */
    AndroidGroupAlertBehavior[AndroidGroupAlertBehavior["CHILDREN"] = 2] = "CHILDREN";
})(AndroidGroupAlertBehavior || (exports.AndroidGroupAlertBehavior = AndroidGroupAlertBehavior = {}));
/**
 * Available Android Notification Styles.
 *
 * View the [Styles](/react-native/android/styles) documentation to learn more with example usage.
 *
 * @platform android
 */
var AndroidStyle;
(function (AndroidStyle) {
    AndroidStyle[AndroidStyle["BIGPICTURE"] = 0] = "BIGPICTURE";
    AndroidStyle[AndroidStyle["BIGTEXT"] = 1] = "BIGTEXT";
    AndroidStyle[AndroidStyle["INBOX"] = 2] = "INBOX";
    AndroidStyle[AndroidStyle["MESSAGING"] = 3] = "MESSAGING";
})(AndroidStyle || (exports.AndroidStyle = AndroidStyle = {}));
/**
 * Interface used to define the visibility of an Android notification.
 *
 * Use with the `visibility` property on the notification.
 *
 * View the [Visibility](/react-native/android/appearance#visibility) documentation to learn more.
 *
 * Default value is `AndroidVisibility.PRIVATE`.
 *
 * @platform android
 */
var AndroidVisibility;
(function (AndroidVisibility) {
    /**
     * Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
     */
    AndroidVisibility[AndroidVisibility["PRIVATE"] = 0] = "PRIVATE";
    /**
     * Show this notification in its entirety on all lockscreens.
     */
    AndroidVisibility[AndroidVisibility["PUBLIC"] = 1] = "PUBLIC";
    /**
     * Do not reveal any part of this notification on a secure lockscreen.
     *
     * Useful for notifications showing sensitive information such as banking apps.
     */
    AndroidVisibility[AndroidVisibility["SECRET"] = -1] = "SECRET";
})(AndroidVisibility || (exports.AndroidVisibility = AndroidVisibility = {}));
/**
 * The interface describing the importance levels of an incoming notification.
 *
 * The importance level can be set directly onto a notification channel for supported devices (API Level >= 26)
 * or directly onto the notification for devices which do not support channels.
 *
 * The importance is used to both change the visual prompt of a received notification
 * and also how it visually appears on the device.
 *
 * View the [Android Appearance](/react-native/android/appearance#importance) documentation to learn more.
 *
 * @platform android
 */
var AndroidImportance;
(function (AndroidImportance) {
    /**
     * The default importance applied to a channel/notification.
     *
     * The application small icon will show in the device statusbar. When the user pulls down the
     * notification shade, the notification will show in it's expanded state (if applicable).
     */
    AndroidImportance[AndroidImportance["DEFAULT"] = 3] = "DEFAULT";
    /**
     * The highest importance level applied to a channel/notification.
     *
     * The notifications will appear on-top of applications, allowing direct interaction without pulling
     * down the notification shade. This level should only be used for urgent notifications, such as
     * incoming phone calls, messages etc, which require immediate attention.
     */
    AndroidImportance[AndroidImportance["HIGH"] = 4] = "HIGH";
    /**
     * A low importance level applied to a channel/notification.
     *
     * On Android, the application small icon will show in the device statusbar, however the notification will not alert
     * the user (no sound or vibration). The notification will show in it's expanded state when the
     * notification shade is pulled down.
     *
     * On iOS, the notification will not display to the user or alert them. It will still be visible on the devices
     * notification center.
     */
    AndroidImportance[AndroidImportance["LOW"] = 2] = "LOW";
    /**
     * The minimum importance level applied to a channel/notification.
     *
     * The application small icon will not show up in the statusbar, or alert the user. The notification
     * will be in a collapsed state in the notification shade and placed at the bottom of the list.
     *
     * This level should be used when the notification requires no immediate attention. An example of this
     * importance level is the Google app providing weather updates and only being visible when the
     * user pulls the notification shade down,
     */
    AndroidImportance[AndroidImportance["MIN"] = 1] = "MIN";
    /**
     * The notification will not be shown. This has the same effect as the user disabling notifications
     * in the application settings.
     */
    AndroidImportance[AndroidImportance["NONE"] = 0] = "NONE";
})(AndroidImportance || (exports.AndroidImportance = AndroidImportance = {}));
/**
 * An enum representing the various flags that can be passed along to `launchActivityFlags` on `NotificationPressAction`.
 *
 * These flags are added to the Android [Intent](https://developer.android.com/reference/android/content/Intent.html) that launches your activity.
 *
 * These are only required if you need to customise the behaviour of your activities, in most cases you might not need these.
 *
 * @platform android
 */
var AndroidLaunchActivityFlag;
(function (AndroidLaunchActivityFlag) {
    /**
     * See [FLAG_ACTIVITY_NO_HISTORY](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_HISTORY) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NO_HISTORY"] = 0] = "NO_HISTORY";
    /**
     * See [FLAG_ACTIVITY_SINGLE_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_SINGLE_TOP) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["SINGLE_TOP"] = 1] = "SINGLE_TOP";
    /**
     * See [FLAG_ACTIVITY_NEW_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NEW_TASK) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NEW_TASK"] = 2] = "NEW_TASK";
    /**
     * See [FLAG_ACTIVITY_MULTIPLE_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_MULTIPLE_TASK) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["MULTIPLE_TASK"] = 3] = "MULTIPLE_TASK";
    /**
     * See [FLAG_ACTIVITY_CLEAR_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TOP) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["CLEAR_TOP"] = 4] = "CLEAR_TOP";
    /**
     * See [FLAG_ACTIVITY_FORWARD_RESULT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_FORWARD_RESULT) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["FORWARD_RESULT"] = 5] = "FORWARD_RESULT";
    /**
     * See [FLAG_ACTIVITY_PREVIOUS_IS_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_PREVIOUS_IS_TOP) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["PREVIOUS_IS_TOP"] = 6] = "PREVIOUS_IS_TOP";
    /**
     * See [FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["EXCLUDE_FROM_RECENTS"] = 7] = "EXCLUDE_FROM_RECENTS";
    /**
     * See [FLAG_ACTIVITY_BROUGHT_TO_FRONT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_BROUGHT_TO_FRONT) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["BROUGHT_TO_FRONT"] = 8] = "BROUGHT_TO_FRONT";
    /**
     * See [FLAG_ACTIVITY_RESET_TASK_IF_NEEDED](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_RESET_TASK_IF_NEEDED) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["RESET_TASK_IF_NEEDED"] = 9] = "RESET_TASK_IF_NEEDED";
    /**
     * See [FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["LAUNCHED_FROM_HISTORY"] = 10] = "LAUNCHED_FROM_HISTORY";
    /**
     * See [FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["CLEAR_WHEN_TASK_RESET"] = 11] = "CLEAR_WHEN_TASK_RESET";
    /**
     * See [FLAG_ACTIVITY_NEW_DOCUMENT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NEW_DOCUMENT) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NEW_DOCUMENT"] = 12] = "NEW_DOCUMENT";
    /**
     * See [FLAG_ACTIVITY_NO_USER_ACTION](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_USER_ACTION) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NO_USER_ACTION"] = 13] = "NO_USER_ACTION";
    /**
     * See [FLAG_ACTIVITY_REORDER_TO_FRONT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_REORDER_TO_FRONT) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["REORDER_TO_FRONT"] = 14] = "REORDER_TO_FRONT";
    /**
     * See [FLAG_ACTIVITY_NO_ANIMATION](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_ANIMATION) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NO_ANIMATION"] = 15] = "NO_ANIMATION";
    /**
     * See [FLAG_ACTIVITY_CLEAR_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TASK) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["CLEAR_TASK"] = 16] = "CLEAR_TASK";
    /**
     * See [FLAG_ACTIVITY_TASK_ON_HOME](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_TASK_ON_HOME) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["TASK_ON_HOME"] = 17] = "TASK_ON_HOME";
    /**
     * See [FLAG_ACTIVITY_RETAIN_IN_RECENTS](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_RETAIN_IN_RECENTS) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["RETAIN_IN_RECENTS"] = 18] = "RETAIN_IN_RECENTS";
    /**
     * See [FLAG_ACTIVITY_LAUNCH_ADJACENT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_LAUNCH_ADJACENT) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["LAUNCH_ADJACENT"] = 19] = "LAUNCH_ADJACENT";
    /**
     * See [FLAG_ACTIVITY_MATCH_EXTERNAL](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_MATCH_EXTERNAL) on the official Android documentation for more information.
     */
    AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["MATCH_EXTERNAL"] = 20] = "MATCH_EXTERNAL";
})(AndroidLaunchActivityFlag || (exports.AndroidLaunchActivityFlag = AndroidLaunchActivityFlag = {}));
/**
 * Enum used to set the foreground service types identifying the work done by the service.
 * See Android's [foreground service types](https://developer.android.com/develop/background-work/services/fg-service-types) documentation.
 *
 * @platform android
 */
var AndroidForegroundServiceType;
(function (AndroidForegroundServiceType) {
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_CAMERA"] = 64] = "FOREGROUND_SERVICE_TYPE_CAMERA";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE"] = 16] = "FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_DATA_SYNC"] = 1] = "FOREGROUND_SERVICE_TYPE_DATA_SYNC";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_HEALTH"] = 256] = "FOREGROUND_SERVICE_TYPE_HEALTH";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_LOCATION"] = 8] = "FOREGROUND_SERVICE_TYPE_LOCATION";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK"] = 2] = "FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION"] = 32] = "FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MEDIA_PROCESSING"] = 8192] = "FOREGROUND_SERVICE_TYPE_MEDIA_PROCESSING";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MICROPHONE"] = 128] = "FOREGROUND_SERVICE_TYPE_MICROPHONE";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_PHONE_CALL"] = 4] = "FOREGROUND_SERVICE_TYPE_PHONE_CALL";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_REMOTE_MESSAGING"] = 512] = "FOREGROUND_SERVICE_TYPE_REMOTE_MESSAGING";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_SHORT_SERVICE"] = 2048] = "FOREGROUND_SERVICE_TYPE_SHORT_SERVICE";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_SPECIAL_USE"] = 1073741824] = "FOREGROUND_SERVICE_TYPE_SPECIAL_USE";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED"] = 1024] = "FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED";
    AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MANIFEST"] = -1] = "FOREGROUND_SERVICE_TYPE_MANIFEST";
})(AndroidForegroundServiceType || (exports.AndroidForegroundServiceType = AndroidForegroundServiceType = {}));
//# sourceMappingURL=NotificationAndroid.js.map