"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
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
class Metadata {
    constructor(data) {
        this.data = data;
    }
    /**
     * Gets the value by key in the metadata
     *
     * Any extension of the `BaseRecord` can implement their own typed metadata
     *
     * @param key the key to retrieve the metadata by
     * @returns the value saved in the key value pair
     * @returns null when the key could not be found
     */
    get(key) {
        var _a;
        return (_a = this.data[key]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Will set, or override, a key-value pair on the metadata
     *
     * @param key the key to set the metadata by
     * @param value the value to set in the metadata
     */
    set(key, value) {
        this.data[key] = value;
    }
    /**
     * Adds a record to a metadata key
     *
     * @param key the key to add the metadata at
     * @param value the value to add in the metadata
     */
    add(key, value) {
        this.data[key] = Object.assign(Object.assign({}, this.data[key]), value);
    }
    /**
     * Retrieves all the metadata for a record
     *
     * @returns all the metadata that exists on the record
     */
    get keys() {
        return Object.keys(this.data);
    }
    /**
     * Will delete the key value pair in the metadata
     *
     * @param key the key to delete the data by
     */
    delete(key) {
        delete this.data[key];
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=Metadata.js.map