"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w3cDate = void 0;
/**
 * Formats an input date to w3c standard date format
 * @param date {number|string} Optional if not defined current date is returned
 *
 * @returns {string} date in a standard format as a string
 */
const w3cDate = (date) => {
    let result = new Date();
    if (typeof date === 'number' || typeof date === 'string') {
        result = new Date(date);
    }
    const str = result.toISOString();
    return str.substr(0, str.length - 5) + 'Z';
};
exports.w3cDate = w3cDate;
//# sourceMappingURL=util.js.map