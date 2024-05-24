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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register(dependencyManager) {
        // no-op, only API needs to be registered
    }
}
exports.WalletModule = WalletModule;
//# sourceMappingURL=WalletModule.js.map