"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonObject = void 0;
const isJsonObject = (value) => {
    return value !== undefined && typeof value === 'object' && value !== null && !Array.isArray(value);
};
exports.isJsonObject = isJsonObject;
//# sourceMappingURL=type.js.map