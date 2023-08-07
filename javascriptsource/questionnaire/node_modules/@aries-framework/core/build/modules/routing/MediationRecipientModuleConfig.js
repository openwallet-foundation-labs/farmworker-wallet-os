"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediationRecipientModuleConfig = void 0;
class MediationRecipientModuleConfig {
    constructor(options) {
        this.options = options !== null && options !== void 0 ? options : {};
    }
    /** See {@link MediationRecipientModuleConfigOptions.mediatorPollingInterval} */
    get mediatorPollingInterval() {
        var _a;
        return (_a = this.options.mediatorPollingInterval) !== null && _a !== void 0 ? _a : 5000;
    }
    /** See {@link MediationRecipientModuleConfigOptions.mediatorPickupStrategy} */
    get mediatorPickupStrategy() {
        return this.options.mediatorPickupStrategy;
    }
    /** See {@link MediationRecipientModuleConfigOptions.maximumMessagePickup} */
    get maximumMessagePickup() {
        var _a;
        return (_a = this.options.maximumMessagePickup) !== null && _a !== void 0 ? _a : 10;
    }
    /** See {@link MediationRecipientModuleConfigOptions.baseMediatorReconnectionIntervalMs} */
    get baseMediatorReconnectionIntervalMs() {
        var _a;
        return (_a = this.options.baseMediatorReconnectionIntervalMs) !== null && _a !== void 0 ? _a : 100;
    }
    /** See {@link MediationRecipientModuleConfigOptions.maximumMediatorReconnectionIntervalMs} */
    get maximumMediatorReconnectionIntervalMs() {
        var _a;
        return (_a = this.options.maximumMediatorReconnectionIntervalMs) !== null && _a !== void 0 ? _a : Number.POSITIVE_INFINITY;
    }
    /** See {@link MediationRecipientModuleConfigOptions.mediatorInvitationUrl} */
    get mediatorInvitationUrl() {
        return this.options.mediatorInvitationUrl;
    }
}
exports.MediationRecipientModuleConfig = MediationRecipientModuleConfig;
//# sourceMappingURL=MediationRecipientModuleConfig.js.map