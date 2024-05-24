"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediatorModuleConfig = void 0;
const MessageForwardingStrategy_1 = require("./MessageForwardingStrategy");
class MediatorModuleConfig {
    constructor(options) {
        this.options = options !== null && options !== void 0 ? options : {};
    }
    /** See {@link MediatorModuleConfigOptions.autoAcceptMediationRequests} */
    get autoAcceptMediationRequests() {
        var _a;
        return (_a = this.options.autoAcceptMediationRequests) !== null && _a !== void 0 ? _a : false;
    }
    /** See {@link MediatorModuleConfigOptions.messageForwardingStrategy} */
    get messageForwardingStrategy() {
        var _a;
        return (_a = this.options.messageForwardingStrategy) !== null && _a !== void 0 ? _a : MessageForwardingStrategy_1.MessageForwardingStrategy.DirectDelivery;
    }
}
exports.MediatorModuleConfig = MediatorModuleConfig;
//# sourceMappingURL=MediatorModuleConfig.js.map