"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWS_JSON = exports.DATA_JSON = exports.PUBLIC_KEY_BASE58 = exports.SEED = void 0;
const utils_1 = require("../../../utils");
exports.SEED = '00000000000000000000000000000My2';
exports.PUBLIC_KEY_BASE58 = 'kqa2HyagzfMAq42H5f9u3UMwnSBPQx2QfrSyXbUPxMn';
exports.DATA_JSON = {
    did: 'did',
    did_doc: {
        '@context': 'https://w3id.org/did/v1',
        service: [
            {
                id: 'did:example:123456789abcdefghi#did-communication',
                type: 'did-communication',
                priority: 0,
                recipientKeys: ['someVerkey'],
                routingKeys: [],
                serviceEndpoint: 'https://agent.example.com/',
            },
        ],
    },
};
exports.JWS_JSON = {
    header: { kid: 'did:key:z6MkfD6ccYE22Y9pHKtixeczk92MmMi2oJCP6gmNooZVKB9A' },
    protected: 'eyJhbGciOiJFZERTQSIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IkN6cmtiNjQ1MzdrVUVGRkN5SXI4STgxUWJJRGk2MnNrbU41Rm41LU1zVkUifX0',
    signature: 'OsDP4FM8792J9JlessA9IXv4YUYjIGcIAnPPrEJmgxYomMwDoH-h2DMAF5YF2VtsHHyhGN_0HryDjWSEAZdYBQ',
    payload: utils_1.JsonEncoder.toBase64URL(exports.DATA_JSON),
};
//# sourceMappingURL=didJwsz6Mkf.js.map