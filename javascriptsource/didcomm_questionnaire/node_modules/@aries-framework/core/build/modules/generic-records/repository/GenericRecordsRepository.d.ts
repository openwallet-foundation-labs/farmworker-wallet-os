import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { GenericRecord } from './GenericRecord';
export declare class GenericRecordsRepository extends Repository<GenericRecord> {
    constructor(storageService: StorageService<GenericRecord>, eventEmitter: EventEmitter);
}
