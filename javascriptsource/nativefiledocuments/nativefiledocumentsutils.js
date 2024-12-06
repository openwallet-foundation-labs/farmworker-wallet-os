/* jshint node: true */
/* globals mx */

"use strict";

/**
 * Create a Mendix object
 * @param entityName The name of the entity to create an object for.
 * @returns Promise
 */
const createMxObject = (entityName) => {
    return new Promise((resolve, reject) => {
        mx.data.create({
            entity: entityName,
            callback:  (mxObject) => {
                resolve(mxObject);
            },
            error: (e) => {
                reject(new Error("Could not create '" + entityName + "': " + e.message));
            }
        });

    });
};

/**
 * Determine full path.
 * For Android, paths must be prefixed with file://
 * @param {string} filepath - The path to the file or directory.
 * @param {"NativeFileDocuments.PathType.FullPath"|"NativeFileDocuments.PathType.DocumentsDirectory"|"NativeFileDocuments.PathType.TemporaryDirectory"} pathType
 * @param {object} RNFS
 * @param {string} os
 */
const getFullPath = (filepath, pathType, RNFS, os) => {
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
				fullPath = RNFS.DocumentDirectoryPath + filepath;
			} else {
				fullPath = RNFS.DocumentDirectoryPath + "/" + filepath;
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
 * @param {object} RNFS
 * @param {string} os
 */
const getFullPathNoPrefix = (filepath, pathType, RNFS, os) => {
    let fullPath = null;
	switch (pathType) {
		case "FullPath":
            fullPath = filepath;
			break;
	
		case "DocumentsDirectory":
			if (filepath.startsWith("/")) {
				fullPath = RNFS.DocumentDirectoryPath + filepath;
			} else {
				fullPath = RNFS.DocumentDirectoryPath + "/" + filepath;
            }
			break;	
    }
    return fullPath;
};

/**
 * Write to log.
 * @param  logData 
 */
const writeToLog = (logData) => {
    createMxObject("NativeFileDocuments.NativeActionLog").then((newLog) => {
        newLog.set("LoggedAt", new Date());
        newLog.set("ActionName", logData.actionName);
        newLog.set("LogType", logData.logType);
        newLog.set("LogMessage", logData.logMessage);
        mx.data.commit({
            mxobj: newLog,
            callback: function() {
                // console.log("Log entry written");
            },
            error: function(e) {
                Promise.reject(new Error("Could not commit new native action log object: " + e.message));
            }
        });
    });
};

const NativeFileDocumentsUtils = {
    createMxObject(entityName) {
        return createMxObject(entityName);
    },
    getFullPath(filepath, pathType, RNFS, os) {
        return getFullPath(filepath, pathType, RNFS, os);
    },
    getFullPathNoPrefix(filepath, pathType, RNFS, os) {
        return getFullPathNoPrefix(filepath, pathType, RNFS, os);
    },
    writeToLog(logData) {
        return writeToLog(logData);
    }
};

module.exports = NativeFileDocumentsUtils;
