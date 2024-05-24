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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdJwtVcApi = void 0;
const agent_1 = require("../../agent");
const plugins_1 = require("../../plugins");
const SdJwtVcService_1 = require("./SdJwtVcService");
/**
 * @public
 */
let SdJwtVcApi = class SdJwtVcApi {
    constructor(agentContext, sdJwtVcService) {
        this.agentContext = agentContext;
        this.sdJwtVcService = sdJwtVcService;
    }
    async sign(options) {
        return await this.sdJwtVcService.sign(this.agentContext, options);
    }
    /**
     *
     * Create a compact presentation of the sd-jwt.
     * This presentation can be send in- or out-of-band to the verifier.
     *
     * Also, whether to include the holder key binding.
     */
    async present(options) {
        return await this.sdJwtVcService.present(this.agentContext, options);
    }
    /**
     *
     * Verify an incoming sd-jwt. It will check whether everything is valid, but also returns parts of the validation.
     *
     * For example, you might still want to continue with a flow if not all the claims are included, but the signature is valid.
     *
     */
    async verify(options) {
        return await this.sdJwtVcService.verify(this.agentContext, options);
    }
    /**
     * Get and validate a sd-jwt-vc from a serialized JWT.
     */
    fromCompact(sdJwtVcCompact) {
        return this.sdJwtVcService.fromCompact(sdJwtVcCompact);
    }
    async store(compactSdJwtVc) {
        return await this.sdJwtVcService.store(this.agentContext, compactSdJwtVc);
    }
    async getById(id) {
        return await this.sdJwtVcService.getById(this.agentContext, id);
    }
    async getAll() {
        return await this.sdJwtVcService.getAll(this.agentContext);
    }
    async findAllByQuery(query) {
        return await this.sdJwtVcService.findByQuery(this.agentContext, query);
    }
    async deleteById(id) {
        return await this.sdJwtVcService.deleteById(this.agentContext, id);
    }
    async update(sdJwtVcRecord) {
        return await this.sdJwtVcService.update(this.agentContext, sdJwtVcRecord);
    }
};
SdJwtVcApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [agent_1.AgentContext, SdJwtVcService_1.SdJwtVcService])
], SdJwtVcApi);
exports.SdJwtVcApi = SdJwtVcApi;
//# sourceMappingURL=SdJwtVcApi.js.map