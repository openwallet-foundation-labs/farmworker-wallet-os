"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const WalletApi_1 = require("./WalletApi");
// TODO: this should be moved into the modules directory
class WalletModule {
    constructor() {
        this.api = WalletApi_1.WalletApi;
    }
    /**
     * Registers the dependencies of the wallet module on the injection dependencyManager.
     */
    register(dependencyManager) {
        // Api
        dependencyManager.registerContextScoped(WalletApi_1.WalletApi);
    }
}
exports.WalletModule = WalletModule;
//# sourceMappingURL=WalletModule.js.map