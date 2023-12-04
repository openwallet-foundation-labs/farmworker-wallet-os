import { JwtPayload } from '../../../crypto/jose/jwt';
import { W3cCredential } from '../models/credential/W3cCredential';
export declare function getJwtPayloadFromCredential(credential: W3cCredential): JwtPayload;
export declare function getCredentialFromJwtPayload(jwtPayload: JwtPayload): W3cCredential;
