# Ed25519VerificationKey2020 Key Pair Library for Linked Data _(@digitalcredentials/ed25519-verification-key-2020)_

[![Node.js CI](https://github.com/digitalcredentials/ed25519-verification-key-2020/workflows/Node.js%20CI/badge.svg)](https://github.com/digitalcredentials/ed25519-verification-key-2020/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/ed25519-verification-key-2020.svg)](https://npm.im/@digitalcredentials/ed25519-verification-key-2020)

> Javascript library for generating and working with Ed25519VerificationKey2020 key pairs, for use with crypto-ld.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

(Forked from [`digitalbazaar/ed25519-verification-key-2020` v3.1.0](https://github.com/digitalbazaar/ed25519-verification-key-2020)
to provide TypeScript compatibility.)

For use with:

* [`@digitalcredentials/ed25519-signature-2020`](https://github.com/digitalcredentials/ed25519-signature-2020) `^2.0.0`
  crypto suite (with [`jsonld-signatures`](https://github.com/digitalcredentials/jsonld-signatures) `^2.0.0`)
* [`@digitalcredentials/vc`](https://github.com/digitalcredentials/vc-js) `^2.0.0`

See also (related specs):

* [Ed25519VerificationKey2020](https://w3c-ccg.github.io/lds-ed25519-2020/#ed25519verificationkey2020) spec.

## Security

As with most security- and cryptography-related tools, the overall security of
your system will largely depend on your design decisions.

## Install

- Node.js 14+ is required.

To install locally (for development):

```
git clone https://github.com/digitalcredentials/ed25519-verification-key-2020.git
cd ed25519-verification-key-2020
npm install
```

## Usage

### Generating a new public/private key pair

To generate a new public/private key pair:

* `{string} [controller]` Optional controller URI or DID to initialize the
  generated key. (This will also init the key id.) 
* `{string} [seed]` Optional deterministic seed value from which to generate the 
  key.

```js
import {Ed25519VerificationKey2020} from '@digitalcredentials/ed25519-verification-key-2020';

const edKeyPair = await Ed25519VerificationKey2020.generate();
```

### Importing a key pair from storage

To create an instance of a public/private key pair from data imported from
storage, use `.from()`:

```js
const serializedKeyPair = { ... };

const keyPair = await Ed25519VerificationKey2020.from(serializedKeyPair);
````

### Exporting the public key only

To export just the public key of a pair:

```js
await keyPair.export({publicKey: true});
// ->
{ 
  type: 'Ed25519VerificationKey2020',
  id: 'did:example:1234#z6MkszZtxCmA2Ce4vUV132PCuLQmwnaDD5mw2L23fGNnsiX3',
  controller: 'did:example:1234',
  publicKeyMultibase: 'zEYJrMxWigf9boyeJMTRN4Ern8DJMoCXaLK77pzQmxVjf'
}
```

### Exporting the full public-private key pair

To export the full key pair, including private key (warning: this should be a
carefully considered operation, best left to dedicated Key Management Systems):

```js
await keyPair.export({publicKey: true, privateKey: true});
// ->
{
  type: 'Ed25519VerificationKey2020',
  id: 'did:example:1234#z6MkszZtxCmA2Ce4vUV132PCuLQmwnaDD5mw2L23fGNnsiX3',
  controller: 'did:example:1234',
  publicKeyMultibase: 'zEYJrMxWigf9boyeJMTRN4Ern8DJMoCXaLK77pzQmxVjf',
  privateKeyMultibase: 'z4E7Q4neNHwv3pXUNzUjzc6TTYspqn9Aw6vakpRKpbVrCzwKWD4hQDHnxuhfrTaMjnR8BTp9NeUvJiwJoSUM6xHAZ'
}
```

### Generating and verifying key fingerprint

To generate a fingerprint:

```js
keyPair.fingerprint();
// ->
'z6MkszZtxCmA2Ce4vUV132PCuLQmwnaDD5mw2L23fGNnsiX3'
```

To verify a fingerprint:

```js
const fingerprint = 'z6MkszZtxCmA2Ce4vUV132PCuLQmwnaDD5mw2L23fGNnsiX3';
keyPair.verifyFingerprint({fingerprint});
// ->
{valid: true}
```

### Creating a signer function

In order to perform a cryptographic signature, you need to create a `sign`
function, and then invoke it.

```js
const keyPair = Ed25519VerificationKey2020.generate();

const {sign} = keyPair.signer();

// data is a Uint8Array of bytes
const data = (new TextEncoder()).encode('test data goes here');
// Signing also outputs a Uint8Array, which you can serialize to text etc.
const signatureValueBytes = await sign({data});
```

### Creating a verifier function

In order to verify a cryptographic signature, you need to create a `verify`
function, and then invoke it (passing it the data to verify, and the signature).

```js
const keyPair = Ed25519VerificationKey2020.generate();

const {verify} = keyPair.verifier();

const valid = await verify({data, signature});
// true
```

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

* MIT License - DCC - TypeScript compatibility.
* New BSD License (3-clause) © 2020-2021 Digital Bazaar - Initial implementation.
