"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const NotificationAndroid_1 = require("./types/NotificationAndroid");
const Notification_1 = require("./types/Notification");
const NotifeeNativeModule_1 = __importDefault(require("./NotifeeNativeModule"));
const utils_1 = require("./utils");
const validateNotification_1 = __importDefault(require("./validators/validateNotification"));
const validateTrigger_1 = __importDefault(require("./validators/validateTrigger"));
const validateAndroidChannel_1 = __importDefault(require("./validators/validateAndroidChannel"));
const validateAndroidChannelGroup_1 = __importDefault(require("./validators/validateAndroidChannelGroup"));
const validateIOSCategory_1 = __importDefault(require("./validators/validateIOSCategory"));
const validateIOSPermissions_1 = __importDefault(require("./validators/validateIOSPermissions"));
let backgroundEventHandler;
let registeredForegroundServiceTask;
if (utils_1.isAndroid) {
    // Register foreground service
    react_native_1.AppRegistry.registerHeadlessTask(utils_1.kReactNativeNotifeeForegroundServiceHeadlessTask, () => {
        if (!registeredForegroundServiceTask) {
            console.warn('[notifee] no registered foreground service has been set for displaying a foreground notification.');
            return () => Promise.resolve();
        }
        return ({ notification }) => registeredForegroundServiceTask(notification);
    });
}
class NotifeeApiModule extends NotifeeNativeModule_1.default {
    constructor(config) {
        super(config);
        if (utils_1.isAndroid) {
            // Register background handler
            react_native_1.AppRegistry.registerHeadlessTask(utils_1.kReactNativeNotifeeNotificationEvent, () => {
                return (event) => {
                    if (!backgroundEventHandler) {
                        console.warn('[notifee] no background event handler has been set. Set a handler via the "onBackgroundEvent" method.');
                        return Promise.resolve();
                    }
                    return backgroundEventHandler(event);
                };
            });
        }
        else if (utils_1.isIOS) {
            this.emitter.addListener(utils_1.kReactNativeNotifeeNotificationBackgroundEvent, (event) => {
                if (!backgroundEventHandler) {
                    console.warn('[notifee] no background event handler has been set. Set a handler via the "onBackgroundEvent" method.');
                    return Promise.resolve();
                }
                return backgroundEventHandler(event);
            });
        }
    }
    getTriggerNotificationIds = () => {
        if (utils_1.isAndroid || utils_1.isIOS) {
            return this.native.getTriggerNotificationIds();
        }
        return Promise.resolve([]);
    };
    getTriggerNotifications = () => {
        if (utils_1.isAndroid || utils_1.isIOS) {
            return this.native.getTriggerNotifications();
        }
        return Promise.resolve([]);
    };
    getDisplayedNotifications = () => {
        if (utils_1.isAndroid || utils_1.isIOS) {
            return this.native.getDisplayedNotifications();
        }
        return Promise.resolve([]);
    };
    isChannelBlocked = (channelId) => {
        if (!(0, utils_1.isString)(channelId)) {
            throw new Error("notifee.isChannelBlocked(*) 'channelId' expected a string value.");
        }
        if (utils_1.isWeb || utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve(false);
        }
        return this.native.isChannelBlocked(channelId);
    };
    isChannelCreated = (channelId) => {
        if (!(0, utils_1.isString)(channelId)) {
            channelId;
            throw new Error("notifee.isChannelCreated(*) 'channelId' expected a string value.");
        }
        if (utils_1.isWeb || utils_1.isIOS || this.native.ANDROID_API_LEVEL < 26) {
            return Promise.resolve(true);
        }
        return this.native.isChannelCreated(channelId);
    };
    cancelAllNotifications = (notificationIds, tag) => {
        if (utils_1.isAndroid || utils_1.isIOS) {
            if (notificationIds) {
                if (utils_1.isAndroid) {
                    return this.native.cancelAllNotificationsWithIds(notificationIds, utils_1.NotificationType.ALL, tag);
                }
                return this.native.cancelAllNotificationsWithIds(notificationIds);
            }
            return this.native.cancelAllNotifications();
        }
        return Promise.resolve();
    };
    cancelDisplayedNotifications = (notificationIds, tag) => {
        if (utils_1.isAndroid || utils_1.isIOS) {
            if (notificationIds) {
                if (utils_1.isAndroid) {
                    return this.native.cancelAllNotificationsWithIds(notificationIds, utils_1.NotificationType.DISPLAYED, tag);
                }
                return this.native.cancelDisplayedNotificationsWithIds(notificationIds);
            }
            return this.native.cancelDisplayedNotifications();
        }
        return Promise.resolve();
    };
    cancelTriggerNotifications = (notificationIds) => {
        if (utils_1.isAndroid || utils_1.isIOS) {
            if (notificationIds) {
                if (utils_1.isAndroid) {
                    return this.native.cancelAllNotificationsWithIds(notificationIds, utils_1.NotificationType.TRIGGER, null);
                }
                return this.native.cancelTriggerNotificationsWithIds(notificationIds);
            }
            return this.native.cancelTriggerNotifications();
        }
        return Promise.resolve();
    };
    cancelNotification = (notificationId, tag) => {
        if (!(0, utils_1.isString)(notificationId)) {
            throw new Error("notifee.cancelNotification(*) 'notificationId' expected a string value.");
        }
        if (utils_1.isAndroid) {
            return this.native.cancelAllNotificationsWithIds([notificationId], utils_1.NotificationType.ALL, tag);
        }
        if (utils_1.isIOS) {
            return this.native.cancelNotification(notificationId);
        }
        return Promise.resolve();
    };
    cancelDisplayedNotification = (notificationId, tag) => {
        if (!(0, utils_1.isString)(notificationId)) {
            throw new Error("notifee.cancelDisplayedNotification(*) 'notificationId' expected a string value.");
        }
        if (utils_1.isAndroid) {
            return this.native.cancelAllNotificationsWithIds([notificationId], utils_1.NotificationType.DISPLAYED, tag);
        }
        if (utils_1.isIOS) {
            return this.native.cancelDisplayedNotification(notificationId);
        }
        return Promise.resolve();
    };
    cancelTriggerNotification = (notificationId) => {
        if (!(0, utils_1.isString)(notificationId)) {
            throw new Error("notifee.cancelTriggerNotification(*) 'notificationId' expected a string value.");
        }
        if (utils_1.isAndroid) {
            return this.native.cancelAllNotificationsWithIds([notificationId], utils_1.NotificationType.TRIGGER, null);
        }
        if (utils_1.isIOS) {
            return this.native.cancelTriggerNotification(notificationId);
        }
        return Promise.resolve();
    };
    createChannel = (channel) => {
        let options;
        try {
            options = (0, validateAndroidChannel_1.default)(channel);
        }
        catch (e) {
            throw new Error(`notifee.createChannel(*) ${e.message}`);
        }
        if (utils_1.isAndroid) {
            if (this.native.ANDROID_API_LEVEL < 26) {
                return Promise.resolve(options.id);
            }
            return this.native.createChannel(options).then(() => {
                return options.id;
            });
        }
        return Promise.resolve('');
    };
    createChannels = (channels) => {
        if (!(0, utils_1.isArray)(channels)) {
            throw new Error("notifee.createChannels(*) 'channels' expected an array of AndroidChannel.");
        }
        const options = [];
        try {
            for (let i = 0; i < channels.length; i++) {
                options[i] = (0, validateAndroidChannel_1.default)(channels[i]);
            }
        }
        catch (e) {
            throw new Error(`notifee.createChannels(*) 'channels' a channel is invalid: ${e.message}`);
        }
        if (utils_1.isAndroid && this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.createChannels(options);
        }
        return Promise.resolve();
    };
    createChannelGroup = (channelGroup) => {
        let options;
        try {
            options = (0, validateAndroidChannelGroup_1.default)(channelGroup);
        }
        catch (e) {
            throw new Error(`notifee.createChannelGroup(*) ${e.message}`);
        }
        if (utils_1.isAndroid) {
            if (this.native.ANDROID_API_LEVEL < 26) {
                return Promise.resolve(options.id);
            }
            return this.native.createChannelGroup(options).then(() => {
                return options.id;
            });
        }
        return Promise.resolve('');
    };
    createChannelGroups = (channelGroups) => {
        if (!(0, utils_1.isArray)(channelGroups)) {
            throw new Error("notifee.createChannelGroups(*) 'channelGroups' expected an array of AndroidChannelGroup.");
        }
        const options = [];
        try {
            for (let i = 0; i < channelGroups.length; i++) {
                options[i] = (0, validateAndroidChannelGroup_1.default)(channelGroups[i]);
            }
        }
        catch (e) {
            throw new Error(`notifee.createChannelGroups(*) 'channelGroups' a channel group is invalid: ${e.message}`);
        }
        if (utils_1.isAndroid && this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.createChannelGroups(options);
        }
        return Promise.resolve();
    };
    deleteChannel = (channelId) => {
        if (!(0, utils_1.isString)(channelId)) {
            throw new Error("notifee.deleteChannel(*) 'channelId' expected a string value.");
        }
        if (utils_1.isAndroid && this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.deleteChannel(channelId);
        }
        return Promise.resolve();
    };
    deleteChannelGroup = (channelGroupId) => {
        if (!(0, utils_1.isString)(channelGroupId)) {
            throw new Error("notifee.deleteChannelGroup(*) 'channelGroupId' expected a string value.");
        }
        if (utils_1.isAndroid && this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.deleteChannelGroup(channelGroupId);
        }
        return Promise.resolve();
    };
    displayNotification = (notification) => {
        let options;
        try {
            options = (0, validateNotification_1.default)(notification);
        }
        catch (e) {
            throw new Error(`notifee.displayNotification(*) ${e.message}`);
        }
        if (utils_1.isIOS || utils_1.isAndroid) {
            return this.native.displayNotification(options).then(() => {
                return options.id;
            });
        }
        return Promise.resolve('');
    };
    openAlarmPermissionSettings = () => {
        if (utils_1.isAndroid) {
            return this.native.openAlarmPermissionSettings();
        }
        return Promise.resolve();
    };
    createTriggerNotification = (notification, trigger) => {
        let options;
        let triggerOptions;
        try {
            options = (0, validateNotification_1.default)(notification);
        }
        catch (e) {
            throw new Error(`notifee.createTriggerNotification(*) ${e.message}`);
        }
        try {
            triggerOptions = (0, validateTrigger_1.default)(trigger);
        }
        catch (e) {
            throw new Error(`notifee.createTriggerNotification(*) ${e.message}`);
        }
        if (utils_1.isIOS || utils_1.isAndroid) {
            return this.native.createTriggerNotification(options, triggerOptions).then(() => {
                return options.id;
            });
        }
        return Promise.resolve('');
    };
    getChannel = (channelId) => {
        if (!(0, utils_1.isString)(channelId)) {
            throw new Error("notifee.getChannel(*) 'channelId' expected a string value.");
        }
        if (utils_1.isAndroid && this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.getChannel(channelId);
        }
        return Promise.resolve(null);
    };
    getChannels = () => {
        if (utils_1.isAndroid && this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.getChannels();
        }
        return Promise.resolve([]);
    };
    getChannelGroup = (channelGroupId) => {
        if (!(0, utils_1.isString)(channelGroupId)) {
            throw new Error("notifee.getChannelGroup(*) 'channelGroupId' expected a string value.");
        }
        if (utils_1.isAndroid || this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.getChannelGroup(channelGroupId);
        }
        return Promise.resolve(null);
    };
    getChannelGroups = () => {
        if (utils_1.isAndroid || this.native.ANDROID_API_LEVEL >= 26) {
            return this.native.getChannelGroups();
        }
        return Promise.resolve([]);
    };
    getInitialNotification = () => {
        if (utils_1.isIOS || utils_1.isAndroid) {
            return this.native.getInitialNotification();
        }
        return Promise.resolve(null);
    };
    onBackgroundEvent = (observer) => {
        if (!(0, utils_1.isFunction)(observer)) {
            throw new Error("notifee.onBackgroundEvent(*) 'observer' expected a function.");
        }
        backgroundEventHandler = observer;
    };
    onForegroundEvent = (observer) => {
        if (!(0, utils_1.isFunction)(observer)) {
            throw new Error("notifee.onForegroundEvent(*) 'observer' expected a function.");
        }
        const subscriber = this.emitter.addListener(utils_1.kReactNativeNotifeeNotificationEvent, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore See https://github.com/facebook/react-native/pull/36462
        ({ type, detail }) => {
            observer({ type, detail });
        });
        return () => {
            subscriber.remove();
        };
    };
    openNotificationSettings = (channelId) => {
        if (!(0, utils_1.isUndefined)(channelId) && !(0, utils_1.isString)(channelId)) {
            throw new Error("notifee.openNotificationSettings(*) 'channelId' expected a string value.");
        }
        if (utils_1.isAndroid) {
            return this.native.openNotificationSettings(channelId || null);
        }
        return Promise.resolve();
    };
    requestPermission = (permissions = {}) => {
        if (utils_1.isAndroid) {
            return this.native
                .requestPermission()
                .then(({ authorizationStatus, android, }) => {
                return {
                    authorizationStatus,
                    android,
                    ios: {
                        alert: 1,
                        badge: 1,
                        criticalAlert: 1,
                        showPreviews: 1,
                        sound: 1,
                        carPlay: 1,
                        lockScreen: 1,
                        announcement: 1,
                        notificationCenter: 1,
                        inAppNotificationSettings: 1,
                        authorizationStatus,
                    },
                    web: {},
                };
            });
        }
        if (utils_1.isIOS) {
            let options;
            try {
                options = (0, validateIOSPermissions_1.default)(permissions);
            }
            catch (e) {
                throw new Error(`notifee.requestPermission(*) ${e.message}`);
            }
            return this.native
                .requestPermission(options)
                .then(({ authorizationStatus, ios, }) => {
                return {
                    authorizationStatus,
                    ios,
                    android: {
                        alarm: NotificationAndroid_1.AndroidNotificationSetting.ENABLED,
                    },
                    web: {},
                };
            });
        }
        // assume web
        return Promise.resolve({
            authorizationStatus: Notification_1.AuthorizationStatus.NOT_DETERMINED,
            android: {
                alarm: NotificationAndroid_1.AndroidNotificationSetting.ENABLED,
            },
            ios: {
                alert: 1,
                badge: 1,
                criticalAlert: 1,
                showPreviews: 1,
                sound: 1,
                carPlay: 1,
                lockScreen: 1,
                announcement: 1,
                notificationCenter: 1,
                inAppNotificationSettings: 1,
                authorizationStatus: Notification_1.AuthorizationStatus.NOT_DETERMINED,
            },
            web: {},
        });
    };
    registerForegroundService(runner) {
        if (!(0, utils_1.isFunction)(runner)) {
            throw new Error("notifee.registerForegroundService(_) 'runner' expected a function.");
        }
        if (utils_1.isAndroid) {
            registeredForegroundServiceTask = runner;
        }
        return;
    }
    setNotificationCategories = (categories) => {
        if (!utils_1.isIOS) {
            return Promise.resolve();
        }
        if (!(0, utils_1.isArray)(categories)) {
            throw new Error("notifee.setNotificationCategories(*) 'categories' expected an array of IOSCategory.");
        }
        const options = [];
        try {
            for (let i = 0; i < categories.length; i++) {
                options[i] = (0, validateIOSCategory_1.default)(categories[i]);
            }
        }
        catch (e) {
            throw new Error(`notifee.setNotificationCategories(*) 'categories' a category is invalid: ${e.message}`);
        }
        return this.native.setNotificationCategories(categories);
    };
    getNotificationCategories = () => {
        if (!utils_1.isIOS) {
            return Promise.resolve([]);
        }
        return this.native.getNotificationCategories();
    };
    getNotificationSettings = () => {
        if (utils_1.isAndroid) {
            return this.native
                .getNotificationSettings()
                .then(({ authorizationStatus, android, }) => {
                return {
                    authorizationStatus,
                    android,
                    ios: {
                        alert: 1,
                        badge: 1,
                        criticalAlert: 1,
                        showPreviews: 1,
                        sound: 1,
                        carPlay: 1,
                        lockScreen: 1,
                        announcement: 1,
                        notificationCenter: 1,
                        inAppNotificationSettings: 1,
                        authorizationStatus,
                    },
                    web: {},
                };
            });
        }
        if (utils_1.isIOS) {
            return this.native
                .getNotificationSettings()
                .then(({ authorizationStatus, ios, }) => {
                return {
                    authorizationStatus,
                    ios,
                    android: {
                        alarm: NotificationAndroid_1.AndroidNotificationSetting.ENABLED,
                    },
                };
            });
        }
        // assume web
        return Promise.resolve({
            authorizationStatus: Notification_1.AuthorizationStatus.NOT_DETERMINED,
            android: {
                alarm: NotificationAndroid_1.AndroidNotificationSetting.ENABLED,
            },
            ios: {
                alert: 1,
                badge: 1,
                criticalAlert: 1,
                showPreviews: 1,
                sound: 1,
                carPlay: 1,
                lockScreen: 1,
                announcement: 1,
                notificationCenter: 1,
                inAppNotificationSettings: 1,
                authorizationStatus: Notification_1.AuthorizationStatus.NOT_DETERMINED,
            },
            web: {},
        });
    };
    getBadgeCount = () => {
        if (!utils_1.isIOS) {
            return Promise.resolve(0);
        }
        return this.native.getBadgeCount();
    };
    setBadgeCount = (count) => {
        if (!utils_1.isIOS) {
            return Promise.resolve();
        }
        if (!(0, utils_1.isNumber)(count) || count < 0) {
            throw new Error("notifee.setBadgeCount(*) 'count' expected a number value greater than 0.");
        }
        return this.native.setBadgeCount(Math.round(count));
    };
    incrementBadgeCount = (incrementBy) => {
        if (!utils_1.isIOS) {
            return Promise.resolve();
        }
        let value = 1;
        if (!(0, utils_1.isUndefined)(incrementBy)) {
            if (!(0, utils_1.isNumber)(incrementBy) || incrementBy < 1) {
                throw new Error("notifee.decrementBadgeCount(*) 'incrementBy' expected a number value greater than 1.");
            }
            value = incrementBy;
        }
        return this.native.incrementBadgeCount(Math.round(value));
    };
    decrementBadgeCount = (decrementBy) => {
        if (!utils_1.isIOS) {
            return Promise.resolve();
        }
        let value = 1;
        if (!(0, utils_1.isUndefined)(decrementBy)) {
            if (!(0, utils_1.isNumber)(decrementBy) || decrementBy < 1) {
                throw new Error("notifee.decrementBadgeCount(*) 'decrementBy' expected a number value greater than 1.");
            }
            value = decrementBy;
        }
        return this.native.decrementBadgeCount(Math.round(value));
    };
    isBatteryOptimizationEnabled = () => {
        if (!utils_1.isAndroid) {
            return Promise.resolve(false);
        }
        return this.native.isBatteryOptimizationEnabled();
    };
    openBatteryOptimizationSettings = () => {
        if (!utils_1.isAndroid) {
            return Promise.resolve();
        }
        return this.native.openBatteryOptimizationSettings();
    };
    getPowerManagerInfo = () => {
        if (!utils_1.isAndroid) {
            // only Android supports this, so instead we
            // return a dummy response to allow the power manager
            // flow work the same on all platforms
            return Promise.resolve({
                manufacturer: react_native_1.Platform.OS,
                activity: null,
            });
        }
        return this.native.getPowerManagerInfo();
    };
    openPowerManagerSettings = () => {
        if (!utils_1.isAndroid) {
            return Promise.resolve();
        }
        return this.native.openPowerManagerSettings();
    };
    stopForegroundService = () => {
        if (!utils_1.isAndroid) {
            return Promise.resolve();
        }
        return this.native.stopForegroundService();
    };
    hideNotificationDrawer = () => {
        if (!utils_1.isAndroid) {
            return;
        }
        return this.native.hideNotificationDrawer();
    };
}
exports.default = NotifeeApiModule;
//# sourceMappingURL=NotifeeApiModule.js.map