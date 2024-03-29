import { JwtPayload } from '../../../crypto/jose/jwt';
import { W3cPresentation } from '../models/presentation/W3cPresentation';
export declare function getJwtPayloadFromPresentation(presentation: W3cPresentation): JwtPayload;
export declare function getPresentationFromJwtPayload(jwtPayload: JwtPayload): W3cPresentation;
