import { CameraOptions, ImageLibraryOptions, Callback } from './types';
export * from './types';
export declare function launchCamera(options: CameraOptions, callback?: Callback): Promise<import("./types").ImagePickerResponse>;
export declare function launchImageLibrary(options: ImageLibraryOptions, callback?: Callback): Promise<import("./types").ImagePickerResponse>;
