import { EventEmitter, Repository, StorageService } from '@aries-framework/core';
import { QuestionAnswerRecord } from './QuestionAnswerRecord';
export declare class QuestionAnswerRepository extends Repository<QuestionAnswerRecord> {
    constructor(storageService: StorageService<QuestionAnswerRecord>, eventEmitter: EventEmitter);
}
