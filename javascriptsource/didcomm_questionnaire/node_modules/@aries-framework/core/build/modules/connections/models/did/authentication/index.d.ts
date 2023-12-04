import { Authentication } from './Authentication';
import { EmbeddedAuthentication } from './EmbeddedAuthentication';
import { ReferencedAuthentication } from './ReferencedAuthentication';
export declare const authenticationTypes: {
    RsaVerificationKey2018: string;
    Ed25519VerificationKey2018: string;
    Secp256k1VerificationKey2018: string;
};
/**
 * Decorator that transforms authentication json to corresponding class instances. See {@link authenticationTypes}
 *
 * @example
 * class Example {
 *   AuthenticationTransformer()
 *   private authentication: Authentication
 * }
 */
export declare function AuthenticationTransformer(): PropertyDecorator;
export { Authentication, EmbeddedAuthentication, ReferencedAuthentication };
