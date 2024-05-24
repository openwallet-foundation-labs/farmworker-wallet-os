"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateV0_4ToV0_5 = void 0;
const credentialExchangeRecord_1 = require("./credentialExchangeRecord");
const proofExchangeRecord_1 = require("./proofExchangeRecord");
const w3cCredentialRecord_1 = require("./w3cCredentialRecord");
async function updateV0_4ToV0_5(agent) {
    await (0, w3cCredentialRecord_1.migrateW3cCredentialRecordToV0_5)(agent);
    await (0, credentialExchangeRecord_1.migrateCredentialExchangeRecordToV0_5)(agent);
    await (0, proofExchangeRecord_1.migrateProofExchangeRecordToV0_5)(agent);
}
exports.updateV0_4ToV0_5 = updateV0_4ToV0_5;
//# sourceMappingURL=index.js.map