"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofTransformer = void 0;
const class_transformer_1 = require("class-transformer");
const DataIntegrityProof_1 = require("./DataIntegrityProof");
const LinkedDataProof_1 = require("./LinkedDataProof");
function ProofTransformer() {
    return (0, class_transformer_1.Transform)(({ value, type, }) => {
        if (type === class_transformer_1.TransformationType.PLAIN_TO_CLASS) {
            const plainOptionsToClass = (v) => {
                if ('cryptosuite' in v) {
                    return (0, class_transformer_1.plainToInstance)(DataIntegrityProof_1.DataIntegrityProof, v);
                }
                else {
                    return (0, class_transformer_1.plainToInstance)(LinkedDataProof_1.LinkedDataProof, v);
                }
            };
            if (Array.isArray(value))
                return value.map(plainOptionsToClass);
            return plainOptionsToClass(value);
        }
        else if (type === class_transformer_1.TransformationType.CLASS_TO_PLAIN) {
            if (Array.isArray(value))
                return value.map((v) => (0, class_transformer_1.instanceToPlain)(v));
            return (0, class_transformer_1.instanceToPlain)(value);
        }
        // PLAIN_TO_PLAIN
        return value;
    });
}
exports.ProofTransformer = ProofTransformer;
//# sourceMappingURL=ProofTransformer.js.map