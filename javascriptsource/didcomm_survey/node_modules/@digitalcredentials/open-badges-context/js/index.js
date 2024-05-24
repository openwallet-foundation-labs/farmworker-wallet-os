/* eslint-disable */
/*!
 * Copyright (c) 2022 Digital Credentials Consortium. All rights reserved.
 */
'use strict';

/**
 * Beta version of OBv3 context.
 * Used by the OBv3 WG (by IMS Global, renamed to 1EdTech) until Nov 7, 2022.
 * Documents processed using the OBv3 BETA context expanded terms to:
 * https://imsglobal.github.io/openbadges-specification/ob_v3p0.html
 * These terms were used in JFF Plugfests 1 and 2, and early DCC pilot deployments.
 */
const context_v3_beta = require('./contexts/context-3.0-beta');

/**
 * Finalized OBv3 "production" context, used after Nov 7, 2022.
 * Documents processed using the final 3.0 context expanded terms to:
 * https://purl.imsglobal.org/spec/vc/ob/vocab.html
 */
const context_v3_0_0 = require('./contexts/context-3.0');

const context_v3_0_1 = require('./contexts/context-3.0.1');
const context_v3_0_2 = require('./contexts/context-3.0.2');
const context_v3_0_3 = require('./contexts/context-3.0.3');
const context_v3_extensions = require('./contexts/context-extensions');

// Used for early OBv3 issuance before the spec was finalized
const CONTEXT_URL_V3_ALPHA =
  'https://imsglobal.github.io/openbadges-specification/ob_v3p0.html';

// This URL was used for issuing JFF 1 credentials
const CONTEXT_URL_V3_JFF_V1 =
  'https://w3c-ccg.github.io/vc-ed/plugfest-1-2022/jff-vc-edu-plugfest-1-context.json';

// Note: This URL is actually 'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
// Which is the same url used by v3.0.0 production. To prevent overwriting
// the contents, BETA gets its own 'id' (for use in custom processing)
const CONTEXT_URL_V3_BETA = 'OBv3_beta'

// Finalized on Nov 4, 2022
const CONTEXT_URL_V3_0_0 =
  'https://purl.imsglobal.org/spec/ob/v3p0/context.json';

const CONTEXT_URL_V3_0_1 =
  'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.1.json';
const CONTEXT_URL_V3_0_2 =
  'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json';
const CONTEXT_URL_V3_0_3 =
  'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json';
const CONTEXT_URL_V3_EXTENSIONS =
  'https://purl.imsglobal.org/spec/ob/v3p0/extensions.json';

const contexts = new Map();
contexts.set(CONTEXT_URL_V3_ALPHA, context_v3_beta);
contexts.set(CONTEXT_URL_V3_JFF_V1, context_v3_beta);
contexts.set(CONTEXT_URL_V3_BETA, context_v3_beta);
contexts.set(CONTEXT_URL_V3_0_0, context_v3_0_0);
contexts.set(CONTEXT_URL_V3_0_1, context_v3_0_1);
contexts.set(CONTEXT_URL_V3_0_2, context_v3_0_2);
contexts.set(CONTEXT_URL_V3_0_3, context_v3_0_3);
contexts.set(CONTEXT_URL_V3_EXTENSIONS, context_v3_extensions);

// Latest OBv3 context url
const CONTEXT_URL_V3 = CONTEXT_URL_V3_0_3;
contexts.set(CONTEXT_URL_V3, context_v3_0_3);

module.exports = {
  contexts,
  CONTEXT_URL_V3_ALPHA,
  CONTEXT_URL_V3_JFF_V1,
  CONTEXT_URL_V3_BETA,
  CONTEXT_URL_V3_0_0,
  CONTEXT_URL_V3_0_1,
  CONTEXT_URL_V3_0_2,
  CONTEXT_URL_V3_0_3,
  CONTEXT_URL_V3_EXTENSIONS,
  CONTEXT_URL_V3,
};
