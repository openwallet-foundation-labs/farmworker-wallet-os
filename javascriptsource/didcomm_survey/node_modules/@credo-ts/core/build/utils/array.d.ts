import type { SingleOrArray } from './type';
export declare const asArray: <T>(val?: SingleOrArray<T> | undefined) => T[];
type ExtractValueFromSingleOrArray<V> = V extends SingleOrArray<infer Value> ? Value : never;
export declare const mapSingleOrArray: <Wrapper extends unknown, Return>(value: Wrapper, fn: (value: ExtractValueFromSingleOrArray<Wrapper>) => Return) => SingleOrArray<Return>;
export {};
