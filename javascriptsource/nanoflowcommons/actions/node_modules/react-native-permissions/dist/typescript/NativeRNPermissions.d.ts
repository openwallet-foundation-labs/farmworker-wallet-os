import type { TurboModule } from 'react-native';
type NotificationsResponse = {
    status: Object;
    settings: Object;
};
export interface Spec extends TurboModule {
    getConstants(): {
        available: string[];
    };
    openSettings(): Promise<void>;
    check(permission: string): Promise<string>;
    checkNotifications(): Promise<NotificationsResponse>;
    request(permission: string): Promise<string>;
    requestNotifications(options: string[]): Promise<NotificationsResponse>;
    checkMultiple(permissions: string[]): Promise<Object>;
    requestMultiple(permissions: string[]): Promise<Object>;
    shouldShowRequestRationale(permission: string): Promise<boolean>;
    checkLocationAccuracy(): Promise<string>;
    openPhotoPicker(): Promise<boolean>;
    requestLocationAccuracy(purposeKey: string): Promise<string>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeRNPermissions.d.ts.map