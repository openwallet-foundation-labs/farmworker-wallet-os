"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreadIdFromPlainTextMessage = void 0;
function getThreadIdFromPlainTextMessage(message) {
    var _a, _b;
    return (_b = (_a = message['~thread']) === null || _a === void 0 ? void 0 : _a.thid) !== null && _b !== void 0 ? _b : message['@id'];
}
exports.getThreadIdFromPlainTextMessage = getThreadIdFromPlainTextMessage;
//# sourceMappingURL=thread.js.map