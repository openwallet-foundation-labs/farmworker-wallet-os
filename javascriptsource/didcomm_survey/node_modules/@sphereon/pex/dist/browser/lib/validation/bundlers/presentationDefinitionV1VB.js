"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationDefinitionV1VB = void 0;
const jwtAlgos_1 = require("../core/jwtAlgos");
const ldpTypes_1 = require("../core/ldpTypes");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validatePDv1_js_1 = __importDefault(require("../validatePDv1.js"));
const inputDescriptorsV1VB_1 = require("./inputDescriptorsV1VB");
const submissionRequirementVB_1 = require("./submissionRequirementVB");
const validationBundler_1 = require("./validationBundler");
class PresentationDefinitionV1VB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'presentation_definition');
    }
    getValidations(pd) {
        if (pd.submission_requirements) {
            return [
                ...this.myValidations(pd),
                ...new inputDescriptorsV1VB_1.InputDescriptorsV1VB(this.myTag).getValidations(pd.input_descriptors),
                ...new submissionRequirementVB_1.SubmissionRequirementVB(this.myTag).getValidations(pd.submission_requirements),
            ];
        }
        else {
            return [...this.myValidations(pd), ...new inputDescriptorsV1VB_1.InputDescriptorsV1VB(this.myTag).getValidations(pd.input_descriptors)];
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
                predicate: (pd) => PresentationDefinitionV1VB.nonEmptyString(pd === null || pd === void 0 ? void 0 : pd.id),
                message: 'id should not be empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.optionalNonEmptyString(pd === null || pd === void 0 ? void 0 : pd.name),
                message: 'name should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.optionalNonEmptyString(pd === null || pd === void 0 ? void 0 : pd.purpose),
                message: 'purpose should be a non-empty string',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.formatValuesShouldNotBeEmpty(pd === null || pd === void 0 ? void 0 : pd.format),
                message: 'formats values should not empty',
            },
            {
                tag: this.getTag(),
                target: pd,
                predicate: (pd) => PresentationDefinitionV1VB.formatValuesShouldBeAmongKnownValues(pd === null || pd === void 0 ? void 0 : pd.format),
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
        return srs === null || srs === void 0 ? void 0 : srs.reduce((accumulator, submissionRequirement) => accumulator.concat(Array.isArray(submissionRequirement.from_nested) ? this.flatten(submissionRequirement.from_nested) : submissionRequirement), []);
    }
    shouldBeAsPerJsonSchema() {
        // TODO can be be extracted as a generic function
        return (presentationDefinition) => {
            return (0, validatePDv1_js_1.default)({ presentation_definition: presentationDefinition });
        };
    }
    static shouldNotHaveFrameProperty(pd) {
        return !pd['frame'];
    }
}
exports.PresentationDefinitionV1VB = PresentationDefinitionV1VB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uRGVmaW5pdGlvblYxVkIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9idW5kbGVycy9wcmVzZW50YXRpb25EZWZpbml0aW9uVjFWQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFhQSwrQ0FBNEM7QUFDNUMsK0NBQTRDO0FBQzVDLDZEQUE2RDtBQUM3RCxhQUFhO0FBQ2IseUVBQThDO0FBRTlDLGlFQUE4RDtBQUM5RCx1RUFBb0U7QUFDcEUsMkRBQXdEO0FBRXhELE1BQWEsMEJBQTJCLFNBQVEscUNBRS9DO0lBQ0MsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLGNBQWMsQ0FDbkIsRUFBNEI7UUFVNUIsSUFBSSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixPQUFPO2dCQUNMLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDNUUsR0FBRyxJQUFJLGlEQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3RGLENBQUM7UUFDSixDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLDJDQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUNuSCxDQUFDO0lBQ0gsQ0FBQztJQUVPLGFBQWEsQ0FBQyxFQUE0QjtRQUNoRCxPQUFPO1lBQ0wsd1FBQXdRO1lBQ3hRO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxJQUFJO2dCQUM3QixPQUFPLEVBQUUsNkNBQTZDO2FBQ3ZEO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ3pDLE9BQU8sRUFBRSx1REFBdUQ7YUFDakU7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLENBQUMsRUFBNEIsRUFBRSxFQUFFLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxFQUFFLENBQUM7Z0JBQzlGLE9BQU8sRUFBRSx3QkFBd0I7YUFDbEM7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLENBQUMsRUFBNEIsRUFBRSxFQUFFLENBQUMsMEJBQTBCLENBQUMsc0JBQXNCLENBQUMsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLElBQUksQ0FBQztnQkFDeEcsT0FBTyxFQUFFLG1DQUFtQzthQUM3QztZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyxFQUE0QixFQUFFLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsT0FBTyxDQUFDO2dCQUMzRyxPQUFPLEVBQUUsc0NBQXNDO2FBQ2hEO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxDQUFDLEVBQTRCLEVBQUUsRUFBRSxDQUFDLDBCQUEwQixDQUFDLDRCQUE0QixDQUFDLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxNQUFNLENBQUM7Z0JBQ2hILE9BQU8sRUFBRSxpQ0FBaUM7YUFDM0M7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLENBQUMsRUFBNEIsRUFBRSxFQUFFLENBQUMsMEJBQTBCLENBQUMsb0NBQW9DLENBQUMsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLE1BQU0sQ0FBQztnQkFDeEgsT0FBTyxFQUFFLGtFQUFrRTthQUM1RTtZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyxFQUE0QixFQUFFLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xILE9BQU8sRUFBRSwwRUFBMEU7YUFDcEY7WUFDRDtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLENBQUMsRUFBNEIsRUFBRSxFQUFFLENBQUMsMEJBQTBCLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDO2dCQUN0RyxPQUFPLEVBQUUsa0RBQWtEO2FBQzVEO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBdUI7UUFDM0QsNkRBQTZEO1FBQzdELE9BQU8sR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFVO1FBQ3RDLDZEQUE2RDtRQUM3RCxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxNQUEwQjs7UUFDcEUsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFFcEMsSUFBSSxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLEtBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsd0JBQXdCLEdBQUcsd0JBQXdCLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRywwQ0FBRSxNQUFNLElBQUcsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFDRCxJQUFJLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sS0FBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQix3QkFBd0IsR0FBRyx3QkFBd0IsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLDBDQUFFLE1BQU0sSUFBRyxDQUFDLENBQUM7UUFDdkYsQ0FBQztRQUNELElBQUksQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVyxLQUFJLElBQUksRUFBRSxDQUFDO1lBQ2hDLHdCQUF3QixHQUFHLHdCQUF3QixJQUFJLENBQUEsTUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsMENBQUUsTUFBTSxJQUFHLENBQUMsQ0FBQztRQUM1RixDQUFDO1FBQ0QsSUFBSSxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxNQUFNLEtBQUksSUFBSSxFQUFFLENBQUM7WUFDM0Isd0JBQXdCLEdBQUcsd0JBQXdCLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRywwQ0FBRSxNQUFNLElBQUcsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxJQUFJLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsS0FBSSxJQUFJLEVBQUUsQ0FBQztZQUNoQyx3QkFBd0IsR0FBRyx3QkFBd0IsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLDBDQUFFLE1BQU0sSUFBRyxDQUFDLENBQUM7UUFDNUYsQ0FBQztRQUNELElBQUksQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRyxLQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLHdCQUF3QixHQUFHLHdCQUF3QixJQUFJLENBQUEsTUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsMENBQUUsTUFBTSxJQUFHLENBQUMsQ0FBQztRQUMzRixDQUFDO1FBQ0QsSUFBSSxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxNQUFNLEtBQUksSUFBSSxFQUFFLENBQUM7WUFDM0Isd0JBQXdCLEdBQUcsd0JBQXdCLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSwwQ0FBRSxNQUFNLElBQUcsQ0FBQyxDQUFDO1FBQzlGLENBQUM7UUFDRCxJQUFJLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sS0FBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQix3QkFBd0IsR0FBRyx3QkFBd0IsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLDBDQUFFLE1BQU0sSUFBRyxDQUFDLENBQUM7UUFDOUYsQ0FBQztRQUNELElBQUksQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxLQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLHdCQUF3QixHQUFHLHdCQUF3QixJQUFJLENBQUEsTUFBQSxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsMENBQUUsTUFBTSxJQUFHLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBQ0QsSUFBSSxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLEtBQUksSUFBSSxFQUFFLENBQUM7WUFDMUIsd0JBQXdCLEdBQUcsd0JBQXdCLElBQUksQ0FBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSwwQ0FBRSxNQUFNLElBQUcsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFDRCxJQUFJLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssS0FBSSxJQUFJLEVBQUUsQ0FBQztZQUMxQix3QkFBd0IsR0FBRyx3QkFBd0IsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLDBDQUFFLE1BQU0sSUFBRyxDQUFDLENBQUM7UUFDN0YsQ0FBQztRQUVELE9BQU8sd0JBQXdCLENBQUM7SUFDbEMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQyxNQUEwQjtRQUM1RSxJQUFJLDBCQUEwQixHQUFhLEVBQUUsQ0FBQztRQUU5QyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1gsTUFBTSxRQUFRLEdBQWEsbUJBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsRCxNQUFNLFFBQVEsR0FBYSxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xELDBCQUEwQixHQUFHLEVBQUUsQ0FBQztZQUNoQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDMUIsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsMEJBQTBCLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNqRyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sMEJBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsMEJBQTBCLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsRyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLDBCQUEwQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBb0IsRUFBRSxRQUFrQjtRQUNwRSxNQUFNLGlCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMvQyxLQUFLLE1BQU0sT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFFTyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQW9CLEVBQUUsUUFBa0I7UUFDckUsTUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFDdEMsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdEQsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQ2pDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRU8sTUFBTSxDQUFDLHNDQUFzQyxDQUFDLEVBQTRCO1FBQ2hGLElBQUksRUFBRSxDQUFDLHVCQUF1QixJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hGLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztZQUM1QixFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBeUIsRUFBRSxFQUFFO2dCQUN6RCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxZQUFZLEdBQWdCLElBQUksR0FBRyxDQUFTLE1BQU0sQ0FBQyxDQUFDO1lBRTFELE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztZQUNoQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBMEIsRUFBRSxFQUFFO2dCQUNwRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUIsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLGdCQUFnQixHQUFnQixJQUFJLEdBQUcsQ0FBUyxVQUFVLENBQUMsQ0FBQztZQUVsRSxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQTRCO1FBQ2pELE9BQU8sR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLE1BQU0sQ0FDaEIsQ0FBQyxXQUFvQyxFQUFFLHFCQUE0QyxFQUFFLEVBQUUsQ0FDckYsV0FBVyxDQUFDLE1BQU0sQ0FDaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQzNILEVBQ0gsRUFBRSxDQUNILENBQUM7SUFDSixDQUFDO0lBRU8sdUJBQXVCO1FBQzdCLGlEQUFpRDtRQUNqRCxPQUFPLENBQUMsc0JBQWdELEVBQVcsRUFBRTtZQUNuRSxPQUFPLElBQUEseUJBQVksRUFBQyxFQUFFLHVCQUF1QixFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sTUFBTSxDQUFDLDBCQUEwQixDQUFDLEVBQTRCO1FBQ3BFLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBeUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRjtBQXhPRCxnRUF3T0MifQ==