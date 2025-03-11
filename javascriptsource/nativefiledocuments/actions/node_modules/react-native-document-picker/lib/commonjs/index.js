"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickDirectory = pickDirectory;
exports.pickMultiple = pickMultiple;
exports.pickSingle = pickSingle;
exports.pick = pick;
exports.releaseSecureAccess = releaseSecureAccess;
exports.isCancel = isCancel;
exports.isInProgress = isInProgress;
exports.default = exports.types = void 0;

var _reactNative = require("react-native");

var _invariant = _interopRequireDefault(require("invariant"));

var _fileTypes = require("./fileTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = _fileTypes.perPlatformTypes[_reactNative.Platform.OS];
exports.types = types;
const RNDocumentPicker = _reactNative.NativeModules.RNDocumentPicker;

async function pickDirectory(params) {
  if (_reactNative.Platform.OS === 'ios') {
    const result = await pick({ ...params,
      mode: 'open',
      allowMultiSelection: false,
      type: ['public.folder']
    });
    return {
      uri: result[0].uri
    };
  } else {
    return RNDocumentPicker.pickDirectory();
  }
}

function pickMultiple(opts) {
  const options = { ...opts,
    allowMultiSelection: true
  };
  return pick(options);
}

function pickSingle(opts) {
  const options = { ...opts,
    allowMultiSelection: false
  };
  return pick(options).then(results => results[0]);
}

function pick(opts) {
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
  var _options$mode, _options$copyTo;

  (0, _invariant.default)(!('filetype' in options), 'A `filetype` option was passed to DocumentPicker.pick, the correct option is `type`');
  (0, _invariant.default)(!('types' in options), 'A `types` option was passed to DocumentPicker.pick, the correct option is `type`');
  (0, _invariant.default)(options.type.every(type => typeof type === 'string'), `Unexpected type option in ${options.type}, did you try using a DocumentPicker.types.* that does not exist?`);
  (0, _invariant.default)(options.type.length > 0, '`type` option should not be an empty array, at least one type must be passed if the `type` option is not omitted');
  (0, _invariant.default)( // @ts-ignore TS2345: Argument of type 'string' is not assignable to parameter of type 'PlatformTypes[OS][keyof PlatformTypes[OS]]'.
  !options.type.includes('folder'), 'RN document picker: "folder" option was removed, use "pickDirectory()"');

  if ('mode' in options && !['import', 'open'].includes((_options$mode = options.mode) !== null && _options$mode !== void 0 ? _options$mode : '')) {
    throw new TypeError('Invalid mode option: ' + options.mode);
  }

  if ('copyTo' in options && !['cachesDirectory', 'documentDirectory'].includes((_options$copyTo = options.copyTo) !== null && _options$copyTo !== void 0 ? _options$copyTo : '')) {
    throw new TypeError('Invalid copyTo option: ' + options.copyTo);
  }

  return RNDocumentPicker.pick(options);
}

function releaseSecureAccess(uris) {
  if (_reactNative.Platform.OS !== 'ios') {
    return Promise.resolve();
  }

  (0, _invariant.default)(Array.isArray(uris) && uris.every(uri => typeof uri === 'string'), `"uris" should be an array of strings, was ${uris}`);
  return RNDocumentPicker.releaseSecureAccess(uris);
}

const E_DOCUMENT_PICKER_CANCELED = 'DOCUMENT_PICKER_CANCELED';
const E_DOCUMENT_PICKER_IN_PROGRESS = 'ASYNC_OP_IN_PROGRESS';

function isCancel(err) {
  return isErrorWithCode(err, E_DOCUMENT_PICKER_CANCELED);
}

function isInProgress(err) {
  return isErrorWithCode(err, E_DOCUMENT_PICKER_IN_PROGRESS);
}

function isErrorWithCode(err, errorCode) {
  if (err instanceof Error && 'code' in err) {
    const nativeModuleErrorInstance = err;
    return (nativeModuleErrorInstance === null || nativeModuleErrorInstance === void 0 ? void 0 : nativeModuleErrorInstance.code) === errorCode;
  }

  return false;
}

var _default = {
  isCancel,
  releaseSecureAccess,
  pickDirectory,
  pick,
  pickMultiple,
  pickSingle,
  types,
  perPlatformTypes: _fileTypes.perPlatformTypes
};
exports.default = _default;
//# sourceMappingURL=index.js.map