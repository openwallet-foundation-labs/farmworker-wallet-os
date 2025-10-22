import { useRef, useState } from 'react';
import { CameraRoll } from './CameraRoll';
const initialState = {
  edges: [],
  page_info: {
    end_cursor: '',
    has_next_page: false,
    start_cursor: ''
  }
};
const defaultConfig = {
  first: 20,
  groupTypes: 'All'
};
export function useCameraRoll() {
  const [photos, setPhotos] = useState(initialState);
  const getPhotos = useRef(async (config = defaultConfig) => {
    try {
      const result = await CameraRoll.getPhotos(config);
      setPhotos(result);
    } catch (error) {
      if (__DEV__) console.log('[useCameraRoll] Error getting photos: ', error);
    }
  }).current;
  const save = useRef(async (...args) => {
    try {
      await CameraRoll.saveAsset(...args);
    } catch (error) {
      if (__DEV__) console.log('[useCameraRoll] Error saving to camera roll: ', error);
    }
  }).current;
  return [photos, getPhotos, save];
}
//# sourceMappingURL=useCameraRoll.js.map