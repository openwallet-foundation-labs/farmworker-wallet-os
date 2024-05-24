"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const error_1 = require("../../../error");
const utils_1 = require("../../../utils");
const JwtPayload_1 = require("./JwtPayload");
class Jwt {
    constructor(options) {
        this.serializedJwt = options.serializedJwt;
        this.payload = options.payload;
        this.header = options.header;
        this.signature = options.signature;
    }
    static fromSerializedJwt(serializedJwt) {
        if (typeof serializedJwt !== 'string' || !Jwt.format.test(serializedJwt)) {
            throw new error_1.CredoError(`Invalid JWT. '${serializedJwt}' does not match JWT regex`);
        }
        const [header, payload, signature] = serializedJwt.split('.');
        try {
            return new Jwt({
                header: utils_1.JsonEncoder.fromBase64(header),
                payload: JwtPayload_1.JwtPayload.fromJson(utils_1.JsonEncoder.fromBase64(payload)),
                signature: utils_1.TypedArrayEncoder.fromBase64(signature),
                serializedJwt,
            });
        }
        catch (error) {
            throw new error_1.CredoError(`Invalid JWT. ${error instanceof Error ? error.message : JSON.stringify(error)}`);
        }
    }
}
exports.Jwt = Jwt;
Jwt.format = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
//# sourceMappingURL=Jwt.js.map