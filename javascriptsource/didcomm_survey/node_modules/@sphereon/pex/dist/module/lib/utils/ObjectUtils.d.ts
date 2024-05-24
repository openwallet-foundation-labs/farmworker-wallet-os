export declare class ObjectUtils {
    static asArray(value: unknown): any[];
    static isObject(value: unknown): boolean;
    static isUrlAbsolute(url: string): void;
    static isString(value: unknown): boolean;
    /**
     * Receives an object array and for the field in question, returns the unique values
     */
    static getDistinctFieldInObject(data: unknown[], fieldName: string): unknown[];
    /**
     * Receives an object and clone deep, return the cloned object
     */
    static cloneDeep<T>(obj: T): T;
}
