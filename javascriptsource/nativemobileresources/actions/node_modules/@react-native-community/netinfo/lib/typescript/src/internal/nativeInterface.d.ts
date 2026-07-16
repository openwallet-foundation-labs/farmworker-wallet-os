/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { NativeEventEmitter } from 'react-native';
declare const _default: {
    configure: (config: Partial<import("./types").NetInfoConfiguration>) => void;
    addListener: <K extends "netInfo.networkStatusDidChange">(type: K, listener: (event: import("./privateTypes").Events[K]) => void) => void;
    removeListeners: <K_1 extends "netInfo.networkStatusDidChange">(type: K_1, listener: (event: import("./privateTypes").Events[K_1]) => void) => void;
    getCurrentState: (requestedInterface?: string | undefined) => Promise<import("./privateTypes").NetInfoNativeModuleState>;
    readonly eventEmitter: NativeEventEmitter;
};
export default _default;
