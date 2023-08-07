import type { JsonObject } from '../types';
export type SingleOrArray<T> = T | T[];
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export declare const isJsonObject: (value: unknown) => value is JsonObject;
