#!/bin/bash
rm -rf ./javascriptsource/didcomm_survey/node_modules
rm -rf ./javascriptsource/agent_sdk/node_modules
rm -rf ./javascriptsource/keymanagement/node_modules
cd ./javascriptsource/didcomm_survey/
npm install --legacy-peer-deps
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ../agent_sdk
npm install --legacy-peer-deps
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ../keymanagement
npm install --legacy-peer-deps
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
