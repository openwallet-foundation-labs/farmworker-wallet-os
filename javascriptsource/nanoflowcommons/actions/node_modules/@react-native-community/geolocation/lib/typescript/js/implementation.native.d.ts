/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import type { GeolocationOptions, GeolocationConfiguration, GeolocationResponse, GeolocationError } from './NativeRNCGeolocation';
/**
 * The Geolocation API extends the web spec:
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html
 */
export declare function setRNConfiguration(config: GeolocationConfiguration): void;
export declare function requestAuthorization(success?: () => void, error?: (error: GeolocationError) => void): void;
export declare function getCurrentPosition(success: (position: GeolocationResponse) => void, error?: (error: GeolocationError) => void, options?: GeolocationOptions): Promise<void>;
export declare function watchPosition(success: (position: GeolocationResponse) => void, error?: (error: GeolocationError) => void, options?: GeolocationOptions): number;
export declare function clearWatch(watchID: number): void;
export declare function stopObserving(): void;
//# sourceMappingURL=implementation.native.d.ts.map