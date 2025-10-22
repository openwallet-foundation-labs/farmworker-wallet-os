"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _reactNative = require("react-native");
var _NativeRNPermissions = _interopRequireDefault(require("./NativeRNPermissions"));
var _unsupportedPlatformMethods = require("./unsupportedPlatformMethods");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TIRAMISU_VERSION_CODE = 33;
async function openSettings() {
  await _NativeRNPermissions.default.openSettings();
}
function check(permission) {
  return _NativeRNPermissions.default.check(permission);
}
async function showRationaleAlert(rationale) {
  return new Promise(resolve => {
    const {
      title,
      message,
      buttonPositive,
      buttonNegative,
      buttonNeutral
    } = rationale;
    const buttons = [];
    if (buttonNegative) {
      const onPress = () => resolve(false);
      buttonNeutral && buttons.push({
        text: buttonNeutral,
        onPress
      });
      buttons.push({
        text: buttonNegative,
        onPress
      });
    }
    buttons.push({
      text: buttonPositive,
      onPress: () => resolve(true)
    });
    _reactNative.Alert.alert(title, message, buttons, {
      cancelable: false
    });
  });
}
async function request(permission, rationale) {
  if (rationale == null || !(await _NativeRNPermissions.default.shouldShowRequestRationale(permission))) {
    return _NativeRNPermissions.default.request(permission);
  }
  return (typeof rationale === 'function' ? rationale() : showRationaleAlert(rationale)).then(shouldRequest => shouldRequest ? _NativeRNPermissions.default.request(permission) : _NativeRNPermissions.default.check(permission));
}
async function checkNotifications() {
  if (_utils.platformVersion < TIRAMISU_VERSION_CODE) {
    return _NativeRNPermissions.default.checkNotifications();
  }
  const status = await check('android.permission.POST_NOTIFICATIONS');
  return {
    status,
    settings: {}
  };
}
async function requestNotifications(options) {
  if (_utils.platformVersion < TIRAMISU_VERSION_CODE) {
    return _NativeRNPermissions.default.requestNotifications(options);
  }
  const status = await request('android.permission.POST_NOTIFICATIONS');
  return {
    status,
    settings: {}
  };
}
function checkMultiple(permissions) {
  const dedup = (0, _utils.uniq)(permissions);
  return _NativeRNPermissions.default.checkMultiple(dedup);
}
function requestMultiple(permissions) {
  const dedup = (0, _utils.uniq)(permissions);
  return _NativeRNPermissions.default.requestMultiple(dedup);
}
const methods = exports.methods = {
  check,
  checkLocationAccuracy: _unsupportedPlatformMethods.checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openPhotoPicker: _unsupportedPlatformMethods.openPhotoPicker,
  openSettings,
  request,
  requestLocationAccuracy: _unsupportedPlatformMethods.requestLocationAccuracy,
  requestMultiple,
  requestNotifications
};
//# sourceMappingURL=methods.android.js.map