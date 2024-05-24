import type { DependencyManager, FeatureRegistry, Module } from '@credo-ts/core';
import { SurveyApi } from './SurveyApi';
export declare class SurveyModule implements Module {
    readonly api: typeof SurveyApi;
    /**
     * Registers the dependencies of the question answer module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
