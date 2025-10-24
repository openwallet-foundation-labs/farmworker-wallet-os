import { Platform } from 'react-native';
import invariant from 'invariant';
import { perPlatformTypes } from './fileTypes';
import { NativeDocumentPicker } from './NativeDocumentPicker';
export const types = perPlatformTypes[Platform.OS];
export async function pickDirectory(params) {
  if (Platform.OS === 'ios') {
    const result = await pick({
      ...params,
      mode: 'open',
      allowMultiSelection: false,
      type: ['public.folder']
    });
    return {
      uri: result[0].uri
    };
  } else {
    return NativeDocumentPicker.pickDirectory();
  }
}
export function pickSingle(opts) {
  const options = {
    ...opts,
    allowMultiSelection: false
  };
  return pick(options).then(results => results[0]);
}
export function pick(opts) {
  const options = {
    // must be false to maintain old (v5) behavior
    allowMultiSelection: false,
    type: [types.allFiles],
    ...opts
  };
  const newOpts = {
    presentationStyle: 'formSheet',
    transitionStyle: 'coverVertical',
    ...options,
    type: Array.isArray(options.type) ? options.type : [options.type]
  };
  return doPick(newOpts);
}
function doPick(options) {
  invariant(!('filetype' in options), 'A `filetype` option was passed to DocumentPicker.pick, the correct option is `type`');
  invariant(!('types' in options), 'A `types` option was passed to DocumentPicker.pick, the correct option is `type`');
  invariant(options.type.every(type => typeof type === 'string'), `Unexpected type option in ${options.type}, did you try using a DocumentPicker.types.* that does not exist?`);
  invariant(options.type.length > 0, '`type` option should not be an empty array, at least one type must be passed if the `type` option is not omitted');
  invariant(!options.type.includes('folder'), 'RN document picker: "folder" option was removed, use "pickDirectory()"');
  if ('mode' in options && !['import', 'open'].includes(options.mode ?? '')) {
    throw new TypeError('Invalid mode option: ' + options.mode);
  }
  if ('copyTo' in options && !['cachesDirectory', 'documentDirectory'].includes(options.copyTo ?? '')) {
    throw new TypeError('Invalid copyTo option: ' + options.copyTo);
  }
  return NativeDocumentPicker.pick(options);
}
export function releaseSecureAccess(uris) {
  if (Platform.OS !== 'ios') {
    return Promise.resolve();
  }
  invariant(Array.isArray(uris) && uris.every(uri => typeof uri === 'string'), `"uris" should be an array of strings, was ${uris}`);
  return NativeDocumentPicker.releaseSecureAccess(uris);
}
const E_DOCUMENT_PICKER_CANCELED = 'DOCUMENT_PICKER_CANCELED';
const E_DOCUMENT_PICKER_IN_PROGRESS = 'ASYNC_OP_IN_PROGRESS';
export function isCancel(err) {
  return isErrorWithCode(err, E_DOCUMENT_PICKER_CANCELED);
}
export function isInProgress(err) {
  return isErrorWithCode(err, E_DOCUMENT_PICKER_IN_PROGRESS);
}
function isErrorWithCode(err, errorCode) {
  if (err && typeof err === 'object' && 'code' in err) {
    const nativeModuleErrorInstance = err;
    return (nativeModuleErrorInstance === null || nativeModuleErrorInstance === void 0 ? void 0 : nativeModuleErrorInstance.code) === errorCode;
  }
  return false;
}
export default {
  isCancel,
  isInProgress,
  releaseSecureAccess,
  pickDirectory,
  pick,
  pickSingle,
  types,
  perPlatformTypes
};
//# sourceMappingURL=index.js.map