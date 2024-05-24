/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const context = require('./context');
const constants = require('./constants');
const {documentLoader} = require('./documentLoader');
const {CONTEXT_URL, CBORLD_CODEC_VALUE} = constants;

const contexts = new Map();
contexts.set(CONTEXT_URL, context);

const appContextMap = new Map();
appContextMap.set(CONTEXT_URL, CBORLD_CODEC_VALUE);

module.exports = {
  constants,
  contexts,
  appContextMap,
  documentLoader,
  CONTEXT_URL,
  CONTEXT: context
};
