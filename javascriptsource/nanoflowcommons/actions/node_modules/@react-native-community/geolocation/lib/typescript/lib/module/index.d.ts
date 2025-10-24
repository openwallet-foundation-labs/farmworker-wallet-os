export default Geolocation;
declare namespace Geolocation {
    function getCurrentPosition(success: any, error: any, options: any): void;
    function watchPosition(success: any, error: any, options: any): number;
    function clearWatch(watchID: any): void;
    function stopObserving(): void;
    function requestAuthorization(success: any, error: any): void;
    function setRNConfiguration(config: any): void;
}
//# sourceMappingURL=index.d.ts.map