import type { GetPhotosParams, PhotoIdentifiersPage, SaveToCameraRollOptions } from './CameraRoll';
declare type UseCameraRollResult = [
    PhotoIdentifiersPage,
    (config?: GetPhotosParams) => Promise<void>,
    (tag: string, options?: SaveToCameraRollOptions) => Promise<void>
];
export declare function useCameraRoll(): UseCameraRollResult;
export {};
//# sourceMappingURL=useCameraRoll.d.ts.map