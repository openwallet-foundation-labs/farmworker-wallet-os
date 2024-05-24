"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofsModuleConfig = void 0;
const ProofAutoAcceptType_1 = require("./models/ProofAutoAcceptType");
class ProofsModuleConfig {
    constructor(options) {
        this.options = options;
    }
    /** See {@link ProofsModuleConfigOptions.autoAcceptProofs} */
    get autoAcceptProofs() {
        var _a;
        return (_a = this.options.autoAcceptProofs) !== null && _a !== void 0 ? _a : ProofAutoAcceptType_1.AutoAcceptProof.Never;
    }
    /** See {@link ProofsModuleConfigOptions.proofProtocols} */
    get proofProtocols() {
        return this.options.proofProtocols;
    }
}
exports.ProofsModuleConfig = ProofsModuleConfig;
//# sourceMappingURL=ProofsModuleConfig.js.map