"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidsModuleConfig = void 0;
const methods_1 = require("./methods");
class DidsModuleConfig {
    constructor(options) {
        this.options = options !== null && options !== void 0 ? options : {};
    }
    /** See {@link DidsModuleConfigOptions.registrars} */
    get registrars() {
        var _a;
        // This prevents creating new instances every time this property is accessed
        if (this._registrars)
            return this._registrars;
        let registrars = (_a = this.options.registrars) !== null && _a !== void 0 ? _a : [new methods_1.KeyDidRegistrar(), new methods_1.PeerDidRegistrar(), new methods_1.JwkDidRegistrar()];
        // Add peer did registrar if it is not included yet
        if (!registrars.find((registrar) => registrar instanceof methods_1.PeerDidRegistrar)) {
            // Do not modify original options array
            registrars = [...registrars, new methods_1.PeerDidRegistrar()];
        }
        // Add key did registrar if it is not included yet
        if (!registrars.find((registrar) => registrar instanceof methods_1.KeyDidRegistrar)) {
            // Do not modify original options array
            registrars = [...registrars, new methods_1.KeyDidRegistrar()];
        }
        this._registrars = registrars;
        return registrars;
    }
    addRegistrar(registrar) {
        this.registrars.push(registrar);
    }
    /** See {@link DidsModuleConfigOptions.resolvers} */
    get resolvers() {
        var _a;
        // This prevents creating new instances every time this property is accessed
        if (this._resolvers)
            return this._resolvers;
        let resolvers = (_a = this.options.resolvers) !== null && _a !== void 0 ? _a : [
            new methods_1.WebDidResolver(),
            new methods_1.KeyDidResolver(),
            new methods_1.PeerDidResolver(),
            new methods_1.JwkDidResolver(),
        ];
        // Add peer did resolver if it is not included yet
        if (!resolvers.find((resolver) => resolver instanceof methods_1.PeerDidResolver)) {
            // Do not modify original options array
            resolvers = [...resolvers, new methods_1.PeerDidResolver()];
        }
        // Add key did resolver if it is not included yet
        if (!resolvers.find((resolver) => resolver instanceof methods_1.KeyDidResolver)) {
            // Do not modify original options array
            resolvers = [...resolvers, new methods_1.KeyDidResolver()];
        }
        this._resolvers = resolvers;
        return resolvers;
    }
    addResolver(resolver) {
        this.resolvers.push(resolver);
    }
}
exports.DidsModuleConfig = DidsModuleConfig;
//# sourceMappingURL=DidsModuleConfig.js.map