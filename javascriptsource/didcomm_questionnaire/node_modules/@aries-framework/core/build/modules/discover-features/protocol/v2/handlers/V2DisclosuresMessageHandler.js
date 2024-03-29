"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2DisclosuresMessageHandler = void 0;
const messages_1 = require("../messages");
class V2DisclosuresMessageHandler {
    constructor(discoverFeaturesService) {
        this.supportedMessages = [messages_1.V2DisclosuresMessage];
        this.discoverFeaturesService = discoverFeaturesService;
    }
    async handle(inboundMessage) {
        await this.discoverFeaturesService.processDisclosure(inboundMessage);
    }
}
exports.V2DisclosuresMessageHandler = V2DisclosuresMessageHandler;
//# sourceMappingURL=V2DisclosuresMessageHandler.js.map