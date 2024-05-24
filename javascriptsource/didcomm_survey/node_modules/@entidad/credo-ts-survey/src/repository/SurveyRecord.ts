import type { SurveyRole } from '../SurveyRole'
import type { SurveyState } from '../models'
import type { RecordTags, TagsBase } from '@credo-ts/core'
import { CredoError, utils, BaseRecord } from '@credo-ts/core'
import { SurveyModel } from '../models'


export type CustomSurveyTags = TagsBase
export type DefaultSurveyTags = {
  connectionId: string
  role: SurveyRole
  state: SurveyState
  threadId: string
}

export type SurveyTags = RecordTags<SurveyRecord>

export interface SurveyStorageProps {
  id?: string
  createdAt?: Date
  connectionId: string
  role: SurveyRole
  signatureRequired: boolean
  state: SurveyState
  tags?: CustomSurveyTags
  threadId: string
  expirationDate?:string  
  response?: string
  request:SurveyModel
}

export class SurveyRecord extends BaseRecord<DefaultSurveyTags, CustomSurveyTags> {  
  public connectionId!: string
  public role!: SurveyRole
  public signatureRequired!: boolean
  public state!: SurveyState
  public threadId!: string
  public expirationDate?:string
  public response?: string
  public request!:SurveyModel

  public static readonly type = 'SurveyRecord'
  public readonly type = SurveyRecord.type

  public constructor(props: SurveyStorageProps) {
    super()
    if (props) {
      this.id = props.id ?? utils.uuid()
      this.createdAt = props.createdAt ?? new Date()
      this.connectionId = props.connectionId
      this._tags = props.tags ?? {}
      this.role = props.role
      this.signatureRequired = props.signatureRequired
      this.state = props.state
      this.threadId = props.threadId
      this.response = props.response
      this.request=props.request
    }
  }

  public getTags() {
    return {
      ...this._tags,
      connectionId: this.connectionId,
      role: this.role,
      state: this.state,
      threadId: this.threadId,
    }
  }

  public assertRole(expectedRole: SurveyRole) {
    if (this.role !== expectedRole) {
      throw new CredoError(`Invalid Survey Record role ${this.role}, expected is ${expectedRole}.`)
    }
  }

  public assertState(expectedStates: SurveyState | SurveyState[]) {
    if (!Array.isArray(expectedStates)) {
      expectedStates = [expectedStates]
    }

    if (!expectedStates.includes(this.state)) {
      throw new CredoError(
        `Survey record is in invalid state ${this.state}. Valid states are: ${expectedStates.join(', ')}.`
      )
    }
  }
}
