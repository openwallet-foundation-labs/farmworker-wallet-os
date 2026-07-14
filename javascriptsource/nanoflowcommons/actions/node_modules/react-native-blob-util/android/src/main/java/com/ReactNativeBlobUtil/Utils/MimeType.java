package com.ReactNativeBlobUtil.Utils;

import android.webkit.MimeTypeMap;

import org.apache.commons.lang3.StringUtils;

public class MimeType {
    static String UNKNOWN = "*/*";
    static String BINARY_FILE = "application/octet-stream";
    static String IMAGE = "image/*";
    static String AUDIO = "audio/*";
    static String VIDEO = "video/*";
    static String TEXT = "text/*";
    static String FONT = "font/*";
    static String APPLICATION = "application/*";
    static String CHEMICAL = "chemical/*";
    static String MODEL = "model/*";

    /**
     * * Given `name` = `ABC` AND `mimeType` = `video/mp4`, then return `ABC.mp4`
     * * Given `name` = `ABC` AND `mimeType` = `null`, then return `ABC`
     * * Given `name` = `ABC.mp4` AND `mimeType` = `video/mp4`, then return `ABC.mp4`
     *
     * @param name can have file extension or not
     */

    public static String getFullFileName(String name, String mimeType) {
        // Prior to API 29, MimeType.BINARY_FILE has no file extension
        String ext = MimeType.getExtensionFromMimeType(mimeType);
        if ((ext == null || ext.isEmpty()) || name.endsWith("." + ext)) return name;
        else {
            String fn = name + "." + ext;
            if (fn.endsWith(".")) return StringUtils.stripEnd(fn, ".");
            else return fn;
        }
    }

    /**
     * Some mime types return no file extension on older API levels. This function adds compatibility accross API levels.
     *
     * @see this.getExtensionFromMimeTypeOrFileName
     */

    public static String getExtensionFromMimeType(String mimeType) {
        if (mimeType != null) {
            if (mimeType.equals(BINARY_FILE)) return "bin";
            else return MimeTypeMap.getSingleton().getExtensionFromMimeType(mimeType);
        } else return "";
    }

    /**
     * @see this.getExtensionFromMimeType
     */
    public static String getExtensionFromMimeTypeOrFileName(String mimeType, String filename) {
        if (mimeType == null || mimeType.equals(UNKNOWN)) return StringUtils.substringAfterLast(filename, ".");
        else return getExtensionFromMimeType(mimeType);
    }

    /**
     * Some file types return no mime type on older API levels. This function adds compatibility across API levels.
     */
    public static String getMimeTypeFromExtension(String fileExtension) {
        if (fileExtension.equals("bin")) return BINARY_FILE;
        else {
            String mt = MimeTypeMap.getSingleton().getMimeTypeFromExtension(fileExtension);
            if (mt != null) return mt;
            else return UNKNOWN;
        }
    }
}
