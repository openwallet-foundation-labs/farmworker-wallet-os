"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HangupHandler = void 0;
const messages_1 = require("../messages");
class HangupHandler {
    constructor(didRotateService) {
        this.supportedMessages = [messages_1.HangupMessage];
        this.didRotateService = didRotateService;
    }
    async handle(inboundMessage) {
        await this.didRotateService.processHangup(inboundMessage);
    }
}
exports.HangupHandler = HangupHandler;
//# sourceMappingURL=HangupHandler.js.map