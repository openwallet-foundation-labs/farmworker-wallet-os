/* jshint node: true */
import { commit, create } from "mx-api/data";

"use strict";

/**
 * Determine full path.
 * For Android, paths must be prefixed with file://
 * @param {string} filepath - The path to the file or directory.
 * @param {"NativeFileDocuments.PathType.FullPath"|"NativeFileDocuments.PathType.DocumentsDirectory"|"NativeFileDocuments.PathType.TemporaryDirectory"} pathType
 * @param {object} RNBlobUtil
 * @param {string} os
 */
const getFullPath = (filepath, pathType, RNBlobUtil, os) => {
    let fullPath = null;
    const prefixAndroid = "file://";
	switch (pathType) {
		case "FullPath":
            if (os === "android") {
                if (filepath.startsWith(prefixAndroid)) {
                    fullPath = filepath;
                } else {
                    fullPath = prefixAndroid + filepath;
                }
            } else {
                fullPath = filepath;
            }
			break;
	
		case "DocumentsDirectory":
			if (filepath.startsWith("/")) {
				fullPath = RNBlobUtil.fs.dirs.DocumentDir + filepath;
			} else {
				fullPath = RNBlobUtil.fs.dirs.DocumentDir + "/" + filepath;
            }
            if (os === "android") {
                fullPath = prefixAndroid + fullPath;
            }
			break;	
    }
    return fullPath;
};

/**
 * Determine full path, without prefix.
 * @param {string} filepath - The path to the file or directory.
 * @param {"NativeFileDocuments.PathType.FullPath"|"NativeFileDocuments.PathType.DocumentsDirectory"|"NativeFileDocuments.PathType.TemporaryDirectory"} pathType
 * @param {object} RNBlobUtil
 * @param {string} os
 */
const getFullPathNoPrefix = (filepath, pathType, RNBlobUtil, os) => {
    let fullPath = null;
	switch (pathType) {
		case "FullPath":
            fullPath = filepath;
			break;
	
		case "DocumentsDirectory":
			if (filepath.startsWith("/")) {
				fullPath = RNBlobUtil.fs.dirs.DocumentDir + filepath;
			} else {
				fullPath = RNBlobUtil.fs.dirs.DocumentDir + "/" + filepath;
            }
			break;	
    }
    return fullPath;
};

/**
 * Write to log.
 * @param  logData 
 */
const writeToLog = async (logData) => {
    const newLog = await create({ entity: "NativeFileDocuments.NativeActionLog"});
    newLog.set("LoggedAt", new Date());
    newLog.set("ActionName", logData.actionName);
    newLog.set("LogType", logData.logType);
    newLog.set("LogMessage", logData.logMessage);
    await commit({ objects: [newLog] });
};

const NativeFileDocumentsUtils = {
    getFullPath(filepath, pathType, RNBlobUtil, os) {
        return getFullPath(filepath, pathType, RNBlobUtil, os);
    },
    getFullPathNoPrefix(filepath, pathType, RNBlobUtil, os) {
        return getFullPathNoPrefix(filepath, pathType, RNBlobUtil, os);
    },
    writeToLog(logData) {
        return writeToLog(logData);
    }
};

module.exports = NativeFileDocumentsUtils;
