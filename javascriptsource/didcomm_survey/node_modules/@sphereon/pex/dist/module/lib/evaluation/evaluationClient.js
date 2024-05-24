import { IProofType } from '@sphereon/ssi-types';
import { Status } from '../ConstraintUtils';
import PexMessages from '../types/Messages';
import { filterToRestrictedDIDs, uniformDIDMethods } from '../utils';
import { DIDRestrictionEvaluationHandler, FormatRestrictionEvaluationHandler, InputDescriptorFilterEvaluationHandler, LimitDisclosureEvaluationHandler, MarkForSubmissionEvaluationHandler, PredicateRelatedFieldEvaluationHandler, SameSubjectEvaluationHandler, SubjectIsHolderEvaluationHandler, SubjectIsIssuerEvaluationHandler, UriEvaluationHandler, } from './handlers';
const DEFAULT_LIMIT_DISCLOSURE_TYPES = [IProofType.BbsBlsSignatureProof2020, 'DataIntegrityProof.anoncreds-2023'];
export class EvaluationClient {
    constructor() {
        this._results = [];
        this._wrappedVcs = [];
        this._presentationSubmission = {};
        this._dids = [];
        this._limitDisclosureSignatureSuites = DEFAULT_LIMIT_DISCLOSURE_TYPES;
        this._restrictToDIDMethods = [];
        this._generatePresentationSubmission = true;
    }
    failed_catched = {
        tag: 'root',
        status: Status.ERROR,
        message: PexMessages.UNKNOWN_EXCEPTION,
        stacktrace: '',
    };
    _results;
    _wrappedVcs;
    _presentationSubmission;
    // private _requirePresentationSubmission: boolean;
    _dids;
    _limitDisclosureSignatureSuites;
    _restrictToFormats;
    _restrictToDIDMethods;
    _generatePresentationSubmission;
    evaluate(pd, wvcs, opts) {
        this._restrictToDIDMethods = opts?.restrictToDIDMethods ? uniformDIDMethods(opts?.restrictToDIDMethods) : [];
        this._dids = opts?.holderDIDs ? filterToRestrictedDIDs(opts.holderDIDs, this._restrictToDIDMethods) : [];
        this._limitDisclosureSignatureSuites = opts?.limitDisclosureSignatureSuites;
        this._restrictToFormats = opts?.restrictToFormats;
        this._generatePresentationSubmission = opts?.generatePresentationSubmission !== undefined ? opts.generatePresentationSubmission : true;
        if (opts?.presentationSubmission) {
            this._presentationSubmission = opts.presentationSubmission;
            // this._requirePresentationSubmission = true;
        }
        let currentHandler = this.initEvaluationHandlers();
        currentHandler?.handle(pd, wvcs);
        while (currentHandler?.hasNext()) {
            currentHandler = currentHandler.getNext();
            try {
                currentHandler?.handle(pd, wvcs);
            }
            catch (e) {
                this.failed_catched.message += e.message;
                this.failed_catched.stacktrace = e;
                throw this.failed_catched;
            }
        }
    }
    get results() {
        return this._results;
    }
    get dids() {
        return this._dids;
    }
    set dids(dids) {
        this._dids = dids;
    }
    assertPresentationSubmission() {
        if (typeof this._presentationSubmission === 'string') {
            console.log('Presentation submission present, but as string not object. External calls did not follow contract. Correcting');
            this._presentationSubmission = JSON.parse(this._presentationSubmission);
        }
        if (!this.generatePresentationSubmission && (!this.presentationSubmission || Object.keys(this.presentationSubmission).length === 0)) {
            throw Error('No presentation submission present, but required option was set');
        }
    }
    get generatePresentationSubmission() {
        return this._generatePresentationSubmission;
    }
    set generatePresentationSubmission(value) {
        this._generatePresentationSubmission = value;
    }
    get presentationSubmission() {
        return this._presentationSubmission;
    }
    set presentationSubmission(presentationSubmission) {
        this._presentationSubmission = presentationSubmission;
    }
    get wrappedVcs() {
        return this._wrappedVcs;
    }
    set wrappedVcs(wrappedVcs) {
        this._wrappedVcs = wrappedVcs;
    }
    get limitDisclosureSignatureSuites() {
        return this._limitDisclosureSignatureSuites || DEFAULT_LIMIT_DISCLOSURE_TYPES;
    }
    set limitDisclosureSignatureSuites(limitDisclosureSignatureSuites) {
        this._limitDisclosureSignatureSuites = limitDisclosureSignatureSuites;
    }
    get restrictToDIDMethods() {
        return this._restrictToDIDMethods;
    }
    set restrictToDIDMethods(value) {
        this._restrictToDIDMethods = uniformDIDMethods(value);
    }
    hasRestrictToDIDMethods() {
        return this.restrictToDIDMethods && this.restrictToDIDMethods.length > 0;
    }
    get restrictToFormats() {
        return this._restrictToFormats;
    }
    set restrictToFormats(value) {
        this._restrictToFormats = value;
    }
    initEvaluationHandlers() {
        const uriEvaluation = new UriEvaluationHandler(this);
        uriEvaluation
            .setNext(new DIDRestrictionEvaluationHandler(this))
            .setNext(new FormatRestrictionEvaluationHandler(this))
            .setNext(new InputDescriptorFilterEvaluationHandler(this))
            .setNext(new PredicateRelatedFieldEvaluationHandler(this))
            .setNext(new LimitDisclosureEvaluationHandler(this))
            .setNext(new SubjectIsIssuerEvaluationHandler(this))
            .setNext(new SubjectIsHolderEvaluationHandler(this))
            .setNext(new SameSubjectEvaluationHandler(this))
            .setNext(new MarkForSubmissionEvaluationHandler(this));
        return uriEvaluation;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbkNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2V2YWx1YXRpb25DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBK0IsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFNUMsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3JFLE9BQU8sRUFDTCwrQkFBK0IsRUFFL0Isa0NBQWtDLEVBQ2xDLHNDQUFzQyxFQUN0QyxnQ0FBZ0MsRUFDaEMsa0NBQWtDLEVBQ2xDLHNDQUFzQyxFQUN0Qyw0QkFBNEIsRUFDNUIsZ0NBQWdDLEVBQ2hDLGdDQUFnQyxFQUNoQyxvQkFBb0IsR0FDckIsTUFBTSxZQUFZLENBQUM7QUFFcEIsTUFBTSw4QkFBOEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRWxILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQywrQkFBK0IsR0FBRyw4QkFBOEIsQ0FBQztRQUN0RSxJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQywrQkFBK0IsR0FBRyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUVPLGNBQWMsR0FBRztRQUN2QixHQUFHLEVBQUUsTUFBTTtRQUNYLE1BQU0sRUFBRSxNQUFN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