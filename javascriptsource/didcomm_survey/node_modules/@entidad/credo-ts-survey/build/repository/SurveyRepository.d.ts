import { EventEmitter, Repository, StorageService } from '@credo-ts/core';
import { SurveyRecord } from './SurveyRecord';
export declare class SurveyRepository extends Repository<SurveyRecord> {
    constructor(storageService: StorageService<SurveyRecord>, eventEmitter: EventEmitter);
}
