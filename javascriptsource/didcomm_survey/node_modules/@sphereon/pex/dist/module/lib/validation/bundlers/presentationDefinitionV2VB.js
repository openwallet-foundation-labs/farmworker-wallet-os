import { JwtAlgos } from '../core/jwtAlgos';
import { LdpTypes } from '../core/ldpTypes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import validatePDv2 from '../validatePDv2.js';
import { FrameVB } from './frameVB';
import { InputDescriptorsV2VB } from './inputDescriptorsV2VB';
import { SubmissionRequirementVB } from './submissionRequirementVB';
import { ValidationBundler } from './validationBundler';
export class PresentationDefinitionV2VB extends ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'presentation_definition');
    }
    getValidations(pd) {
        let validations = [];
        if (pd.submission_requirements) {
            validations = [
                ...this.myValidations(pd),
                ...new InputDescriptorsV2VB(this.myTag).getValidations(pd.input_descriptors),
                ...new SubmissionRequirementVB(this.myTag).getValidations(pd.submission_requirements),
            ];
        }
        else {
            validations = [...this.myValidations(pd), ...new InputDescriptorsV2VB(this.myTag).getValidations(pd.input_descriptors)];
        }
        if (pd.frame) {
            validations.push(...new FrameVB(this.myTag).getValidations(pd.frame));
        }
        return validations;
    }
    myValidations(pd) {
        return [
            // E Section 4.B   : The Input Descriptors (#term:input-descriptors) required for submission are described by the submission_requirements. If no submission_requirements value is present, all inputs listed in the input_descriptors array are required for submission.
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => pd != null,
                message: 'presentation_definition should be non null.',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: this.shouldBeAsPerJsonSchema(),
                message: 'presentation_definition should be as per json schema.',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.nonEmptyString(pd?.id),
                message: 'id should not be empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.optionalNonEmptyString(pd?.name),
                message: 'name should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.optionalNonEmptyString(pd?.purpose),
                message: 'purpose should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.formatValuesShouldNotBeEmpty(pd?.format),
                message: 'formats values should not empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.formatValuesShouldBeAmongKnownValues(pd?.format),
                message: 'formats should only have known identifiers for alg or proof_type',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.groupShouldMatchSubmissionRequirements(pd),
                message: 'input descriptor group should match the from in submission requirements.',
            },
        ];
    }
    static optionalNonEmptyString(str) {
        // TODO extract to generic utils or use something like lodash
        return str == null || str.length > 0;
    }
    static nonEmptyString(id) {
        // TODO extract to generic utils or use something like lodash
        return id != null && id.length > 0;
    }
    static formatValuesShouldNotBeEmpty(format) {
        let areExpectedValuesPresent = true;
        if (format?.jwt != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.jwt.alg?.length > 0;
        }
        if (format?.jwt_vc != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.jwt_vc.alg?.length > 0;
        }
        if (format?.jwt_vc_json != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.jwt_vc_json.alg?.length > 0;
        }
        if (format?.jwt_vp != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.jwt_vp.alg?.length > 0;
        }
        if (format?.jwt_vp_json != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.jwt_vp_json.alg?.length > 0;
        }
        if (format?.ldp != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.ldp.proof_type?.length > 0;
        }
        if (format?.ldp_vc != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.ldp_vc.proof_type?.length > 0;
        }
        if (format?.ldp_vp != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.ldp_vp.proof_type?.length > 0;
        }
        if (format?.di != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.di.proof_type?.length > 0;
        }
        if (format?.di_vc != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.di_vc.proof_type?.length > 0;
        }
        if (format?.di_vp != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && format.di_vp.proof_type?.length > 0;
        }
        return areExpectedValuesPresent;
    }
    static formatValuesShouldBeAmongKnownValues(format) {
        let unknownProofsAndAlgorithms = [];
        if (format) {
            const jwtAlgos = JwtAlgos.getJwtAlgos();
            const ldpTypes = LdpTypes.getLdpTypes();
            unknownProofsAndAlgorithms = [];
            for (const [key, value] of Object.entries(format)) {
                if (key.startsWith('jwt')) {
                    unknownProofsAndAlgorithms.push(...PresentationDefinitionV2VB.isJWTAlgoKnown(value, jwtAlgos));
                }
                else {
                    unknownProofsAndAlgorithms.push(...PresentationDefinitionV2VB.isLDPProofKnown(value, ldpTypes));
                }
            }
        }
        return unknownProofsAndAlgorithms.length === 0;
    }
    static isJWTAlgoKnown(jwtObject, jwtAlgos) {
        const unknownAlgorithms = [];
        if (jwtObject != null && jwtObject.alg != null) {
            for (const jwtAlgo of jwtObject.alg) {
                if (!jwtAlgos.includes(jwtAlgo)) {
                    unknownAlgorithms.push(jwtAlgo);
                }
            }
        }
        return unknownAlgorithms;
    }
    static isLDPProofKnown(ldpObject, ldpTypes) {
        const unknownProofType = [];
        if (ldpObject != null && ldpObject.proof_type != null) {
            for (const ldpProof of ldpObject.proof_type) {
                if (!ldpTypes.includes(ldpProof)) {
                    unknownProofType.push(ldpProof);
                }
            }
        }
        return unknownProofType;
    }
    static groupShouldMatchSubmissionRequirements(pd) {
        if (pd.submission_requirements != null && pd.submission_requirements.length > 0) {
            const groups = [];
            pd.input_descriptors.forEach((inDesc) => {
                if (inDesc.group) {
                    groups.push(...inDesc.group);
                }
            });
            const groupStrings = new Set(groups);
            const fromValues = [];
            PresentationDefinitionV2VB.flatten(pd.submission_requirements).forEach((srs) => {
                if (srs.from) {
                    fromValues.push(srs.from);
                }
            });
            const fromValueStrings = new Set(fromValues);
            const difference = new Set([...fromValueStrings].filter((x) => x != null && x.length > 0 && !groupStrings.has(x)));
            return difference.size === 0;
        }
        return true;
    }
    static flatten(srs) {
        return srs?.reduce((accumulator, submissionRequirement) => accumulator.concat(Array.isArray(submissionRequirement.from_nested) ? this.flatten(submissionRequirement.from_nested) : submissionRequirement), []);
    }
    shouldBeAsPerJsonSchema() {
        // TODO can be be extracted as a generic function
        return (presentationDefinition) => {
            return validatePDv2({ presentation_definition: presentationDefinition });
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uRGVmaW5pdGlvblYyVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9wcmVzZW50YXRpb25EZWZpbml0aW9uVjJWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLDZEQUE2RDtBQUM3RCxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsaUJBRS9DO0lBQ0MsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLGNBQWMsQ0FDbkIsRUFBNEI7UUFXNUIsSUFBSSxXQUFXLEdBU1QsRUFBRSxDQUFDO1FBQ1QsSUFBSSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixXQUFXLEdBQUc7Z0JBQ1osR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUM1RSxHQUFHLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENB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