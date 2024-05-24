/**
 * Extract directory from path (should also work with windows paths)
 *
 * @param path the path to extract the directory from
 * @returns the directory path
 */
export declare function getDirFromFilePath(path: string): string;
/**
 * Combine multiple uri parts into a single uri taking into account slashes.
 *
 * @param parts the parts to combine
 * @returns the combined url
 */
export declare function joinUriParts(base: string, parts: string[]): string;
