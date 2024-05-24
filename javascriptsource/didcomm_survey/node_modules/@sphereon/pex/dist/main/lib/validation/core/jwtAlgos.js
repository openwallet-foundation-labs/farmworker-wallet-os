"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAlgos = void 0;
class JwtAlgos {
    //TODO: pass it with a config file
    static getJwtAlgos() {
        return [
            'HS256',
            'HS384',
            'HS512',
            'RS256',
            'RS384',
            'RS512',
            'ES256',
            'ES384',
            'ES512',
            'PS256',
            'PS384',
            'PS512',
            'none',
            'RSA1_5',
            'RSA-OAEP',
            'RSA-OAEP-256',
            'A128KW',
            'A192KW',
            'A256KW',
            'dir',
            'ECDH-ES',
            'ECDH-ES+A128KW',
            'ECDH-ES+A192KW',
            'ECDH-ES+A256KW',
            'A128GCMKW',
            'A192GCMKW',
            'A256GCMKW',
            'PBES2-HS256+A128KW',
            'PBES2-HS384+A192KW',
            'PBES2-HS512+A256KW',
        ];
    }
}
exports.JwtAlgos = JwtAlgos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0QWxnb3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWIvdmFsaWRhdGlvbi9jb3JlL2p3dEFsZ29zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsUUFBUTtJQUNuQixrQ0FBa0M7SUFDM0IsTUFBTSxDQUFDLFdBQVc7UUFDdkIsT0FBTztZQUNMLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsT0FBTztZQUNQLE1BQU07WUFDTixRQUFRO1lBQ1IsVUFBVTtZQUNWLGNBQWM7WUFDZCxRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixLQUFLO1lBQ0wsU0FBUztZQUNULGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxXQUFXO1lBQ1gsV0FBVztZQUNYLG9CQUFvQjtZQUNwQixvQkFBb0I7WUFDcEIsb0JBQW9CO1NBQ3JCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFwQ0QsNEJBb0NDIn0=