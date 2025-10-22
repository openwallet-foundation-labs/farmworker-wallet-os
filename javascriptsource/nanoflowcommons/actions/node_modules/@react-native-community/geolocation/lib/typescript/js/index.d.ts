/**
 * Copyright (c) React Native Community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import type { GeolocationOptions, GeolocationConfiguration, GeolocationResponse, GeolocationError } from './NativeRNCGeolocation';
declare const Geolocation: {
    /**
     * Invokes the success callback once with the latest location info.  Supported
     * options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool)
     * On Android, this can return almost immediately if the location is cached or
     * request an update, which might take a while.
     */
    getCurrentPosition: (success: (position: GeolocationResponse) => void, error?: ((error: GeolocationError) => void) | undefined, options?: GeolocationOptions) => void;
    /**
     * Invokes the success callback whenever the location changes.  Supported
     * options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool), distanceFilter(m)
     */
    watchPosition: (success: (position: GeolocationResponse) => void, error?: ((error: GeolocationError) => void) | undefined, options?: GeolocationOptions) => number;
    /**
     * Clears the watch started by `watchPosition`.
     */
    clearWatch: (watchID: number) => void;
    /**
     * @deprecated `ReactNativeGeolocation.stopObserving` is deprecated. Use `ReactNativeGeolocation.clearWatch` instead.
     */
    stopObserving: () => void;
    requestAuthorization: (success?: () => void, error?: ((error: GeolocationError) => void) | undefined) => void;
    setRNConfiguration: (config: GeolocationConfiguration) => void;
};
export type { GeolocationOptions, GeolocationConfiguration, GeolocationResponse, GeolocationError, };
export default Geolocation;
//# sourceMappingURL=index.d.ts.map