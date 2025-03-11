/* jshint node: true */
/* globals mx */

import { addLogListener } from "mendix/logging";
import NativeFileDocumentsUtils from "./nativefiledocumentsutils";

"use strict";

var RNFS;
var os;
var logFolderPath;
var currentLogFileName;
var currentFullLogFilePath;
var removeListener = null;

const LOGLEVEL_TRACE = "trace";
const LOGLEVEL_DEBUG = "debug";
const LOGLEVEL_INFO = "info";
const LOGLEVEL_WARNING = "warning";
const LOGLEVEL_ERROR = "error";
const LOGLEVEL_CRITICAL = "critical";
const LOGLEVEL_NONE = "none";

const LOGLEVELS = [LOGLEVEL_TRACE, LOGLEVEL_DEBUG, LOGLEVEL_INFO, LOGLEVEL_WARNING, LOGLEVEL_ERROR, LOGLEVEL_CRITICAL, LOGLEVEL_NONE];

// Instead of compairing string values, we set flags depending on the requested log level. When processing the log messages a really cheap check is then sufficient.
const LOGLEVEL_FLAGS = {
    trace: {trace: true, debug: true, info: true, warning: true, error: true, critical: true},
    debug:{trace: false, debug: true, info: true, warning: true, error: true, critical: true},
    info: {trace: false, debug: false, info: true, warning: true, error: true, critical: true},
    warning: {trace: false, debug: false, info: false, warning: true, error: true, critical: true},
    error: {trace: false, debug: false, info: false, warning: false, error: true, critical: true},
    critical: {trace: false, debug: false, info: false, warning: false, error: false, critical: true},
    none: {trace: false, debug: false, info: false, warning: false, error: false, critical: false}
};

const knownLogNodes = new Map();

const config = {
    logLevels: new Map(),
    defaultLogLevel: LOGLEVEL_INFO
};

const addToKnownLogNodes = logNode => {
    if (!knownLogNodes.has(logNode)) {
        knownLogNodes.set(logNode, logNode);
    }
};

const setLogLevel = (logNode, logLevel) => {
    if (!LOGLEVELS.includes(logLevel)) {
        throw "Invalid log level: " + logLevel;
    }
    addToKnownLogNodes(logNode);
    config.logLevels[logNode] = logLevel;
};

const resetAll = logLevel => {
    if (!LOGLEVELS.includes(logLevel)) {
        throw "Invalid log level: " + logLevel;
    }
    // Clear all specific log levels.
    config.logLevels = {};
    // Set the default log level to the requested value.
    config.defaultLogLevel = logLevel;
}

const getDefaultLogLevel = () => {
    return config.defaultLogLevel;
};

const setCurrentLogFile = () => {
    const currentDateTime = new Date();
    const dateString = currentDateTime.toLocaleDateString("en-UK");
    const timeString = currentDateTime.toLocaleTimeString("en-UK");
    const year = dateString.substring(6);
    const month = dateString.substring(3, 5);
    const day = dateString.substring(0, 2);
    const hours = timeString.substring(0, 2);
    const minutes = timeString.substring(3, 5);
    const seconds = timeString.substring(6);
    currentLogFileName = "log_" + year + month + day + '_' + hours + minutes + seconds + '.txt';
    const logfilePath = logFolderPath + '/' + currentLogFileName;
    currentFullLogFilePath = NativeFileDocumentsUtils.getFullPath(logfilePath, "DocumentsDirectory", RNFS, os);
};

const includeLogMessage = (logNode, logLevel) => {

    addToKnownLogNodes(logNode);

    // Get the log level for the log node, default log level if not found.
    let compareToLogLevel = config.logLevels[logNode];
    if (!compareToLogLevel) {
        compareToLogLevel = config.defaultLogLevel;
    }
    // Get the flags for the log node
    const flags = LOGLEVEL_FLAGS[compareToLogLevel];
    // Return whether the flag for the log node of the message is turned on.
    return flags[logLevel];
}

const writeToLogFile = textData => {
    RNFS.appendFile(currentFullLogFilePath, new Date().toISOString() + "\t" + textData + "\n", "utf8").then();
};

const startListener = async (parmLogFolderPath, parmRNFS, parmOS) => {
    RNFS = parmRNFS;
    os = parmOS;
    logFolderPath = parmLogFolderPath;
    setCurrentLogFile();
    removeListener = addLogListener((logLevel, logNode, ...args) => {
        if (includeLogMessage(logNode, logLevel)) {
            const message = args.map(arg => arg instanceof Error ? arg.message : String(arg)).join(", ");
            writeToLogFile(logNode + "\t" + logLevel + "\t" + message);
        }
    });
};

const isListenerActive = () => {
    return removeListener != null;
};

const rotateLog = () => {
    if (isListenerActive()) {
        setCurrentLogFile();
    }
};

const createMxObject = async entityName => {
	return new Promise((resolve, reject) => {
		mx.data.create({
			entity: entityName,
			callback:  (mxObject) => {
				resolve(mxObject);
			},
			error: (e) => {
				reject("Could not create '" + entityName + "': " + e.message);
			}
		});

	});
};

const getLogNodes = async () => {
    const result = [];
    for (const logNode of knownLogNodes.keys()) {
        const mxObj = await createMxObject("NativeFileDocuments.LogNodeInfo");
        mxObj.set("LogNode", logNode);
        const customLogLevel = config.logLevels[logNode];
        if (customLogLevel) {
            mxObj.set("LogLevel", customLogLevel);
        }
        result.push(mxObj);
    }
    return result;
};

const endListener = async () => {
    // No action if logger never started so no log file path exists.
    if (!currentFullLogFilePath) {
        return;
    }

    // Only log the listener stop log line if lines were logged.
    // Otherwise we end up with a lot of log files only containing this single line.
    const logFileExists = await RNFS.exists(currentFullLogFilePath);
    if (logFileExists) {
        writeToLogFile("Stopping the log listener");
    }
    if (removeListener) {
        removeListener();
        removeListener = null;
    }

    currentLogFileName = null;
    currentFullLogFilePath = null;
};

const LogListener = {
    startListener(logFolderPath, RNFS, os) {
        startListener(logFolderPath, RNFS, os);
    },

    isListenerActive() {
        return isListenerActive();
    },

    rotateLog() {
        rotateLog();
    },

    resetAll(logLevel) {
        resetAll(logLevel);
    },

    getDefaultLogLevel() {
        return getDefaultLogLevel();
    },

    getLogNodes() {
        return getLogNodes();
    },

    setLogLevel(logNode, logLevel) {
        setLogLevel(logNode, logLevel);
    },

    endListener() {
        endListener();
    }
};

module.exports = LogListener;
