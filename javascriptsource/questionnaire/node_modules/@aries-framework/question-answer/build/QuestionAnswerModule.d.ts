import type { DependencyManager, FeatureRegistry, Module } from '@aries-framework/core';
import { QuestionAnswerApi } from './QuestionAnswerApi';
export declare class QuestionAnswerModule implements Module {
    readonly api: typeof QuestionAnswerApi;
    /**
     * Registers the dependencies of the question answer module on the dependency manager.
     */
    register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void;
}
