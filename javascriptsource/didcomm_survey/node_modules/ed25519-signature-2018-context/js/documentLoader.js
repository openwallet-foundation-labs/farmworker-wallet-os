/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {CONTEXT_URL} = require('./constants');
const context = require('./context');

module.exports = {
  documentLoader(url) {
    if(url !== CONTEXT_URL) {
      throw new Error(`Loading document "${url}" is not allowed.`);
    }

    return {
      contextUrl: null,
      document: context,
      documentUrl: url
    };
  }
};
