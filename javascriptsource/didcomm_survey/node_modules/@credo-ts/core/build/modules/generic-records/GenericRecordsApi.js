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
exports.GenericRecordsApi = void 0;
const agent_1 = require("../../agent");
const constants_1 = require("../../constants");
const plugins_1 = require("../../plugins");
const GenericRecordService_1 = require("./services/GenericRecordService");
let GenericRecordsApi = class GenericRecordsApi {
    constructor(genericRecordsService, logger, agentContext) {
        this.genericRecordsService = genericRecordsService;
        this.logger = logger;
        this.agentContext = agentContext;
    }
    async save({ content, tags, id }) {
        try {
            const record = await this.genericRecordsService.save(this.agentContext, {
                id,
                content: content,
                tags: tags,
            });
            return record;
        }
        catch (error) {
            this.logger.error('Error while saving generic-record', {
                error,
                content,
                errorMessage: error instanceof Error ? error.message : error,
            });
            throw error;
        }
    }
    async delete(record) {
        try {
            await this.genericRecordsService.delete(this.agentContext, record);
        }
        catch (error) {
            this.logger.error('Error while saving generic-record', {
                error,
                content: record.content,
                errorMessage: error instanceof Error ? error.message : error,
            });
            throw error;
        }
    }
    async deleteById(id) {
        await this.genericRecordsService.deleteById(this.agentContext, id);
    }
    async update(record) {
        try {
            await this.genericRecordsService.update(this.agentContext, record);
        }
        catch (error) {
            this.logger.error('Error while update generic-record', {
                error,
                content: record.content,
                errorMessage: error instanceof Error ? error.message : error,
            });
            throw error;
        }
    }
    async findById(id) {
        return this.genericRecordsService.findById(this.agentContext, id);
    }
    async findAllByQuery(query) {
        return this.genericRecordsService.findAllByQuery(this.agentContext, query);
    }
    async getAll() {
        return this.genericRecordsService.getAll(this.agentContext);
    }
};
GenericRecordsApi = __decorate([
    (0, plugins_1.injectable)(),
    __param(1, (0, plugins_1.inject)(constants_1.InjectionSymbols.Logger)),
    __metadata("design:paramtypes", [GenericRecordService_1.GenericRecordService, Object, agent_1.AgentContext])
], GenericRecordsApi);
exports.GenericRecordsApi = GenericRecordsApi;
//# sourceMappingURL=GenericRecordsApi.js.map