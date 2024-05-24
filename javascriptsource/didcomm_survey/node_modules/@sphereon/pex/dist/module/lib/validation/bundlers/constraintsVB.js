import { Directives, Optionality } from '@sphereon/pex-models';
import { FieldsVB } from './fieldsVB';
import { ValidationBundler } from './validationBundler';
export class ConstraintsVB extends ValidationBundler {
    disclosureLimitShouldHaveKnownValueMsg = 'limit_disclosure should have known value';
    statusShouldHaveKnownValueMsg = 'Unknown status property';
    statusDirectiveShouldHaveKnownValueMsg = 'status directive should have known value';
    subjectIsIssuerShouldBeKnownValueMsg = 'subject_is_issuer should be known value';
    fieldIdIsMandatoryMsg = 'field_id property is mandatory';
    fieldIdMustBeArrayOfStringsMsg = 'field_id property must be an array of strings';
    fieldIdMustCorrespondToFieldIdMsg = 'field_id must correspond to a present field object id property';
    directivePropertyIsMandatoryMsg = 'directive property is mandatory';
    oneOfTheKnownDirectivePropertiesMandatoryMsg = 'directive property must be one of [required, preferred]';
    constructor(parentTag) {
        super(parentTag, 'constraints');
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
                ...this.getSubjectsValidations(constraints?.is_holder),
                ...this.getSubjectsValidations(constraints?.same_subject),
                ...this.getFieldsValidations(constraints),
            ];
        }
        return validations;
    }
    getFieldsValidations(constraints) {
        if (constraints?.fields?.length) {
            return new FieldsVB(this.getTag()).getValidations(constraints.fields);
        }
        return [];
    }
    static disclosureLimitShouldHaveKnownValue(limit_disclosure) {
        return !limit_disclosure || limit_disclosure === Optionality.Preferred || limit_disclosure === Optionality.Required;
    }
    static statusShouldHaveKnownValue(statuses) {
        return statuses == null || statuses.active != null || statuses.revoked != null || statuses.suspended != null;
    }
    static statusDirectiveShouldHaveKnownValue() {
        return (constraints) => this.pdStatusShouldBeKnown(constraints?.statuses?.active) &&
            this.pdStatusShouldBeKnown(constraints?.statuses?.revoked) &&
            this.pdStatusShouldBeKnown(constraints?.statuses?.suspended);
    }
    static pdStatusShouldBeKnown(pdStatus) {
        return (!pdStatus ||
            pdStatus.directive === Directives.Allowed ||
            pdStatus.directive === Directives.Disallowed ||
            pdStatus.directive === Directives.Required);
    }
    static shouldBeKnownOption(subjects) {
        if (subjects) {
            return (subjects.filter((subject) => subject.directive !== Optionality.Preferred && subject.directive !== Optionality.Required)
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
                        predicate: (subject) => subject.directive === Optionality.Preferred || subject.directive === Optionality.Required,
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
        if (constraints?.fields) {
            return constraints.fields.map((field) => field.id).includes(fieldId);
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RyYWludHNWQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2J1bmRsZXJzL2NvbnN0cmFpbnRzVkIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQyxVQUFVLEVBQW1DLFdBQVcsRUFBc0IsTUFBTSxzQkFBc0IsQ0FBQztBQUlsSixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE1BQU0sT0FBTyxhQUFjLFNBQVEsaUJBQW9GO0lBQ3BHLHNDQUFzQyxHQUFHLDBDQUEwQyxDQUFDO0lBQ3BGLDZCQUE2QixHQUFHLHlCQUF5QixDQUFDO0lBQzFELHNDQUFzQyxHQUFHLDBDQUEwQyxDQUFDO0lBQ3BGLG9DQUFvQyxHQUFHLHlDQUF5QyxDQUFDO0lBQ2pGLHFCQUFxQixHQUFHLGdDQUFnQyxDQUFDO0lBQ3pELDhCQUE4QixHQUFHLCtDQUErQyxDQUFDO0lBQ2pGLGlDQUFpQyxHQUFHLGdFQUFnRSxDQUFDO0lBQ3JHLCtCQUErQixHQUFHLGlDQUFpQyxDQUFDO0lBQ3BFLDRDQUE0QyxHQUFHLHlEQUF5RCxDQUFDO0lBRTFILFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sY0FBYyxDQUNuQixXQUEwQztRQUUxQyxJQUFJLFdBQVcsR0FNVCxFQUFFLENBQUM7UUFDVCxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2hCLFdBQVcsR0FBRztnQkFDWjtvQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDbEIsTUFBTSxFQUFFLFdBQVc7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLFdBQTBDLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdC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