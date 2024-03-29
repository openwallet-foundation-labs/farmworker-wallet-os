export declare function parseVersionString(version: VersionString): Version;
export declare function isFirstVersionHigherThanSecond(first: Version, second: Version): boolean;
export declare function isFirstVersionEqualToSecond(first: Version, second: Version): boolean;
export type VersionString = `${number}.${number}` | `${number}.${number}.${number}`;
export type MajorVersion = number;
export type MinorVersion = number;
export type PatchVersion = number;
export type Version = [MajorVersion, MinorVersion, PatchVersion];
