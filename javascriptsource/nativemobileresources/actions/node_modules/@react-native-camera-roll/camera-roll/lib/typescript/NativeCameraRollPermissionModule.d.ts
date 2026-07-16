import { TurboModule } from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';
declare type CameraRollAuthorizationStatus = 'granted' | 'limited' | 'denied' | 'unavailable' | 'blocked' | 'not-determined';
export interface Spec extends TurboModule {
    checkPermission(content: string): Promise<CameraRollAuthorizationStatus>;
    requestReadWritePermission(): Promise<CameraRollAuthorizationStatus>;
    requestAddOnlyPermission(): Promise<CameraRollAuthorizationStatus>;
    refreshPhotoSelection(): Promise<boolean>;
    addListener(eventName: string): void;
    removeListeners(count: Double): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeCameraRollPermissionModule.d.ts.map