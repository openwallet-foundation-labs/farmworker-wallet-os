import { EventEmitter } from '../../../agent/EventEmitter';
import { Repository } from '../../../storage/Repository';
import { StorageService } from '../../../storage/StorageService';
import { CredentialExchangeRecord } from './CredentialExchangeRecord';
export declare class CredentialRepository extends Repository<CredentialExchangeRecord> {
    constructor(storageService: StorageService<CredentialExchangeRecord>, eventEmitter: EventEmitter);
}
