/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import credentialsCtx from 'credentials-context';
import {StatusList} from './StatusList.js';
import {verifyCredential as vcVerifyCredential} from '@digitalcredentials/vc';
import statusListCtx from '@digitalbazaar/vc-status-list-context';

const VC_V1_CONTEXT_URL = credentialsCtx.constants.CREDENTIALS_CONTEXT_V1_URL;
const SL_V1_CONTEXT_URL = statusListCtx.constants.CONTEXT_URL_V1;

export {StatusList};

export async function createList({length}) {
  return new StatusList({length});
}

export async function decodeList({encodedList}) {
  return StatusList.decode({encodedList});
}

/**
 * Creates a StatusList Credential.
 *
 * @param {object} options - Options to use.
 * @param {string} options.id - The id for StatusList Credential.
 * @param {StatusList} options.list - An instance of StatusList.
 * @param {string} options.statusPurpose - The purpose of the status entry.
 *
 * @returns {object} The resulting `StatusList Credential`.
 */
export async function createCredential({id, list, statusPurpose}) {
  if(!(id && typeof id === 'string')) {
    throw new TypeError('"id" is required.');
  }
  if(!(list && typeof list.encode === 'function')) {
    throw new TypeError('"list" is required.');
  }
  if(!(statusPurpose && typeof statusPurpose === 'string')) {
    throw new TypeError('"statusPurpose" is required.');
  }
  const encodedList = await list.encode();
  return {
    '@context': [VC_V1_CONTEXT_URL, SL_V1_CONTEXT_URL],
    id,
    type: ['VerifiableCredential', 'StatusList2021Credential'],
    credentialSubject: {
      id: `${id}#list`,
      type: 'StatusList2021',
      encodedList,
      statusPurpose
    }
  };
}

export async function checkStatus({
  credential,
  documentLoader,
  suite,
  verifyStatusListCredential = true,
  verifyMatchingIssuers = true
} = {}) {
  let result;
  try {
    result = await _checkStatuses({
      credential,
      documentLoader,
      suite,
      verifyStatusListCredential,
      verifyMatchingIssuers,
    });
  } catch(error) {
    result = {
      verified: false,
      error,
    };
  }
  return result;
}

export function statusTypeMatches({credential} = {}) {
  _isObject({credential});
  // check for expected contexts
  const {'@context': contexts} = credential;
  if(!Array.isArray(contexts)) {
    throw new TypeError('"@context" must be an array.');
  }
  if(contexts[0] !== VC_V1_CONTEXT_URL) {
    throw new Error(
      `The first "@context" value must be "${VC_V1_CONTEXT_URL}".`);
  }
  const {credentialStatus} = credential;
  if(!credentialStatus) {
    // no status; no match
    return false;
  }
  if(typeof credentialStatus !== 'object') {
    // bad status
    throw new Error('"credentialStatus" is invalid.');
  }
  if(!contexts.includes(SL_V1_CONTEXT_URL)) {
    // context not present, no match
    return false;
  }
  const credentialStatuses = _getStatuses({credential});
  return credentialStatuses.length > 0;
}

export function assertStatusList2021Context({credential} = {}) {
  _isObject({credential});
  // check for expected contexts
  const {'@context': contexts} = credential;
  if(!Array.isArray(contexts)) {
    throw new TypeError('"@context" must be an array.');
  }
  if(contexts[0] !== VC_V1_CONTEXT_URL) {
    throw new Error(
      `The first "@context" value must be "${VC_V1_CONTEXT_URL}".`);
  }
  if(!contexts.includes(SL_V1_CONTEXT_URL)) {
    throw new TypeError(`"@context" must include "${SL_V1_CONTEXT_URL}".`);
  }
}

/**
 * Gets the `credentialStatus` of a credential based on its status purpose
 * (`statusPurpose`).
 *
 * @param {object} options - Options to use.
 * @param {object} options.credential - A VC.
 * @param {'revocation'|'suspension'} options.statusPurpose - A
 *   `statusPurpose`.
 *
 * @throws If the `credentialStatus` is invalid or missing.
 *
 * @returns {object} The resulting `credentialStatus`.
 */
export function getCredentialStatus({credential, statusPurpose} = {}) {
  _isObject({credential});
  assertStatusList2021Context({credential});
  if(!(statusPurpose && typeof statusPurpose === 'string')) {
    throw new TypeError('"statusPurpose" must be a string.');
  }
  // get and validate status
  if(!(credential.credentialStatus &&
    typeof credential.credentialStatus === 'object')) {
    throw new Error('"credentialStatus" is missing or invalid.');
  }
  const credentialStatuses = _getStatuses({credential});
  if(credentialStatuses.length === 0) {
    throw new Error('"credentialStatus" with type "StatusList2021Entry" ' +
    `and status purpose "${statusPurpose}" not found.`);
  }
  const result = credentialStatuses.filter(
    credentialStatus => _validateStatus({credentialStatus})).find(
    // check for matching `statusPurpose`
    cs => cs.statusPurpose === statusPurpose);
  if(!result) {
    throw new Error('"credentialStatus" with type "StatusList2021Entry" ' +
    `and status purpose "${statusPurpose}" not found.`);
  }
  return result;
}

async function _checkStatus({
  credential,
  credentialStatus,
  verifyStatusListCredential,
  verifyMatchingIssuers,
  suite,
  documentLoader
}) {
  // get SL position
  const {statusListIndex} = credentialStatus;
  const index = parseInt(statusListIndex, 10);
  // retrieve SL VC
  let slCredential;
  try {
    ({document: slCredential} = await documentLoader(
      credentialStatus.statusListCredential));
  } catch(e) {
    const err = new Error(
      'Could not load "StatusList2021Credential"; ' +
      `reason: ${e.message}`);
    err.cause = e;
    throw err;
  }
  const {statusPurpose: credentialStatusPurpose} = credentialStatus;
  const {statusPurpose: slCredentialStatusPurpose} =
    slCredential.credentialSubject;
  if(slCredentialStatusPurpose !== credentialStatusPurpose) {
    throw new Error(
      `The status purpose "${slCredentialStatusPurpose}" of the status ` +
      `list credential does not match the status purpose ` +
      `"${credentialStatusPurpose}" in the credential.`);
  }
  // verify SL VC
  if(verifyStatusListCredential) {
    const verifyResult = await vcVerifyCredential({
      credential: slCredential,
      suite,
      documentLoader
    });
    if(!verifyResult.verified) {
      const {error: e} = verifyResult;
      let msg = '"StatusList2021Credential" not verified';
      if(e) {
        msg += `; reason: ${e.message}`;
      } else {
        msg += '.';
      }
      const err = new Error(msg);
      if(e) {
        err.cause = verifyResult.error;
      }
      throw err;
    }
  }

  // ensure that the issuer of the verifiable credential matches
  // the issuer of the statusListCredential
  if(verifyMatchingIssuers) {
    // covers both the URI and object cases
    const credentialIssuer =
      typeof credential.issuer === 'object' ?
        credential.issuer.id : credential.issuer;
    const statusListCredentialIssuer =
      typeof slCredential.issuer === 'object' ?
        slCredential.issuer.id : slCredential.issuer;

    if(!(credentialIssuer && statusListCredentialIssuer) ||
      (credentialIssuer !== statusListCredentialIssuer)) {
      throw new Error(
        'Issuers of the status list credential and verifiable ' +
        'credential do not match.');
    }
  }
  if(!slCredential.type.includes('StatusList2021Credential')) {
    throw new Error(
      'Status list credential type must include "StatusList2021Credential".');
  }

  // get JSON StatusList
  const {credentialSubject: sl} = slCredential;

  if(sl.type !== 'StatusList2021') {
    throw new Error('Status list type must be "StatusList2021".');
  }

  // decode list from SL VC
  const {encodedList} = sl;
  const list = await decodeList({encodedList});

  // check VC's SL index for the status
  const verified = !list.getStatus(index);
  return {verified};
}

async function _checkStatuses({
  credential,
  documentLoader,
  suite,
  verifyStatusListCredential,
  verifyMatchingIssuers
}) {
  _isObject({credential});
  if(typeof documentLoader !== 'function') {
    throw new TypeError('"documentLoader" must be a function.');
  }
  if(verifyStatusListCredential && !(suite && (
    isArrayOfObjects(suite) ||
    (!Array.isArray(suite) && typeof suite === 'object')))) {
    throw new TypeError('"suite" must be an object or an array of objects.');
  }
  const credentialStatuses = _getStatuses({credential});
  if(credentialStatuses.length === 0) {
    throw new Error('"credentialStatus.type" must be "StatusList2021Entry".');
  }
  credentialStatuses.forEach(
    credentialStatus => _validateStatus({credentialStatus}));
  const results = await Promise.all(credentialStatuses.map(
    credentialStatus => _checkStatus({
      credential,
      credentialStatus,
      suite,
      documentLoader,
      verifyStatusListCredential,
      verifyMatchingIssuers
    })));
  const verified = results.every(
    ({verified = false} = {}) => verified === true);
  return {verified};
}

/**
 * Takes in a credentialStatus an ensures it meets the
 * normative statements from the Status List 2021 spec.
 *
 * @see https://w3c-ccg.github.io/vc-status-list-2021/
 *
 * @param {object} options - Options to use.
 * @param {object} options.credentialStatus - A credentialStatus.
 *
 * @throws - An error if the credentialStatus is non-normative.
 *
 * @returns {object} A credentialStatus.
 */
function _validateStatus({credentialStatus}) {
  if(credentialStatus.type !== 'StatusList2021Entry') {
    throw new Error(
      '"credentialStatus.type" must be "StatusList2021Entry".');
  }
  if(typeof credentialStatus.statusPurpose !== 'string') {
    throw new TypeError(
      '"credentialStatus.statusPurpose" must be a string.');
  }
  if(typeof credentialStatus.id !== 'string') {
    throw new TypeError(
      '"credentialStatus.id" must be a string.');
  }
  if(typeof credentialStatus.statusListCredential !== 'string') {
    throw new TypeError(
      '"credentialStatus.statusListCredential" must be a string.');
  }
  const index = parseInt(credentialStatus.statusListIndex, 10);
  if(isNaN(index)) {
    throw new TypeError('"statusListIndex" must be an integer.');
  }
  if(credentialStatus.id === credentialStatus.statusListCredential) {
    throw new Error('"credentialStatus.id" must not be ' +
      '"credentialStatus.statusListCredential".');
  }
  return credentialStatus;
}

/**
 * Checks if a credential is not falsey and an object.
 *
 * @param {object} options - Options to use.
 * @param {object} [options.credential] - A potential VC.
 *
 * @throws - Throws if the credential is falsey or not an object.
 *
 * @returns {undefined}
 */
function _isObject({credential}) {
  if(!(credential && typeof credential === 'object')) {
    throw new TypeError('"credential" must be an object.');
  }
}

/**
 * Gets the statuses of a credential.
 *
 * @param {object} options - Options to use.
 * @param {object} options.credential - A VC with a credentialStatus.
 *
 * @returns {Array<object>} An array of statuses with type
 *   "StatusList2021Entry" or an empty array if there are no matching types.
 */
function _getStatuses({credential}) {
  const {credentialStatus} = credential;
  if(Array.isArray(credentialStatus)) {
    return credentialStatus.filter(cs => cs.type === 'StatusList2021Entry');
  }
  if(credentialStatus && credentialStatus.type === 'StatusList2021Entry') {
    return [credentialStatus];
  }
  return [];
}

function isArrayOfObjects(x) {
  return Array.isArray(x) && x.length > 0 &&
    x.every(x => x && typeof x === 'object');
}
