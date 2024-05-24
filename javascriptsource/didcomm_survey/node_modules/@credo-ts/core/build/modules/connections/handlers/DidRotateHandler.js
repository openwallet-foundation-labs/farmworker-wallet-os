"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidRotateHandler = void 0;
const error_1 = require("../../../error");
const messages_1 = require("../messages");
class DidRotateHandler {
    constructor(didRotateService, connectionService) {
        this.supportedMessages = [messages_1.DidRotateMessage];
        this.didRotateService = didRotateService;
        this.connectionService = connectionService;
    }
    async handle(messageContext) {
        const { connection, recipientKey } = messageContext;
        if (!connection) {
            throw new error_1.CredoError(`Connection for verkey ${recipientKey === null || recipientKey === void 0 ? void 0 : recipientKey.fingerprint} not found!`);
        }
        return this.didRotateService.processRotate(messageContext);
    }
}
exports.DidRotateHandler = DidRotateHandler;
//# sourceMappingURL=DidRotateHandler.js.map