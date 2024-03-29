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
exports.GenericRecordService = void 0;
const error_1 = require("../../../error");
const plugins_1 = require("../../../plugins");
const GenericRecord_1 = require("../repository/GenericRecord");
const GenericRecordsRepository_1 = require("../repository/GenericRecordsRepository");
let GenericRecordService = class GenericRecordService {
    constructor(genericRecordsRepository) {
        this.genericRecordsRepository = genericRecordsRepository;
    }
    async save(agentContext, { content, tags, id }) {
        const genericRecord = new GenericRecord_1.GenericRecord({
            id,
            content,
            tags,
        });
        try {
            await this.genericRecordsRepository.save(agentContext, genericRecord);
            return genericRecord;
        }
        catch (error) {
            throw new error_1.AriesFrameworkError(`Unable to store the genericRecord record with id ${genericRecord.id}. Message: ${error}`);
        }
    }
    async delete(agentContext, record) {
        try {
            await this.genericRecordsRepository.delete(agentContext, record);
        }
        catch (error) {
            throw new error_1.AriesFrameworkError(`Unable to delete the genericRecord record with id ${record.id}. Message: ${error}`);
        }
    }
    async deleteById(agentContext, id) {
        await this.genericRecordsRepository.deleteById(agentContext, id);
    }
    async update(agentContext, record) {
        try {
            await this.genericRecordsRepository.update(agentContext, record);
        }
        catch (error) {
            throw new error_1.AriesFrameworkError(`Unable to update the genericRecord record with id ${record.id}. Message: ${error}`);
        }
    }
    async findAllByQuery(agentContext, query) {
        return this.genericRecordsRepository.findByQuery(agentContext, query);
    }
    async findById(agentContext, id) {
        return this.genericRecordsRepository.findById(agentContext, id);
    }
    async getAll(agentContext) {
        return this.genericRecordsRepository.getAll(agentContext);
    }
};
GenericRecordService = __decorate([
    (0, plugins_1.injectable)(),
    __metadata("design:paramtypes", [GenericRecordsRepository_1.GenericRecordsRepository])
], GenericRecordService);
exports.GenericRecordService = GenericRecordService;
//# sourceMappingURL=GenericRecordService.js.map