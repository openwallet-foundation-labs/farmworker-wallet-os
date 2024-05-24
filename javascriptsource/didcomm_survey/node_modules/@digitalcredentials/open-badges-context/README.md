# OpenBadges v3 Context _(@digitalcredentials/open-badges-context)_

[![Node.js CI](https://github.com/digitalcredentials/open-badges-context/workflows/Node.js%20CI/badge.svg)](https://github.com/digitalcredentials/open-badges-context/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/open-badges-context.svg)](https://npm.im/@digitalcredentials/open-badges-context)

> NPM package for the OBv3 (Open Badges version 3) JSON-LD context.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Developing](#developing)
- [License](#license)

## Background

For use with JSON-LD document loaders (such as
the DCC [`security-document-loader`](https://github.com/digitalcredentials/security-document-loader)
or DigitalBazaar's [`jsonld-document-loader`](https://github.com/digitalbazaar/jsonld-document-loader)). 

## Install

Requires Node.js 14+

To install via NPM:

```
npm install @digitalcredentials/open-badges-context
```

## Usage

```js
import obCtx from '@digitalcredentials/open-badges-context';
// or
const obCtx = require('@digitalcredentials/open-badges-context');

obCtx.CONTEXT_URL_V3
// 'https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json' <-- Latest URL

// get context data for a specific context
obCtx.contexts.get(obCtx.CONTEXT_URL_V3)
// full context object
```

This package can be used with bundlers, such as [webpack](https://webpack.js.org/), 
in browser applications.

### API

The library exports the following properties:
- Various OBv3 `@context` URLs, such as:
  `CONTEXT_URL_V3`, `CONTEXT_URL_V3_0_0`, `CONTEXT_URL_V3_0_3` etc.
- `contexts`: A `Map` that maps URLs to full context data.

See [index.js](./js/index.js) for full list of exports.

### Developing

When adding a new `@context`, do all of the following:

1. Add the new context file to `js/contexts`
2. Update `js/index.js`
3. Update `rollup.config.js` with the new exports
4. Update `context.spec.js` with the new exports
5. Update README / Usage section.

## License

* [MIT License](./LICENSE)
