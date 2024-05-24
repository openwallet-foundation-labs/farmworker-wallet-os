export declare function indyDidFromPublicKeyBase58(publicKeyBase58: string): string;
/**
 * Checks whether `potentialDid` is a valid DID. You can optionally provide a `method` to
 * check whether the did is for that specific method.
 *
 * Note: the check in this method is very simple and just check whether the did starts with
 * `did:` or `did:<method>:`. It does not do an advanced regex check on the did.
 */
export declare function isDid(potentialDid: string, method?: string): boolean;
