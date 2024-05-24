"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameVB = void 0;
const utils_1 = require("../../utils");
const validationBundler_1 = require("./validationBundler");
class FrameVB extends validationBundler_1.ValidationBundler {
    constructor(parentTag) {
        super(parentTag, 'frame');
        this.frameIsValidMsg = 'frame value is not valid';
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
            for (const id of utils_1.ObjectUtils.asArray(frame['@id'])) {
                // @id must be wildcard or an IRI
                if (!(utils_1.ObjectUtils.isObject(id) || utils_1.ObjectUtils.isUrlAbsolute(id)) || (utils_1.ObjectUtils.isString(id) && id.indexOf('_:') === 0)) {
                    return false;
                }
            }
        }
        //
        if (fr['@types']) {
            for (const type of utils_1.ObjectUtils.asArray(frame['@types'])) {
                // @id must be wildcard or an IRI
                if (!(utils_1.ObjectUtils.isObject(type) || utils_1.ObjectUtils.isUrlAbsolute(type)) || (utils_1.ObjectUtils.isString(type) && type.indexOf('_:') === 0)) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.FrameVB = FrameVB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVWQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi92YWxpZGF0aW9uL2J1bmRsZXJzL2ZyYW1lVkIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQTBDO0FBRzFDLDJEQUF3RDtBQUV4RCxNQUFhLE9BQVEsU0FBUSxxQ0FBMEI7SUFHckQsWUFBWSxTQUFpQjtRQUMzQixLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSFgsb0JBQWUsR0FBRywwQkFBMEIsQ0FBQztJQUk5RCxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQWM7UUFDbEMsSUFBSSxXQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUM1QyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRWhFLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFjO1FBQ3JDLE9BQU87WUFDTDtnQkFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDcEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsU0FBUyxFQUFFLE9BQU8sQ0FBQyxZQUFZO2dCQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7YUFDOUI7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVTLFFBQVE7UUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQWM7UUFDeEMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ25FLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE1BQU0sRUFBRSxHQUFHLEtBQWMsQ0FBQztRQUMxQixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBb0IsQ0FBQyxFQUFFLENBQUM7WUFDbkMsS0FBSyxNQUFNLEVBQUUsSUFBSSxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDbEUsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN6SCxPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFFO1FBQ0YsSUFBSSxFQUFFLENBQUMsUUFBdUIsQ0FBQyxFQUFFLENBQUM7WUFDaEMsS0FBSyxNQUFNLElBQUksSUFBSSxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdkUsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsQ0FBQyxtQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNqSSxPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQXpERCwwQkF5REMifQ==