import { Alert } from 'react-native';
import NativeModule from './NativeRNPermissions';
import { checkLocationAccuracy, openPhotoPicker, requestLocationAccuracy } from './unsupportedPlatformMethods';
import { platformVersion, uniq } from './utils';
const TIRAMISU_VERSION_CODE = 33;
async function openSettings() {
  await NativeModule.openSettings();
}
function check(permission) {
  return NativeModule.check(permission);
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
    Alert.alert(title, message, buttons, {
      cancelable: false
    });
  });
}
async function request(permission, rationale) {
  if (rationale == null || !(await NativeModule.shouldShowRequestRationale(permission))) {
    return NativeModule.request(permission);
  }
  return (typeof rationale === 'function' ? rationale() : showRationaleAlert(rationale)).then(shouldRequest => shouldRequest ? NativeModule.request(permission) : NativeModule.check(permission));
}
async function checkNotifications() {
  if (platformVersion < TIRAMISU_VERSION_CODE) {
    return NativeModule.checkNotifications();
  }
  const status = await check('android.permission.POST_NOTIFICATIONS');
  return {
    status,
    settings: {}
  };
}
async function requestNotifications(options) {
  if (platformVersion < TIRAMISU_VERSION_CODE) {
    return NativeModule.requestNotifications(options);
  }
  const status = await request('android.permission.POST_NOTIFICATIONS');
  return {
    status,
    settings: {}
  };
}
function checkMultiple(permissions) {
  const dedup = uniq(permissions);
  return NativeModule.checkMultiple(dedup);
}
function requestMultiple(permissions) {
  const dedup = uniq(permissions);
  return NativeModule.requestMultiple(dedup);
}
export const methods = {
  check,
  checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openPhotoPicker,
  openSettings,
  request,
  requestLocationAccuracy,
  requestMultiple,
  requestNotifications
};
//# sourceMappingURL=methods.android.js.map