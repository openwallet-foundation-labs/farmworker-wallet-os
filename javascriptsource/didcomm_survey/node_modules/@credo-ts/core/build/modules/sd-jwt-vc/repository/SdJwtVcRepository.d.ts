import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { SdJwtVcRecord } from './SdJwtVcRecord';
export declare class SdJwtVcRepository extends Repository<SdJwtVcRecord> {
    constructor(storageService: StorageService<SdJwtVcRecord>, eventEmitter: EventEmitter);
}
