"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
class ObjectUtils {
    static asArray(value) {
        return Array.isArray(value) ? value : [value];
    }
    static isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    }
    static isUrlAbsolute(url) {
        // regex to check for absolute IRI (starting scheme and ':') or blank node IRI
        const isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;
        ObjectUtils.isString(url) && isAbsoluteRegex.test(url);
    }
    static isString(value) {
        return typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]';
    }
    /**
     * Receives an object array and for the field in question, returns the unique values
     */
    static getDistinctFieldInObject(data, fieldName) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fieldValues = data.map((item) => item[fieldName]);
        return Array.from(new Set(fieldValues));
    }
    /**
     * Receives an object and clone deep, return the cloned object
     */
    static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbHMvT2JqZWN0VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFjO1FBQ2xDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWM7UUFDbkMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssaUJBQWlCLENBQUM7SUFDckUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBVztRQUNyQyw4RUFBOEU7UUFDOUUsTUFBTSxlQUFlLEdBQUcsc0NBQXNDLENBQUM7UUFDL0QsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWM7UUFDbkMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGlCQUFpQixDQUFDO0lBQ2xHLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFlLEVBQUUsU0FBaUI7UUFDdkUsNkRBQTZEO1FBQzdELGFBQWE7UUFDYixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0Q7O09BRUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFJLEdBQU07UUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUFsQ0Qsa0NBa0NDIn0=