import { EventEmitter, inject, injectable, InjectionSymbols, Repository, StorageService } from '@credo-ts/core'
import { SurveyRecord } from './SurveyRecord'

@injectable()
export class SurveyRepository extends Repository<SurveyRecord> {
  public constructor(
    @inject(InjectionSymbols.StorageService) storageService: StorageService<SurveyRecord>,
    eventEmitter: EventEmitter
  ) {
    super(SurveyRecord, storageService, eventEmitter)
  }
}
