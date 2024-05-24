export class ObjectUtils {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbHMvT2JqZWN0VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFdBQVc7SUFDZixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQWM7UUFDbEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBYztRQUNuQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxpQkFBaUIsQ0FBQztJQUNyRSxDQUFDO0lBRU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFXO1FBQ3JDLDhFQUE4RTtRQUM5RSxNQUFNLGVBQWUsR0FBRyxzQ0FBc0MsQ0FBQztRQUMvRCxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBYztRQUNuQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssaUJBQWlCLENBQUM7SUFDbEcsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQWUsRUFBRSxTQUFpQjtRQUN2RSw2REFBNkQ7UUFDN0QsYUFBYTtRQUNiLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUksR0FBTTtRQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDRiJ9