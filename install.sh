#!/bin/bash
rm -rf ./javascriptsource/didcomm_survey/node_modules
rm     ./javascriptsource/didcomm_survey/yarn.lock
rm -rf ./javascriptsource/agent_sdk/node_modules
rm     ./javascriptsource/agent_sdk/yarn.lock
rm -rf ./javascriptsource/keymanagement/node_modules
rm     ./javascriptsource/keymanagement/yarn.lock
cd ./javascriptsource/didcomm_survey/
yarn install
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ../agent_sdk
yarn install
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ../keymanagement
yarn install
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
