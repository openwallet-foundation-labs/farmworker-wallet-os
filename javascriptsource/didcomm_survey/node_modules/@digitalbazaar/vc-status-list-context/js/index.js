/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const context = require('./context');
const constants = require('./constants');
const {CONTEXT_URL_V1, CBORLD_VALUE} = constants;

const contexts = new Map();
contexts.set(CONTEXT_URL_V1, context);

const appContextMap = new Map();
appContextMap.set(CONTEXT_URL_V1, CBORLD_VALUE);

module.exports = {
  constants,
  contexts,
  appContextMap,
  CONTEXT_URL_V1,
  CONTEXT_V1: context
};
