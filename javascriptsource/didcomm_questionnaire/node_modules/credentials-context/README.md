# Verifiable Credentials v1 Context _(credentials-context)_

[![NPM Version](https://img.shields.io/npm/v/credentials-context.svg?style=flat-square)](https://npm.im/credentials-context)

> A [Verifiable Credentials v1](https://github.com/w3c/vc-data-model) context library for JavaScript

This project packages the DID Context from the [Verifiable Credentials v1 spec](https://github.com/w3c/vc-data-model)
for use with [Node.js][Node.js] and web apps.

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Security

TBD

## Background

See also (related specs):

* [Verifiable Credentials Data Model v1](https://github.com/w3c/vc-data-model)

## Install

Requires [Node.js][] 8.3+

To install via [NPM][]:

```
npm install credentials-context
```

## Usage

```js
import credentialsContext from 'credentials-context';
// or
const credentialsContext = require('credentials-context');

// use URL in a JSON-LD context
const obj = {
  "@context": [
    credentialsContext.CONTEXT_URL_V1,
    // ...
  ],
  // ...
};

// get context data for a specific context
const data = credentialsContext.CONTEXT;
// ...
```

This package can be used with bundlers, such as [webpack][], in browser
applications.

## API

The library exports two properties:
- `constants`: A Object that maps constants to well-known context URLs. The
  main constant `CONTEXT_URL_V1` may be updated from time to time to the
  latest context location.
- `contexts`: A `Map` that maps URLs to full context data.

## Contribute

Note: If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

- Code: BSD 3-Clause © Digital Bazaar
- Contexts: W3C Software and Document License
- See the [LICENSE](./LICENSE.md) file for details.

[credentials-context]: https://github.com/digitalbazaar/credentials-context
[NPM]: https://www.npmjs.com/
[Node.js]: https://nodejs.org/
[webpack]: https://webpack.js.org/
