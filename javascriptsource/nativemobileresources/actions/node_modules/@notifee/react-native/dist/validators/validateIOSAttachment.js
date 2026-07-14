"use strict";
/*
 * Copyright (c) 2016-present Invertase Limited
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateIOSAttachment;
exports.validateThumbnailClippingRect = validateThumbnailClippingRect;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const react_native_1 = require("react-native");
const utils_1 = require("../utils");
function validateIOSAttachment(attachment) {
    if (!(0, utils_1.isObject)(attachment)) {
        throw new Error("'attachment' expected an object value.");
    }
    if ((!(0, utils_1.isString)(attachment.url) && !(0, utils_1.isNumber)(attachment.url) && !(0, utils_1.isObject)(attachment.url)) ||
        ((0, utils_1.isString)(attachment.url) && !attachment.url.length)) {
        throw new Error("'attachment.url' expected a React Native ImageResource value or a valid string URL.");
    }
    const out = {
        url: attachment.url,
        thumbnailHidden: false,
    };
    if ((0, utils_1.isNumber)(attachment.url) || (0, utils_1.isObject)(attachment.url)) {
        const image = react_native_1.Image.resolveAssetSource(attachment.url);
        out.url = image.uri;
    }
    if ((0, utils_1.objectHasProperty)(attachment, 'id') && !(0, utils_1.isUndefined)(attachment.id)) {
        if (!(0, utils_1.isString)(attachment.id)) {
            throw new Error("'attachment.id' expected a string value.");
        }
        out.id = attachment.id;
    }
    else {
        out.id = (0, utils_1.generateId)();
    }
    if ((0, utils_1.objectHasProperty)(attachment, 'typeHint') && !(0, utils_1.isUndefined)(attachment.typeHint)) {
        if (!(0, utils_1.isString)(attachment.typeHint)) {
            throw new Error("'attachment.typeHint' expected a string value.");
        }
        out.typeHint = attachment.typeHint;
    }
    if ((0, utils_1.objectHasProperty)(attachment, 'thumbnailClippingRect') &&
        !(0, utils_1.isUndefined)(attachment.thumbnailClippingRect)) {
        try {
            out.thumbnailClippingRect = validateThumbnailClippingRect(attachment.thumbnailClippingRect);
        }
        catch (e) {
            throw new Error(`'attachment.thumbnailClippingRect' is invalid. ${e.message}`);
        }
    }
    if ((0, utils_1.objectHasProperty)(attachment, 'thumbnailHidden') &&
        !(0, utils_1.isUndefined)(attachment.thumbnailHidden)) {
        if (!(0, utils_1.isBoolean)(attachment.thumbnailHidden)) {
            throw new Error("'attachment.thumbnailHidden' must be a boolean value if specified.");
        }
        out.thumbnailHidden = attachment.thumbnailHidden;
    }
    if ((0, utils_1.objectHasProperty)(attachment, 'thumbnailTime') && !(0, utils_1.isUndefined)(attachment.thumbnailTime)) {
        if (!(0, utils_1.isNumber)(attachment.thumbnailTime)) {
            throw new Error("'attachment.thumbnailTime' must be a number value if specified.");
        }
        else {
            out.thumbnailTime = attachment.thumbnailTime;
        }
    }
    return out;
}
/**
 * Validates a ThumbnailClippingRect
 */
function validateThumbnailClippingRect(thumbnailClippingRect) {
    if ((0, utils_1.objectHasProperty)(thumbnailClippingRect, 'x')) {
        if (!(0, utils_1.isNumber)(thumbnailClippingRect.x)) {
            throw new Error("'thumbnailClippingRect.x' expected a number value.");
        }
    }
    if ((0, utils_1.objectHasProperty)(thumbnailClippingRect, 'y')) {
        if (!(0, utils_1.isNumber)(thumbnailClippingRect.y)) {
            throw new Error("'thumbnailClippingRect.y' expected a number value.");
        }
    }
    if ((0, utils_1.objectHasProperty)(thumbnailClippingRect, 'width')) {
        if (!(0, utils_1.isNumber)(thumbnailClippingRect.width)) {
            throw new Error("'thumbnailClippingRect.width' expected a number value.");
        }
    }
    if ((0, utils_1.objectHasProperty)(thumbnailClippingRect, 'height')) {
        if (!(0, utils_1.isNumber)(thumbnailClippingRect.height)) {
            throw new Error("'thumbnailClippingRect.height' expected a number value.");
        }
    }
    // Defaults
    return {
        x: thumbnailClippingRect.x,
        y: thumbnailClippingRect.y,
        height: thumbnailClippingRect.height,
        width: thumbnailClippingRect.width,
    };
}
//# sourceMappingURL=validateIOSAttachment.js.map