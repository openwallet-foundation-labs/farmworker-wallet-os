import { TurboModule } from 'react-native';
import type { PhotoThumbnail } from './CameraRoll';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';
export declare type AlbumType = 'All' | 'Album' | 'SmartAlbum';
export declare type AlbumSubType = 'AlbumRegular' | 'AlbumSyncedEvent' | 'AlbumSyncedFaces' | 'AlbumSyncedAlbum' | 'AlbumImported' | 'AlbumMyPhotoStream' | 'AlbumCloudShared' | 'Unknown';
declare type Album = {
    id: string;
    title: string;
    count: number;
    type: AlbumType;
    subtype?: AlbumSubType;
};
declare type SubTypes = 'PhotoPanorama' | 'PhotoHDR' | 'PhotoScreenshot' | 'PhotoLive' | 'PhotoDepthEffect' | 'VideoStreamed' | 'VideoHighFrameRate' | 'VideoTimelapse';
declare type SourceType = 'UserLibrary' | 'CloudShared';
declare type PhotoIdentifier = {
    node: {
        id: string;
        type: string;
        subTypes: SubTypes;
        sourceType: SourceType;
        group_name: string[];
        image: {
            filename: string | null;
            filepath: string | null;
            extension: string | null;
            uri: string;
            height: number;
            width: number;
            fileSize: number | null;
            playableDuration: number;
            orientation: number | null;
        };
        timestamp: number;
        modificationTimestamp: number;
        location: {
            latitude?: number;
            longitude?: number;
            altitude?: number;
            heading?: number;
            speed?: number;
        } | null;
    };
};
declare type PhotoIdentifiersPage = {
    edges: Array<PhotoIdentifier>;
    page_info: {
        has_next_page: boolean;
        start_cursor?: string;
        end_cursor?: string;
    };
    limited?: boolean;
};
export interface Spec extends TurboModule {
    saveToCameraRoll(uri: string, options: Object): Promise<PhotoIdentifier>;
    getPhotos(params: Object): Promise<PhotoIdentifiersPage>;
    getAlbums(params: Object): Promise<Album[]>;
    deletePhotos(photoUris: Array<string>): Promise<void>;
    getPhotoByInternalID(internalID: string, options: Object): Promise<PhotoIdentifier>;
    getPhotoThumbnail(internalID: string, options: Object): Promise<PhotoThumbnail>;
    addListener(eventName: string): void;
    removeListeners(count: Double): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeCameraRollModule.d.ts.map