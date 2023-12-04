"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresentationFromJwtPayload = exports.getJwtPayloadFromPresentation = void 0;
const jwt_1 = require("../../../crypto/jose/jwt");
const error_1 = require("../../../error");
const utils_1 = require("../../../utils");
const W3cPresentation_1 = require("../models/presentation/W3cPresentation");
function getJwtPayloadFromPresentation(presentation) {
    const vp = utils_1.JsonTransformer.toJSON(presentation);
    const payloadOptions = {
        additionalClaims: {
            vp,
        },
    };
    // Extract `iss` and remove holder id from vp
    if (presentation.holderId) {
        payloadOptions.iss = presentation.holderId;
        if (typeof vp.holder === 'string') {
            delete vp.holder;
        }
        else if (typeof vp.holder === 'object') {
            delete vp.holder.id;
            if (Object.keys(vp.holder).length === 0) {
                delete vp.holder;
            }
        }
    }
    // Extract `jti` and remove id from vp
    if (presentation.id) {
        payloadOptions.jti = presentation.id;
        delete vp.id;
    }
    return new jwt_1.JwtPayload(payloadOptions);
}
exports.getJwtPayloadFromPresentation = getJwtPayloadFromPresentation;
function getPresentationFromJwtPayload(jwtPayload) {
    if (!('vp' in jwtPayload.additionalClaims) || !(0, utils_1.isJsonObject)(jwtPayload.additionalClaims.vp)) {
        throw new error_1.AriesFrameworkError("JWT does not contain a valid 'vp' claim");
    }
    const jwtVp = jwtPayload.additionalClaims.vp;
    // Validate vp.id and jti
    if (jwtVp.id && jwtPayload.jti !== jwtVp.id) {
        throw new error_1.AriesFrameworkError('JWT jti and vp.id do not match');
    }
    // Validate vp.holder and iss
    if ((typeof jwtVp.holder === 'string' && jwtPayload.iss !== jwtVp.holder) ||
        ((0, utils_1.isJsonObject)(jwtVp.holder) && jwtVp.holder.id && jwtPayload.iss !== jwtVp.holder.id)) {
        throw new error_1.AriesFrameworkError('JWT iss and vp.holder(.id) do not match');
    }
    const dataModelVp = Object.assign(Object.assign({}, jwtVp), { id: jwtPayload.jti, holder: jwtPayload.iss });
    const vpInstance = utils_1.JsonTransformer.fromJSON(dataModelVp, W3cPresentation_1.W3cPresentation);
    return vpInstance;
}
exports.getPresentationFromJwtPayload = getPresentationFromJwtPayload;
//# sourceMappingURL=presentationTransformer.js.map