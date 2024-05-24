"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SameSubjectEvaluationHandler = void 0;
const jsonpath_1 = require("@astronautlabs/jsonpath");
const pex_models_1 = require("@sphereon/pex-models");
const ConstraintUtils_1 = require("../../ConstraintUtils");
const abstractEvaluationHandler_1 = require("./abstractEvaluationHandler");
class SameSubjectEvaluationHandler extends abstractEvaluationHandler_1.AbstractEvaluationHandler {
    constructor(client) {
        super(client);
        this.fieldIds = [];
        this.sameSubject = [];
        this.messages = new Map();
        this.messages.set(ConstraintUtils_1.Status.INFO, 'The field ids requiring the same subject to belong to same subject');
        this.messages.set(ConstraintUtils_1.Status.WARN, 'The field ids preferring the same subject to belong to same subject');
        this.messages.set(ConstraintUtils_1.Status.ERROR, 'The fields ids not belong to the same subject');
    }
    getName() {
        return 'SameSubjectEvaluation';
    }
    handle(pd, wrappedVcs) {
        const sameSubjectInDesc = this.mapSameSubjectFieldIdsToInputDescriptors(pd);
        const handlerCheckResults = this.mapCredentialsToResultObjecs(wrappedVcs, sameSubjectInDesc);
        const fieldIdOccurrencesCount = this.countSameSubjectOccurrences(sameSubjectInDesc, handlerCheckResults);
        this.generateErrorResults(fieldIdOccurrencesCount, handlerCheckResults);
        this.updatePresentationSubmission(pd);
    }
    mapSameSubjectFieldIdsToInputDescriptors(pd) {
        this.fieldIds.push(...jsonpath_1.JSONPath.nodes(pd, '$..fields[*].id'));
        this.sameSubject.push(...jsonpath_1.JSONPath.nodes(pd, '$..same_subject[*]'));
        const results = [];
        this.fieldIds.forEach((f) => {
            const sameSubject = this.sameSubject.find((ss) => ss.value.field_id.includes(f.value));
            if (sameSubject) {
                results.push([f, sameSubject]);
            }
        });
        return results;
    }
    generateErrorResults(fieldIdOccurrencesCount, handlerCheckResults) {
        fieldIdOccurrencesCount.forEach((v, k) => {
            const results = handlerCheckResults.filter((r) => k === r.payload.fieldIdSet).map((r) => r.payload.credentialSubject.id);
            if (results.length !== v || new Set(results).size !== 1) {
                handlerCheckResults.forEach((v, i, arr) => {
                    if (v.payload.fieldIdSet === k) {
                        v.status = ConstraintUtils_1.Status.ERROR;
                        v.message = this.messages.get(ConstraintUtils_1.Status.ERROR);
                        arr[i] = v;
                    }
                });
            }
        });
        this.client.results.push(...handlerCheckResults);
    }
    countSameSubjectOccurrences(sameSubjectInDesc, handlerCheckResults) {
        const fieldIdOccurrencesCount = new Map();
        sameSubjectInDesc.forEach((s) => {
            const result = handlerCheckResults.filter((c) => s[1].value.field_id === c.payload.fieldIdSet);
            if (result) {
                if (fieldIdOccurrencesCount.has(s[1].value.field_id) && fieldIdOccurrencesCount.get(s[1].value.field_id)) {
                    fieldIdOccurrencesCount.set(s[1].value.field_id, fieldIdOccurrencesCount.get(s[1].value.field_id) + 1);
                }
                else {
                    fieldIdOccurrencesCount.set(s[1].value.field_id, 1);
                }
            }
        });
        return fieldIdOccurrencesCount;
    }
    mapCredentialsToResultObjecs(wrappedVcs, results) {
        const subjects = [
            ...jsonpath_1.JSONPath.nodes(wrappedVcs.map((wvc) => wvc.credential), '$..credentialSubject'),
        ];
        const handlerCheckResults = [];
        subjects.forEach((s) => {
            const result = results.find((id) => jsonpath_1.JSONPath.query(s.value, `$..${id[0].value}`).length !== 0);
            if (result && result[1].value.directive === pex_models_1.Optionality.Required) {
                handlerCheckResults.push({
                    input_descriptor_path: jsonpath_1.JSONPath.stringify(result[0].path.slice(0, 3)),
                    status: ConstraintUtils_1.Status.INFO,
                    evaluator: this.getName(),
                    payload: { fieldIdSet: result[1].value.field_id, credentialSubject: s.value },
                    message: this.messages.get(ConstraintUtils_1.Status.INFO),
                    verifiable_credential_path: jsonpath_1.JSONPath.stringify(s.path.slice(0, 2)),
                });
            }
            else if (result && result[1].value.directive === pex_models_1.Optionality.Preferred) {
                handlerCheckResults.push({
                    input_descriptor_path: jsonpath_1.JSONPath.stringify(result[0].path.slice(0, 3)),
                    status: ConstraintUtils_1.Status.WARN,
                    evaluator: this.getName(),
                    payload: { fieldIdSet: result[1].value.field_id, credentialSubject: s.value },
                    message: this.messages.get(ConstraintUtils_1.Status.WARN),
                    verifiable_credential_path: jsonpath_1.JSONPath.stringify(s.path.slice(0, 2)),
                });
            }
        });
        return handlerCheckResults;
    }
}
exports.SameSubjectEvaluationHandler = SameSubjectEvaluationHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtZVN1YmplY3RFdmFsdWF0aW9uSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9ldmFsdWF0aW9uL2hhbmRsZXJzL3NhbWVTdWJqZWN0RXZhbHVhdGlvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQXlEO0FBQ3pELHFEQUFrRTtBQUdsRSwyREFBK0M7QUFLL0MsMkVBQXdFO0FBRXhFLE1BQWEsNEJBQTZCLFNBQVEscURBQXlCO0lBTXpFLFlBQVksTUFBd0I7UUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBTSxDQUFDLElBQUksRUFBRSxvRUFBb0UsQ0FBQyxDQUFDO1FBQ3JHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUFNLENBQUMsSUFBSSxFQUFFLHFFQUFxRSxDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQU0sQ0FBQyxLQUFLLEVBQUUsK0NBQStDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sdUJBQXVCLENBQUM7SUFDakMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFtQyxFQUFFLFVBQXlDO1FBQzFGLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdGLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFD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