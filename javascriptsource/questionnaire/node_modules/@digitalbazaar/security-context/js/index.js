/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const secv1 = require('./security-v1');
const secv2 = require('./security-v2');
const constants = require('./constants');
const {
  CONTEXT_URL, SECURITY_CONTEXT_V1_URL, SECURITY_CONTEXT_V2_URL
} = constants;

const contexts = new Map();
contexts.set(SECURITY_CONTEXT_V1_URL, secv1);
contexts.set(SECURITY_CONTEXT_V2_URL, secv2);

module.exports = {
  constants,
  contexts,
  SECURITY_CONTEXT_V1_URL,
  SECURITY_CONTEXT_V2_URL,
  CONTEXT_URL,
  CONTEXT: secv2
};
