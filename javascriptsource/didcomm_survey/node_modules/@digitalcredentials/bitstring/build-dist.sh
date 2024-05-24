mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import * as cjsModule from '../index.js';
export const Bitstring = cjsModule.Bitstring;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
