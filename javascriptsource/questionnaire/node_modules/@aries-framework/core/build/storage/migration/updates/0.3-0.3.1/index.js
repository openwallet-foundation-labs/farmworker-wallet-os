"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateV0_3ToV0_3_1 = void 0;
const did_1 = require("./did");
async function updateV0_3ToV0_3_1(agent) {
    await (0, did_1.migrateDidRecordToV0_3_1)(agent);
}
exports.updateV0_3ToV0_3_1 = updateV0_3ToV0_3_1;
//# sourceMappingURL=index.js.map