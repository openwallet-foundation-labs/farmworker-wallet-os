import { NativeEventEmitter } from 'react-native';
/** Defines ios permission access levels for gallery */
export declare type AccessLevel = 'addOnly' | 'readWrite';
export declare type CameraRollAuthorizationStatus = 'granted' | 'limited' | 'denied' | 'unavailable' | 'blocked' | 'not-determined';
export declare const cameraRollEventEmitter: NativeEventEmitter;
export declare const iosReadGalleryPermission: (accessLevel: AccessLevel) => Promise<CameraRollAuthorizationStatus>;
export declare const iosRequestReadWriteGalleryPermission: () => Promise<CameraRollAuthorizationStatus>;
export declare const iosRequestAddOnlyGalleryPermission: () => Promise<CameraRollAuthorizationStatus>;
export declare const iosRefreshGallerySelection: () => Promise<boolean>;
//# sourceMappingURL=CameraRollIOSPermission.d.ts.map