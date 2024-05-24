"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwsService = void 0;
const error_1 = require("../error");
const plugins_1 = require("../plugins");
const utils_1 = require("../utils");
const error_2 = require("../wallet/error");
const JwsTypes_1 = require("./JwsTypes");
const jwk_1 = require("./jose/jwk");
const jwt_1 = require("./jose/jwt");
let JwsService = class JwsService {
    async createJwsBase(agentContext, options) {
        const { jwk, alg } = options.protectedHeaderOptions;
        const keyJwk = (0, jwk_1.getJwkFromKey)(options.key);
        // Make sure the options.key and jwk from protectedHeader are the same.
        if (jwk && (jwk.key.keyType !== options.key.keyType || !jwk.key.publicKey.equals(options.key.publicKey))) {
            throw new error_1.CredoError(`Protected header JWK does not match key for signing.`);
        }
        // Validate the options.key used for signing against the jws options
        // We use keyJwk instead of jwk, as the user could also use kid instead of jwk
        if (keyJwk && !keyJwk.supportsSignatureAlgorithm(alg)) {
            throw new error_1.CredoError(`alg '${alg}' is not a valid JWA signature algorithm for this jwk with keyType ${keyJwk.keyType}. Supported algorithms are ${keyJwk.supportedSignatureAlgorithms.join(', ')}`);
        }
        const payload = options.payload instanceof jwt_1.JwtPayload ? utils_1.JsonEncoder.toBuffer(options.payload.toJson()) : options.payload;
        const base64Payload = utils_1.TypedArrayEncoder.toBase64URL(payload);
        const base64UrlProtectedHeader = utils_1.JsonEncoder.toBase64URL(this.buildProtected(options.protectedHeaderOptions));
        const signature = utils_1.TypedArrayEncoder.toBase64URL(await agentContext.wallet.sign({
            data: utils_1.TypedArrayEncoder.fromString(`${base64UrlProtectedHeader}.${base64Payload}`),
            key: options.key,
        }));
        return {
            base64Payload,
            base64UrlProtectedHeader,
            signature,
        };
    }
    async createJws(agentContext, { payload, key, header, protectedHeaderOptions }) {
        const { base64UrlProtectedHeader, signature, base64Payload } = await this.createJwsBase(agentContext, {
            payload,
            key,
            protectedHeaderOptions,
        });
        return {
            protected: base64UrlProtectedHeader,
            signature,
            header,
            payload: base64Payload,
        };
    }
    /**
     *  @see {@link https://www.rfc-editor.org/rfc/rfc7515#section-3.1}
     * */
    async createJwsCompact(agentContext, { payload, key, protectedHeaderOptions }) {
        const { base64Payload, base64UrlProtectedHeader, signature } = await this.createJwsBase(agentContext, {
            payload,
            key,
            protectedHeaderOptions,
        });
        return `${base64UrlProtectedHeader}.${base64Payload}.${signature}`;
    }
    /**
     * Verify a JWS
     */
    async verifyJws(agentContext, { jws, jwkResolver }) {
        let signatures = [];
        let payload;
        if (typeof jws === 'string') {
            if (!JwsTypes_1.JWS_COMPACT_FORMAT_MATCHER.test(jws))
                throw new error_1.CredoError(`Invalid JWS compact format for value '${jws}'.`);
            const [protectedHeader, _payload, signature] = jws.split('.');
            payload = _payload;
            signatures.push({
                header: {},
                protected: protectedHeader,
                signature,
            });
        }
        else if ('signatures' in jws) {
            signatures = jws.signatures;
            payload = jws.payload;
        }
        else {
            signatures.push(jws);
            payload = jws.payload;
        }
        if (signatures.length === 0) {
            throw new error_1.CredoError('Unable to verify JWS, no signatures present in JWS.');
        }
        const jwsFlattened = {
            signatures,
            payload,
        };
        const signerKeys = [];
        for (const jws of signatures) {
            const protectedJson = utils_1.JsonEncoder.fromBase64(jws.protected);
            if (!(0, utils_1.isJsonObject)(protectedJson)) {
                throw new error_1.CredoError('Unable to verify JWS, protected header is not a valid JSON object.');
            }
            if (!protectedJson.alg || typeof protectedJson.alg !== 'string') {
                throw new error_1.CredoError('Unable to verify JWS, protected header alg is not provided or not a string.');
            }
            const jwk = await this.jwkFromJws({
                jws,
                payload,
                protectedHeader: Object.assign(Object.assign({}, protectedJson), { alg: protectedJson.alg }),
                jwkResolver,
            });
            if (!jwk.supportsSignatureAlgorithm(protectedJson.alg)) {
                throw new error_1.CredoError(`alg '${protectedJson.alg}' is not a valid JWA signature algorithm for this jwk with keyType ${jwk.keyType}. Supported algorithms are ${jwk.supportedSignatureAlgorithms.join(', ')}`);
            }
            const data = utils_1.TypedArrayEncoder.fromString(`${jws.protected}.${payload}`);
            const signature = utils_1.TypedArrayEncoder.fromBase64(jws.signature);
            signerKeys.push(jwk.key);
            try {
                const isValid = await agentContext.wallet.verify({ key: jwk.key, data, signature });
                if (!isValid) {
                    return {
                        isValid: false,
                        signerKeys: [],
                        jws: jwsFlattened,
                    };
                }
            }
            catch (error) {
                // WalletError probably means signature verification failed. Would be useful to add
                // more specific error type in wallet.verify method
                if (error instanceof error_2.WalletError) {
                    return {
                        isValid: false,
                        signerKeys: [],
                        jws: jwsFlattened,
                    };
                }
                throw error;
            }
        }
        return { isValid: true, signerKeys, jws: jwsFlattened };
    }
    buildProtected(options) {
        var _a;
        if (!options.jwk && !options.kid) {
            throw new error_1.CredoError('Both JWK and kid are undefined. Please provide one or the other.');
        }
        if (options.jwk && options.kid) {
            throw new error_1.CredoError('Both JWK and kid are provided. Please only provide one of the two.');
        }
        return Object.assign(Object.assign({}, options), { alg: options.alg, jwk: (_a = options.jwk) === null || _a === void 0 ? void 0 : _a.toJson(), kid: options.kid });
    }
    async jwkFromJws(options) {
        const { protectedHeader, jwkResolver, jws, payload } = options;
        if (protectedHeader.jwk && protectedHeader.kid) {
            throw new error_1.CredoError('Both JWK and kid are defined in the protected header. Only one of the two is allowed.');
        }
        // Jwk
        if (protectedHeader.jwk) {
            if (!(0, utils_1.isJsonObject)(protectedHeader.jwk))
                throw new error_1.CredoError('JWK is not a valid JSON object.');
            return (0, jwk_1.getJwkFromJson)(protectedHeader.jwk);
        }
        if (!jwkResolver) {
            throw new error_1.CredoError(`jwkResolver is required when the JWS protected header does not contain a 'jwk' property.`);
        }
        try {
            const jwk = await jwkResolver({
                jws,
                protectedHeader,
                payload,
            });
            return jwk;
        }
        catch (error) {
            throw new error_1.CredoError(`Error when resolving JWK for JWS in jwkResolver. ${error.message}`, {
                cause: error,
            });
        }
    }
};
JwsService = __decorate([
    (0, plugins_1.injectable)()
], JwsService);
exports.JwsService = JwsService;
//# sourceMappingURL=JwsService.js.map