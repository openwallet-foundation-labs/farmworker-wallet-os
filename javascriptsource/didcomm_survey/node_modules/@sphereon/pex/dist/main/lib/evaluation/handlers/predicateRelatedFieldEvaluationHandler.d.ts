import { IInternalPresentationDefinition } from '../../types/Internal.types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class PredicateRelatedFieldEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition): void;
    private examinePredicateRelatedField;
    private examinePredicateForFilterEvaluationResult;
    private retrieveResultInputDescriptorIdx;
    private concatenatePath;
    private createResultObject;
}
