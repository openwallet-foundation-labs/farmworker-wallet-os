import { Validation } from '../core';
import { ValidationBundler } from './validationBundler';
export declare class FrameVB extends ValidationBundler<unknown> {
    private readonly frameIsValidMsg;
    constructor(parentTag: string);
    getValidations(frame: unknown): Validation<unknown>[];
    private getMyValidations;
    protected getMyTag(): string;
    /**
     * this is based on https://github.com/digitalbazaar/jsonld.js/blob/main/lib/frame.js
     * @param frame
     */
    private static frameIsValid;
}
