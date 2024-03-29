import { Key } from '../../crypto';
export declare function isDidKey(key: string): boolean;
export declare function didKeyToVerkey(key: string): string;
export declare function verkeyToDidKey(key: string): string;
export declare function didKeyToInstanceOfKey(key: string): Key;
export declare function verkeyToInstanceOfKey(verkey: string): Key;
