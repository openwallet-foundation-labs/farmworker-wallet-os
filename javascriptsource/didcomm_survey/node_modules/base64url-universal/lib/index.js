/*!
 * Copyright (c) 2018-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const api = {};
module.exports = api;

const base64url = require('base64url');

api.encode = base64url.encode;
api.decode = base64url.toBuffer;
