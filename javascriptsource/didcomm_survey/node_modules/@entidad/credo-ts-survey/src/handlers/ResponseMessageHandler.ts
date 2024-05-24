import type { SurveyService } from '../services'
import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core'
import { ResponseMessage } from '../messages'

export class ResponseMessageHandler implements MessageHandler {
  private surveyService: SurveyService
  public supportedMessages = [ResponseMessage]

  public constructor(surveyService: SurveyService) {
    this.surveyService = surveyService
  }

  public async handle(messageContext: MessageHandlerInboundMessage<ResponseMessageHandler>) {
    await this.surveyService.receiveResponse(messageContext)
  }
}
