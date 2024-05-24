import type { Validate } from 'class-validator';
interface Validate {
    validate?: boolean;
}
export declare class JsonTransformer {
    static toJSON<T>(classInstance: T): Record<string, any>;
    static fromJSON<T>(json: any, cls: {
        new (...args: any[]): T;
    }, { validate }?: Validate): T;
    static clone<T>(classInstance: T): T;
    static serialize<T>(classInstance: T): string;
    static deserialize<T>(jsonString: string, cls: {
        new (...args: any[]): T;
    }, { validate }?: Validate): T;
}
export {};
