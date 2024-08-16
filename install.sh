#!/usr/bin/env bash
PACKAGE_MANAGER=yarn
OS="`uname`"
function main() {
	get_os
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
	if [ "$PACKAGE_MANAGER" == "yarn" ]; then
		echo "installing using yarn ("$OS") ..."
	elif [ "$PACKAGE_MANAGER" == "npm" ]; then
		echo "installing using npm"
	else
		echo "invalid package manager"
		exit 1
	fi
	PACKAGE_MANAGER_PATH=$(which $PACKAGE_MANAGER 2>/dev/null)
	if [ -z "$PACKAGE_MANAGER_PATH" ]; then
		echo "$PACKAGE_MANAGER not found"
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
		retry 100 yarn install
	elif [ "$PACKAGE_MANAGER" == "npm" ]; then
		retry 100 npm install --legacy-peer-deps
	fi
	find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
	cd ../agent_sdk
	if [ "$PACKAGE_MANAGER" == "yarn" ]; then
		retry 100 yarn install
	elif [ "$PACKAGE_MANAGER" == "npm" ]; then
		retry 100 npm install --legacy-peer-deps
	fi
	find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
	cd ../keymanagement
	if [ "$PACKAGE_MANAGER" == "yarn" ]; then
		retry 100 yarn install
	elif [ "$PACKAGE_MANAGER" == "npm" ]; then
		retry 100 npm install --legacy-peer-deps
	fi
	find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
	exit 0
}
function print_usage() {
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
function get_os() {
	case $OS in
		'Linux')
			if [[ $(grep -i Microsoft /proc/version) ]]; then
				OS='WSL'
			else
				OS='Linux'
			fi
			;;
		'FreeBSD')
			OS='FreeBSD'
			;;
		'WindowsNT')
			OS='Windows'
			;;
		'Darwin') 
			OS='Mac'
			;;
		'SunOS')
			OS='Solaris'
			;;
		'AIX')
			OS='AIX'
			;;
		'msys')
			OS='MSYS'
			;;
		*)
			OS='unknown'
			case $OSTYPE in
				'msys')
					OS='MSYS'
					;;
				*)
					OS='unknown'
					;;
			esac
			;;
	esac
}
retry() {
	local -r -i max_attempts="$1"; shift
	local -i attempt_num=1
	until "$@"
	do
		if ((attempt_num==max_attempts))
		then
			echo "Attempt $attempt_num failed and there are no more attempts left!"
			return 1
		else
			echo "Attempt $attempt_num failed! Trying again in $attempt_num seconds..."
			sleep $((attempt_num++))
		fi
	done
}
main "$@"
