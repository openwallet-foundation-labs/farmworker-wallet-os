/// <reference types="node" />
import { PathOrFileDescriptor } from "fs";
import type { PlistValue } from "plist";
import type { StringOrBuffer } from "./types";
/**
 * Detects the format of the given string or buffer, then attempts to parse the
 * payload using the appropriate tooling.
 */
export declare function parse<T = PlistValue>(aStringOrBuffer: StringOrBuffer, aFile?: PathOrFileDescriptor): T;
