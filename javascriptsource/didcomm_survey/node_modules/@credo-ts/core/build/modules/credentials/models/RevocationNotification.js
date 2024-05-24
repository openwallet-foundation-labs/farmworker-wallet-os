"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevocationNotification = void 0;
class RevocationNotification {
    constructor(comment, revocationDate = new Date()) {
        this.revocationDate = revocationDate;
        this.comment = comment;
    }
}
exports.RevocationNotification = RevocationNotification;
//# sourceMappingURL=RevocationNotification.js.map