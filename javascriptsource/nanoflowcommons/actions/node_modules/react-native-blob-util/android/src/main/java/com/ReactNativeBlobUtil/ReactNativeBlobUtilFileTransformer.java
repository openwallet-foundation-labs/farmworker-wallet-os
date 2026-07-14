package com.ReactNativeBlobUtil;

public class ReactNativeBlobUtilFileTransformer {
    public interface FileTransformer {
        public byte[] onWriteFile(byte[] data);
        public byte[] onReadFile(byte[] data);
    }

    public static ReactNativeBlobUtilFileTransformer.FileTransformer sharedFileTransformer;
}