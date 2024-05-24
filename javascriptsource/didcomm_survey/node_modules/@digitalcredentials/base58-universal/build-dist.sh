mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import cjsModule from '../index.js';
export const encode = cjsModule.encode;
export const decode = cjsModule.decode;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
