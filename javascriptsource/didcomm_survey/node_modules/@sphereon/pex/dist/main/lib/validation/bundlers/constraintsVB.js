"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstraintsVB = void 0;
const pex_models_1 = require("@sphereon/pex-models");
const fieldsVB_1 = require("./fieldsVB");
const validationBundler_1 = require("./validationBundler");
class ConstraintsVB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'constraints');
        this.disclosureLimitShouldHaveKnownValueMsg = 'limit_disclosure should have known value';
        this.statusShouldHaveKnownValueMsg = 'Unknown status property';
        this.statusDirectiveShouldHaveKnownValueMsg = 'status directive should have known value';
        this.subjectIsIssuerShouldBeKnownValueMsg = 'subject_is_issuer should be known value';
        this.fieldIdIsMandatoryMsg = 'field_id property is mandatory';
        this.fieldIdMustBeArrayOfStringsMsg = 'field_id property must be an array of strings';
        this.fieldIdMustCorrespondToFieldIdMsg = 'field_id must correspond to a present field object id property';
        this.directivePropertyIsMandatoryMsg = 'directive property is mandatory';
        this.oneOfTheKnownDirectivePropertiesMandatoryMsg = 'directive property must be one of [required, preferred]';
    }
    getValidations(constraints) {
        let validations = [];
        if (constraints) {
            validations = [
                {
                    tag: this.getTag(),
                    target: constraints,
                    predicate: (constraints) => ConstraintsVB.disclosureLimitShouldHaveKnownValue(constraints.limit_disclosure),
                    message: this.disclosureLimitShouldHaveKnownValueMsg,
                },
                {
                    tag: this.getTag(),
                    target: constraints,
                    predicate: (constraints) => ConstraintsVB.statusShouldHaveKnownValue(constraints.statuses),
                    message: this.statusShouldHaveKnownValueMsg,
                },
                {
                    tag: this.getTag(),
                    target: constraints,
                    predicate: ConstraintsVB.statusDirectiveShouldHaveKnownValue(),
                    message: this.statusDirectiveShouldHaveKnownValueMsg,
                },
                {
                    tag: this.getTag(),
                    target: constraints,
                    predicate: (constraints) => ConstraintsVB.shouldBeKnownOption(constraints.is_holder),
                    message: this.subjectIsIssuerShouldBeKnownValueMsg,
                },
                {
                    tag: this.getTag(),
                    target: constraints,
                    predicate: (constraints) => this.fieldIdInSubjectMustCorrespondToFieldId(constraints, constraints.is_holder),
                    message: this.fieldIdMustCorrespondToFieldIdMsg,
                },
                {
                    tag: this.getTag(),
                    target: constraints,
                    predicate: (constraints) => this.fieldIdInSubjectMustCorrespondToFieldId(constraints, constraints.same_subject),
                    message: this.fieldIdMustCorrespondToFieldIdMsg,
                },
                ...this.getSubjectsValidations(constraints === null || constraints === void 0 ? void 0 : constraints.is_holder),
                ...this.getSubjectsValidations(constraints === null || constraints === void 0 ? void 0 : constraints.same_subject),
                ...this.getFieldsValidations(constraints),
            ];
        }
        return validations;
    }
    getFieldsValidations(constraints) {
        var _a;
        if ((_a = constraints === null || constraints === void 0 ? void 0 : constraints.fields) === null || _a === void 0 ? void 0 : _a.length) {
            return new fieldsVB_1.FieldsVB(this.getTag()).getValidations(constraints.fields);
        }
        return [];
    }
    static disclosureLimitShouldHaveKnownValue(limit_disclosure) {
        return !limit_disclosure || limit_disclosure === pex_models_1.Optionality.Preferred || limit_disclosure === pex_models_1.Optionality.Required;
    }
    static statusShouldHaveKnownValue(statuses) {
        return statuses == null || statuses.active != null || statuses.revoked != null || statuses.suspended != null;
    }
    static statusDirectiveShouldHaveKnownValue() {
        return (constraints) => {
            var _a, _b, _c;
            return this.pdStatusShouldBeKnown((_a = constraints === null || constraints === void 0 ? void 0 : constraints.statuses) === null || _a === void 0 ? void 0 : _a.active) &&
                this.pdStatusShouldBeKnown((_b = constraints === null || constraints === void 0 ? void 0 : constraints.statuses) === null || _b === void 0 ? void 0 : _b.revoked) &&
                this.pdStatusShouldBeKnown((_c = constraints === null || constraints === void 0 ? void 0 : constraints.statuses) === null || _c === void 0 ? void 0 : _c.suspended);
        };
    }
    static pdStatusShouldBeKnown(pdStatus) {
        return (!pdStatus ||
            pdStatus.directive === pex_models_1.Directives.Allowed ||
            pdStatus.directive === pex_models_1.Directives.Disallowed ||
            pdStatus.directive === pex_models_1.Directives.Required);
    }
    static shouldBeKnownOption(subjects) {
        if (subjects) {
            return (subjects.filter((subject) => subject.directive !== pex_models_1.Optionality.Preferred && subject.directive !== pex_models_1.Optionality.Required)
                .length === 0);
        }
        return true;
    }
    getSubjectsValidations(holderSubjects) {
        if (holderSubjects) {
            let validations = [];
            for (let subjectInd = 0; subjectInd < holderSubjects.length; subjectInd++) {
                validations = [
                    {
                        tag: this.getMyTag(subjectInd),
                        target: holderSubjects[subjectInd],
                        predicate: (subject) => Array.isArray(subject.field_id),
                        message: this.fieldIdMustBeArrayOfStringsMsg,
                    },
                    {
                        tag: this.getMyTag(subjectInd),
                        target: holderSubjects[subjectInd],
                        predicate: (subject) => !!subject.field_id,
                        message: this.fieldIdIsMandatoryMsg,
                    },
                    {
                        tag: this.getMyTag(subjectInd),
                        target: holderSubjects[subjectInd],
                        predicate: (subject) => subject.field_id.length === subject.field_id.filter((id) => typeof id === 'string').length,
                        message: this.fieldIdMustBeArrayOfStringsMsg,
                    },
                    {
                        tag: this.getMyTag(subjectInd),
                        target: holderSubjects[subjectInd],
                        predicate: (subject) => subject.directive !== undefined,
                        message: this.directivePropertyIsMandatoryMsg,
                    },
                    {
                        tag: this.getMyTag(subjectInd),
                        target: holderSubjects[subjectInd],
                        predicate: (subject) => subject.directive === pex_models_1.Optionality.Preferred || subject.directive === pex_models_1.Optionality.Required,
                        message: this.oneOfTheKnownDirectivePropertiesMandatoryMsg,
                    },
                ];
            }
            return validations;
        }
        return [];
    }
    getMyTag(srInd) {
        // TODO extract to make it generic
        return this.parentTag + '.' + this.myTag + '[' + srInd + ']';
    }
    fieldIdInSubjectMustCorrespondToFieldId(constraints, subjects) {
        if (subjects) {
            for (const subject of subjects) {
                for (const fieldId of subject.field_id) {
                    if (!ConstraintsVB.isValidFieldId(constraints, fieldId)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    static isValidFieldId(constraints, fieldId) {
        if (constraints === null || constraints === void 0 ? void 0 : constraints.fields) {
            return constraints.fields.map((field) => field.id).includes(fieldId);
        }
        return false;
    }
}
exports.ConstraintsVB = ConstraintsVB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RyYWludHNWQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2J1bmRsZXJzL2NvbnN0cmFpbnRzVkIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWtKO0FBSWxKLHlDQUFzQztBQUN0QywyREFBd0Q7QUFFeEQsTUFBYSxhQUFjLFNBQVEscUNBQW9GO0lBV3JILFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQVhqQiwyQ0FBc0MsR0FBRywwQ0FBMEMsQ0FBQztRQUNwRixrQ0FBNkIsR0FBRyx5QkFBeUIsQ0FBQztRQUMxRCwyQ0FBc0MsR0FBRywwQ0FBMEMsQ0FBQztRQUNwRix5Q0FBb0MsR0FBRyx5Q0FBeUMsQ0FBQztRQUNqRiwwQkFBcUIsR0FBRyxnQ0FBZ0MsQ0FBQztRQUN6RCxtQ0FBOEIsR0FBRywrQ0FBK0MsQ0FBQztRQUNqRixzQ0FBaUMsR0FBRyxnRUFBZ0UsQ0FBQztRQUNyRyxvQ0FBK0IsR0FBRyxpQ0FBaUMsQ0FBQztRQUNwRSxpREFBNEMsR0FBRyx5REFBeUQsQ0FBQztJQUkxSCxDQUFDO0lBRU0sY0FBYyxDQUNuQixXQUEwQztRQUUxQyxJQUFJLFdBQVcsR0FNVCxFQUFFLENBQUM7UUFDVCxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2hCLFdBQVcsR0FBRztnQkFDWjtvQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDbEIsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLFdBQTBDLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7b0JBQzFJLE9BQU8sRUFBRSxJQUFJLENBQUMsc0NBQXNDO2lCQUNyRDtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDbEIsTUFBTSxFQUFF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