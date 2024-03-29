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
exports.Feature = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const error_1 = require("../../../error");
const JsonTransformer_1 = require("../../../utils/JsonTransformer");
class Feature {
    constructor(props) {
        if (props) {
            this.id = props.id;
            this.type = props.type;
        }
    }
    /**
     * Combine this feature with another one, provided both are from the same type
     * and have the same id
     *
     * @param feature object to combine with this one
     * @returns a new object resulting from the combination between this and feature
     */
    combine(feature) {
        if (feature.id !== this.id) {
            throw new error_1.AriesFrameworkError('Can only combine with a feature with the same id');
        }
        const obj1 = JsonTransformer_1.JsonTransformer.toJSON(this);
        const obj2 = JsonTransformer_1.JsonTransformer.toJSON(feature);
        for (const key in obj2) {
            try {
                if (Array.isArray(obj2[key])) {
                    obj1[key] = [...new Set([...obj1[key], ...obj2[key]])];
                }
                else {
                    obj1[key] = obj2[key];
                }
            }
            catch (e) {
                obj1[key] = obj2[key];
            }
        }
        return JsonTransformer_1.JsonTransformer.fromJSON(obj1, Feature);
    }
    toJSON() {
        return JsonTransformer_1.JsonTransformer.toJSON(this);
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)({ name: 'feature-type' }),
    __metadata("design:type", String)
], Feature.prototype, "type", void 0);
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map