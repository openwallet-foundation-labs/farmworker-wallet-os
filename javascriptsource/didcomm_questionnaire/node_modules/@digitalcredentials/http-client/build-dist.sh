mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import cjsModule from '../index.js';
export const DEFAULT_HEADERS = cjsModule.DEFAULT_HEADERS;
export const httpClient = cjsModule.httpClient;
export const ky = cjsModule.ky;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
