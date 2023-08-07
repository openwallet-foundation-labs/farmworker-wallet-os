"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRecord = void 0;
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
class GenericRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = GenericRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.content = props.content;
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
        }
    }
    getTags() {
        return Object.assign({}, this._tags);
    }
}
exports.GenericRecord = GenericRecord;
GenericRecord.type = 'GenericRecord';
//# sourceMappingURL=GenericRecord.js.map