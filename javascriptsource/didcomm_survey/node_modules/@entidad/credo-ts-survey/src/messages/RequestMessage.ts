import { AgentMessage, IsValidMessageType, parseMessageType } from '@credo-ts/core'
import { Expose } from 'class-transformer'
import { IsBoolean, IsOptional, IsString} from 'class-validator'
import { SurveyModel } from '../models'

export class RequestMessage extends AgentMessage {
  /**
   * Create new RequestMessage instance.
   * @param options
   */
  public constructor(options: {    
    id?: string
    signatureRequired?: boolean
    request:SurveyModel
    expirationDate?:string
  }) {
    super()
    if (options) {
      this.id = options.id || this.generateId()
      this.signatureRequired = options.signatureRequired
      this.expirationDate=options.expirationDate
      this.request = options.request
    }
  }

  @IsValidMessageType(RequestMessage.type)
  public readonly type = RequestMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/survey/1.0/request')

  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'signature_required' })
  public signatureRequired?: boolean

  @IsOptional()
  @IsString()
  public expirationDate?: string

  @Expose({ name: 'request' })
  public request!: SurveyModel
}
