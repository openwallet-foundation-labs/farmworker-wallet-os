"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidRotateAckHandler = void 0;
const messages_1 = require("../messages");
class DidRotateAckHandler {
    constructor(didRotateService) {
        this.supportedMessages = [messages_1.DidRotateAckMessage];
        this.didRotateService = didRotateService;
    }
    async handle(inboundMessage) {
        await this.didRotateService.processRotateAck(inboundMessage);
    }
}
exports.DidRotateAckHandler = DidRotateAckHandler;
//# sourceMappingURL=DidRotateAckHandler.js.map