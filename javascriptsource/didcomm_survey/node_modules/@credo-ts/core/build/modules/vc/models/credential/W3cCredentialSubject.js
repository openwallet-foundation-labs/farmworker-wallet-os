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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsW3cCredentialSubject = exports.W3cCredentialSubjectTransformer = exports.W3cCredentialSubject = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const error_1 = require("../../../../error");
class W3cCredentialSubject {
    constructor(options) {
        var _a;
        if (options) {
            this.id = options.id;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _b = (_a = options.claims) !== null && _a !== void 0 ? _a : {}, { id } = _b, claims = __rest(_b, ["id"]);
            this.claims = Object.keys(claims).length > 0 ? claims : undefined;
        }
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], W3cCredentialSubject.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], W3cCredentialSubject.prototype, "claims", void 0);
exports.W3cCredentialSubject = W3cCredentialSubject;
function W3cCredentialSubjectTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            const vToClass = (v) => {
                if (!v || typeof v !== 'object')
                    throw new error_1.CredoError('Invalid credential subject');
                if ((0, class_validator_1.isInstance)(v, W3cCredentialSubject))
                    return v;
                const _a = v, { id } = _a, claims = __rest(_a, ["id"]);
                if (id !== undefined && typeof id !== 'string')
                    throw new error_1.CredoError('Invalid credential subject id');
                return new W3cCredentialSubject({ id, claims });
            };
            if (Array.isArray(value) && value.length === 0) {
                throw new error_1.CredoError('At least one credential subject is required');
            }
            return Array.isArray(value) ? value.map(vToClass) : vToClass(value);
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            const vToJson = (v) => {
                if (v instanceof W3cCredentialSubject)
                    return v.id ? Object.assign(Object.assign({}, v.claims), { id: v.id }) : Object.assign({}, v.claims);
                return v;
            };
            return Array.isArray(value) ? value.map(vToJson) : vToJson(value);
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
exports.W3cCredentialSubjectTransformer = W3cCredentialSubjectTransformer;
function IsW3cCredentialSubject(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'IsW3cCredentialSubject',
        validator: {
            validate: (value) => {
                return (0, class_validator_1.isInstance)(value, W3cCredentialSubject);
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be an object or an array of objects with an optional id property', validationOptions),
        },
    }, validationOptions);
}
exports.IsW3cCredentialSubject = IsW3cCredentialSubject;
//# sourceMappingURL=W3cCredentialSubject.js.map