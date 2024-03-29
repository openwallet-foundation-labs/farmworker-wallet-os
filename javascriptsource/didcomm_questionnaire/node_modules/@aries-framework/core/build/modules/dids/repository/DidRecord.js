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
exports.DidRecord = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const BaseRecord_1 = require("../../../storage/BaseRecord");
const uuid_1 = require("../../../utils/uuid");
const domain_1 = require("../domain");
const DidDocumentRole_1 = require("../domain/DidDocumentRole");
const parse_1 = require("../domain/parse");
const didRecordMetadataTypes_1 = require("./didRecordMetadataTypes");
class DidRecord extends BaseRecord_1.BaseRecord {
    constructor(props) {
        var _a, _b, _c;
        super();
        this.type = DidRecord.type;
        if (props) {
            this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, uuid_1.uuid)();
            this.did = props.did;
            this.role = props.role;
            this.didDocument = props.didDocument;
            this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
            this._tags = (_c = props.tags) !== null && _c !== void 0 ? _c : {};
        }
    }
    getTags() {
        const did = (0, parse_1.parseDid)(this.did);
        const legacyDid = this.metadata.get(didRecordMetadataTypes_1.DidRecordMetadataKeys.LegacyDid);
        return Object.assign(Object.assign({}, this._tags), { role: this.role, method: did.method, legacyUnqualifiedDid: legacyDid === null || legacyDid === void 0 ? void 0 : legacyDid.unqualifiedDid, did: this.did, methodSpecificIdentifier: did.id });
    }
}
DidRecord.type = 'DidRecord';
__decorate([
    (0, class_transformer_1.Type)(() => domain_1.DidDocument),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", domain_1.DidDocument)
], DidRecord.prototype, "didDocument", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(DidDocumentRole_1.DidDocumentRole),
    __metadata("design:type", String)
], DidRecord.prototype, "role", void 0);
exports.DidRecord = DidRecord;
//# sourceMappingURL=DidRecord.js.map