"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationClient = void 0;
const ssi_types_1 = require("@sphereon/ssi-types");
const ConstraintUtils_1 = require("../ConstraintUtils");
const Messages_1 = __importDefault(require("../types/Messages"));
const utils_1 = require("../utils");
const handlers_1 = require("./handlers");
const DEFAULT_LIMIT_DISCLOSURE_TYPES = [ssi_types_1.IProofType.BbsBlsSignatureProof2020, 'DataIntegrityProof.anoncreds-2023'];
class EvaluationClient {
    constructor() {
        this.failed_catched = {
            tag: 'root',
            status: ConstraintUtils_1.Status.ERROR,
            message: Messages_1.default.UNKNOWN_EXCEPTION,
            stacktrace: '',
        };
        this._results = [];
        this._wrappedVcs = [];
        this._presentationSubmission = {};
        this._dids = [];
        this._limitDisclosureSignatureSuites = DEFAULT_LIMIT_DISCLOSURE_TYPES;
        this._restrictToDIDMethods = [];
        this._generatePresentationSubmission = true;
    }
    evaluate(pd, wvcs, opts) {
        this._restrictToDIDMethods = (opts === null || opts === void 0 ? void 0 : opts.restrictToDIDMethods) ? (0, utils_1.uniformDIDMethods)(opts === null || opts === void 0 ? void 0 : opts.restrictToDIDMethods) : [];
        this._dids = (opts === null || opts === void 0 ? void 0 : opts.holderDIDs) ? (0, utils_1.filterToRestrictedDIDs)(opts.holderDIDs, this._restrictToDIDMethods) : [];
        this._limitDisclosureSignatureSuites = opts === null || opts === void 0 ? void 0 : opts.limitDisclosureSignatureSuites;
        this._restrictToFormats = opts === null || opts === void 0 ? void 0 : opts.restrictToFormats;
        this._generatePresentationSubmission = (opts === null || opts === void 0 ? void 0 : opts.generatePresentationSubmission) !== undefined ? opts.generatePresentationSubmission : true;
        if (opts === null || opts === void 0 ? void 0 : opts.presentationSubmission) {
            this._presentationSubmission = opts.presentationSubmission;
            // this._requirePresentationSubmission = true;
        }
        let currentHandler = this.initEvaluationHandlers();
        currentHandler === null || currentHandler === void 0 ? void 0 : currentHandler.handle(pd, wvcs);
        while (currentHandler === null || currentHandler === void 0 ? void 0 : currentHandler.hasNext()) {
            currentHandler = currentHandler.getNext();
            try {
                currentHandler === null || currentHandler === void 0 ? void 0 : currentHandler.handle(pd, wvcs);
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
        this._restrictToDIDMethods = (0, utils_1.uniformDIDMethods)(value);
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
        const uriEvaluation = new handlers_1.UriEvaluationHandler(this);
        uriEvaluation
            .setNext(new handlers_1.DIDRestrictionEvaluationHandler(this))
            .setNext(new handlers_1.FormatRestrictionEvaluationHandler(this))
            .setNext(new handlers_1.InputDescriptorFilterEvaluationHandler(this))
            .setNext(new handlers_1.PredicateRelatedFieldEvaluationHandler(this))
            .setNext(new handlers_1.LimitDisclosureEvaluationHandler(this))
            .setNext(new handlers_1.SubjectIsIssuerEvaluationHandler(this))
            .setNext(new handlers_1.SubjectIsHolderEvaluationHandler(this))
            .setNext(new handlers_1.SameSubjectEvaluationHandler(this))
            .setNext(new handlers_1.MarkForSubmissionEvaluationHandler(this));
        return uriEvaluation;
    }
}
exports.EvaluationClient = EvaluationClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbkNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2V2YWx1YXRpb25DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsbURBQThFO0FBRTlFLHdEQUE0QztBQUU1QyxpRUFBNEM7QUFDNUMsb0NBQXFFO0FBR3JFLHlDQVlvQjtBQUVwQixNQUFNLDhCQUE4QixHQUFHLENBQUMsc0JBQVUsQ0FBQyx3QkFBd0IsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO0FBRWxILE1BQWEsZ0JBQWdCO0lBQzNCO1FBVVEsbUJBQWMsR0FBRztZQUN2QixHQUFHLEVBQUUsTUFBTTtZQUNYLE1BQU0sRUFBRSx3QkFBTSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxFQUFFLGtCQUFXLENBQUMsaUJBQTJCO1lBQ2hELFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQWRBLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLCtCQUErQixHQUFHLDhCQUE4QixDQUFDO1FBQ3RFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBb0JNLFFBQVEsQ0FDYixFQUFtQyxFQUNuQyxJQUFtQyxFQUNuQyxJQU9DO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQyxJQUFBLHlCQUFpQixFQUFDLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxvQkFBb0IsQ0FBQyxD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