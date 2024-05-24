# Ed25519Signature2018 Suite JSON-LD Context _(ed25519-signature-2018-context)_

[![NPM Version](https://img.shields.io/npm/v/ed25519-signature-2018-context.svg)](https://npm.im/ed25519-signature-2018-context)

> JSON-LD Context for the Ed25519 2018 Cryptosuite.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

See also (related specs):

* [Ed25519 Signature 2018 Suite Draft Spec](https://w3c-ccg.github.io/lds-ed25519-2018/)
* [Multibase](https://github.com/multiformats/multibase) (for `proofValue` and `publicKeyMultibase` encoding)

## Install

Requires Node.js 12+

To install via NPM:

```
npm install ed25519-signature-2018-context
```

## Usage

```js
const {
  contexts, constants, appContextMap, documentLoader
} = require('ed25519-signature-2018-context');

// use URL in a JSON-LD context
const obj = {
  "@context": [
    constants.CONTEXT_URL,
    // ...
  ],
  // ...
};

// Codec term map value for CBOR-LD
constants.CBORLD_VALUE
// 0x13

// get context data for a specific context
const data = contexts.get('https://w3id.org/security/suites/ed25519-2018/v1');
// ...
```

This package can be used with bundlers, such as [webpack][], in browser
applications.

## API

The library exports the following properties:
- `constants`: A Object that maps constants to well-known context URLs. The
  main constant `CONTEXT_URL` may be updated from time to time to the
  latest context location.
- `contexts`: A `Map` that maps URLs to full context data.
- `appContextMap`: For use with `cborld` library.
- `documentLoader`


## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

- BSD 3-Clause © Digital Bazaar
- See the [LICENSE](./LICENSE) file for details.
