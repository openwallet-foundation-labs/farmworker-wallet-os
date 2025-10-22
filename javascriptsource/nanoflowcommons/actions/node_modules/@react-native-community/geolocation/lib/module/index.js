/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as GeolocationModule from './implementation';
const Geolocation = {
  /**
   * Invokes the success callback once with the latest location info.  Supported
   * options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool)
   * On Android, this can return almost immediately if the location is cached or
   * request an update, which might take a while.
   */
  getCurrentPosition: function (success, error, options) {
    GeolocationModule.getCurrentPosition(success, error, options);
  },
  /**
   * Invokes the success callback whenever the location changes.  Supported
   * options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool), distanceFilter(m)
   */
  watchPosition: function (success, error, options) {
    return GeolocationModule.watchPosition(success, error, options);
  },
  /**
   * Clears the watch started by `watchPosition`.
   */
  clearWatch: function (watchID) {
    GeolocationModule.clearWatch(watchID);
  },
  /**
   * @deprecated `ReactNativeGeolocation.stopObserving` is deprecated. Use `ReactNativeGeolocation.clearWatch` instead.
   */
  stopObserving: function () {
    console.warn('`ReactNativeGeolocation.stopObserving` is deprecated and should not be used. Use `ReactNativeGeolocation.clearWatch` instead.');
    GeolocationModule.stopObserving();
  },
  requestAuthorization: function (success, error) {
    GeolocationModule.requestAuthorization(success, error);
  },
  setRNConfiguration: function (config) {
    GeolocationModule.setRNConfiguration(config);
  }
};
export default Geolocation;
//# sourceMappingURL=index.js.map