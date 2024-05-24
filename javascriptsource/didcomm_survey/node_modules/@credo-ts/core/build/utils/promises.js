"use strict";
// This file polyfills the allSettled method introduced in ESNext
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyRejected = exports.onlyFulfilled = exports.allSettled = void 0;
function allSettled(promises) {
    return Promise.all(promises.map((p) => p
        .then((value) => ({
        status: 'fulfilled',
        value,
    }))
        .catch((reason) => ({
        status: 'rejected',
        reason,
    }))));
}
exports.allSettled = allSettled;
function onlyFulfilled(entries) {
    // We filter for only the rejected values, so we can safely cast the type
    return entries.filter((e) => e.status === 'fulfilled');
}
exports.onlyFulfilled = onlyFulfilled;
function onlyRejected(entries) {
    // We filter for only the rejected values, so we can safely cast the type
    return entries.filter((e) => e.status === 'rejected');
}
exports.onlyRejected = onlyRejected;
//# sourceMappingURL=promises.js.map