# Universal `base64url` Library _(@digitalcredentials/base64url-universal)_

[![Build status](https://img.shields.io/github/actions/workflow/status/digitalcredentials/base64url-universal/main.yml?branch=main)](https://github.com/digitalcredentials/base64url-universal/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/@digitalcredentials/base64url-universal.svg)](https://npm.im/@digitalcredentials/base64url-universal)

> A Javascript isomorphic library for `base64url` text encoding, for Node.js, React Native and browsers

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Background

Encode/Decode input according to the "Base64url Encoding" format as specified
in JSON Web Signature (JWS) RFC7517. A URL safe character set is used and
trailing '=', line breaks, whitespace, and other characters are omitted.

## Security

TBD

## Install

- Node.js 16+ is recommended.

### NPM

To install via NPM:

```
npm install @digitalcredentials/base64url-universal
```

### Development

To install locally (for development):

```
git clone https://github.com/digitalcredentials/base64url-universal.git
cd base64url-universal
npm install
```

## Usage

* [base64url-universal](#module_base64url-universal)
    * [encode(input)](#exp_module_base64url-universal--encode) ⇒ <code>string</code> ⏏
    * [decode(input)](#exp_module_base64url-universal--decode) ⇒ <code>Uint8Array</code> ⏏

<a name="exp_module_base64url-universal--encode"></a>

### encode(input) ⇒ <code>string</code> ⏏
Encodes input according to the "Base64url Encoding" format as specified
in JSON Web Signature (JWS) RFC7517. A URL safe character set is used and
trailing '=', line breaks, whitespace, and other characters are omitted.

**Kind**: Exported function  
**Returns**: <code>string</code> - the encoded value.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Uint8Array</code> \| <code>string</code> | the data to encode. |

<a name="exp_module_base64url-universal--decode"></a>

### decode(input) ⇒ <code>Uint8Array</code> ⏏
Decodes input according to the "Base64url Encoding" format as specified
in JSON Web Signature (JWS) RFC7517. A URL safe character set is used and
trailing '=', line breaks, whitespace, and other characters are omitted.

**Kind**: Exported function  
**Returns**: <code>Uint8Array</code> - the decoded value.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | the data to decode. |

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2023 Digital Credentials Consortium.
