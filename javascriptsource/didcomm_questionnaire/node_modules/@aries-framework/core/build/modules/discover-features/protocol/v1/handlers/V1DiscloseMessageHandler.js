"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1DiscloseMessageHandler = void 0;
const messages_1 = require("../messages");
class V1DiscloseMessageHandler {
    constructor(discoverFeaturesService) {
        this.supportedMessages = [messages_1.V1DiscloseMessage];
        this.discoverFeaturesService = discoverFeaturesService;
    }
    async handle(inboundMessage) {
        await this.discoverFeaturesService.processDisclosure(inboundMessage);
    }
}
exports.V1DiscloseMessageHandler = V1DiscloseMessageHandler;
//# sourceMappingURL=V1DiscloseMessageHandler.js.map