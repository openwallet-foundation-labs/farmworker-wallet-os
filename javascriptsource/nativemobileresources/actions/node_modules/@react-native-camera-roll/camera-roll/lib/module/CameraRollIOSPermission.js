import { NativeEventEmitter, Platform } from 'react-native';
import CameraRollPermissionModule from './NativeCameraRollPermissionModule';

/** Defines ios permission access levels for gallery */

const isIOS = Platform.OS === 'ios';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (isIOS && CameraRollPermissionModule == null) {
  console.error("photoLibraryPermissionModule: Native Module 'photoLibraryPermissionModule' was null! Did you run pod install?");
}
export const cameraRollEventEmitter = new NativeEventEmitter(isIOS ? CameraRollPermissionModule : undefined);
export const iosReadGalleryPermission = accessLevel => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return CameraRollPermissionModule.checkPermission(accessLevel);
};
export const iosRequestReadWriteGalleryPermission = () => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return CameraRollPermissionModule.requestReadWritePermission();
};
export const iosRequestAddOnlyGalleryPermission = () => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return CameraRollPermissionModule.requestAddOnlyPermission();
};
export const iosRefreshGallerySelection = () => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return CameraRollPermissionModule.refreshPhotoSelection();
};
//# sourceMappingURL=CameraRollIOSPermission.js.map