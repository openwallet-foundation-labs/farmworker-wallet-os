export type Constructor<T = {}> = new (...args: any[]) => T;
export type NonConstructable<T> = Omit<T, 'new'>;
export type Constructable<T> = T & (new (...args: any) => T);
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type MergeConstructorTypes<T extends Mixin[]> = UnionToIntersection<InstanceType<ReturnType<T[number]>>>;
type Mixin = (Base: Constructor<any>) => Constructor<any>;
/**
 * Apply a list of mixins functions to a base class. Applies extensions in order
 *
 * @param Base Base class
 * @param extensions List of mixin functions that will extend the base class.
 *
 * @example
 * Compose(BaseClass, [TransportDecorated, SignatureDecorated])
 */
export declare function Compose<B, T extends Mixin[]>(Base: Constructor<B>, extensions: T): Constructor<MergeConstructorTypes<T>> & B;
export {};
