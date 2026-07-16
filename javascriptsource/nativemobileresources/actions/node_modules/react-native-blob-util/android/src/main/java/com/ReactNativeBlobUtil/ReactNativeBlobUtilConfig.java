package com.ReactNativeBlobUtil;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.Locale;

class ReactNativeBlobUtilConfig {

    public Boolean fileCache;
    public Boolean transformFile;
    public String path;
    public String appendExt;
    public ReadableMap addAndroidDownloads;
    public Boolean trusty;
    public Boolean wifiOnly = false;
    public String targetHostIp;
    public String key;
    public String mime;
    public Boolean auto;
    public Boolean overwrite = true;
    public long timeout = 60000;
    public Boolean increment = false;
    public Boolean followRedirect = true;
    public ReadableArray binaryContentTypes = null;

    ReactNativeBlobUtilConfig(ReadableMap options) {
        if (options == null)
            return;
        this.fileCache = options.hasKey("fileCache") && options.getBoolean("fileCache");
        this.transformFile = options.hasKey("transformFile") ? options.getBoolean("transformFile") : false;
        this.path = options.hasKey("path") ? options.getString("path") : null;
        this.appendExt = options.hasKey("appendExt") ? options.getString("appendExt") : "";
        this.trusty = options.hasKey("trusty") && options.getBoolean("trusty");
        this.wifiOnly = options.hasKey("wifiOnly") && options.getBoolean("wifiOnly");
        this.targetHostIp = options.hasKey("targetHostIp") ? options.getString("targetHostIp") : "";
        if (options.hasKey("addAndroidDownloads")) {
            this.addAndroidDownloads = options.getMap("addAndroidDownloads");
        }
        if (options.hasKey("binaryContentTypes"))
            this.binaryContentTypes = options.getArray("binaryContentTypes");
        if (this.path != null && path.toLowerCase(Locale.ROOT).contains("?append=true")) {
            this.overwrite = false;
        }
        if (options.hasKey("overwrite"))
            this.overwrite = options.getBoolean("overwrite");
        if (options.hasKey("followRedirect")) {
            this.followRedirect = options.getBoolean("followRedirect");
        }
        this.key = options.hasKey("key") ? options.getString("key") : null;
        this.mime = options.hasKey("contentType") ? options.getString("contentType") : null;
        this.increment = options.hasKey("increment") && options.getBoolean("increment");
        this.auto = options.hasKey("auto") && options.getBoolean("auto");
        if (options.hasKey("timeout")) {
            this.timeout = options.getInt("timeout");
        }
    }

}
