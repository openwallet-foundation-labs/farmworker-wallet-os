<a name="module_base64url-universal"></a>

## base64url-universal
Encode/Decode input according to the "Base64url Encoding" format as specified
in JSON Web Signature (JWS) RFC7517. A URL safe character set is used and
trailing '=', line breaks, whitespace, and other characters are omitted.


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
