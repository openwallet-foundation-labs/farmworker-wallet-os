import { WrappedVerifiableCredential } from '@sphereon/ssi-types';
import { IInternalPresentationDefinition } from '../../types';
import { EvaluationClient } from '../evaluationClient';
import { AbstractEvaluationHandler } from './abstractEvaluationHandler';
export declare class LimitDisclosureEvaluationHandler extends AbstractEvaluationHandler {
    constructor(client: EvaluationClient);
    getName(): string;
    handle(pd: IInternalPresentationDefinition, wrappedVcs: WrappedVerifiableCredential[]): void;
    private isLimitDisclosureSupported;
    private evaluateLimitDisclosure;
    private enforceLimitDisclosure;
    private createSdJwtPresentationFrame;
    private createVcWithRequiredFields;
    private copyResultPathToDestinationCredential;
    private createSuccessResult;
    private createMandatoryFieldNotFoundResult;
    private createLimitDisclosureNotSupportedResult;
}
