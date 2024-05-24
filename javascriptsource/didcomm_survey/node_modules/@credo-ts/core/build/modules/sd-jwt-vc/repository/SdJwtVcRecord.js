"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdJwtVcRecord = void 0;
const decode_1 = require("@sd-jwt/decode");
const BaseRecord_1 = require("../../../storage/BaseRecord");
const utils_1 = require("../../../utils");
const uuid_1 = require("../../../utils/uuid");
class SdJwtVcRecord extends BaseRecord_1.BaseRecord {
    // TODO: should we also store the pretty claims so it's not needed to
    // re-calculate the hashes each time? I think for now it's fine to re-calculate
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = SdJwtVcRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.compactSdJwtVc = props.compactSdJwtVc;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
        }
    }
    getTags() {
        const sdjwt = (0, decode_1.decodeSdJwtSync)(this.compactSdJwtVc, utils_1.Hasher.hash);
        const vct = sdjwt.jwt.payload['vct'];
        const sdAlg = sdjwt.jwt.payload['_sd_alg'];
        const alg = sdjwt.jwt.header['alg'];
        return Object.assign(Object.assign({}, this._tags), { vct, sdAlg: sdAlg !== null && sdAlg !== void 0 ? sdAlg : 'sha-256', alg });
    }
    clone() {
        return utils_1.JsonTransformer.fromJSON(utils_1.JsonTransformer.toJSON(this), this.constructor);
    }
}
exports.SdJwtVcRecord = SdJwtVcRecord;
SdJwtVcRecord.type = 'SdJwtVcRecord';
//# sourceMappingURL=SdJwtVcRecord.js.map