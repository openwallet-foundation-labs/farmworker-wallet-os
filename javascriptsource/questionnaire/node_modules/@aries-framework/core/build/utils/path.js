"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirFromFilePath = void 0;
/**
 * Extract directory from path (should also work with windows paths)
 *
 * @param path the path to extract the directory from
 * @returns the directory path
 */
function getDirFromFilePath(path) {
    return path.substring(0, Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\')));
}
exports.getDirFromFilePath = getDirFromFilePath;
//# sourceMappingURL=path.js.map