"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverFeaturesModuleConfig = void 0;
class DiscoverFeaturesModuleConfig {
    constructor(options) {
        this.options = options !== null && options !== void 0 ? options : {};
    }
    /** {@inheritDoc DiscoverFeaturesModuleConfigOptions.autoAcceptQueries} */
    get autoAcceptQueries() {
        var _a;
        return (_a = this.options.autoAcceptQueries) !== null && _a !== void 0 ? _a : true;
    }
}
exports.DiscoverFeaturesModuleConfig = DiscoverFeaturesModuleConfig;
//# sourceMappingURL=DiscoverFeaturesModuleConfig.js.map