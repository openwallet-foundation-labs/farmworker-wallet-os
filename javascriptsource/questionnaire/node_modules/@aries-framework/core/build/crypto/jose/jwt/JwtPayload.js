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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayload = void 0;
const error_1 = require("../../../error");
/**
 * The maximum allowed clock skew time in seconds. If an time based validation
 * is performed against current time (`now`), the validation can be of by the skew
 * time.
 *
 * See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
 */
const DEFAULT_SKEW_TIME = 300;
class JwtPayload {
    constructor(options) {
        var _a;
        this.iss = options === null || options === void 0 ? void 0 : options.iss;
        this.sub = options === null || options === void 0 ? void 0 : options.sub;
        this.aud = options === null || options === void 0 ? void 0 : options.aud;
        this.exp = options === null || options === void 0 ? void 0 : options.exp;
        this.nbf = options === null || options === void 0 ? void 0 : options.nbf;
        this.iat = options === null || options === void 0 ? void 0 : options.iat;
        this.jti = options === null || options === void 0 ? void 0 : options.jti;
        this.additionalClaims = (_a = options === null || options === void 0 ? void 0 : options.additionalClaims) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * Validate the JWT payload. This does not verify the signature of the JWT itself.
     *
     * The following validations are performed:
     *  - if `nbf` is present, it must be greater than now
     *  - if `iat` is present, it must be less than now
     *  - if `exp` is present, it must be greater than now
     */
    validate(options) {
        const { nowSkewedFuture, nowSkewedPast } = getNowSkewed(options === null || options === void 0 ? void 0 : options.now, options === null || options === void 0 ? void 0 : options.skewTime);
        // Validate nbf
        if (typeof this.nbf !== 'number' && typeof this.nbf !== 'undefined') {
            throw new error_1.AriesFrameworkError(`JWT payload 'nbf' must be a number if provided. Actual type is ${typeof this.nbf}`);
        }
        if (typeof this.nbf === 'number' && this.nbf > nowSkewedFuture) {
            throw new error_1.AriesFrameworkError(`JWT not valid before ${this.nbf}`);
        }
        // Validate iat
        if (typeof this.iat !== 'number' && typeof this.iat !== 'undefined') {
            throw new error_1.AriesFrameworkError(`JWT payload 'iat' must be a number if provided. Actual type is ${typeof this.iat}`);
        }
        if (typeof this.iat === 'number' && this.iat > nowSkewedFuture) {
            throw new error_1.AriesFrameworkError(`JWT issued in the future at ${this.iat}`);
        }
        // Validate exp
        if (typeof this.exp !== 'number' && typeof this.exp !== 'undefined') {
            throw new error_1.AriesFrameworkError(`JWT payload 'exp' must be a number if provided. Actual type is ${typeof this.exp}`);
        }
        if (typeof this.exp === 'number' && this.exp < nowSkewedPast) {
            throw new error_1.AriesFrameworkError(`JWT expired at ${this.exp}`);
        }
        // NOTE: nonce and aud are not validated in here. We could maybe add
        // the values as input, so you can provide the expected nonce and aud values
    }
    toJson() {
        return Object.assign(Object.assign({}, this.additionalClaims), { iss: this.iss, sub: this.sub, aud: this.aud, exp: this.exp, nbf: this.nbf, iat: this.iat, jti: this.jti });
    }
    static fromJson(jwtPayloadJson) {
        const { iss, sub, aud, exp, nbf, iat, jti } = jwtPayloadJson, additionalClaims = __rest(jwtPayloadJson
        // Validate iss
        , ["iss", "sub", "aud", "exp", "nbf", "iat", "jti"]);
        // Validate iss
        if (iss && typeof iss !== 'string') {
            throw new error_1.AriesFrameworkError(`JWT payload iss must be a string`);
        }
        // Validate sub
        if (sub && typeof sub !== 'string') {
            throw new error_1.AriesFrameworkError(`JWT payload sub must be a string`);
        }
        // Validate aud
        if (aud && typeof aud !== 'string' && !(Array.isArray(aud) && aud.every((aud) => typeof aud === 'string'))) {
            throw new error_1.AriesFrameworkError(`JWT payload aud must be a string or an array of strings`);
        }
        // Validate exp
        if (exp && (typeof exp !== 'number' || exp < 0)) {
            throw new error_1.AriesFrameworkError(`JWT payload exp must be a positive number`);
        }
        // Validate nbf
        if (nbf && (typeof nbf !== 'number' || nbf < 0)) {
            throw new error_1.AriesFrameworkError(`JWT payload nbf must be a positive number`);
        }
        // Validate iat
        if (iat && (typeof iat !== 'number' || iat < 0)) {
            throw new error_1.AriesFrameworkError(`JWT payload iat must be a positive number`);
        }
        // Validate jti
        if (jti && typeof jti !== 'string') {
            throw new error_1.AriesFrameworkError(`JWT payload jti must be a string`);
        }
        const jwtPayload = new JwtPayload({
            iss,
            sub,
            aud,
            exp,
            nbf,
            iat,
            jti,
            additionalClaims,
        });
        return jwtPayload;
    }
}
exports.JwtPayload = JwtPayload;
function getNowSkewed(now, skewTime) {
    const _now = typeof now === 'number' ? now : Math.floor(Date.now() / 1000);
    const _skewTime = typeof skewTime !== 'undefined' && skewTime >= 0 ? skewTime : DEFAULT_SKEW_TIME;
    return {
        nowSkewedPast: _now - _skewTime,
        nowSkewedFuture: _now + _skewTime,
    };
}
//# sourceMappingURL=JwtPayload.js.map