// Copyright 2016 wkh237@github. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found in the LICENSE file.

import { Platform } from 'react-native';
import ReactNativeBlobUtil from './codegenSpecs/NativeBlobUtils';

/**
 * Send an intent to open the file.
 * @param  {string} path Path of the file to be open.
 * @param  {string} mime MIME type string
 * @param  {string} chooserTitle for chooser, if not set the chooser won't be displayed (see https://developer.android.com/reference/android/content/Intent.html#createChooser(android.content.Intent,%20java.lang.CharSequence))
 * @return {Promise}
 */
function actionViewIntent(path, mime, chooserTitle) {
  if(typeof chooserTitle === 'undefined') chooserTitle = null;
  if(Platform.OS === 'android')
    return ReactNativeBlobUtil.actionViewIntent(path, mime, chooserTitle);
  else
    return Promise.reject('ReactNativeBlobUtil.android.actionViewIntent only supports Android.');
}

function getContentIntent(mime) {
  if(Platform.OS === 'android')
    return ReactNativeBlobUtil.getContentIntent(mime);
  else
    return Promise.reject('ReactNativeBlobUtil.android.getContentIntent only supports Android.');
}

function addCompleteDownload(config) {
  if(Platform.OS === 'android')
    return ReactNativeBlobUtil.addCompleteDownload(config);
  else
    return Promise.reject('ReactNativeBlobUtil.android.addCompleteDownload only supports Android.');
}

function getSDCardDir() {
  if(Platform.OS === 'android')
    return ReactNativeBlobUtil.getSDCardDir();
  else
    return Promise.reject('ReactNativeBlobUtil.android.getSDCardDir only supports Android.');
}

function getSDCardApplicationDir() {
  if(Platform.OS === 'android')
    return ReactNativeBlobUtil.getSDCardApplicationDir();
  else
    return Promise.reject('ReactNativeBlobUtil.android.getSDCardApplicationDir only supports Android.');
}


export default {
  actionViewIntent,
  getContentIntent,
  addCompleteDownload,
  getSDCardDir,
  getSDCardApplicationDir,
};
