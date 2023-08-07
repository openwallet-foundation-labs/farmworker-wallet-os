"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWS_JSON = exports.DATA_JSON = exports.PUBLIC_KEY_BASE58 = exports.SEED = void 0;
const utils_1 = require("../../../utils");
exports.SEED = '00000000000000000000000000000My1';
exports.PUBLIC_KEY_BASE58 = 'GjZWsBLgZCR18aL468JAT7w9CZRiBnpxUPPgyQxh4voa';
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
    protected: 'eyJhbGciOiJFZERTQSIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IjZjWjJiWkttS2lVaUY5TUxLQ1Y4SUlZSUVzT0xIc0pHNXFCSjlTclFZQmsifX0',
    signature: 'Js_ibaz24b4GRikbGPeLvRe5FyrcVR2aNVZSs26CLl3DCMJdPqUNRxVDNOD-dBnLs0HyTh6_mX9cG9vWEimtBA',
    header: { kid: 'did:key:z6MkvBpZTRb7tjuUF5AkmhG1JDV928hZbg5KAQJcogvhz9ax' },
    payload: utils_1.JsonEncoder.toBase64URL(exports.DATA_JSON),
};
//# sourceMappingURL=didJwsz6Mkv.js.map