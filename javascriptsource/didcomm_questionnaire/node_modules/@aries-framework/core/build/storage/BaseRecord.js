"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRecord = void 0;
const class_transformer_1 = require("class-transformer");
const JsonTransformer_1 = require("../utils/JsonTransformer");
const transformers_1 = require("../utils/transformers");
const Metadata_1 = require("./Metadata");
class BaseRecord {
    constructor() {
        this._tags = {};
        this.type = BaseRecord.type;
        /** @inheritdoc {Metadata#Metadata} */
        this.metadata = new Metadata_1.Metadata({});
    }
    /**
     * Set the value for a tag
     * @param name name of the tag
     * @param value value of the tag
     */
    setTag(name, value) {
        this._tags[name] = value;
    }
    /**
     * Get the value for a tag
     * @param name name of the tag
     * @returns The tag value, or undefined if not found
     */
    getTag(name) {
        return this.getTags()[name];
    }
    /**
     * Set custom tags. This will merge the tags object with passed in tag properties
     *
     * @param tags the tags to set
     */
    setTags(tags) {
        this._tags = Object.assign(Object.assign({}, this._tags), tags);
    }
    /**
     * Replace tags. This will replace the whole tags object.
     * Default tags will still be overridden when retrieving tags
     *
     * @param tags the tags to set
     */
    replaceTags(tags) {
        this._tags = tags;
    }
    toJSON() {
        return JsonTransformer_1.JsonTransformer.toJSON(this);
    }
    /**
     * Clones the record.
     */
    clone() {
        return JsonTransformer_1.JsonTransformer.clone(this);
    }
}
BaseRecord.type = 'BaseRecord';
__decorate([
    (0, transformers_1.DateTransformer)(),
    __metadata("design:type", Date)
], BaseRecord.prototype, "createdAt", void 0);
__decorate([
    (0, transformers_1.DateTransformer)(),
    __metadata("design:type", Date)
], BaseRecord.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], BaseRecord.prototype, "type", void 0);
__decorate([
    (0, transformers_1.MetadataTransformer)(),
    __metadata("design:type", Metadata_1.Metadata)
], BaseRecord.prototype, "metadata", void 0);
exports.BaseRecord = BaseRecord;
//# sourceMappingURL=BaseRecord.js.map