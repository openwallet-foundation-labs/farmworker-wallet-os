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
exports.Connection = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const DidDoc_1 = require("./did/DidDoc");
class Connection {
    constructor(options) {
        if (options) {
            this.did = options.did;
            this.didDoc = options.didDoc;
        }
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'DID' }),
    __metadata("design:type", String)
], Connection.prototype, "did", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'DIDDoc' }),
    (0, class_transformer_1.Type)(() => DidDoc_1.DidDoc),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsInstance)(DidDoc_1.DidDoc),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", DidDoc_1.DidDoc)
], Connection.prototype, "didDoc", void 0);
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map