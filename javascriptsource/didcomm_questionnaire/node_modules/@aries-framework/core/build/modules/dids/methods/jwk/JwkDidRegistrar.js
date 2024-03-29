"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwkDidRegistrar = void 0;
const jwk_1 = require("../../../../crypto/jose/jwk");
const DidDocumentRole_1 = require("../../domain/DidDocumentRole");
const repository_1 = require("../../repository");
const DidJwk_1 = require("./DidJwk");
class JwkDidRegistrar {
    constructor() {
        this.supportedMethods = ['jwk'];
    }
    async create(agentContext, options) {
        var _a, _b, _c, _d;
        const didRepository = agentContext.dependencyManager.resolve(repository_1.DidRepository);
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
        try {
            const key = await agentContext.wallet.createKey({
                keyType,
                seed,
                privateKey,
            });
            const jwk = (0, jwk_1.getJwkFromKey)(key);
            const didJwk = DidJwk_1.DidJwk.fromJwk(jwk);
            // Save the did so we know we created it and can issue with it
            const didRecord = new repository_1.DidRecord({
                did: didJwk.did,
                role: DidDocumentRole_1.DidDocumentRole.Created,
            });
            await didRepository.save(agentContext, didRecord);
            return {
                didDocumentMetadata: {},
                didRegistrationMetadata: {},
                didState: {
                    state: 'finished',
                    did: didJwk.did,
                    didDocument: didJwk.didDocument,
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
                    reason: `unknownError: ${error.message}`,
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
                reason: `notSupported: cannot update did:jwk did`,
            },
        };
    }
    async deactivate() {
        return {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                reason: `notSupported: cannot deactivate did:jwk did`,
            },
        };
    }
}
exports.JwkDidRegistrar = JwkDidRegistrar;
//# sourceMappingURL=JwkDidRegistrar.js.map