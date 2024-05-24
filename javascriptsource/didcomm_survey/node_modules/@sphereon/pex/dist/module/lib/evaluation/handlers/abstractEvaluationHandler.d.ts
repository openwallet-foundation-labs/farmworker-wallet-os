import { PresentationSubmission } from '@sphereon/pex-models';
import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { HandlerCheckResult } from '../core';
import { EvaluationClient } from '../evaluationClient';
import { EvaluationHandler } from './evaluationHandler';
export declare abstract class AbstractEvaluationHandler implements EvaluationHandler {
    private _client;
    private nextHandler;
    constructor(_client: EvaluationClient);
    setNext(handler: EvaluationHandler): EvaluationHandler;
    abstract getName(): string;
    getNext(): EvaluationHandler | undefined;
    hasNext(): boolean;
    get client(): EvaluationClient;
    abstract handle(d: IInternalPresentationDefinition, p: WrappedVerifiableCredential[]): void;
    get wrappedVcs(): WrappedVerifiableCredential[];
    set wrappedVcs(wrappedVcs: WrappedVerifiableCredential[]);
    get presentationSubmission(): PresentationSubmission;
    set presentationSubmission(presentationSubmission: PresentationSubmission);
    getResults(): HandlerCheckResult[];
    updatePresentationSubmission(pd: IInternalPresentationDefinition): void;
    removeDuplicate(results: HandlerCheckResult[]): HandlerCheckResult[];
}
