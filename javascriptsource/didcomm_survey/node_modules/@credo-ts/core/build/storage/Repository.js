"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const error_1 = require("../error");
const RepositoryEvents_1 = require("./RepositoryEvents");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Repository {
    constructor(recordClass, storageService, eventEmitter) {
        this.storageService = storageService;
        this.recordClass = recordClass;
        this.eventEmitter = eventEmitter;
    }
    /** @inheritDoc {StorageService#save} */
    async save(agentContext, record) {
        await this.storageService.save(agentContext, record);
        this.eventEmitter.emit(agentContext, {
            type: RepositoryEvents_1.RepositoryEventTypes.RecordSaved,
            payload: {
                // Record in event should be static
                record: record.clone(),
            },
        });
    }
    /** @inheritDoc {StorageService#update} */
    async update(agentContext, record) {
        await this.storageService.update(agentContext, record);
        this.eventEmitter.emit(agentContext, {
            type: RepositoryEvents_1.RepositoryEventTypes.RecordUpdated,
            payload: {
                // Record in event should be static
                record: record.clone(),
            },
        });
    }
    /** @inheritDoc {StorageService#delete} */
    async delete(agentContext, record) {
        await this.storageService.delete(agentContext, record);
        this.eventEmitter.emit(agentContext, {
            type: RepositoryEvents_1.RepositoryEventTypes.RecordDeleted,
            payload: {
                // Record in event should be static
                record: record.clone(),
            },
        });
    }
    /**
     * Delete record by id. Throws {RecordNotFoundError} if no record is found
     * @param id the id of the record to delete
     * @returns
     */
    async deleteById(agentContext, id) {
        await this.storageService.deleteById(agentContext, this.recordClass, id);
        this.eventEmitter.emit(agentContext, {
            type: RepositoryEvents_1.RepositoryEventTypes.RecordDeleted,
            payload: {
                record: { id, type: this.recordClass.type },
            },
        });
    }
    /** @inheritDoc {StorageService#getById} */
    async getById(agentContext, id) {
        return this.storageService.getById(agentContext, this.recordClass, id);
    }
    /**
     * Find record by id. Returns null if no record is found
     * @param id the id of the record to retrieve
     * @returns
     */
    async findById(agentContext, id) {
        try {
            return await this.storageService.getById(agentContext, this.recordClass, id);
        }
        catch (error) {
            if (error instanceof error_1.RecordNotFoundError)
                return null;
            throw error;
        }
    }
    /** @inheritDoc {StorageService#getAll} */
    async getAll(agentContext) {
        return this.storageService.getAll(agentContext, this.recordClass);
    }
    /** @inheritDoc {StorageService#findByQuery} */
    async findByQuery(agentContext, query) {
        return this.storageService.findByQuery(agentContext, this.recordClass, query);
    }
    /**
     * Find a single record by query. Returns null if not found.
     * @param query the query
     * @returns the record, or null if not found
     * @throws {RecordDuplicateError} if multiple records are found for the given query
     */
    async findSingleByQuery(agentContext, query) {
        const records = await this.findByQuery(agentContext, query);
        if (records.length > 1) {
            throw new error_1.RecordDuplicateError(`Multiple records found for given query '${JSON.stringify(query)}'`, {
                recordType: this.recordClass.type,
            });
        }
        if (records.length < 1) {
            return null;
        }
        return records[0];
    }
    /**
     * Find a single record by query. Throws if not found
     * @param query the query
     * @returns the record
     * @throws {RecordDuplicateError} if multiple records are found for the given query
     * @throws {RecordNotFoundError} if no record is found for the given query
     */
    async getSingleByQuery(agentContext, query) {
        const record = await this.findSingleByQuery(agentContext, query);
        if (!record) {
            throw new error_1.RecordNotFoundError(`No record found for given query '${JSON.stringify(query)}'`, {
                recordType: this.recordClass.type,
            });
        }
        return record;
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map