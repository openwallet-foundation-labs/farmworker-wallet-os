# Credo-ts Survey Module

Survey module for [Aries Framework JavaScript](https://github.com/hyperledger/aries-framework-javascript.git). Implements [Aries RFC 0113](https://github.com/hyperledger/aries-rfcs/blob/1795d5c2d36f664f88f5e8045042ace8e573808c/features/0113-question-answer/README.md).

```sh
npm info "git+http://github.com/entidad/credo-ts-survey.git" peerDependencies

```

Then add the survey module to your project.

```sh
yarn add git+http://github.com/entidad/credo-ts-survey.git
```

### Quick start

In order for this module to work, we have to inject it into the agent to access agent functionality. See the example for more information.

### Example of usage

```ts
import { SurveyModule } from '@entidad/questionnaire'

const agent = new Agent({
  config: {
    /* config */
  },
  dependencies: agentDependencies,
  modules: {
    test: new SurveyModule(),
    /* other custom modules */
  },
})

await agent.initialize()

// To foo a test to a given connection
await agent.modules.survey.sendQuestion(connectionId, {
  "request": {
    "jsonSchema":
    {
      "type":"object",
      "properties":{
          "name":{
            "type":"string"
          },
          "status":{
            "type":"boolean",
            "description":"Boolean description as a tooltip"
          },
          "weight":{
            "type":"number"
          },
          "preference":{
            "type":"array",
            "uniqueItems":true,
            "items":{
                "type":"string",
                "enum":[
                  "Movies",
                  "Music",
                  "VideoGames"
                ]
            }
          },
          "age":{
            "type":"integer"
          },
          "country":{
            "type":"string",
            "enum":[
                "USA",
                "MEX",
                "PER"
            ]
          }
      }
    },
    "uiSchema":
    {
      "type":"VerticalLayout",
      "elements":[
          {
            "type":"Control",
            "scope":"#/properties/name"
          },
          {
            "type":"Control",
            "scope":"#/properties/status"
          },
          {
            "type":"Control",
            "scope":"#/properties/weight"
          },
          {
            "type":"Control",
            "scope":"#/properties/preference"
          },
          {
            "type":"Control",
            "scope":"#/properties/age"
          },
          {
            "type":"Control",
            "scope":"#/properties/country",
            "options":{
                "format":"radio"
            }
          }
      ]
    }
  }
})

// Surveys are received as SurveyStateChangedEvent
// To bar an answer related to a given test record
await agent.modules.survey.sendResponse(barRecordId, '')
```
