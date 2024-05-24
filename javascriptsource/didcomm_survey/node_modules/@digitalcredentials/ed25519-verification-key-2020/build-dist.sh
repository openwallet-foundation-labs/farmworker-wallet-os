mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import cjsModule from '../index.js';
export const Ed25519VerificationKey2020 = cjsModule.Ed25519VerificationKey2020;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
