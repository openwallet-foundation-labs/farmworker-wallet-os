"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryParseDid = exports.parseDid = void 0;
const did_resolver_1 = require("did-resolver");
const error_1 = require("../../../error");
function parseDid(did) {
    const parsed = tryParseDid(did);
    if (!parsed) {
        throw new error_1.AriesFrameworkError(`Error parsing did '${did}'`);
    }
    return parsed;
}
exports.parseDid = parseDid;
function tryParseDid(did) {
    return (0, did_resolver_1.parse)(did);
}
exports.tryParseDid = tryParseDid;
//# sourceMappingURL=parse.js.map