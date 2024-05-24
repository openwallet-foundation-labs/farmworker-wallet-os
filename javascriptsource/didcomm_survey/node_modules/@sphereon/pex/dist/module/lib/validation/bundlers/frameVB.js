import { ObjectUtils } from '../../utils';
import { ValidationBundler } from './validationBundler';
export class FrameVB extends ValidationBundler {
    frameIsValidMsg = 'frame value is not valid';
    constructor(parentTag) {
        super(parentTag, 'frame');
    }
    getValidations(frame) {
        let validations = [];
        validations = [...validations, ...this.getMyValidations(frame)];
        return validations;
    }
    getMyValidations(frame) {
        return [
            {
                tag: this.getMyTag(),
                target: frame,
                predicate: FrameVB.frameIsValid,
                message: this.frameIsValidMsg,
            },
        ];
    }
    getMyTag() {
        return this.parentTag + '.' + this.myTag;
    }
    /**
     * this is based on https://github.com/digitalbazaar/jsonld.js/blob/main/lib/frame.js
     * @param frame
     */
    static frameIsValid(frame) {
        if (!frame || Array.isArray(frame) || !(typeof frame === 'object')) {
            return false;
        }
        const fr = frame;
        if (fr && fr['@id']) {
            for (const id of ObjectUtils.asArray(frame['@id'])) {
                // @id must be wildcard or an IRI
                if (!(ObjectUtils.isObject(id) || ObjectUtils.isUrlAbsolute(id)) || (ObjectUtils.isString(id) && id.indexOf('_:') === 0)) {
                    return false;
                }
            }
        }
        //
        if (fr['@types']) {
            for (const type of ObjectUtils.asArray(frame['@types'])) {
                // @id must be wildcard or an IRI
                if (!(ObjectUtils.isObject(type) || ObjectUtils.isUrlAbsolute(type)) || (ObjectUtils.isString(type) && type.indexOf('_:') === 0)) {
                    return false;
                }
            }
        }
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVWQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2J1bmRsZXJzL2ZyYW1lVkIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUcxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4RCxNQUFNLE9BQU8sT0FBUSxTQUFRLGlCQUEwQjtJQUNwQyxlQUFlLEdBQUcsMEJBQTBCLENBQUM7SUFFOUQsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxjQUFjLENBQUMsS0FBYztRQUNsQyxJQUFJLFdBQVcsR0FBMEIsRUFBRSxDQUFDO1FBQzVDLFdBQVcsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFaEUsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEtBQWM7UUFDckMsT0FBTztZQUNMO2dCQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNwQixNQUFNLEVBQUUsS0FBSztnQkFDYixTQUFTLEVBQUUsT0FBTyxDQUFDLFlBQVk7Z0JBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZTthQUM5QjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRVMsUUFBUTtRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNLLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBYztRQUN4QyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDbkUsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsTUFBTSxFQUFFLEdBQUcsS0FBYyxDQUFDO1FBQzFCLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFvQixDQUFDLEVBQUUsQ0FBQztZQUNuQyxLQUFLLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xFLGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDekgsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsRUFBRTtRQUNGLElBQUksRUFBRSxDQUFDLFFBQXVCLENBQUMsRUFBRSxDQUFDO1lBQ2hDLEtBQUssTUFBTSxJQUFJLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdkUsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNqSSxPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiJ9