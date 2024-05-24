mkdir ./dist/esm
cat >dist/esm/index.js <<!EOF
import cjsModule from '../index.js';
export const createList = cjsModule.createList;
export const decodeList = cjsModule.decodeList;
export const createCredential = cjsModule.createCredential;
export const getCredentialStatus = cjsModule.getCredentialStatus;
export const checkStatus = cjsModule.checkStatus;
export const statusTypeMatches = cjsModule.statusTypeMatches;
export const assertStatusList2021Context = cjsModule.assertStatusList2021Context;
export const StatusList = cjsModule.StatusList;
!EOF

cat >dist/esm/package.json <<!EOF
{
  "type": "module"
}
!EOF
