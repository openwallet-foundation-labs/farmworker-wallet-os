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
exports.W3cCredentialsApi = void 0;
const agent_1 = require("../../agent");
const plugins_1 = require("../../plugins");
const W3cCredentialService_1 = require("./W3cCredentialService");
/**
 * @public
 */
let W3cCredentialsApi = class W3cCredentialsApi {
    constructor(agentContext, w3cCredentialService) {
        this.agentContext = agentContext;
        this.w3cCredentialService = w3cCredentialService;
    }
    async storeCredential(options) {
        return this.w3cCredentialService.storeCredential(this.agentContext, options);
    }
    async removeCredentialRecord(id) {
        return this.w3cCredentialService.removeCredentialRecord(this.agentContext, id);
    }
    async getAllCredentialRecords() {
        return this.w3cCredentialService.getAllCredentialRecords(this.agentContext);
    }
    async getCredentialRecordById(id) {
        return this.w3cCredentialService.getCredentialRecordById(this.agentContext, id);
    }
    async findCredentialRecordsByQuery(query) {
        return this.w3cCredentialService.findCredentialsByQuery(this.agentContext, query);
    }
};
W3cCredentialsApi = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [agent_1.AgentContext, W3cCredentialService_1.W3cCredentialService])
], W3cCredentialsApi);
exports.W3cCredentialsApi = W3cCredentialsApi;
//# sourceMappingURL=W3cCredentialsApi.js.map