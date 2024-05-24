# Ed25519Signature2020 suite _(@digitalcredentials/ed25519-signature-2020)_

[![Build status](https://img.shields.io/github/workflow/status/digitalcredentials/ed25519-signature-2020/Node.js%20CI)](https://github.com/digitalcredentials/ed25519-signature-2020/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/ed25519-signature-2020.svg)](https://npm.im/digitalcredentials/ed25519-signature-2020)

> Ed25519Signature2020 Linked Data Proof suite for use with jsonld-signatures.

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

(Forked from [`digitalbazaar/ed25519-signature-2020` v3.0.0](https://github.com/digitalbazaar/ed25519-verification-key-2020)
to provide TypeScript compatibility.)

For use with https://github.com/digitalbazaar/jsonld-signatures v9.0 and above.

See also related specs:

* [Ed25519Signature2020 Crypto Suite](https://w3c-ccg.github.io/lds-ed25519-2020/)

## Security

TBD

## Install

- Node.js 14+ is required.

To install locally (for development):

```
git clone https://github.com/digitalcredentials/ed25519-signature-2020.git
cd ed25519-signature-2020
npm install
```

## Usage

The following code snippet provides a complete example of digitally signing
a verifiable credential using this library:

```javascript
import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;
import {Ed25519VerificationKey2020} from
  '@digitalbazaar/ed25519-verification-key-2020';
import {Ed25519Signature2020, suiteContext} from
  '@digitalbazaar/ed25519-signature-2020';

// create the unsigned credential
const unsignedCredential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      AlumniCredential: 'https://schema.org#AlumniCredential',
      alumniOf: 'https://schema.org#alumniOf'
    }
  ],
  id: 'http://example.edu/credentials/1872',
  type: [ 'VerifiableCredential', 'AlumniCredential' ],
  issuer: 'https://example.edu/issuers/565049',
  issuanceDate: '2010-01-01T19:23:24Z',
  credentialSubject: {
    id: 'https://example.edu/students/alice',
    alumniOf: 'Example University'
  }
};

// create the keypair to use when signing
const controller = 'https://example.edu/issuers/565049';
const keyPair = await Ed25519VerificationKey2020.from({
  type: 'Ed25519VerificationKey2020',
  controller,
  id: controller + '#z6MknCCLeeHBUaHu4aHSVLDCYQW9gjVJ7a63FpMvtuVMy53T',
  publicKeyMultibase: 'z6MknCCLeeHBUaHu4aHSVLDCYQW9gjVJ7a63FpMvtuVMy53T',
  privateKeyMultibase: 'zrv2EET2WWZ8T1Jbg4fEH5cQxhbUS22XxdweypUbjWVzv1YD6VqYu' +
    'W6LH7heQCNYQCuoKaDwvv2qCWz3uBzG2xesqmf'
});

const suite = new Ed25519Signature2020({key: keyPair});
suite.date = '2010-01-01T19:23:24Z';

signedCredential = await jsigs.sign(unsignedCredential, {
  suite,
  purpose: new AssertionProofPurpose(),
  documentLoader
});

// results in the following signed VC
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    {
      "AlumniCredential": "https://schema.org#AlumniCredential",
      "alumniOf": "https://schema.org#alumniOf"
    },
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "http://example.edu/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "https://example.edu/students/alice",
    "alumniOf": "Example University"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2010-01-01T19:23:24Z",
    "verificationMethod": "https://example.edu/issuers/565049#z6MknCCLeeHBUaHu4aHSVLDCYQW9gjVJ7a63FpMvtuVMy53T",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3MvGcVxzRzzpKF1HA11EjvfPZsN8NAb7kXBRfeTm3CBg2gcJLQM5hZNmj6Ccd9Lk4C1YueiFZvkSx4FuHVYVouQk"
  }
}
```

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

* MIT License - DCC - TypeScript compatibility.
* New BSD License (3-clause) © 2020-2021 Digital Bazaar - Initial implementation.
