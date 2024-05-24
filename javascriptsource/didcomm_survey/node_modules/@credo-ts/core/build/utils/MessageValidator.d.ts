export declare class MessageValidator {
    /**
     *
     * @param classInstance the class instance to validate
     * @returns void
     * @throws array of validation errors {@link ValidationError}
     */
    static validateSync<T extends object>(classInstance: T & {}): void;
}
