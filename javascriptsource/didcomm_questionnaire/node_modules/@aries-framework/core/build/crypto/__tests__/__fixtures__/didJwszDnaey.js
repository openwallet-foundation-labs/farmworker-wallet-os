"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWS_JSON = exports.DATA_JSON = exports.PUBLIC_KEY_BASE58 = exports.SEED = void 0;
const utils_1 = require("../../../utils");
exports.SEED = '00000000000000000000000000000My3';
exports.PUBLIC_KEY_BASE58 = '2ARvZ9WjdavGb3db6i1TR3bNW8QxqfG9YPHAJJXCsRj2t';
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
    protected: 'eyJhbGciOiJFUzI1NiIsImp3ayI6eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6IjZlR0VlUTdwZDB6UXZMdjdneERaN3FKSHpfY2gwWjlzM2JhUFBodmw0QlUiLCJ5IjoiTU8tS25aeUJ4bWo3THVxTU9yV0lNOG1SSzJrSWhXdF9LZF8yN2RvNXRmVSJ9fQ',
    signature: '3L6N8rPDpxQ6nBWqyoLIcy_82HRWcNs_foPRnByErtJMAuTCm0fBN_-27xa9FBr-zh6Kumk8pOovXYP8kJrA3g',
    header: { kid: 'did:key:zDnaeyQFrnYZJKPp3fnukaXZnhunkBE5yRdfgL8TjsLnnoW5z' },
    payload: utils_1.JsonEncoder.toBase64URL(exports.DATA_JSON),
};
//# sourceMappingURL=didJwszDnaey.js.map