"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerDidResolver = void 0;
const error_1 = require("../../../../error");
const repository_1 = require("../../repository");
const didPeer_1 = require("./didPeer");
const peerDidNumAlgo0_1 = require("./peerDidNumAlgo0");
const peerDidNumAlgo2_1 = require("./peerDidNumAlgo2");
class PeerDidResolver {
    constructor() {
        this.supportedMethods = ['peer'];
    }
    async resolve(agentContext, did) {
        const didRepository = agentContext.dependencyManager.resolve(repository_1.DidRepository);
        const didDocumentMetadata = {};
        try {
            let didDocument;
            if (!(0, didPeer_1.isValidPeerDid)(did)) {
                throw new error_1.AriesFrameworkError(`did ${did} is not a valid peer did`);
            }
            const numAlgo = (0, didPeer_1.getNumAlgoFromPeerDid)(did);
            // For method 0, generate from did
            if (numAlgo === didPeer_1.PeerDidNumAlgo.InceptionKeyWithoutDoc) {
                didDocument = (0, peerDidNumAlgo0_1.didToNumAlgo0DidDocument)(did);
            }
            // For Method 1, retrieve from storage
            else if (numAlgo === didPeer_1.PeerDidNumAlgo.GenesisDoc) {
                // We can have multiple did document records stored for a single did (one created and one received). In this case it
                // doesn't matter which one we use, and they should be identical. So we just take the first one.
                const [didDocumentRecord] = await didRepository.findAllByDid(agentContext, did);
                if (!didDocumentRecord) {
                    throw new error_1.AriesFrameworkError(`No did record found for peer did ${did}.`);
                }
                if (!didDocumentRecord.didDocument) {
                    throw new error_1.AriesFrameworkError(`Found did record for method 1 peer did (${did}), but no did document.`);
                }
                didDocument = didDocumentRecord.didDocument;
            }
            // For Method 2, generate from did
            else {
                didDocument = (0, peerDidNumAlgo2_1.didToNumAlgo2DidDocument)(did);
            }
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
exports.PeerDidResolver = PeerDidResolver;
//# sourceMappingURL=PeerDidResolver.js.map