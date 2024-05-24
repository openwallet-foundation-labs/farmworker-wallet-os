import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { OutOfBandRecord } from './OutOfBandRecord';
export declare class OutOfBandRepository extends Repository<OutOfBandRecord> {
    constructor(storageService: StorageService<OutOfBandRecord>, eventEmitter: EventEmitter);
}
