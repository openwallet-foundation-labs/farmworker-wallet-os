import type { DependencyManager, FeatureRegistry, Module } from '@credo-ts/core'
import { AgentConfig,  Protocol } from '@credo-ts/core'
import { SurveyApi } from './SurveyApi'
import { SurveyRole } from './SurveyRole'
import { SurveyRepository } from './repository'
import { SurveyService } from './services'

export class SurveyModule implements Module {
  public readonly api = SurveyApi

  /**
   * Registers the dependencies of the question answer module on the dependency manager.
   */
  public register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry) {
	//entidad
    dependencyManager
      .resolve(AgentConfig)
      .logger.warn(
        "The '@entidad/survey' module is experimental and could have unexpected breaking changes. When using this module, make sure to use strict versions for all @entidad packages."
      )
    // Api
    dependencyManager.registerContextScoped(SurveyApi)

    // Services
    dependencyManager.registerSingleton(SurveyService)

    // Repositories
    dependencyManager.registerSingleton(SurveyRepository)

    // Feature Registry
    featureRegistry.register(
      new Protocol({
        id: 'https://didcomm.org/survey/1.0',
        roles: [SurveyRole.Questioner, SurveyRole.Responder],
      })
    )
  }
}
