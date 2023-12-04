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
exports.IsW3cHolder = exports.W3cHolderTransformer = exports.W3cHolder = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../../../utils/validators");
class W3cHolder {
    constructor(options) {
        if (options) {
            this.id = options.id;
        }
    }
}
__decorate([
    (0, validators_1.IsUri)(),
    __metadata("design:type", String)
], W3cHolder.prototype, "id", void 0);
exports.W3cHolder = W3cHolder;
// Custom transformers
function W3cHolderTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            if ((0, class_validator_1.isString)(value))
                return value;
            return (0, class_transformer_1.plainToInstance)(W3cHolder, value);
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            if ((0, class_validator_1.isString)(value))
                return value;
            return (0, class_transformer_1.instanceToPlain)(value);
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
exports.W3cHolderTransformer = W3cHolderTransformer;
// Custom validators
function IsW3cHolder(validationOptions) {
    return (0, class_validator_1.ValidateBy)({
        name: 'IsW3cHolder',
        validator: {
            validate: (value) => {
                if (typeof value === 'string') {
                    return (0, validators_1.isUri)(value);
                }
                if ((0, class_validator_1.isInstance)(value, W3cHolder)) {
                    return (0, validators_1.isUri)(value.id);
                }
                return false;
            },
            defaultMessage: (0, class_validator_1.buildMessage)((eachPrefix) => eachPrefix + '$property must be an URI or an object with an id property which is an URI', validationOptions),
        },
    }, validationOptions);
}
exports.IsW3cHolder = IsW3cHolder;
//# sourceMappingURL=W3cHolder.js.map