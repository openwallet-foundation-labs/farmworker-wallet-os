"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateV0_1ToV0_2 = void 0;
const connection_1 = require("./connection");
const credential_1 = require("./credential");
const mediation_1 = require("./mediation");
async function updateV0_1ToV0_2(agent, config) {
    await (0, credential_1.migrateCredentialRecordToV0_2)(agent);
    await (0, mediation_1.migrateMediationRecordToV0_2)(agent, config.v0_1ToV0_2);
    await (0, connection_1.migrateConnectionRecordToV0_2)(agent);
}
exports.updateV0_1ToV0_2 = updateV0_1ToV0_2;
//# sourceMappingURL=index.js.map