"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// React Native sets `__turboModuleProxy` on global when TurboModules are enabled.
// Currently, this is the recommended way to detect TurboModules.
// https://reactnative.dev/docs/the-new-architecture/backward-compatibility-turbomodules#unify-the-javascript-specs
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const RNCNetInfo = isTurboModuleEnabled ?
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./NativeRNCNetInfo').default : _reactNative.NativeModules.RNCNetInfo;
var _default = exports.default = RNCNetInfo;
//# sourceMappingURL=nativeModule.js.map