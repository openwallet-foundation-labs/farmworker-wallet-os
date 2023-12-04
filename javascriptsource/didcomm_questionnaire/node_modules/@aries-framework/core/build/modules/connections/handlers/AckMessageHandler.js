"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AckMessageHandler = void 0;
const common_1 = require("../../common");
class AckMessageHandler {
    constructor(connectionService) {
        this.supportedMessages = [common_1.AckMessage];
        this.connectionService = connectionService;
    }
    async handle(inboundMessage) {
        await this.connectionService.processAck(inboundMessage);
    }
}
exports.AckMessageHandler = AckMessageHandler;
//# sourceMappingURL=AckMessageHandler.js.map