#!/bin/bash

# Import
source $(dirname "$0")/lib/colors.sh

# Name Exists?
if [ -z $1 ]; then
	echo -e "${R}No name provided.${N}"
	exit 1
fi

# Build Image
docker build . -t $1

# Log
echo
echo -e "${G}Build complete.${N}"
