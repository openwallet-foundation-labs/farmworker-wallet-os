import { Notification } from '../types/Notification';
import { NotificationAndroid } from '../types/NotificationAndroid';
import { NotificationIOS } from '..';
/**
 * Validate platform-specific notification
 *
 * Only throws a validation error if the device is on the same platform
 * Otherwise, will show a debug log in the console
 */
export declare const validatePlatformSpecificNotification: (out: Notification, specifiedPlatform: string) => NotificationAndroid | NotificationIOS;
export default function validateNotification(notification: Notification): Notification;
