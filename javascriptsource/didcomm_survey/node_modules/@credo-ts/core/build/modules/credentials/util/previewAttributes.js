"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arePreviewAttributesEqual = void 0;
function arePreviewAttributesEqual(firstAttributes, secondAttributes) {
    if (firstAttributes.length !== secondAttributes.length)
        return false;
    const secondAttributeMap = secondAttributes.reduce((attributeMap, attribute) => (Object.assign(Object.assign({}, attributeMap), { [attribute.name]: attribute })), {});
    // check if no duplicate keys exist
    if (new Set(firstAttributes.map((attribute) => attribute.name)).size !== firstAttributes.length)
        return false;
    if (new Set(secondAttributes.map((attribute) => attribute.name)).size !== secondAttributes.length)
        return false;
    for (const firstAttribute of firstAttributes) {
        const secondAttribute = secondAttributeMap[firstAttribute.name];
        if (!secondAttribute)
            return false;
        if (firstAttribute.value !== secondAttribute.value)
            return false;
        if (firstAttribute.mimeType !== secondAttribute.mimeType)
            return false;
    }
    return true;
}
exports.arePreviewAttributesEqual = arePreviewAttributesEqual;
//# sourceMappingURL=previewAttributes.js.map