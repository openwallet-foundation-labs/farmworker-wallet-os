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
exports.SingleContextLruCacheRecord = void 0;
const class_transformer_1 = require("class-transformer");
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
class SingleContextLruCacheRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = SingleContextLruCacheRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.entries = props.entries;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
        }
    }
    getTags() {
        return Object.assign({}, this._tags);
    }
}
SingleContextLruCacheRecord.type = 'SingleContextLruCacheRecord';
__decorate([
    (0, class_transformer_1.Type)(() => Object),
    __metadata("design:type", Map)
], SingleContextLruCacheRecord.prototype, "entries", void 0);
exports.SingleContextLruCacheRecord = SingleContextLruCacheRecord;
//# sourceMappingURL=SingleContextLruCacheRecord.js.map