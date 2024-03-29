"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonTransformer = void 0;
const class_transformer_1 = require("class-transformer");
const ClassValidationError_1 = require("../error/ClassValidationError");
const MessageValidator_1 = require("./MessageValidator");
class JsonTransformer {
    static toJSON(classInstance) {
        return (0, class_transformer_1.instanceToPlain)(classInstance, {
            exposeDefaultValues: true,
        });
    }
    static fromJSON(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cls, { validate = true } = {}) {
        const instance = (0, class_transformer_1.plainToInstance)(cls, json, { exposeDefaultValues: true });
        // Skip validation
        if (!validate)
            return instance;
        if (!instance) {
            throw new ClassValidationError_1.ClassValidationError('Cannot validate instance of ', { classType: Object.getPrototypeOf(cls).name });
        }
        MessageValidator_1.MessageValidator.validateSync(instance);
        return instance;
    }
    static clone(classInstance) {
        return (0, class_transformer_1.instanceToInstance)(classInstance, {
            exposeDefaultValues: true,
            enableCircularCheck: true,
            enableImplicitConversion: true,
            ignoreDecorators: true,
        });
    }
    static serialize(classInstance) {
        return JSON.stringify(this.toJSON(classInstance));
    }
    static deserialize(jsonString, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cls, { validate = true } = {}) {
        return this.fromJSON(JSON.parse(jsonString), cls, { validate });
    }
}
exports.JsonTransformer = JsonTransformer;
//# sourceMappingURL=JsonTransformer.js.map