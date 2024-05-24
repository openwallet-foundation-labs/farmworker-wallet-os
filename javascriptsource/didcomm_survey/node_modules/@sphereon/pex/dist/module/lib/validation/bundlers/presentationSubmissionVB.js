import { JSONPath as jp } from '@astronautlabs/jsonpath';
import { Checked, Status } from '../../ConstraintUtils';
import { ValidationBundler } from './validationBundler';
export class PresentationSubmissionVB extends ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'presentation_submission');
    }
    getValidations(ps) {
        return [
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => ps != null,
                message: 'presentation_submission should be non null.',
            },
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => PresentationSubmissionVB.nonEmptyString(ps?.id),
                message: 'id should not be empty',
            },
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => PresentationSubmissionVB.nonEmptyString(ps?.definition_id),
                message: 'presentation_definition_id should not be empty',
            },
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => PresentationSubmissionVB.descriptorMapMustBePresent(ps?.descriptor_map),
                message: 'descriptor_map should be a non-empty list',
            },
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => PresentationSubmissionVB.idMustBeSameForEachLevelOfNesting(ps?.descriptor_map),
                message: 'each descriptor should have a one id in it, on all levels',
            },
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => PresentationSubmissionVB.formatsShouldBeKnown(ps?.descriptor_map),
                message: 'each format should be one of the known format',
            },
            {
                tag: this.getTag(),
                target: ps,
                predicate: (ps) => PresentationSubmissionVB.pathsShouldBeValidJsonPaths(ps?.descriptor_map),
                message: 'each path should be a valid jsonPath',
            },
        ];
    }
    static nonEmptyString(id) {
        // TODO extract to generic utils or use something like lodash
        return id != null && id.length > 0;
    }
    static descriptorMapMustBePresent(descriptor_map) {
        return descriptor_map != null && descriptor_map.length > 0;
    }
    static idMustBeSameForEachLevelOfNesting(descriptor_map) {
        let doesEachDescriptorHasOneIdOnAllLevelsOfNesting = true;
        if (descriptor_map != null) {
            for (let i = 0; i < descriptor_map.length; i++) {
                doesEachDescriptorHasOneIdOnAllLevelsOfNesting =
                    doesEachDescriptorHasOneIdOnAllLevelsOfNesting &&
                        PresentationSubmissionVB.isIdSameForEachLevelOfNesting(descriptor_map[i], descriptor_map[i].id);
            }
        }
        return doesEachDescriptorHasOneIdOnAllLevelsOfNesting;
    }
    static isIdSameForEachLevelOfNesting(descriptor, id) {
        let isSame = true;
        if (descriptor != null && descriptor.path_nested != null) {
            if (descriptor.path_nested.id == id) {
                // WARNING : Specification does not allow any bounds. So, no checks against stackoverflow due to unbounded recursion.
                isSame = isSame && PresentationSubmissionVB.isIdSameForEachLevelOfNesting(descriptor.path_nested, id);
            }
            else {
                isSame = false;
            }
        }
        return isSame;
    }
    static formatsShouldBeKnown(descriptor_map) {
        let isProofFormatKnown = true;
        if (descriptor_map != null) {
            const formats = [
                'jwt',
                'jwt_vc',
                'jwt_vc_json',
                'jwt_vp',
                'jwt_vp_json',
                'ldp',
                'ldp_vc',
                'ldp_vp',
                'di',
                'di_vc',
                'di_vp',
                'vc+sd-jwt',
            ];
            for (let i = 0; i < descriptor_map.length; i++) {
                isProofFormatKnown = PresentationSubmissionVB.formatShouldBeKnown(descriptor_map[i], formats);
            }
        }
        return isProofFormatKnown;
    }
    static formatShouldBeKnown(descriptor, formats) {
        let isProofFormatKnown = true;
        if (descriptor != null) {
            isProofFormatKnown = formats.includes(descriptor.format);
        }
        if (descriptor.path_nested != null) {
            // WARNING : Specification does not allow any bounds. So, no checks against stackoverflow due to unbounded recursion.
            isProofFormatKnown = isProofFormatKnown && PresentationSubmissionVB.formatShouldBeKnown(descriptor.path_nested, formats);
        }
        return isProofFormatKnown;
    }
    static pathsShouldBeValidJsonPaths(descriptor_map) {
        let isPathValidJsonPath = true;
        if (descriptor_map != null) {
            for (let i = 0; i < descriptor_map.length; i++) {
                isPathValidJsonPath = PresentationSubmissionVB.pathShouldBeValid(descriptor_map[i], []);
            }
        }
        return isPathValidJsonPath;
    }
    static pathShouldBeValid(descriptor, invalidPaths) {
        if (descriptor != null) {
            try {
                jp.parse(descriptor.path);
            }
            catch (err) {
                invalidPaths.push(descriptor.path);
            }
            if (descriptor.path_nested != null) {
                // WARNING : Specification does not allow any bounds. So, no checks against stackoverflow due to unbounded recursion.
                PresentationSubmissionVB.pathShouldBeValid(descriptor.path_nested, invalidPaths);
            }
        }
        if (invalidPaths.length > 0) {
            throw new Checked('', Status.ERROR, 'These were not parsable json paths: ' + JSON.stringify(invalidPaths));
        }
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VudGF0aW9uU3VibWlzc2lvblZCLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGliL3ZhbGlkYXRpb24vYnVuZGxlcnMvcHJlc2VudGF0aW9uU3VibWlzc2lvblZCLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLElBQUksRUFBRSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHekQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUd4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsaUJBQXlDO0lBQ3JGLFlBQVksU0FBaUI7UUFDM0IsS0FBSyxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxjQUFjLENBQUMsRUFBMEI7UUFDOUMsT0FBTztZQUNMO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyxFQUEwQixFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksSUFBSTtnQkFDckQsT0FBTyxFQUFFLDZDQUE2QzthQUN2RDtZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyxFQUEwQixFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDMUYsT0FBTyxFQUFFLHdCQUF3QjthQUNsQztZQUNEO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNsQixNQUFNLEVBQUUsRUFBRTtnQkFDVixTQUFTLEVBQUUsQ0FBQyxFQUEwQixFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FB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