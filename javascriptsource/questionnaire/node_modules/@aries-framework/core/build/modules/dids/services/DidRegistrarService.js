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
exports.DidRegistrarService = void 0;
const constants_1 = require("../../../constants");
const plugins_1 = require("../../../plugins");
const DidsModuleConfig_1 = require("../DidsModuleConfig");
const parse_1 = require("../domain/parse");
let DidRegistrarService = class DidRegistrarService {
    constructor(logger, didsModuleConfig) {
        this.logger = logger;
        this.didsModuleConfig = didsModuleConfig;
    }
    async create(agentContext, options) {
        var _a, _b, _c;
        this.logger.debug(`creating did ${(_a = options.did) !== null && _a !== void 0 ? _a : options.method}`);
        const errorResult = {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                did: options.did,
            },
        };
        if ((!options.did && !options.method) || (options.did && options.method)) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: 'Either did OR method must be specified' }) });
        }
        const method = (_b = options.method) !== null && _b !== void 0 ? _b : (_c = (0, parse_1.tryParseDid)(options.did)) === null || _c === void 0 ? void 0 : _c.method;
        if (!method) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: `Could not extract method from did ${options.did}` }) });
        }
        const registrar = this.findRegistrarForMethod(method);
        if (!registrar) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: `Unsupported did method: '${method}'` }) });
        }
        return await registrar.create(agentContext, options);
    }
    async update(agentContext, options) {
        var _a;
        this.logger.debug(`updating did ${options.did}`);
        const method = (_a = (0, parse_1.tryParseDid)(options.did)) === null || _a === void 0 ? void 0 : _a.method;
        const errorResult = {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                did: options.did,
            },
        };
        if (!method) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: `Could not extract method from did ${options.did}` }) });
        }
        const registrar = this.findRegistrarForMethod(method);
        if (!registrar) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: `Unsupported did method: '${method}'` }) });
        }
        return await registrar.update(agentContext, options);
    }
    async deactivate(agentContext, options) {
        var _a;
        this.logger.debug(`deactivating did ${options.did}`);
        const errorResult = {
            didDocumentMetadata: {},
            didRegistrationMetadata: {},
            didState: {
                state: 'failed',
                did: options.did,
            },
        };
        const method = (_a = (0, parse_1.tryParseDid)(options.did)) === null || _a === void 0 ? void 0 : _a.method;
        if (!method) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: `Could not extract method from did ${options.did}` }) });
        }
        const registrar = this.findRegistrarForMethod(method);
        if (!registrar) {
            return Object.assign(Object.assign({}, errorResult), { didState: Object.assign(Object.assign({}, errorResult.didState), { reason: `Unsupported did method: '${method}'` }) });
        }
        return await registrar.deactivate(agentContext, options);
    }
    findRegistrarForMethod(method) {
        var _a;
        return (_a = this.didsModuleConfig.registrars.find((r) => r.supportedMethods.includes(method))) !== null && _a !== void 0 ? _a : null;
    }
};
DidRegistrarService = __decorate([
    (0, plugins_1.injectable)(),
    __param(0, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [Object, DidsModuleConfig_1.DidsModuleConfig])
], DidRegistrarService);
exports.DidRegistrarService = DidRegistrarService;
//# sourceMappingURL=DidRegistrarService.js.map