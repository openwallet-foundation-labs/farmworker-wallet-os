"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const ANDROID_KIT_KAT_SDK_VERSION = 19;
const androidPermissionRequestRequired = (typeof _reactNative.Platform.Version === 'string' ? parseInt(_reactNative.Platform.Version, 10) : _reactNative.Platform.Version) < ANDROID_KIT_KAT_SDK_VERSION;

const requireAndAskPermissions = async (options) => {
  if ((options.url || options.urls) && _reactNative.Platform.OS === 'android') {
    const urls = options.urls || (options.url ? [options.url] : []);

    try {
      const resultArr = await Promise.all(urls.map(url => new Promise((resolve, reject) => {
        _reactNative.NativeModules.RNShare.isBase64File(url, error => {
          reject(error);
        }, isBase64 => {
          resolve(isBase64);
        });
      })));
      const requirePermission = resultArr.includes(true);

      if (!requirePermission) {
        return Promise.resolve(true);
      }

      const hasPermission = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (hasPermission) {
        return Promise.resolve(true);
      }

      if (androidPermissionRequestRequired) {
        const result = await _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (result === _reactNative.PermissionsAndroid.RESULTS.GRANTED) {
          return Promise.resolve(true);
        }

        throw new Error('Write Permission not available');
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  return Promise.resolve(true);
};

var _default = requireAndAskPermissions;
exports.default = _default;
//# sourceMappingURL=requireAndAskPermissions.js.map