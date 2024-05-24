import type { SurveyService } from '../services'
import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core'
import { RequestMessage } from '../messages'

export class RequestMessageHandler implements MessageHandler {
  private surveyService: SurveyService
  public supportedMessages = [RequestMessage]

  public constructor(surveyService: SurveyService) {
    this.surveyService = surveyService
  }

  public async handle(messageContext: MessageHandlerInboundMessage<RequestMessageHandler>) {
    await this.surveyService.processReceiveSurvey(messageContext)
  }
}
