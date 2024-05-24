/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const context = require('./context');
const constants = require('./constants');
const {documentLoader} = require('./documentLoader');
const {CONTEXT_URL} = constants;

const contexts = new Map();
contexts.set(constants.CONTEXT_URL, context);

module.exports = {
  constants,
  contexts,
  documentLoader,
  CONTEXT_URL,
  CREDENTIALS_CONTEXT_V1_URL: CONTEXT_URL,
  CONTEXT_URL_V1: CONTEXT_URL,
  CONTEXT: context
};
