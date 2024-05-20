#!/bin/bash
Y='\033[1;32m'
NC='\033[0m'
clear
echo -e "${Y}"
echo "1/6 Accesing agent_sdk..."
echo -e "${NC}"
cd javascriptsource/agent_sdk
echo -e "${Y}"
echo "2/6 Installing dependencies in agent_sdk..." 
echo -e "${NC}"
yarn install
echo -e "${Y}\n"
echo "3/6 Removing long names from agent_sdk..." 
echo -e "${NC}"
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;
cd ..
echo -e "${Y}"
echo "4/6 Accesing didcomm_survey..." 
echo -e "${NC}"
cd didcomm_survey
echo -e "${Y}"
echo "5/6 Installing dependencies in didcomm_survey..." 
echo -e "${NC}"
yarn install
echo -e "${Y}\n"
echo "6/6 Removing long names from didcommm_survey..." 
echo -e "${NC}"
find ./node_modules -type d -name __tests__ -prune -exec rm -rf {} \;