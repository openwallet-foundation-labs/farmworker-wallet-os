"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typesAreEqual = exports.perPlatformTypes = void 0;
const mimeTypes = Object.freeze({
  allFiles: '*/*',
  audio: 'audio/*',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  images: 'image/*',
  pdf: 'application/pdf',
  plainText: 'text/plain',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  video: 'video/*',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip'
});
const utis = Object.freeze({
  allFiles: 'public.item',
  audio: 'public.audio',
  csv: 'public.comma-separated-values-text',
  doc: 'com.microsoft.word.doc',
  docx: 'org.openxmlformats.wordprocessingml.document',
  images: 'public.image',
  pdf: 'com.adobe.pdf',
  plainText: 'public.plain-text',
  ppt: 'com.microsoft.powerpoint.ppt',
  pptx: 'org.openxmlformats.presentationml.presentation',
  video: 'public.movie',
  xls: 'com.microsoft.excel.xls',
  xlsx: 'org.openxmlformats.spreadsheetml.sheet',
  zip: 'public.zip-archive'
});
const extensions = Object.freeze({
  allFiles: '*',
  audio: '.3g2 .3gp .aac .adt .adts .aif .aifc .aiff .asf .au .m3u .m4a .m4b .mid .midi .mp2 .mp3 .mp4 .rmi .snd .wav .wax .wma',
  csv: '.csv',
  doc: '.doc',
  docx: '.docx',
  images: '.jpeg .jpg .png',
  pdf: '.pdf',
  plainText: '.txt',
  ppt: '.ppt',
  pptx: '.pptx',
  video: '.mp4',
  xls: '.xls',
  xlsx: '.xlsx',
  zip: '.zip .gz'
});
const perPlatformTypes = {
  android: mimeTypes,
  ios: utis,
  windows: extensions,
  // unsupported, but added to make TS happy
  macos: extensions,
  web: extensions
}; // ensure shapes of platformTypes are the same: https://stackoverflow.com/a/67027347/2070942
// let me know if there's a nicer way

exports.perPlatformTypes = perPlatformTypes;
const mimesAndUtisAreEqual = true;
const mimesAndExtensionsAreEqual = true;
const typesAreEqual = mimesAndUtisAreEqual && mimesAndExtensionsAreEqual;
exports.typesAreEqual = typesAreEqual;
//# sourceMappingURL=fileTypes.js.map