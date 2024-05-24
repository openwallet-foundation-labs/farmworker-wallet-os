/**
 * Questionnaire states inferred from RFC 0113.
 *
 * @see https://github.com/Entidad/didcomm.org/tree/main/site/content/protocols/survey/0.1
 */
export enum SurveyState {
  QuestionSent = 'question-sent',
  QuestionReceived = 'question-received',
  AnswerReceived = 'answer-received',
  AnswerSent = 'answer-sent',
}
