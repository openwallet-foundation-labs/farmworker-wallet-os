import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../Repository';
import { StorageService } from '../../StorageService';
import { StorageVersionRecord } from './StorageVersionRecord';
export declare class StorageVersionRepository extends Repository<StorageVersionRecord> {
    constructor(storageService: StorageService<StorageVersionRecord>, eventEmitter: EventEmitter);
}
