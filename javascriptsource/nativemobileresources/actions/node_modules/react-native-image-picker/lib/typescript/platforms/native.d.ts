import { CameraOptions, ImageLibraryOptions, Callback, ImagePickerResponse } from '../types';
export declare function camera(options: CameraOptions, callback?: Callback): Promise<ImagePickerResponse>;
export declare function imageLibrary(options: ImageLibraryOptions, callback?: Callback): Promise<ImagePickerResponse>;
