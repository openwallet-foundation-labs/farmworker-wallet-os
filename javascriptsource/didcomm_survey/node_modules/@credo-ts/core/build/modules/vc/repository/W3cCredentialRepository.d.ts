import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { W3cCredentialRecord } from './W3cCredentialRecord';
export declare class W3cCredentialRepository extends Repository<W3cCredentialRecord> {
    constructor(storageService: StorageService<W3cCredentialRecord>, eventEmitter: EventEmitter);
}
