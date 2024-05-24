import { JwtAlgos } from '../core/jwtAlgos';
import { LdpTypes } from '../core/ldpTypes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import validatePDv1 from '../validatePDv1.js';
import { InputDescriptorsV1VB } from './inputDescriptorsV1VB';
import { SubmissionRequirementVB } from './submissionRequirementVB';
import { ValidationBundler } from './validationBundler';
export class PresentationDefinitionV1VB extends ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'presentation_definition');
    }
    getValidations(pd) {
        if (pd.submission_requirements) {
            return [
                ...this.myValidations(pd),
                ...new InputDescriptorsV1VB(this.myTag).getValidations(pd.input_descriptors),
                ...new SubmissionRequirementVB(this.myTag).getValidations(pd.submission_requirements),
            ];
        }
        else {
            return [...this.myValidations(pd), ...new InputDescriptorsV1VB(this.myTag).getValidations(pd.input_descriptors)];
        }
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
                predicate: (pd) => PresentationDefinitionV1VB.nonEmptyString(pd?.id),
                message: 'id should not be empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.optionalNonEmptyString(pd?.name),
                message: 'name should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.optionalNonEmptyString(pd?.purpose),
                message: 'purpose should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.formatValuesShouldNotBeEmpty(pd?.format),
                message: 'formats values should not empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.formatValuesShouldBeAmongKnownValues(pd?.format),
                message: 'formats should only have known identifiers for alg or proof_type',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.groupShouldMatchSubmissionRequirements(pd),
                message: 'input descriptor group should match the from in submission requirements.',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.shouldNotHaveFrameProperty(pd),
                message: 'input descriptor should not have frame property.',
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
                    unknownProofsAndAlgorithms.push(...PresentationDefinitionV1VB.isJWTAlgoKnown(value, jwtAlgos));
                }
                else {
                    unknownProofsAndAlgorithms.push(...PresentationDefinitionV1VB.isLDPProofKnown(value, ldpTypes));
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
            PresentationDefinitionV1VB.flatten(pd.submission_requirements).forEach((srs) => {
                if (srs.from) {
                    if (Array.isArray(srs.from)) {
                        fromValues.push(...srs.from);
                    }
                    else {
                        fromValues.push(srs.from);
                    }
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
            return validatePDv1({ presentation_definition: presentationDefinition });
        };
    }
    static shouldNotHaveFrameProperty(pd) {
        return !pd['frame'];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uRGVmaW5pdGlvblYxVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9wcmVzZW50YXRpb25EZWZpbml0aW9uVjFWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLDZEQUE2RDtBQUM3RCxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsTUFBTSxPQUFPLDBCQUEyQixTQUFRLGlCQUUvQztJQUNDLFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxjQUFjLENBQ25CLEVBQTRCO1FBVTVCLElBQUksRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsT0FBTztnQkFDTCxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO2dCQUN6QixHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVFLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUN0RixDQUFDO1FBQ0osQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMs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