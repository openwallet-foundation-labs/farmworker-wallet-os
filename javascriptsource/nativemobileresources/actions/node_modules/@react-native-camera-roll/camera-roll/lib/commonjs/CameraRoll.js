"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.progressUpdateEventEmitter = exports.CameraRoll = void 0;
var _reactNative = require("react-native");
var _NativeCameraRollModule = _interopRequireDefault(require("./NativeCameraRollModule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const GROUP_TYPES_OPTIONS = {
  Album: 'Album',
  All: 'All',
  // default
  Event: 'Event',
  Faces: 'Faces',
  Library: 'Library',
  SmartAlbum: 'SmartAlbum',
  PhotoStream: 'PhotoStream',
  SavedPhotos: 'SavedPhotos'
};
const ASSET_TYPE_OPTIONS = {
  All: 'All',
  Videos: 'Videos',
  Photos: 'Photos'
};
const ALBUM_TYPE_OPTIONS = {
  All: 'All',
  Album: 'Album',
  SmartAlbum: 'SmartAlbum'
};

/**
 * Shape of the param arg for the `getPhotos` function.
 */

const isIOS = _reactNative.Platform.OS === 'ios';
const progressUpdateEventEmitter = exports.progressUpdateEventEmitter = new _reactNative.NativeEventEmitter(isIOS ? _NativeCameraRollModule.default : undefined);

/**
 * `CameraRoll` provides access to the local camera roll or photo library.
 *
 * See https://facebook.github.io/react-native/docs/cameraroll.html
 */
class CameraRoll {
  static GroupTypesOptions = GROUP_TYPES_OPTIONS;
  static AssetTypeOptions = ASSET_TYPE_OPTIONS;
  static AlbumTypeOptions = ALBUM_TYPE_OPTIONS;

  /**
   * On iOS: requests deletion of a set of photos from the camera roll.
   * On Android: Deletes a set of photos from the camera roll.
   *
   */
  static deletePhotos(photoUris) {
    return _NativeCameraRollModule.default.deletePhotos(photoUris);
  }

  /**
   * Saves the photo or video to the camera roll or photo library, and returns the URI of the newly created asset.
   *
   * @deprecated `save(...)` is deprecated - use `saveAsset(...)` instead.
   */
  static async save(tag, options = {}) {
    const asset = await this.saveAsset(tag, options);
    return asset.node.image.uri;
  }

  /**
   * Saves the photo or video to the camera roll or photo library, and returns the newly created asset.
   *
   * @param tag The URI of the file you want to save to the camera roll.
   * @param options Custom options for saving to a specific album, or overriding the media type.
   * @returns The newly created `PhotoIdentifier` from the camera roll.
   */
  static saveAsset(tag, options = {}) {
    let {
      type = 'auto'
    } = options;
    const {
      album = ''
    } = options;
    if (tag === '') throw new Error('tag must be a valid string');
    if (type === 'auto') {
      const fileExtension = tag.split('.').slice(-1)[0] ?? '';
      if (['mov', 'mp4'].indexOf(fileExtension.toLowerCase()) >= 0) type = 'video';else type = 'photo';
    }
    return _NativeCameraRollModule.default.saveToCameraRoll(tag, {
      type,
      album
    });
  }
  static saveToCameraRoll(tag, type) {
    console.warn('CameraRoll.saveToCameraRoll(tag, type) is deprecated.  Use the save function instead');
    return CameraRoll.saveAsset(tag, {
      type
    });
  }
  static getAlbums(params = {
    assetType: 'All',
    albumType: 'Album'
  }) {
    return _NativeCameraRollModule.default.getAlbums(params);
  }
  static getParamsWithDefaults(params) {
    const newParams = {
      ...params
    };
    if (newParams.assetType === undefined) newParams.assetType = 'All';
    if (newParams.groupTypes === undefined && _reactNative.Platform.OS !== 'android') newParams.groupTypes = 'All';
    return newParams;
  }

  /**
   * Returns a Promise with photo identifier objects from the local camera
   * roll of the device matching shape defined by `getPhotosReturnChecker`.
   *
   * See https://facebook.github.io/react-native/docs/cameraroll.html#getphotos
   */
  static getPhotos(params) {
    params = CameraRoll.getParamsWithDefaults(params);
    return _NativeCameraRollModule.default.getPhotos(params);
  }

  /**
   * Returns a Promise with photo internal path.
   * if conversion is requested from HEIC then temporary file is created.
   *
   * @param internalID - PH photo internal ID.
   * @param options - photo conversion options.
   * @returns Promise<PhotoIdentifier>
   */
  static iosGetImageDataById(internalID, options = {}) {
    const conversionOptions = {
      convertHeicImages: false,
      ...options
    };
    return _NativeCameraRollModule.default.getPhotoByInternalID(internalID, conversionOptions);
  }

  /**
   * Returns a Promise with thumbnail photo.
   *
   * @param internalID - PH photo internal ID.
   * @param options - thumbnail photo options.
   * @returns Promise<PhotoThumbnail>
   */
  static getPhotoThumbnail(internalID, options) {
    return _NativeCameraRollModule.default.getPhotoThumbnail(internalID, options);
  }
}
exports.CameraRoll = CameraRoll;
//# sourceMappingURL=CameraRoll.js.map