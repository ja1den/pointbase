#!/bin/bash

# Import
source $(dirname "$0")/lib/colors.sh

# Locate Process
PID=$(lsof -ti:${1-3000})

# Process Found?
if [ -z $PID ]; then
	echo -e "${R}No process found.${N}"
	exit 1
fi

# Kill Process
KILL=$(kill $PID 2>&1 > /dev/null)

# Handle Errors
if [ $? -ne 0 ]; then
	echo -e "${R}$KILL${N}"
	exit 1
fi

# Log
echo -e "${G}Killed process $PID.${N}"
