"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cCredentialsModule = void 0;
const crypto_1 = require("../../crypto");
const dids_1 = require("../dids");
const W3cCredentialService_1 = require("./W3cCredentialService");
const W3cCredentialsApi_1 = require("./W3cCredentialsApi");
const W3cCredentialsModuleConfig_1 = require("./W3cCredentialsModuleConfig");
const SignatureSuiteRegistry_1 = require("./data-integrity/SignatureSuiteRegistry");
const W3cJsonLdCredentialService_1 = require("./data-integrity/W3cJsonLdCredentialService");
const signature_suites_1 = require("./data-integrity/signature-suites");
const jwt_vc_1 = require("./jwt-vc");
const W3cCredentialRepository_1 = require("./repository/W3cCredentialRepository");
/**
 * @public
 */
class W3cCredentialsModule {
    constructor(config) {
        this.api = W3cCredentialsApi_1.W3cCredentialsApi;
        this.config = new W3cCredentialsModuleConfig_1.W3cCredentialsModuleConfig(config);
    }
    register(dependencyManager) {
        dependencyManager.registerContextScoped(W3cCredentialsApi_1.W3cCredentialsApi);
        dependencyManager.registerSingleton(W3cCredentialService_1.W3cCredentialService);
        dependencyManager.registerSingleton(jwt_vc_1.W3cJwtCredentialService);
        dependencyManager.registerSingleton(W3cJsonLdCredentialService_1.W3cJsonLdCredentialService);
        dependencyManager.registerSingleton(W3cCredentialRepository_1.W3cCredentialRepository);
        dependencyManager.registerSingleton(SignatureSuiteRegistry_1.SignatureSuiteRegistry);
        // Register the config
        dependencyManager.registerInstance(W3cCredentialsModuleConfig_1.W3cCredentialsModuleConfig, this.config);
        // Always register ed25519 signature suite
        dependencyManager.registerInstance(SignatureSuiteRegistry_1.SignatureSuiteToken, {
            suiteClass: signature_suites_1.Ed25519Signature2018,
            proofType: 'Ed25519Signature2018',
            verificationMethodTypes: [
                dids_1.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2018,
                dids_1.VERIFICATION_METHOD_TYPE_ED25519_VERIFICATION_KEY_2020,
            ],
            keyTypes: [crypto_1.KeyType.Ed25519],
        });
    }
}
exports.W3cCredentialsModule = W3cCredentialsModule;
//# sourceMappingURL=W3cCredentialsModule.js.map