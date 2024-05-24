import type { SurveyRecord } from './repository'
import {
  Query,
  AgentContext,
  ConnectionService,
  getOutboundMessageContext,
  injectable,
  MessageSender,
} from '@credo-ts/core'
import { ResponseMessageHandler, RequestMessageHandler } from './handlers'
import { SurveyService } from './services'
import { SurveyModel } from './models/SurveyModel'

@injectable()
export class SurveyApi {
  private surveyService: SurveyService
  private messageSender: MessageSender
  private connectionService: ConnectionService
  private agentContext: AgentContext

  public constructor(
    surveyService: SurveyService,
    messageSender: MessageSender,
    connectionService: ConnectionService,
    agentContext: AgentContext
  ) {
    this.surveyService = surveyService
    this.messageSender = messageSender
    this.connectionService = connectionService
    this.agentContext = agentContext

    this.agentContext.dependencyManager.registerMessageHandlers([
      new RequestMessageHandler(this.surveyService),
      new ResponseMessageHandler(this.surveyService),
    ])
  }

  /**
   * Create a question message with possible valid responses, then send message to the
   * holder
   *
   * @param connectionId connection to send the question message to
   * @param config config for creating question message
   * @returns Questionnaire record
   */
  public async sendRequest(
    connectionId: string,    
    config: {
      threadId:string,
      expirationDate?:string,
      request:SurveyModel
    }){
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()
    const { requestMessage, surveyRecord } = await this.surveyService.createSurvey(
      this.agentContext,
      connectionId,
      {
        expirationDate:config.expirationDate,
        threadId:config.threadId,
        request: config.request
      }
    )
    const outboundMessageContext = await getOutboundMessageContext(this.agentContext, {
      message: requestMessage,
      associatedRecord: surveyRecord,
      connectionRecord: connection,
    })
    await this.messageSender.sendMessage(outboundMessageContext)
    return surveyRecord
  }

  /**
   * Create an response message as the holder and send it in response to a request message
   *
   * @param surveryRecordId the id of the survey record
   * @param response response included in the response message
   * @returns Survey record
   */
  public async sendResponse(surveryRecordId: string, response: string) {
    const surveyRecord = await this.surveyService.getById(this.agentContext, surveryRecordId)
    const { responseMessage, surveyResponseRecord } = await this.surveyService.createResponse(
      this.agentContext,
      surveyRecord,
      response
    )
    const connection = await this.connectionService.getById(this.agentContext, surveyRecord.connectionId)
    const outboundMessageContext = await getOutboundMessageContext(this.agentContext, {
      message: responseMessage,
      associatedRecord: surveyResponseRecord,
      connectionRecord: connection,
    })

    await this.messageSender.sendMessage(outboundMessageContext)
    return surveyResponseRecord
  }

  /**
   * Get all Survey records
   *
   * @returns list containing all Survey records
   */
  public getAll() {
    return this.surveyService.getAll(this.agentContext)
  }

  /**
   * Get all Survey records by specified query params
   *
   * @returns list containing all Survey records matching specified query params
   */
  public findAllByQuery(query: Query<SurveyRecord>) {
    return this.surveyService.findAllByQuery(this.agentContext, query)
  }

  /**
   * Retrieve a Survey record by id
   *
   * @param surveyId The survey record id
   * @return The survery record or null if not found
   *
   */
  public findById(surveyId: string) {
    return this.surveyService.findById(this.agentContext, surveyId)
  }
}
