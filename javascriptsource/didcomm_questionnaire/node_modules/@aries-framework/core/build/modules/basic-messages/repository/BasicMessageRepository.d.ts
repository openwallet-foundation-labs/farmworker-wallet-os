import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { BasicMessageRecord } from './BasicMessageRecord';
export declare class BasicMessageRepository extends Repository<BasicMessageRecord> {
    constructor(storageService: StorageService<BasicMessageRecord>, eventEmitter: EventEmitter);
}
