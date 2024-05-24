"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePickupModuleConfig = void 0;
class MessagePickupModuleConfig {
    constructor(options) {
        this.options = options;
    }
    /** See {@link MessagePickupModuleConfig.maximumBatchSize} */
    get maximumBatchSize() {
        var _a;
        return (_a = this.options.maximumBatchSize) !== null && _a !== void 0 ? _a : 10;
    }
    /** See {@link MessagePickupModuleConfig.protocols} */
    get protocols() {
        return this.options.protocols;
    }
    /** See {@link MessagePickupModuleConfig.messagePickupRepository} */
    get messagePickupRepository() {
        return this.options.messagePickupRepository;
    }
}
exports.MessagePickupModuleConfig = MessagePickupModuleConfig;
//# sourceMappingURL=MessagePickupModuleConfig.js.map