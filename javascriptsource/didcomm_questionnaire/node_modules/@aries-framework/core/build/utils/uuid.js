"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUuid = exports.uuid = void 0;
const uuid_1 = require("uuid");
function uuid() {
    return (0, uuid_1.v4)();
}
exports.uuid = uuid;
function isValidUuid(id) {
    return (0, uuid_1.validate)(id);
}
exports.isValidUuid = isValidUuid;
//# sourceMappingURL=uuid.js.map