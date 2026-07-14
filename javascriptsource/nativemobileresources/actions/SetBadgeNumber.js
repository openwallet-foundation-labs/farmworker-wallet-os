import { NativeModules } from 'react-native';
import notifee from '@notifee/react-native';

// BEGIN EXTRA CODE
// END EXTRA CODE
/**
 * @param {Big} badgeNumber - This field is required. Should be greater than or equal to 0.
 * @returns {Promise.<void>}
 */
async function SetBadgeNumber(badgeNumber) {
    // BEGIN USER CODE
    // Documentation Documentation https://github.com/invertase/notifee
    if (NativeModules && !NativeModules.NotifeeApiModule) {
        return Promise.reject(new Error("Notifee native module is not available in your app"));
    }
    if (!badgeNumber) {
        return Promise.reject(new Error("Input parameter 'Badge number' is required"));
    }
    if (badgeNumber.lt(0)) {
        return Promise.reject(new Error("Input parameter 'Badge number' should be zero or greater"));
    }
    return notifee.setBadgeCount(Number(badgeNumber));
    // END USER CODE
}

export { SetBadgeNumber };
