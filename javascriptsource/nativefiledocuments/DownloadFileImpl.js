/* jshint node: true */

import NativeFileDocumentsUtils from "./nativefiledocumentsutils";
import { create, retrieveByPath } from "mx-api/data";
import { Big } from "big.js";

"use strict";

const activeDownloads = new Map();

const HEADER_KEY_CONTENT_LENGTH = "Content-Length";

const getMapKey = (downloadFileProgress) => {
	return "dl_" + downloadFileProgress.getGuid();
}

const processResponse = async (result, downloadResult) => {
	activeDownloads.delete(getMapKey(result));
	const responseInfo = downloadResult.info();
	const responseHeaders = responseInfo.headers;
	for (const headerKey in responseHeaders) {
		const headerMxObj = await create( {entity: "NativeFileDocuments.HttpHeader"});
		const headerValue = responseHeaders[headerKey];
		headerMxObj.set("Key", headerKey);
		headerMxObj.set("Value", headerValue);
		headerMxObj.addReference("NativeFileDocuments.ResponseHeader", result.getGuid());
		if (headerKey === HEADER_KEY_CONTENT_LENGTH) {
			const contentLength = Number(headerValue);
			result.set("ContentLength", contentLength);
			result.set("BytesWritten", contentLength);
		}
	}
	result.set("Status", "Complete");
	result.set("ProgressPercentage", 100);
	result.set("StatusCode", responseInfo.status);
	// No need to wait for the completion of the nanoflow
	if (onComplete) {
		onComplete({Result: result});
	}
	// No need to wait for the log
	NativeFileDocumentsUtils.writeToLog({
		actionName: "downloadFile",
		logType: "Info",
		logMessage: "Download complete (" + fromUrl + " to " + toFile + ")"
	});	
}

const downloadFile = async (RNBlobUtil, request, toFile, readTimeout, writeToLog, progressInterval, onComplete, onError) => {
	if (!request) {
		return Promise.reject(new Error("No request object set."));
	}
	const fromUrl = request.get("FromUrl");
	if (!fromUrl) {
		return Promise.reject(new Error("No from URL set."));
	}
	if (!toFile) {
		return Promise.reject(new Error("No to file set."));
	}
	if (!readTimeout) {
		return Promise.reject(new Error("No read timeout set."));
	}
	
	if (writeToLog) {
		await NativeFileDocumentsUtils.writeToLog({
			actionName: "downloadFile",
			logType: "Info",
			logMessage: "Downloading: " + fromUrl + " to " + toFile
		});
	}

	let progressIntervalValue = 500;
	if (progressInterval) {
		progressIntervalValue = Number(progressInterval.round(0));
		if (progressIntervalValue < 100) {
			progressIntervalValue = 500;
		}
	}

	let readTimeoutValue = Number(readTimeout.round(0));
	if (readTimeoutValue < 1000) {
		readTimeoutValue = 1000;
	}

	let result = await create( {entity: "NativeFileDocuments.DownloadFileProgress"});
	result.set("LocalUrl", toFile);
	const requestHeaderMxObjArray = await retrieveByPath({
		path: "NativeFileDocuments.RequestHeader",
		guid: request.getGuid(),
		targetEntity: "NativeFileDocuments.HttpHeader"
	});
	const headers = {};
	for (headerMxObj of requestHeaderMxObjArray) {
		const key = headerMxObj.get("Key");
		const value = headerMxObj.get("Value");
		headers[key] = value
	}

	try {
		const promise = RNBlobUtil
		.config({
			path: toFile,
			timeout: readTimeoutValue
		}).fetch("GET", fromUrl, headers)
        .progress({interval: progressIntervalValue}, (received, total) => {
			// listen to download progress event
			result.set("Status", "Active");
			result.set("BytesWritten", received);
			let percentage = new Big(((received / total) * 100));
			result.set("ProgressPercentage", percentage.round(2));
        });

		activeDownloads.set(getMapKey(result), promise);

		promise.then(downloadResult => {
			// Do not wait for completion here, JS action must complete before download is complete to allow app to track progress
			processResponse(result, downloadResult);
		});

	} catch (error) {
		activeDownloads.delete(getMapKey(result));
		result.set("Status", "Error");
		result.set("ErrorMessage", error);
		// No need to wait for the completion of the nanoflow
		if (onError) {
			onError({Result: result});
		}
		// No need to wait for the log
		NativeFileDocumentsUtils.writeToLog({
			actionName: "downloadFile",
			logType: "Exception",
			logMessage: JSON.stringify(error)
		});

	};
	
	return result;

}

const stopDownload = (downloadFileProgress) => {
	const mapKey = getMapKey(downloadFileProgress);
	if (activeDownloads.has(mapKey)) {
		const promise = activeDownloads.get(mapKey);
		promise.cancel();
		activeDownloads.delete(mapKey);
		downloadFileProgress.set("Status", "Cancelled");
	}
}


const DownloadFileImpl = {
    downloadFile(RNBlobUtil, request, toFile, readTimeout, writeToLog, progressInterval, onComplete, onError) {
        return downloadFile(RNBlobUtil, request, toFile, readTimeout, writeToLog, progressInterval, onComplete, onError);
    },

	stopDownload(downloadFileProgress) {
		stopDownload(downloadFileProgress);
	}
}

module.exports = DownloadFileImpl;
