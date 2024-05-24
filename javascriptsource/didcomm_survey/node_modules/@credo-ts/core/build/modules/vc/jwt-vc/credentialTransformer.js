"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialFromJwtPayload = exports.getJwtPayloadFromCredential = void 0;
const class_validator_1 = require("class-validator");
const jwt_1 = require("../../../crypto/jose/jwt");
const error_1 = require("../../../error");
const utils_1 = require("../../../utils");
const W3cCredential_1 = require("../models/credential/W3cCredential");
const util_1 = require("../util");
function getJwtPayloadFromCredential(credential) {
    var _a;
    const vc = utils_1.JsonTransformer.toJSON(credential);
    const payloadOptions = {
        additionalClaims: {
            vc,
        },
    };
    // Extract `nbf` and remove issuance date from vc
    const issuanceDate = Date.parse(credential.issuanceDate);
    if (isNaN(issuanceDate)) {
        throw new error_1.CredoError('JWT VCs must have a valid issuance date');
    }
    payloadOptions.nbf = Math.floor(issuanceDate / 1000);
    delete vc.issuanceDate;
    // Extract `exp` and remove expiration date from vc
    if (credential.expirationDate) {
        const expirationDate = Date.parse(credential.expirationDate);
        if (!isNaN(expirationDate)) {
            payloadOptions.exp = Math.floor(expirationDate / 1000);
            delete vc.expirationDate;
        }
    }
    // Extract `iss` and remove issuer id from vc
    payloadOptions.iss = credential.issuerId;
    if (typeof vc.issuer === 'string') {
        delete vc.issuer;
    }
    else if (typeof vc.issuer === 'object') {
        delete vc.issuer.id;
        if (Object.keys(vc.issuer).length === 0) {
            delete vc.issuer;
        }
    }
    // Extract `jti` and remove id from vc
    if (credential.id) {
        payloadOptions.jti = credential.id;
        delete vc.id;
    }
    if (Array.isArray(credential.credentialSubject) && credential.credentialSubject.length !== 1) {
        throw new error_1.CredoError('JWT VCs must have exactly one credential subject');
    }
    // Extract `sub` and remove credential subject id from vc
    const [credentialSubjectId] = credential.credentialSubjectIds;
    if (credentialSubjectId) {
        payloadOptions.sub = credentialSubjectId;
        if (Array.isArray(vc.credentialSubject)) {
            delete vc.credentialSubject[0].id;
        }
        else {
            (_a = vc.credentialSubject) === null || _a === void 0 ? true : delete _a.id;
        }
    }
    return new jwt_1.JwtPayload(payloadOptions);
}
exports.getJwtPayloadFromCredential = getJwtPayloadFromCredential;
function getCredentialFromJwtPayload(jwtPayload) {
    if (!('vc' in jwtPayload.additionalClaims) || !(0, utils_1.isJsonObject)(jwtPayload.additionalClaims.vc)) {
        throw new error_1.CredoError("JWT does not contain a valid 'vc' claim");
    }
    const jwtVc = jwtPayload.additionalClaims.vc;
    if (!jwtPayload.nbf || !jwtPayload.iss) {
        throw new error_1.CredoError("JWT does not contain valid 'nbf' and 'iss' claims");
    }
    if (Array.isArray(jwtVc.credentialSubject) && jwtVc.credentialSubject.length !== 1) {
        throw new error_1.CredoError('JWT VCs must have exactly one credential subject');
    }
    if (Array.isArray(jwtVc.credentialSubject) && !(0, class_validator_1.isObject)(jwtVc.credentialSubject[0])) {
        throw new error_1.CredoError('JWT VCs must have a credential subject of type object');
    }
    const credentialSubject = Array.isArray(jwtVc.credentialSubject)
        ? jwtVc.credentialSubject[0]
        : jwtVc.credentialSubject;
    if (!(0, utils_1.isJsonObject)(credentialSubject)) {
        throw new error_1.CredoError('JWT VC does not have a valid credential subject');
    }
    const subjectWithId = jwtPayload.sub ? Object.assign(Object.assign({}, credentialSubject), { id: jwtPayload.sub }) : credentialSubject;
    // Validate vc.id and jti
    if (jwtVc.id && jwtPayload.jti !== jwtVc.id) {
        throw new error_1.CredoError('JWT jti and vc.id do not match');
    }
    // Validate vc.issuer and iss
    if ((typeof jwtVc.issuer === 'string' && jwtPayload.iss !== jwtVc.issuer) ||
        ((0, utils_1.isJsonObject)(jwtVc.issuer) && jwtVc.issuer.id && jwtPayload.iss !== jwtVc.issuer.id)) {
        throw new error_1.CredoError('JWT iss and vc.issuer(.id) do not match');
    }
    // Validate vc.issuanceDate and nbf
    if (jwtVc.issuanceDate) {
        if (typeof jwtVc.issuanceDate !== 'string') {
            throw new error_1.CredoError('JWT vc.issuanceDate must be a string');
        }
        const issuanceDate = Date.parse(jwtVc.issuanceDate) / 1000;
        if (jwtPayload.nbf !== issuanceDate) {
            throw new error_1.CredoError('JWT nbf and vc.issuanceDate do not match');
        }
    }
    // Validate vc.expirationDate and exp
    if (jwtVc.expirationDate) {
        if (typeof jwtVc.expirationDate !== 'string') {
            throw new error_1.CredoError('JWT vc.expirationDate must be a string');
        }
        const expirationDate = Date.parse(jwtVc.expirationDate) / 1000;
        if (expirationDate !== jwtPayload.exp) {
            throw new error_1.CredoError('JWT exp and vc.expirationDate do not match');
        }
    }
    // Validate vc.credentialSubject.id and sub
    if (((0, utils_1.isJsonObject)(jwtVc.credentialSubject) &&
        jwtVc.credentialSubject.id &&
        jwtPayload.sub !== jwtVc.credentialSubject.id) ||
        (Array.isArray(jwtVc.credentialSubject) &&
            (0, utils_1.isJsonObject)(jwtVc.credentialSubject[0]) &&
            jwtVc.credentialSubject[0].id &&
            jwtPayload.sub !== jwtVc.credentialSubject[0].id)) {
        throw new error_1.CredoError('JWT sub and vc.credentialSubject.id do not match');
    }
    // Create a verifiable credential structure that is compatible with the VC data model
    const dataModelVc = Object.assign(Object.assign({}, jwtVc), { issuanceDate: (0, util_1.w3cDate)(jwtPayload.nbf * 1000), expirationDate: jwtPayload.exp ? (0, util_1.w3cDate)(jwtPayload.exp * 1000) : undefined, issuer: typeof jwtVc.issuer === 'object' ? Object.assign(Object.assign({}, jwtVc.issuer), { id: jwtPayload.iss }) : jwtPayload.iss, id: jwtPayload.jti, credentialSubject: Array.isArray(jwtVc.credentialSubject) ? [subjectWithId] : subjectWithId });
    const vcInstance = utils_1.JsonTransformer.fromJSON(dataModelVc, W3cCredential_1.W3cCredential);
    return vcInstance;
}
exports.getCredentialFromJwtPayload = getCredentialFromJwtPayload;
//# sourceMappingURL=credentialTransformer.js.map