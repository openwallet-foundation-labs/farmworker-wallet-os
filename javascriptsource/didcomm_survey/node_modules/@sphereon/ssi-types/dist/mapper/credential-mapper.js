"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialMapper = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const types_1 = require("../types");
const utils_1 = require("../utils");
class CredentialMapper {
    /**
     * Decodes a compact SD-JWT vc to it's decoded variant. This method can be used when the hasher implementation used is Async, and therefore not suitable for usage
     * with the other decode methods.
     */
    static decodeSdJwtVcAsync(compactSdJwtVc, hasher) {
        return (0, types_1.decodeSdJwtVcAsync)(compactSdJwtVc, hasher);
    }
    /**
     * Decodes a Verifiable Presentation to a uniform format.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding.
     */
    static decodeVerifiablePresentation(presentation, hasher) {
        var _a;
        if (CredentialMapper.isJwtEncoded(presentation)) {
            const payload = (0, jwt_decode_1.default)(presentation);
            const header = (0, jwt_decode_1.default)(presentation, { header: true });
            payload.vp.proof = {
                type: types_1.IProofType.JwtProof2020,
                created: payload.nbf,
                proofPurpose: types_1.IProofPurpose.authentication,
                verificationMethod: (_a = header['kid']) !== null && _a !== void 0 ? _a : payload.iss,
                jwt: presentation,
            };
            return payload;
        }
        else if (CredentialMapper.isJwtDecodedPresentation(presentation)) {
            return presentation;
        }
        else if (CredentialMapper.isSdJwtEncoded(presentation)) {
            if (!hasher) {
                throw new Error('Hasher implementation is required to decode SD-JWT');
            }
            return (0, types_1.decodeSdJwtVc)(presentation, hasher);
        }
        else if (CredentialMapper.isSdJwtDecodedCredential(presentation)) {
            return presentation;
        }
        else if (CredentialMapper.isJsonLdAsString(presentation)) {
            return JSON.parse(presentation);
        }
        else {
            return presentation;
        }
    }
    /**
     * Decodes a Verifiable Credential to a uniform format.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static decodeVerifiableCredential(credential, hasher) {
        var _a;
        if (CredentialMapper.isJwtEncoded(credential)) {
            const payload = (0, jwt_decode_1.default)(credential);
            const header = (0, jwt_decode_1.default)(credential, { header: true });
            payload.vc.proof = {
                type: types_1.IProofType.JwtProof2020,
                created: payload.nbf,
                proofPurpose: types_1.IProofPurpose.authentication,
                verificationMethod: (_a = header['kid']) !== null && _a !== void 0 ? _a : payload.iss,
                jwt: credential,
            };
            return payload;
        }
        else if (CredentialMapper.isJwtDecodedCredential(credential)) {
            return credential;
        }
        else if (CredentialMapper.isJsonLdAsString(credential)) {
            return JSON.parse(credential);
        }
        else if (CredentialMapper.isSdJwtEncoded(credential)) {
            if (!hasher) {
                throw new Error('Hasher implementation is required to decode SD-JWT');
            }
            return (0, types_1.decodeSdJwtVc)(credential, hasher);
        }
        else if (CredentialMapper.isSdJwtDecodedCredential(credential)) {
            return credential;
        }
        else {
            return credential;
        }
    }
    /**
     * Converts a presentation to a wrapped presentation.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static toWrappedVerifiablePresentation(originalPresentation, opts) {
        // SD-JWT
        if (CredentialMapper.isSdJwtDecodedCredential(originalPresentation) || CredentialMapper.isSdJwtEncoded(originalPresentation)) {
            let decodedPresentation;
            if (CredentialMapper.isSdJwtEncoded(originalPresentation)) {
                if (!(opts === null || opts === void 0 ? void 0 : opts.hasher)) {
                    throw new Error('Hasher implementation is required to decode SD-JWT');
                }
                decodedPresentation = (0, types_1.decodeSdJwtVc)(originalPresentation, opts.hasher);
            }
            else {
                decodedPresentation = originalPresentation;
            }
            return {
                type: CredentialMapper.isSdJwtDecodedCredential(originalPresentation) ? types_1.OriginalType.SD_JWT_VC_DECODED : types_1.OriginalType.SD_JWT_VC_ENCODED,
                format: 'vc+sd-jwt',
                original: originalPresentation,
                presentation: decodedPresentation,
                decoded: decodedPresentation.decodedPayload,
                // NOTE: we also include the SD-JWT VC as the VC, as the SD-JWT acts as both the VC and the VP
                vcs: [CredentialMapper.toWrappedVerifiableCredential(originalPresentation, opts)],
            };
        }
        // If the VP is not an encoded/decoded SD-JWT, we assume it will be a W3C VC
        const proof = CredentialMapper.getFirstProof(originalPresentation);
        const original = typeof originalPresentation !== 'string' && CredentialMapper.hasJWTProofType(originalPresentation) ? proof === null || proof === void 0 ? void 0 : proof.jwt : originalPresentation;
        if (!original) {
            throw Error('Could not determine original presentation, probably it was a converted JWT presentation, that is now missing the JWT value in the proof');
        }
        const decoded = CredentialMapper.decodeVerifiablePresentation(original);
        const isJwtEncoded = CredentialMapper.isJwtEncoded(original);
        const isJwtDecoded = CredentialMapper.isJwtDecodedPresentation(original);
        const type = isJwtEncoded ? types_1.OriginalType.JWT_ENCODED : isJwtDecoded ? types_1.OriginalType.JWT_DECODED : types_1.OriginalType.JSONLD;
        const format = isJwtDecoded || isJwtEncoded ? 'jwt_vp' : 'ldp_vp';
        let vp;
        if (isJwtEncoded || isJwtDecoded) {
            vp = CredentialMapper.jwtDecodedPresentationToUniformPresentation(decoded, false, opts);
        }
        else {
            vp = decoded;
        }
        if (!vp || !('verifiableCredential' in vp) || !vp.verifiableCredential || vp.verifiableCredential.length === 0) {
            throw Error(`VP needs to have at least one verifiable credential at this point`);
        }
        const vcs = CredentialMapper.toWrappedVerifiableCredentials(vp.verifiableCredential /*.map(value => value.original)*/, opts);
        const presentation = Object.assign(Object.assign({}, vp), { verifiableCredential: vcs });
        return {
            type,
            format,
            original,
            decoded,
            presentation,
            vcs,
        };
    }
    /**
     * Converts a list of credentials to a list of wrapped credentials.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static toWrappedVerifiableCredentials(verifiableCredentials, opts) {
        return verifiableCredentials.map((vc) => CredentialMapper.toWrappedVerifiableCredential(vc, opts));
    }
    /**
     * Converts a credential to a wrapped credential.
     *
     * When decoding SD-JWT credentials, a hasher implementation must be provided. The hasher implementation must be sync. When using
     * an async hasher implementation, use the decodeSdJwtVcAsync method instead and you can provide the decoded payload to methods
     * instead of the compact SD-JWT.
     *
     * @param hasher Hasher implementation to use for SD-JWT decoding
     */
    static toWrappedVerifiableCredential(verifiableCredential, opts) {
        var _a;
        // SD-JWT
        if (CredentialMapper.isSdJwtDecodedCredential(verifiableCredential) || CredentialMapper.isSdJwtEncoded(verifiableCredential)) {
            let decodedCredential;
            if (CredentialMapper.isSdJwtEncoded(verifiableCredential)) {
                if (!(opts === null || opts === void 0 ? void 0 : opts.hasher)) {
                    throw new Error('Hasher implementation is required to decode SD-JWT');
                }
                decodedCredential = (0, types_1.decodeSdJwtVc)(verifiableCredential, opts.hasher);
            }
            else {
                decodedCredential = verifiableCredential;
            }
            return {
                type: CredentialMapper.isSdJwtDecodedCredential(verifiableCredential) ? types_1.OriginalType.SD_JWT_VC_DECODED : types_1.OriginalType.SD_JWT_VC_ENCODED,
                format: 'vc+sd-jwt',
                original: verifiableCredential,
                credential: decodedCredential,
                decoded: decodedCredential.decodedPayload,
            };
        }
        // If the VC is not an encoded/decoded SD-JWT, we assume it will be a W3C VC
        const proof = CredentialMapper.getFirstProof(verifiableCredential);
        const original = CredentialMapper.hasJWTProofType(verifiableCredential) && proof ? (_a = proof.jwt) !== null && _a !== void 0 ? _a : verifiableCredential : verifiableCredential;
        if (!original) {
            throw Error('Could not determine original credential, probably it was a converted JWT credential, that is now missing the JWT value in the proof');
        }
        const decoded = CredentialMapper.decodeVerifiableCredential(original);
        const isJwtEncoded = CredentialMapper.isJwtEncoded(original);
        const isJwtDecoded = CredentialMapper.isJwtDecodedCredential(original);
        const type = isJwtEncoded ? types_1.OriginalType.JWT_ENCODED : isJwtDecoded ? types_1.OriginalType.JWT_DECODED : types_1.OriginalType.JSONLD;
        const credential = isJwtEncoded || isJwtDecoded
            ? CredentialMapper.jwtDecodedCredentialToUniformCredential(decoded, opts)
            : decoded;
        const format = isJwtEncoded || isJwtDecoded ? 'jwt_vc' : 'ldp_vc';
        return {
            original,
            decoded,
            format,
            type,
            credential,
        };
    }
    static isJwtEncoded(original) {
        return utils_1.ObjectUtils.isString(original) && original.startsWith('ey') && !original.includes('~');
    }
    static isSdJwtEncoded(original) {
        return utils_1.ObjectUtils.isString(original) && original.startsWith('ey') && original.includes('~');
    }
    static isW3cCredential(credential) {
        var _a;
        return '@context' in credential && (((_a = credential.type) === null || _a === void 0 ? void 0 : _a.includes('VerifiableCredential')) || false);
    }
    static isCredential(original) {
        try {
            if (CredentialMapper.isJwtEncoded(original)) {
                const vc = CredentialMapper.toUniformCredential(original);
                return CredentialMapper.isW3cCredential(vc);
            }
            else if (CredentialMapper.isSdJwtEncoded(original)) {
                return true;
            }
            return (CredentialMapper.isW3cCredential(original) ||
                CredentialMapper.isSdJwtDecodedCredentialPayload(original) ||
                CredentialMapper.isJwtDecodedCredential(original) ||
                CredentialMapper.isSdJwtDecodedCredential(original));
        }
        catch (e) {
            return false;
        }
    }
    static isPresentation(original) {
        try {
            if (CredentialMapper.isJwtEncoded(original)) {
                const vp = CredentialMapper.toUniformPresentation(original);
                return CredentialMapper.isW3cPresentation(vp);
            }
            else if (CredentialMapper.isSdJwtEncoded(original)) {
                return false;
            }
            return (CredentialMapper.isW3cPresentation(original) ||
                CredentialMapper.isSdJwtDecodedCredentialPayload(original) ||
                CredentialMapper.isJwtDecodedPresentation(original) ||
                CredentialMapper.isSdJwtDecodedCredential(original));
        }
        catch (e) {
            return false;
        }
    }
    static hasProof(original) {
        try {
            if (CredentialMapper.isJwtEncoded(original) || CredentialMapper.isJwtDecodedCredential(original)) {
                return true;
            }
            else if (CredentialMapper.isSdJwtEncoded(original) || CredentialMapper.isSdJwtDecodedCredential(original)) {
                //todo: we might want to revisit this
                return true;
            }
            if ('vc' in original && original.vc.proof) {
                return true;
            }
            if ('vp' in original && original.vp.proof) {
                return true;
            }
            return !!original.proof;
        }
        catch (e) {
            return false;
        }
    }
    static isW3cPresentation(presentation) {
        var _a;
        return '@context' in presentation && (((_a = presentation.type) === null || _a === void 0 ? void 0 : _a.includes('VerifiablePresentation')) || false);
    }
    static isSdJwtDecodedCredentialPayload(credential) {
        return 'vct' in credential;
    }
    static areOriginalVerifiableCredentialsEqual(firstOriginal, secondOriginal) {
        // String (e.g. encoded jwt or SD-JWT)
        if (typeof firstOriginal === 'string' || typeof secondOriginal === 'string') {
            return firstOriginal === secondOriginal;
        }
        else if (CredentialMapper.isSdJwtDecodedCredential(firstOriginal) || CredentialMapper.isSdJwtDecodedCredential(secondOriginal)) {
            return firstOriginal.compactSdJwtVc === secondOriginal.compactSdJwtVc;
        }
        else {
            // JSON-LD or decoded JWT. (should we compare the signatures instead?)
            return JSON.stringify(secondOriginal.proof) === JSON.stringify(firstOriginal.proof);
        }
    }
    static isJsonLdAsString(original) {
        return utils_1.ObjectUtils.isString(original) && original.includes('@context');
    }
    static isSdJwtDecodedCredential(original) {
        return original.compactSdJwtVc !== undefined;
    }
    static isJwtDecodedCredential(original) {
        return original.vc !== undefined && original.iss !== undefined;
    }
    static isJwtDecodedPresentation(original) {
        return original.vp !== undefined && original.iss !== undefined;
    }
    static jwtEncodedPresentationToUniformPresentation(jwt, makeCredentialsUniform = true, opts) {
        return CredentialMapper.jwtDecodedPresentationToUniformPresentation((0, jwt_decode_1.default)(jwt), makeCredentialsUniform, opts);
    }
    static jwtDecodedPresentationToUniformPresentation(decoded, makeCredentialsUniform = true, opts) {
        const { iss, aud, jti, vp } = decoded, rest = __rest(decoded, ["iss", "aud", "jti", "vp"]);
        const presentation = Object.assign(Object.assign({}, rest), vp);
        if (makeCredentialsUniform) {
            if (!vp.verifiableCredential) {
                throw Error('Verifiable Presentation should have a verifiable credential at this point');
            }
            presentation.verifiableCredential = vp.verifiableCredential.map((vc) => CredentialMapper.toUniformCredential(vc, opts));
        }
        if (iss) {
            const holder = presentation.holder;
            if (holder) {
                if (holder !== iss) {
                    throw new Error(`Inconsistent holders between JWT claim (${iss}) and VC value (${holder})`);
                }
            }
            presentation.holder = iss;
        }
        if (aud) {
            const verifier = presentation.verifier;
            if (verifier) {
                if (verifier !== aud) {
                    throw new Error(`Inconsistent holders between JWT claim (${aud}) and VC value (${verifier})`);
                }
            }
            presentation.verifier = aud;
        }
        if (jti) {
            const id = presentation.id;
            if (id && id !== jti) {
                throw new Error(`Inconsistent VP ids between JWT claim (${jti}) and VP value (${id})`);
            }
            presentation.id = jti;
        }
        return presentation;
    }
    static toUniformCredential(verifiableCredential, opts) {
        var _a;
        if (CredentialMapper.isSdJwtDecodedCredential(verifiableCredential)) {
            throw new Error('Converting SD-JWT VC to uniform VC is not supported.');
        }
        const original = typeof verifiableCredential !== 'string' && CredentialMapper.hasJWTProofType(verifiableCredential)
            ? (_a = CredentialMapper.getFirstProof(verifiableCredential)) === null || _a === void 0 ? void 0 : _a.jwt
            : verifiableCredential;
        if (!original) {
            throw Error('Could not determine original credential from passed in credential. Probably because a JWT proof type was present, but now is not available anymore');
        }
        const decoded = CredentialMapper.decodeVerifiableCredential(original);
        const isJwtEncoded = CredentialMapper.isJwtEncoded(original);
        const isJwtDecoded = CredentialMapper.isJwtDecodedCredential(original);
        if (isJwtDecoded || isJwtEncoded) {
            return CredentialMapper.jwtDecodedCredentialToUniformCredential(decoded, opts);
        }
        else {
            return decoded;
        }
    }
    static toUniformPresentation(presentation, opts) {
        var _a;
        if (CredentialMapper.isSdJwtDecodedCredential(presentation)) {
            throw new Error('Converting SD-JWT VC to uniform VP is not supported.');
        }
        const proof = CredentialMapper.getFirstProof(presentation);
        const original = typeof presentation !== 'string' && CredentialMapper.hasJWTProofType(presentation) ? proof === null || proof === void 0 ? void 0 : proof.jwt : presentation;
        if (!original) {
            throw Error('Could not determine original presentation, probably it was a converted JWT presentation, that is now missing the JWT value in the proof');
        }
        const decoded = CredentialMapper.decodeVerifiablePresentation(original);
        const isJwtEncoded = CredentialMapper.isJwtEncoded(original);
        const isJwtDecoded = CredentialMapper.isJwtDecodedPresentation(original);
        const uniformPresentation = isJwtEncoded || isJwtDecoded
            ? CredentialMapper.jwtDecodedPresentationToUniformPresentation(decoded, false)
            : decoded;
        // At time of writing Velocity Networks does not conform to specification. Adding bare minimum @context section to stop parsers from crashing and whatnot
        if ((opts === null || opts === void 0 ? void 0 : opts.addContextIfMissing) && !uniformPresentation['@context']) {
            uniformPresentation['@context'] = ['https://www.w3.org/2018/credentials/v1'];
        }
        uniformPresentation.verifiableCredential = (_a = uniformPresentation.verifiableCredential) === null || _a === void 0 ? void 0 : _a.map((vc) => CredentialMapper.toUniformCredential(vc, opts)); // We cast it because we IPresentation needs a VC. The internal Credential doesn't have the required Proof anymore (that is intended)
        return uniformPresentation;
    }
    static jwtEncodedCredentialToUniformCredential(jwt, opts) {
        return CredentialMapper.jwtDecodedCredentialToUniformCredential((0, jwt_decode_1.default)(jwt), opts);
    }
    static jwtDecodedCredentialToUniformCredential(decoded, opts) {
        var _a;
        const { exp, nbf, iss, vc, sub, jti } = decoded, rest = __rest(decoded, ["exp", "nbf", "iss", "vc", "sub", "jti"]);
        const credential = Object.assign(Object.assign({}, rest), vc);
        const maxSkewInMS = (_a = opts === null || opts === void 0 ? void 0 : opts.maxTimeSkewInMS) !== null && _a !== void 0 ? _a : 1500;
        if (exp) {
            const expDate = credential.expirationDate;
            const jwtExp = parseInt(exp.toString());
            // fix seconds to millisecond for the date
            const expDateAsStr = jwtExp < 9999999999 ? new Date(jwtExp * 1000).toISOString().replace(/\.000Z/, 'Z') : new Date(jwtExp).toISOString();
            if (expDate && expDate !== expDateAsStr) {
                const diff = Math.abs(new Date(expDateAsStr).getTime() - new Date(expDate).getTime());
                if (!maxSkewInMS || diff > maxSkewInMS) {
                    throw new Error(`Inconsistent expiration dates between JWT claim (${expDateAsStr}) and VC value (${expDate})`);
                }
            }
            credential.expirationDate = expDateAsStr;
        }
        if (nbf) {
            const issuanceDate = credential.issuanceDate;
            const jwtNbf = parseInt(nbf.toString());
            // fix seconds to millisecs for the date
            const nbfDateAsStr = jwtNbf < 9999999999 ? new Date(jwtNbf * 1000).toISOString().replace(/\.000Z/, 'Z') : new Date(jwtNbf).toISOString();
            if (issuanceDate && issuanceDate !== nbfDateAsStr) {
                const diff = Math.abs(new Date(nbfDateAsStr).getTime() - new Date(issuanceDate).getTime());
                if (!maxSkewInMS || diff > maxSkewInMS) {
                    throw new Error(`Inconsistent issuance dates between JWT claim (${nbfDateAsStr}) and VC value (${issuanceDate})`);
                }
            }
            credential.issuanceDate = nbfDateAsStr;
        }
        if (iss) {
            const issuer = credential.issuer;
            if (issuer) {
                if (typeof issuer === 'string') {
                    if (issuer !== iss) {
                        throw new Error(`Inconsistent issuers between JWT claim (${iss}) and VC value (${issuer})`);
                    }
                }
                else {
                    if (!issuer.id && Object.keys(issuer).length > 0) {
                        // We have an issuer object with more than 1 property but without an issuer id. Set it,
                        // because the default behaviour of did-jwt-vc is to remove the id value when creating JWTs
                        issuer.id = iss;
                    }
                    if (issuer.id !== iss) {
                        throw new Error(`Inconsistent issuers between JWT claim (${iss}) and VC value (${issuer.id})`);
                    }
                }
            }
            else {
                credential.issuer = iss;
            }
        }
        if (sub) {
            const subjects = Array.isArray(credential.credentialSubject) ? credential.credentialSubject : [credential.credentialSubject];
            for (let i = 0; i < subjects.length; i++) {
                const csId = subjects[i].id;
                if (csId && csId !== sub) {
                    throw new Error(`Inconsistent credential subject ids between JWT claim (${sub}) and VC value (${csId})`);
                }
                Array.isArray(credential.credentialSubject) ? (credential.credentialSubject[i].id = sub) : (credential.credentialSubject.id = sub);
            }
        }
        if (jti) {
            const id = credential.id;
            if (id && id !== jti) {
                throw new Error(`Inconsistent credential ids between JWT claim (${jti}) and VC value (${id})`);
            }
            credential.id = jti;
        }
        return credential;
    }
    static toExternalVerifiableCredential(verifiableCredential) {
        let proof;
        if (verifiableCredential.proof) {
            if (!verifiableCredential.proof.type) {
                throw new Error('Verifiable credential proof is missing a type');
            }
            if (!verifiableCredential.proof.created) {
                throw new Error('Verifiable credential proof is missing a created date');
            }
            if (!verifiableCredential.proof.proofPurpose) {
                throw new Error('Verifiable credential proof is missing a proof purpose');
            }
            if (!verifiableCredential.proof.verificationMethod) {
                throw new Error('Verifiable credential proof is missing a verification method');
            }
            proof = Object.assign(Object.assign({}, verifiableCredential.proof), { type: verifiableCredential.proof.type, created: verifiableCredential.proof.created, proofPurpose: verifiableCredential.proof.proofPurpose, verificationMethod: verifiableCredential.proof.verificationMethod });
        }
        return Object.assign(Object.assign({}, verifiableCredential), { type: verifiableCredential.type
                ? typeof verifiableCredential.type === 'string'
                    ? [verifiableCredential.type]
                    : verifiableCredential.type
                : ['VerifiableCredential'], proof });
    }
    static storedCredentialToOriginalFormat(credential) {
        const type = CredentialMapper.detectDocumentType(credential);
        if (typeof credential === 'string') {
            if (type === 0 /* DocumentFormat.JWT */) {
                return CredentialMapper.toCompactJWT(credential);
            }
            else if (type === 1 /* DocumentFormat.JSONLD */) {
                return JSON.parse(credential);
            }
        }
        else if (type === 0 /* DocumentFormat.JWT */ && 'vc' in credential) {
            return CredentialMapper.toCompactJWT(credential);
        }
        else if ('proof' in credential && credential.proof.type === 'JwtProof2020' && credential.proof.jwt) {
            return credential.proof.jwt;
        }
        return credential;
    }
    static storedPresentationToOriginalFormat(presentation) {
        const type = CredentialMapper.detectDocumentType(presentation);
        if (typeof presentation === 'string') {
            if (type === 0 /* DocumentFormat.JWT */) {
                return CredentialMapper.toCompactJWT(presentation);
            }
            else if (type === 1 /* DocumentFormat.JSONLD */) {
                return JSON.parse(presentation);
            }
        }
        else if (type === 0 /* DocumentFormat.JWT */ && 'vp' in presentation) {
            return CredentialMapper.toCompactJWT(presentation);
        }
        else if ('proof' in presentation && presentation.proof.type === 'JwtProof2020' && presentation.proof.jwt) {
            return presentation.proof.jwt;
        }
        return presentation;
    }
    static toCompactJWT(jwtDocument) {
        if (!jwtDocument || CredentialMapper.detectDocumentType(jwtDocument) !== 0 /* DocumentFormat.JWT */) {
            throw Error('Cannot convert non JWT credential to JWT');
        }
        if (typeof jwtDocument === 'string') {
            return jwtDocument;
        }
        let proof;
        if ('vp' in jwtDocument) {
            proof = 'jwt' in jwtDocument.vp.proof ? jwtDocument.vp.proof.jwt : jwtDocument.vp.proof;
        }
        else if ('vc' in jwtDocument) {
            proof = 'jwt' in jwtDocument.vc.proof ? jwtDocument.vc.proof.jwt : jwtDocument.vc.proof;
        }
        else {
            proof = Array.isArray(jwtDocument.proof) ? jwtDocument.proof[0].jwt : jwtDocument.proof.jwt;
        }
        if (!proof) {
            throw Error(`Could not get JWT from supplied document`);
        }
        return proof;
    }
    static detectDocumentType(document) {
        if (this.isJsonLdAsString(document)) {
            return 1 /* DocumentFormat.JSONLD */;
        }
        else if (this.isJwtEncoded(document)) {
            return 0 /* DocumentFormat.JWT */;
        }
        else if (this.isSdJwtEncoded(document) || this.isSdJwtDecodedCredential(document)) {
            return 2 /* DocumentFormat.SD_JWT_VC */;
        }
        const proofs = 'vc' in document ? document.vc.proof : 'vp' in document ? document.vp.proof : document.proof;
        const proof = Array.isArray(proofs) ? proofs[0] : proofs;
        if (proof === null || proof === void 0 ? void 0 : proof.jwt) {
            return 0 /* DocumentFormat.JWT */;
        }
        else if ((proof === null || proof === void 0 ? void 0 : proof.type) === 'EthereumEip712Signature2021') {
            return 3 /* DocumentFormat.EIP712 */;
        }
        return 1 /* DocumentFormat.JSONLD */;
    }
    static hasJWTProofType(document) {
        var _a;
        if (typeof document === 'string') {
            return false;
        }
        return !!((_a = CredentialMapper.getFirstProof(document)) === null || _a === void 0 ? void 0 : _a.jwt);
    }
    static getFirstProof(document) {
        if (!document || typeof document === 'string') {
            return undefined;
        }
        const proofs = 'vc' in document ? document.vc.proof : 'vp' in document ? document.vp.proof : document.proof;
        return Array.isArray(proofs) ? proofs[0] : proofs;
    }
}
exports.CredentialMapper = CredentialMapper;
CredentialMapper.isWrappedSdJwtVerifiableCredential = types_1.isWrappedSdJwtVerifiableCredential;
CredentialMapper.isWrappedSdJwtVerifiablePresentation = types_1.isWrappedSdJwtVerifiablePresentation;
CredentialMapper.isWrappedW3CVerifiableCredential = types_1.isWrappedW3CVerifiableCredential;
CredentialMapper.isWrappedW3CVerifiablePresentation = types_1.isWrappedW3CVerifiablePresentation;
//# sourceMappingURL=credential-mapper.js.map