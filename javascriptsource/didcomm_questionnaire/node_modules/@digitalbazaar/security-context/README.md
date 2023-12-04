# Linked Data Security Context Repository _(@digitalbazaar/security-context)_

[![Build Status](https://img.shields.io/github/actions/workflow/status/digitalbazaar/security-context/main.yml)](https://github.com/digitalbazaar/security-context/actions/workflows/main.yml)
[![NPM Version](https://img.shields.io/npm/v/@digitalbazaar/security-context.svg)](https://npm.im/@digitalbazaar/security-context)

> Compact isomorphic clone of CCG's security-context.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Developing](#developing)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

This is a copy of the [Linked Data Security Vocabulary](https://github.com/w3c-ccg/security-vocab)
context, with a refactored export to make it easier to use in the browser and
in React Native.

## Install

Requires Node.js 12+

To install via NPM:

```
npm install @digitalbazaar/security-context
```

## Usage

```js
import secCtx from '@digitalbazaar/security-context';
// or
const secCtx = require('@digitalbazaar/security-context');
const {contexts, constants} = secCtx;

secCtx.CONTEXT_URL
// 'https://w3id.org/security/v2'
secCtx.SECURITY_CONTEXT_V1_URL
// 'https://w3id.org/security/v1'
secCtx.SECURITY_CONTEXT_V2_URL
// 'https://w3id.org/security/v2'

// get context data for a specific context
secCtx.contexts.get(secCtx.SECURITY_CONTEXT_V2_URL)
// security/v2 full context object
```

This package can be used with bundlers, such as [webpack][], in browser
applications.

## API

The library exports the following properties:
- `CONTEXT_URL` and `CONTEXT` (it's recommended that context repositories only export one context).
- `constants`: A Object that maps constants to well-known context URLs. The
  main constant `CONTEXT_URL` may be updated from time to time to the
  latest context location.
- `contexts`: A `Map` that maps URLs to full context data.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

- BSD 3-Clause © Digital Bazaar
- See the [LICENSE](./LICENSE) file for details.

[webpack]: https://webpack.js.org/
