/// <reference types="node" />
import { PathOrFileDescriptor, WriteFileOptions } from "fs";
import type { PlistJsObj } from "./types";
export declare function writeFileSync(aFile: PathOrFileDescriptor, anObject: PlistJsObj, options?: WriteFileOptions): void;
