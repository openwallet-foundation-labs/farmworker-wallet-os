"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateV0_2ToV0_3 = void 0;
const connection_1 = require("./connection");
const proof_1 = require("./proof");
async function updateV0_2ToV0_3(agent) {
    await (0, proof_1.migrateProofExchangeRecordToV0_3)(agent);
    await (0, connection_1.migrateConnectionRecordToV0_3)(agent);
}
exports.updateV0_2ToV0_3 = updateV0_2ToV0_3;
//# sourceMappingURL=index.js.map