/**
 * The Geolocation API extends the web spec:
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
 *
 * See https://facebook.github.io/react-native/docs/geolocation.html
 */
export function setRNConfiguration(config: any): void;
export function requestAuthorization(success?: () => void, error?: (...args: any[]) => void): void;
export function getCurrentPosition(success: any, error?: (...args: any[]) => void, options?: {}): Promise<void>;
export function watchPosition(success: any, error?: (...args: any[]) => void, options?: {}): number;
export function clearWatch(watchID: any): void;
export function stopObserving(): void;
//# sourceMappingURL=implementation.native.d.ts.map