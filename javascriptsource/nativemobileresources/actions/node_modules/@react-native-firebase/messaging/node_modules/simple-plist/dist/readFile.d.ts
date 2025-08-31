/// <reference types="node" />
import { PathOrFileDescriptor } from "fs";
import type { callbackFn } from "./types";
export declare function readFile<T = unknown>(aFile: PathOrFileDescriptor, callback: callbackFn<T>): void;
