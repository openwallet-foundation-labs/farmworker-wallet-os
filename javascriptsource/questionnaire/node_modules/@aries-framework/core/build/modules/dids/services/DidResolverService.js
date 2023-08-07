"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DidResolverService = void 0;
const constants_1 = require("../../../constants");
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const DidsModuleConfig_1 = require("../DidsModuleConfig");
const parse_1 = require("../domain/parse");
let DidResolverService = class DidResolverService {
    constructor(logger, didsModuleConfig) {
        this.logger = logger;
        this.didsModuleConfig = didsModuleConfig;
    }
    async resolve(agentContext, didUrl, options = {}) {
        this.logger.debug(`resolving didUrl ${didUrl}`);
        const result = {
            didResolutionMetadata: {},
            didDocument: null,
            didDocumentMetadata: {},
        };
        let parsed;
        try {
            parsed = (0, parse_1.parseDid)(didUrl);
        }
        catch (error) {
            return Object.assign(Object.assign({}, result), { didResolutionMetadata: { error: 'invalidDid' } });
        }
        const resolver = this.findResolver(parsed);
        if (!resolver) {
            return Object.assign(Object.assign({}, result), { didResolutionMetadata: {
                    error: 'unsupportedDidMethod',
                    message: `No did resolver registered for did method ${parsed.method}`,
                } });
        }
        return resolver.resolve(agentContext, parsed.did, parsed, options);
    }
    async resolveDidDocument(agentContext, did) {
        const { didDocument, didResolutionMetadata: { error, message }, } = await this.resolve(agentContext, did);
        if (!didDocument) {
            throw new error_1.AriesFrameworkError(`Unable to resolve did document for did '${did}': ${error} ${message}`);
        }
        return didDocument;
    }
    findResolver(parsed) {
        var _a;
        return (_a = this.didsModuleConfig.resolvers.find((r) => r.supportedMethods.includes(parsed.method))) !== null && _a !== void 0 ? _a : null;
    }
};
DidResolverService = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object, DidsModuleConfig_1.DidsModuleConfig])
], DidResolverService);
exports.DidResolverService = DidResolverService;
//# sourceMappingURL=DidResolverService.js.map