"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdKeyPair = void 0;
class LdKeyPair {
    constructor(options) {
        this.id = options.id;
        this.controller = options.controller;
    }
    static async generate() {
        throw new Error('Not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async from(verificationMethod) {
        throw new Error('Abstract method from() must be implemented in subclass.');
    }
    export(publicKey = false, privateKey = false) {
        if (!publicKey && !privateKey) {
            throw new Error('Export requires specifying either "publicKey" or "privateKey".');
        }
        const key = {
            id: this.id,
            type: this.type,
            controller: this.controller,
        };
        return key;
    }
}
exports.LdKeyPair = LdKeyPair;
//# sourceMappingURL=LdKeyPair.js.map