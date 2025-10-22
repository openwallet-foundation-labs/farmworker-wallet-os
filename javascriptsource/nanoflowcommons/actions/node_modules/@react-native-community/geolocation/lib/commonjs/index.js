"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var GeolocationModule = _interopRequireWildcard(require("./implementation"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

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
var _default = exports.default = Geolocation;
//# sourceMappingURL=index.js.map