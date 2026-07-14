"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationStatus = exports.EventType = void 0;
/**
 * An enum representing an event type, defined on [`Event`](/react-native/reference/event).
 *
 * View the [Events](/react-native/events) documentation to learn more about foreground and
 * background events.
 */
var EventType;
(function (EventType) {
    /**
     * An unknown event was received.
     *
     * This event type is a failsafe to catch any unknown events from the device. Please
     * report an issue with a reproduction so it can be correctly handled.
     */
    EventType[EventType["UNKNOWN"] = -1] = "UNKNOWN";
    /**
     * Event type is sent when the user dismisses a notification. This is triggered via the user swiping
     * the notification from the notification shade.
     *
     * On Android, the event is also sent when performing "Clear all" notifications unlike on iOS.
     *
     * This event is **not** sent when a notification is cancelled or times out.
     */
    EventType[EventType["DISMISSED"] = 0] = "DISMISSED";
    /**
     * Event type is sent when a notification has been pressed by the user.
     *
     * On Android, notifications must include an `android.pressAction` property for this event to trigger.
     *
     * On iOS, this event is always sent when the user presses a notification.
     */
    EventType[EventType["PRESS"] = 1] = "PRESS";
    /**
     * Event type is sent when a user presses a notification action.
     */
    EventType[EventType["ACTION_PRESS"] = 2] = "ACTION_PRESS";
    /**
     * Event type sent when a notification has been delivered to the device. For trigger notifications,
     * this event is sent at the point when the trigger executes, not when a the trigger notification is created.
     *
     * It's important to note even though a notification has been delivered, it may not be shown to the
     * user. For example, they may have notifications disabled on the device/channel/app.
     */
    EventType[EventType["DELIVERED"] = 3] = "DELIVERED";
    /**
     * Event is sent when the user changes the notification blocked state for the entire application or
     * when the user opens the application settings.
     *
     * @platform android API Level >= 28
     */
    EventType[EventType["APP_BLOCKED"] = 4] = "APP_BLOCKED";
    /**
     * Event type is sent when the user changes the notification blocked state for a channel in the application.
     *
     * @platform android API Level >= 28
     */
    EventType[EventType["CHANNEL_BLOCKED"] = 5] = "CHANNEL_BLOCKED";
    /**
     * Event type is sent when the user changes the notification blocked state for a channel group in the application.
     *
     * @platform android API Level >= 28
     */
    EventType[EventType["CHANNEL_GROUP_BLOCKED"] = 6] = "CHANNEL_GROUP_BLOCKED";
    /**
     * Event type is sent when a notification trigger is created.
     */
    EventType[EventType["TRIGGER_NOTIFICATION_CREATED"] = 7] = "TRIGGER_NOTIFICATION_CREATED";
    /**
     * **ANDROID ONLY**
     *
     * Event type is sent when a notification wants to start a foreground service but a foreground service is already started.
     */
    EventType[EventType["FG_ALREADY_EXIST"] = 8] = "FG_ALREADY_EXIST";
})(EventType || (exports.EventType = EventType = {}));
/**
 * An enum representing the notification authorization status for this app on the device.
 *
 * Value is greater than 0 if authorized, compare against an exact status (e.g. PROVISIONAL) for a more
 * granular status.
 *
 */
var AuthorizationStatus;
(function (AuthorizationStatus) {
    /**
     * The app user has not yet chosen whether to allow the application to create notifications. Usually
     * this status is returned prior to the first call of `requestPermission`.
     *
     * @platform ios
     */
    AuthorizationStatus[AuthorizationStatus["NOT_DETERMINED"] = -1] = "NOT_DETERMINED";
    /**
     * The app is not authorized to create notifications.
     */
    AuthorizationStatus[AuthorizationStatus["DENIED"] = 0] = "DENIED";
    /**
     * The app is authorized to create notifications.
     */
    AuthorizationStatus[AuthorizationStatus["AUTHORIZED"] = 1] = "AUTHORIZED";
    /**
     * The app is currently authorized to post non-interrupting user notifications
     * @platform ios iOS >= 12
     */
    AuthorizationStatus[AuthorizationStatus["PROVISIONAL"] = 2] = "PROVISIONAL";
})(AuthorizationStatus || (exports.AuthorizationStatus = AuthorizationStatus = {}));
//# sourceMappingURL=Notification.js.map