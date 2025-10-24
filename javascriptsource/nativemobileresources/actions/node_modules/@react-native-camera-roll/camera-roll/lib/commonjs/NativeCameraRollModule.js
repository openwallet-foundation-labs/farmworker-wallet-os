"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
/* eslint-disable @typescript-eslint/ban-types */
// we use Object type because methods on the native side use NSDictionary and ReadableMap
// and we want to stay compatible with those
var _default = exports.default = _reactNative.TurboModuleRegistry.getEnforcing('RNCCameraRoll');
//# sourceMappingURL=NativeCameraRollModule.js.map