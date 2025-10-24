"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearWatch = clearWatch;
exports.getCurrentPosition = getCurrentPosition;
exports.requestAuthorization = requestAuthorization;
exports.setRNConfiguration = setRNConfiguration;
exports.stopObserving = stopObserving;
exports.watchPosition = watchPosition;
/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

function setRNConfiguration(_config) {
  throw new Error('setRNConfiguration is not supported by the browser');
}
function requestAuthorization(_success, _error) {
  throw new Error('requestAuthorization is not supported by the browser');
}
async function getCurrentPosition(success, error, options) {
  if (typeof success !== 'function') {
    throw new Error('success callback must be a function');
  } else if (!navigator || !navigator.geolocation) {
    console.error('Navigator is undefined');
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}
function watchPosition(success, error, options) {
  if (typeof success !== 'function') {
    throw new Error('success callback must be a function');
  } else if (!navigator || !navigator.geolocation) {
    throw new Error('Navigator is undefined');
  }
  return navigator.geolocation.watchPosition(success, error, options);
}
function clearWatch(watchID) {
  if (!navigator || !navigator.geolocation) {
    console.error('Navigator is undefined');
    return;
  }
  navigator.geolocation.clearWatch(watchID);
}
function stopObserving() {
  throw new Error('stopObserving is not supported by the browser');
}
//# sourceMappingURL=implementation.js.map