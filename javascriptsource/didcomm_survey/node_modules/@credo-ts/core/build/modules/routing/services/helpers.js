"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediationRecordForDidDocument = void 0;
const MediationRecipientService_1 = require("./MediationRecipientService");
async function getMediationRecordForDidDocument(agentContext, didDocument) {
    const [mediatorRecord] = await agentContext.dependencyManager
        .resolve(MediationRecipientService_1.MediationRecipientService)
        .findAllMediatorsByQuery(agentContext, {
        recipientKeys: didDocument.recipientKeys.map((key) => key.publicKeyBase58),
    });
    return mediatorRecord;
}
exports.getMediationRecordForDidDocument = getMediationRecordForDidDocument;
//# sourceMappingURL=helpers.js.map