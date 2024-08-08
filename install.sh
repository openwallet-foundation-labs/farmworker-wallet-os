#!/bin/bash
PACKAGE_MANAGER=yarn
function print_usage()
{
	echo "Usage: $0 [-p|--package_manager|-h|--help]"
	echo "	-p=PACKAGE_MANAGER"
	echo "		install using PACKAGE_MANAGER"
	echo "	--package_manager=PACKAGE_MANAGER"
	echo "		install using PACKAGE_MANAGER"
	echo "	--h"
	echo "		prints help"
	echo "	--help"
	echo "		prints help"
	echo "	PACKAGE_MANAGER"
	echo "		yarn (default)"
	echo "		npm"

}
for i in "$@"; do
case $i in
    -h|--help)
	print_usage
	exit 0
    ;;
    -p=*|--package_manager=*)
	PACKAGE_MANAGER="${i#*=}"
    ;;
    *)
	echo "invalid option"
	print_usage
	exit 1
    ;;
esac
done
# Equality Comparison
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	echo "installing using yarn"
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	echo "installing using npm"
else
	echo "invalid package manager"
	exit 1
fi
rm -rf ./javascriptsource/didcomm_survey/node_modules
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	rm -rf ./javascriptsource/didcomm_survey/yarn.lock
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	rm -rf ./javascriptsource/didcomm_survey/package-lock.json
fi
rm -rf ./javascriptsource/agent_sdk/node_modules
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	rm -rf ./javascriptsource/agent_sdk/yarn.lock
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	rm -rf ./javascriptsource/agent_sdk/package-lock.json
fi
rm -rf ./javascriptsource/keymanagement/node_modules
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	rm -rf ./javascriptsource/keymanagement/yarn.lock
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	rm -rf ./javascriptsource/keymanagement/package-lock.json
fi
cd ./javascriptsource/didcomm_survey/
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	yarn install
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	npm install --legacy-peer-deps
fi
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ../agent_sdk
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	yarn install
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	npm install --legacy-peer-deps
fi
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ../keymanagement
if [ "$PACKAGE_MANAGER" == "yarn" ]; then
	yarn install
elif [ "$PACKAGE_MANAGER" == "npm" ]; then
	npm install --legacy-peer-deps
fi
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
exit 0
