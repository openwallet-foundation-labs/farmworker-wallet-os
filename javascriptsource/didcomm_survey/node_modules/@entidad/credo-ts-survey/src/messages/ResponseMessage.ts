import { AgentMessage, IsValidMessageType, parseMessageType } from '@credo-ts/core'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class ResponseMessage extends AgentMessage {
  /**
   * Create new ResponseMessage instance.
   * @param options
   */
  public constructor(options: { 
    id?: string; 
    threadId: string 
    response: string; 
  }){
    super()
    if (options) {
      this.id = options.id || this.generateId()
      this.setThread({ threadId: options.threadId })
      this.response = options.response
    }
  }

  @IsValidMessageType(ResponseMessage.type)
  public readonly type = ResponseMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/survey/1.0/response')

  @Expose({ name: 'response' })
  @IsString()
  public response!: string
}
