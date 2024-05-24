/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import * as ed25519 from '@stablelib/ed25519';

// browser MUST provide "crypto.getRandomValues"
const crypto = self && (self.crypto || self.msCrypto);
if(!crypto.getRandomValues) {
  throw new Error('Browser does not provide "crypto.getRandomValues".');
}

async function generateKeyPair() {
  const seed = new Uint8Array(32);
  crypto.getRandomValues(seed);
  return ed25519.generateKeyPairFromSeed(seed);
}

async function sha256digest({data}) {
  return crypto.subtle.digest('SHA-256', data);
}

export default {
  generateKeyPair,
  sha256digest,
  ...ed25519
};
