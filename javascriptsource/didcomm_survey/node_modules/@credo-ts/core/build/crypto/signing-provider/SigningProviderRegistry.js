"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigningProviderRegistry = exports.SigningProviderToken = void 0;
const error_1 = require("../../error");
const plugins_1 = require("../../plugins");
exports.SigningProviderToken = Symbol('SigningProviderToken');
let SigningProviderRegistry = class SigningProviderRegistry {
    constructor(signingKeyProviders) {
        // This is a really ugly hack to make tsyringe work without any SigningProviders registered
        // It is currently impossible to use @injectAll if there are no instances registered for the
        // token. We register a value of `default` by default and will filter that out in the registry.
        // Once we have a signing provider that should always be registered we can remove this. We can make an ed25519
        // signer using the @stablelib/ed25519 library.
        this.signingKeyProviders = signingKeyProviders.filter((provider) => provider !== 'default');
    }
    hasProviderForKeyType(keyType) {
        const signingKeyProvider = this.signingKeyProviders.find((x) => x.keyType === keyType);
        return signingKeyProvider !== undefined;
    }
    getProviderForKeyType(keyType) {
        const signingKeyProvider = this.signingKeyProviders.find((x) => x.keyType === keyType);
        if (!signingKeyProvider) {
            throw new error_1.CredoError(`No signing key provider for key type: ${keyType}`);
        }
        return signingKeyProvider;
    }
    get supportedKeyTypes() {
        return Array.from(new Set(this.signingKeyProviders.map((provider) => provider.keyType)));
    }
};
SigningProviderRegistry = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.injectAll)(exports.SigningProviderToken)),
    __metadata("design:paramtypes", [Array])
], SigningProviderRegistry);
exports.SigningProviderRegistry = SigningProviderRegistry;
//# sourceMappingURL=SigningProviderRegistry.js.map