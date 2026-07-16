export * from './id';
export * from './validate';
export declare function isError(value: object): boolean;
export declare function objectHasProperty<T>(target: T, property: string | number | symbol): property is keyof T;
export declare const isIOS: boolean;
export declare const isAndroid: boolean;
export declare const isWeb: boolean;
export declare function noop(): void;
export declare const kReactNativeNotifeeForegroundServiceHeadlessTask = "app.notifee.foreground-service-headless-task";
export declare const kReactNativeNotifeeNotificationEvent = "app.notifee.notification-event";
export declare const kReactNativeNotifeeNotificationBackgroundEvent = "app.notifee.notification-event-background";
export declare enum NotificationType {
    ALL = 0,
    DISPLAYED = 1,
    TRIGGER = 2
}
