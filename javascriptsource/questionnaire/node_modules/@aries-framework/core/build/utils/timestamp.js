"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Question: Spec isn't clear about the endianness. Assumes big-endian here
// since ACA-Py uses big-endian.
function timestamp() {
    let time = Date.now();
    const bytes = [];
    for (let i = 0; i < 8; i++) {
        const byte = time & 0xff;
        bytes.push(byte);
        time = (time - byte) / 256; // Javascript right shift (>>>) only works on 32 bit integers
    }
    return Uint8Array.from(bytes).reverse();
}
exports.default = timestamp;
//# sourceMappingURL=timestamp.js.map