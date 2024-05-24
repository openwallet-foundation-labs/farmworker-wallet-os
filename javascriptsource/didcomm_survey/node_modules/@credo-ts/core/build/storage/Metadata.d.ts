type MetadataValue = Record<string, any>;
export type MetadataBase = {
    [key: string]: MetadataValue;
};
/**
 * Metadata access class to get, set (create and update), add (append to a record) and delete metadata on any record.
 *
 * set will override the previous value if it already exists
 *
 * note: To add persistence to these records, you have to update the record in the correct repository
 *
 * @example
 *
 * ```ts
 * connectionRecord.metadata.set('foo', { bar: 'baz' }) connectionRepository.update(connectionRecord)
 * ```
 */
export declare class Metadata<MetadataTypes> {
    readonly data: MetadataBase;
    constructor(data: MetadataBase);
    /**
     * Gets the value by key in the metadata
     *
     * Any extension of the `BaseRecord` can implement their own typed metadata
     *
     * @param key the key to retrieve the metadata by
     * @returns the value saved in the key value pair
     * @returns null when the key could not be found
     */
    get<Value extends MetadataValue, Key extends string = string>(key: Key): (Key extends keyof MetadataTypes ? MetadataTypes[Key] : Value) | null;
    /**
     * Will set, or override, a key-value pair on the metadata
     *
     * @param key the key to set the metadata by
     * @param value the value to set in the metadata
     */
    set<Value extends MetadataValue, Key extends string = string>(key: Key, value: Key extends keyof MetadataTypes ? MetadataTypes[Key] : Value): void;
    /**
     * Adds a record to a metadata key
     *
     * @param key the key to add the metadata at
     * @param value the value to add in the metadata
     */
    add<Value extends MetadataValue, Key extends string = string>(key: Key, value: Partial<Key extends keyof MetadataTypes ? MetadataTypes[Key] : Value>): void;
    /**
     * Retrieves all the metadata for a record
     *
     * @returns all the metadata that exists on the record
     */
    get keys(): string[];
    /**
     * Will delete the key value pair in the metadata
     *
     * @param key the key to delete the data by
     */
    delete<Key extends string = string>(key: Key): void;
}
export {};
