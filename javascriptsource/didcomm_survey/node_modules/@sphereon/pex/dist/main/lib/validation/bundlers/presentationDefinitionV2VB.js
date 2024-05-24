"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationDefinitionV2VB = void 0;
const jwtAlgos_1 = require("../core/jwtAlgos");
const ldpTypes_1 = require("../core/ldpTypes");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validatePDv2_js_1 = __importDefault(require("../validatePDv2.js"));
const frameVB_1 = require("./frameVB");
const inputDescriptorsV2VB_1 = require("./inputDescriptorsV2VB");
const submissionRequirementVB_1 = require("./submissionRequirementVB");
const validationBundler_1 = require("./validationBundler");
class PresentationDefinitionV2VB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'presentation_definition');
    }
    getValidations(pd) {
        let validations = [];
        if (pd.submission_requirements) {
            validations = [
                ...this.myValidations(pd),
                ...new inputDescriptorsV2VB_1.InputDescriptorsV2VB(this.myTag).getValidations(pd.input_descriptors),
                ...new submissionRequirementVB_1.SubmissionRequirementVB(this.myTag).getValidations(pd.submission_requirements),
            ];
        }
        else {
            validations = [...this.myValidations(pd), ...new inputDescriptorsV2VB_1.InputDescriptorsV2VB(this.myTag).getValidations(pd.input_descriptors)];
        }
        if (pd.frame) {
            validations.push(...new frameVB_1.FrameVB(this.myTag).getValidations(pd.frame));
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
                predicate: (pd) => PresentationDefinitionV2VB.nonEmptyString(pd === null || pd === void 0 ? void 0 : pd.id),
                message: 'id should not be empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.optionalNonEmptyString(pd === null || pd === void 0 ? void 0 : pd.name),
                message: 'name should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.optionalNonEmptyString(pd === null || pd === void 0 ? void 0 : pd.purpose),
                message: 'purpose should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.formatValuesShouldNotBeEmpty(pd === null || pd === void 0 ? void 0 : pd.format),
                message: 'formats values should not empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV2VB.formatValuesShouldBeAmongKnownValues(pd === null || pd === void 0 ? void 0 : pd.format),
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let areExpectedValuesPresent = true;
        if ((format === null || format === void 0 ? void 0 : format.jwt) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_a = format.jwt.alg) === null || _a === void 0 ? void 0 : _a.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.jwt_vc) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_b = format.jwt_vc.alg) === null || _b === void 0 ? void 0 : _b.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.jwt_vc_json) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_c = format.jwt_vc_json.alg) === null || _c === void 0 ? void 0 : _c.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.jwt_vp) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_d = format.jwt_vp.alg) === null || _d === void 0 ? void 0 : _d.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.jwt_vp_json) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_e = format.jwt_vp_json.alg) === null || _e === void 0 ? void 0 : _e.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.ldp) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_f = format.ldp.proof_type) === null || _f === void 0 ? void 0 : _f.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.ldp_vc) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_g = format.ldp_vc.proof_type) === null || _g === void 0 ? void 0 : _g.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.ldp_vp) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_h = format.ldp_vp.proof_type) === null || _h === void 0 ? void 0 : _h.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.di) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_j = format.di.proof_type) === null || _j === void 0 ? void 0 : _j.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.di_vc) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_k = format.di_vc.proof_type) === null || _k === void 0 ? void 0 : _k.length) > 0;
        }
        if ((format === null || format === void 0 ? void 0 : format.di_vp) != null) {
            areExpectedValuesPresent = areExpectedValuesPresent && ((_l = format.di_vp.proof_type) === null || _l === void 0 ? void 0 : _l.length) > 0;
        }
        return areExpectedValuesPresent;
    }
    static formatValuesShouldBeAmongKnownValues(format) {
        let unknownProofsAndAlgorithms = [];
        if (format) {
            const jwtAlgos = jwtAlgos_1.JwtAlgos.getJwtAlgos();
            const ldpTypes = ldpTypes_1.LdpTypes.getLdpTypes();
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
        return srs === null || srs === void 0 ? void 0 : srs.reduce((accumulator, submissionRequirement) => accumulator.concat(Array.isArray(submissionRequirement.from_nested) ? this.flatten(submissionRequirement.from_nested) : submissionRequirement), []);
    }
    shouldBeAsPerJsonSchema() {
        // TODO can be be extracted as a generic function
        return (presentationDefinition) => {
            return (0, validatePDv2_js_1.default)({ presentation_definition: presentationDefinition });
        };
    }
}
exports.PresentationDefinitionV2VB = PresentationDefinitionV2VB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uRGVmaW5pdGlvblYyVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9wcmVzZW50YXRpb25EZWZpbml0aW9uVjJWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFhQSwrQ0FBNEM7QUFDNUMsK0NBQTRDO0FBQzVDLDZEQUE2RDtBQUM3RCxhQUFhO0FBQ2IseUVBQThDO0FBRTlDLHVDQUFvQztBQUNwQyxpRUFBOEQ7QUFDOUQsdUVBQW9FO0FBQ3BFLDJEQUF3RDtBQUV4RCxNQUFhLDBCQUEyQixTQUFRLHFDQUUvQztJQUNDLFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxjQUFjLENBQ25CLEVBQTRCO1FBVzVCLElBQUksV0FBVyxHQVNULEVBQUUsQ0FBQztRQUNULElBQUksRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsV0FBVyxHQUFHO2dCQUNaLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUUsR0FBRyxJQUFJLGlEQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3RGLENBQUM7UUFDSixDQUFDO2FBQU0sQ0FBQztZQUNOLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksMkNBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQzFILENB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