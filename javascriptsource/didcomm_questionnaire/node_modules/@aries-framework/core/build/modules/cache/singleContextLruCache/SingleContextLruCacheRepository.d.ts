import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { SingleContextLruCacheRecord } from './SingleContextLruCacheRecord';
export declare class SingleContextLruCacheRepository extends Repository<SingleContextLruCacheRecord> {
    constructor(storageService: StorageService<SingleContextLruCacheRecord>, eventEmitter: EventEmitter);
}
