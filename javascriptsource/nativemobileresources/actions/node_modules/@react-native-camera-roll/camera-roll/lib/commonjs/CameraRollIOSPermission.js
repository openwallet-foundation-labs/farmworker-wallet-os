"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iosRequestReadWriteGalleryPermission = exports.iosRequestAddOnlyGalleryPermission = exports.iosRefreshGallerySelection = exports.iosReadGalleryPermission = exports.cameraRollEventEmitter = void 0;
var _reactNative = require("react-native");
var _NativeCameraRollPermissionModule = _interopRequireDefault(require("./NativeCameraRollPermissionModule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** Defines ios permission access levels for gallery */

const isIOS = _reactNative.Platform.OS === 'ios';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (isIOS && _NativeCameraRollPermissionModule.default == null) {
  console.error("photoLibraryPermissionModule: Native Module 'photoLibraryPermissionModule' was null! Did you run pod install?");
}
const cameraRollEventEmitter = exports.cameraRollEventEmitter = new _reactNative.NativeEventEmitter(isIOS ? _NativeCameraRollPermissionModule.default : undefined);
const iosReadGalleryPermission = accessLevel => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return _NativeCameraRollPermissionModule.default.checkPermission(accessLevel);
};
exports.iosReadGalleryPermission = iosReadGalleryPermission;
const iosRequestReadWriteGalleryPermission = () => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return _NativeCameraRollPermissionModule.default.requestReadWritePermission();
};
exports.iosRequestReadWriteGalleryPermission = iosRequestReadWriteGalleryPermission;
const iosRequestAddOnlyGalleryPermission = () => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return _NativeCameraRollPermissionModule.default.requestAddOnlyPermission();
};
exports.iosRequestAddOnlyGalleryPermission = iosRequestAddOnlyGalleryPermission;
const iosRefreshGallerySelection = () => {
  if (!isIOS) throw new Error('this module is available only for ios');
  return _NativeCameraRollPermissionModule.default.refreshPhotoSelection();
};
exports.iosRefreshGallerySelection = iosRefreshGallerySelection;
//# sourceMappingURL=CameraRollIOSPermission.js.map