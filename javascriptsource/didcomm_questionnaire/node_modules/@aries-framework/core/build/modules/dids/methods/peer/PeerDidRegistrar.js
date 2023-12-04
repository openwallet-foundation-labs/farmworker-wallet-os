"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerDidRegistrar = void 0;
const utils_1 = require("../../../../utils");
const domain_1 = require("../../domain");
const DidDocumentRole_1 = require("../../domain/DidDocumentRole");
const repository_1 = require("../../repository");
const didPeer_1 = require("./didPeer");
const peerDidNumAlgo0_1 = require("./peerDidNumAlgo0");
const peerDidNumAlgo1_1 = require("./peerDidNumAlgo1");
const peerDidNumAlgo2_1 = require("./peerDidNumAlgo2");
class PeerDidRegistrar {
    constructor() {
        this.supportedMethods = ['peer'];
    }
    async create(agentContext, options) {
        var _a, _b, _c, _d;
        const didRepository = agentContext.dependencyManager.resolve(repository_1.DidRepository);
        let didDocument;
        try {
            if (isPeerDidNumAlgo0CreateOptions(options)) {
                const keyType = options.options.keyType;
                const seed = (_a = options.secret) === null || _a === void 0 ? void 0 : _a.seed;
                const privateKey = (_b = options.secret) === null || _b === void 0 ? void 0 : _b.privateKey;
                if (!keyType) {
                    return {
                        didDocumentMetadata: {},
                        didRegistrationMetadata: {},
                        didState: {
                            state: 'failed',
                            reason: 'Missing key type',
                        },
                    };
                }
                const key = await agentContext.wallet.createKey({
                    keyType,
                    seed,
                    privateKey,
                });
                // TODO: validate did:peer document
                didDocument = (0, peerDidNumAlgo0_1.keyToNumAlgo0DidDocument)(key);
            }
            else if (isPeerDidNumAlgo1CreateOptions(options)) {
                const didDocumentJson = options.didDocument.toJSON();
                const did = (0, peerDidNumAlgo1_1.didDocumentJsonToNumAlgo1Did)(didDocumentJson);
                didDocument = utils_1.JsonTransformer.fromJSON(Object.assign(Object.assign({}, didDocumentJson), { id: did }), domain_1.DidDocument);
            }
            else if (isPeerDidNumAlgo2CreateOptions(options)) {
                const didDocumentJson = options.didDocument.toJSON();
                const did = (0, peerDidNumAlgo2_1.didDocumentToNumAlgo2Did)(options.didDocument);
                didDocument = utils_1.JsonTransformer.fromJSON(Object.assign(Object.assign({}, didDocumentJson), { id: did }), domain_1.DidDocument);
            }
            else {
                return {
                    didDocumentMetadata: {},
                    didRegistrationMetadata: {},
                    didState: {
                        state: 'failed',
                        reason: `Missing or incorrect numAlgo provided`,
                    },
                };
            }
            // Save the did so we know we created it and can use it for didcomm
            const didRecord = new repository_1.DidRecord({
                did: didDocument.id,
                role: DidDocumentRole_1.DidDocumentRole.Created,
                didDocument: isPeerDidNumAlgo1CreateOptions(options) ? didDocument : undefined,
                tags: {
                    // We need to save the recipientKeys, so we can find the associated did
                    // of a key when we receive a message from another connection.
                    recipientKeyFingerprints: didDocument.recipientKeys.map((key) => key.fingerprint),
                },
            });
            await didRepository.save(agentContext, didRecord);
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'finished',
                    did: didDocument.id,
                    didDocument,
                    secret: {
                        // FIXME: the uni-registrar creates the seed in the registrar method
                        // if it doesn't exist so the seed can always be returned. Currently
                        // we can only return it if the seed was passed in by the user. Once
                        // we have a secure method for generating seeds we should use the same
                        // approach
                        seed: (_c = options.secret) === null || _c === void 0 ? void 0 : _c.seed,
                        privateKey: (_d = options.secret) === null || _d === void 0 ? void 0 : _d.privateKey,
                    },
                },
            };
        }
        catch (error) {
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'failed',
                    reason: `unknown error: ${error.message}`,
                },
            };
        }
    }
    async update() {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notImplemented: updating did:peer not implemented yet`,
            },
        };
    }
    async deactivate() {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notImplemented: deactivating did:peer not implemented yet`,
            },
        };
    }
}
exports.PeerDidRegistrar = PeerDidRegistrar;
function isPeerDidNumAlgo1CreateOptions(options) {
    return options.options.numAlgo === didPeer_1.PeerDidNumAlgo.GenesisDoc;
}
function isPeerDidNumAlgo0CreateOptions(options) {
    return options.options.numAlgo === didPeer_1.PeerDidNumAlgo.InceptionKeyWithoutDoc;
}
function isPeerDidNumAlgo2CreateOptions(options) {
    return options.options.numAlgo === didPeer_1.PeerDidNumAlgo.MultipleInceptionKeyWithoutDoc;
}
//# sourceMappingURL=PeerDidRegistrar.js.map