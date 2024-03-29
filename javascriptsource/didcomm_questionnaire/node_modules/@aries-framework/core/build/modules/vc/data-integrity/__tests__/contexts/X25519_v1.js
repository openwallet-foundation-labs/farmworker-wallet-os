"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X25519_V1 = void 0;
exports.X25519_V1 = {
    '@context': {
        id: '@id',
        type: '@type',
        '@protected': true,
        X25519KeyAgreementKey2019: {
            '@id': 'https://w3id.org/security#X25519KeyAgreementKey2019',
            '@context': {
                '@protected': true,
                id: '@id',
                type: '@type',
                controller: {
                    '@id': 'https://w3id.org/security#controller',
                    '@type': '@id',
                },
                revoked: {
                    '@id': 'https://w3id.org/security#revoked',
                    '@type': 'http://www.w3.org/2001/XMLSchema#dateTime',
                },
                publicKeyBase58: {
                    '@id': 'https://w3id.org/security#publicKeyBase58',
                },
            },
        },
    },
};
//# sourceMappingURL=X25519_v1.js.map