"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStorageUpToDate = void 0;
const version_1 = require("../../utils/version");
const updates_1 = require("./updates");
function isStorageUpToDate(storageVersion, updateToVersion) {
    const currentStorageVersion = (0, version_1.parseVersionString)(storageVersion);
    const compareToVersion = (0, version_1.parseVersionString)(updateToVersion !== null && updateToVersion !== void 0 ? updateToVersion : updates_1.CURRENT_FRAMEWORK_STORAGE_VERSION);
    const isUpToDate = (0, version_1.isFirstVersionEqualToSecond)(currentStorageVersion, compareToVersion) ||
        (0, version_1.isFirstVersionHigherThanSecond)(currentStorageVersion, compareToVersion);
    return isUpToDate;
}
exports.isStorageUpToDate = isStorageUpToDate;
//# sourceMappingURL=isUpToDate.js.map