"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W3cCredentialsModuleConfig = void 0;
const documentLoader_1 = require("./data-integrity/libraries/documentLoader");
class W3cCredentialsModuleConfig {
    constructor(options) {
        this.options = options !== null && options !== void 0 ? options : {};
    }
    /** See {@link W3cCredentialsModuleConfigOptions.documentLoader} */
    get documentLoader() {
        var _a;
        return (_a = this.options.documentLoader) !== null && _a !== void 0 ? _a : documentLoader_1.defaultDocumentLoader;
    }
}
exports.W3cCredentialsModuleConfig = W3cCredentialsModuleConfig;
//# sourceMappingURL=W3cCredentialsModuleConfig.js.map