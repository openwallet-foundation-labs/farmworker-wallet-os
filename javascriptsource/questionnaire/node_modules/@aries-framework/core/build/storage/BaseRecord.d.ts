import { Metadata } from './Metadata';
export type TagValue = string | boolean | undefined | Array<string> | null;
export type TagsBase = {
    [key: string]: TagValue;
    [key: number]: never;
};
export type Tags<DefaultTags extends TagsBase, CustomTags extends TagsBase> = CustomTags & DefaultTags;
export type RecordTags<Record extends BaseRecord> = ReturnType<Record['getTags']>;
export declare abstract class BaseRecord<DefaultTags extends TagsBase = TagsBase, CustomTags extends TagsBase = TagsBase, MetadataValues = {}> {
    protected _tags: CustomTags;
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    readonly type: string;
    static readonly type: string;
    /** @inheritdoc {Metadata#Metadata} */
    metadata: Metadata<MetadataValues>;
    /**
     * Get all tags. This is includes custom and default tags
     * @returns tags object
     */
    abstract getTags(): Tags<DefaultTags, CustomTags>;
    /**
     * Set the value for a tag
     * @param name name of the tag
     * @param value value of the tag
     */
    setTag(name: keyof CustomTags, value: CustomTags[keyof CustomTags]): void;
    /**
     * Get the value for a tag
     * @param name name of the tag
     * @returns The tag value, or undefined if not found
     */
    getTag(name: keyof CustomTags | keyof DefaultTags): Tags<DefaultTags, CustomTags>[keyof CustomTags | keyof DefaultTags];
    /**
     * Set custom tags. This will merge the tags object with passed in tag properties
     *
     * @param tags the tags to set
     */
    setTags(tags: Partial<CustomTags>): void;
    /**
     * Replace tags. This will replace the whole tags object.
     * Default tags will still be overridden when retrieving tags
     *
     * @param tags the tags to set
     */
    replaceTags(tags: CustomTags & Partial<DefaultTags>): void;
    toJSON(): Record<string, unknown>;
    /**
     * Clones the record.
     */
    clone(): this;
}
