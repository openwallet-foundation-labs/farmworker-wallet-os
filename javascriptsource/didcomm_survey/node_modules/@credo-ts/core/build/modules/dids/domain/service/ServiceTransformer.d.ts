export declare const serviceTypes: {
    [key: string]: unknown | undefined;
};
/**
 * Decorator that transforms service json to corresponding class instances. See {@link serviceTypes}
 *
 * @example
 * class Example {
 *   ServiceTransformer()
 *   private service: Service
 * }
 */
export declare function ServiceTransformer(): PropertyDecorator;
