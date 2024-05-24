"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageVersionRecord = void 0;
const uuid_1 = require("../../../utils/uuid");
const BaseRecord_1 = require("../../BaseRecord");
class StorageVersionRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b;
        super();
        this.type = StorageVersionRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this.storageVersion = props.storageVersion;
        }
    }
    getTags() {
        return this._tags;
    }
}
exports.StorageVersionRecord = StorageVersionRecord;
StorageVersionRecord.type = 'StorageVersionRecord';
//# sourceMappingURL=StorageVersionRecord.js.map