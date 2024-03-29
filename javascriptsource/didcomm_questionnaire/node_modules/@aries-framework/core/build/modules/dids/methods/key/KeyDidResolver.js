"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDidResolver = void 0;
const DidKey_1 = require("./DidKey");
class KeyDidResolver {
    constructor() {
        this.supportedMethods = ['key'];
    }
    async resolve(agentContext, did) {
        const didDocumentMetadata = {};
        try {
            const didDocument = DidKey_1.DidKey.fromDid(did).didDocument;
            return {
                didDocument,
                didDocumentMetadata,
                didResolutionMetadata: { contentType: 'application/did+ld+json' },
            };
        }
        catch (error) {
            return {
                didDocument: null,
                didDocumentMetadata,
                didResolutionMetadata: {
                    error: 'notFound',
                    message: `resolver_error: Unable to resolve did '${did}': ${error}`,
                },
            };
        }
    }
}
exports.KeyDidResolver = KeyDidResolver;
//# sourceMappingURL=KeyDidResolver.js.map