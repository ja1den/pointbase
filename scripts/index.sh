#!/bin/bash

# Import
source $(dirname "$0")/lib/colors.sh

# Read Option
OPTION=$1

# Empty?
if [ -z "$OPTION" ]; then
    # List Options
	echo -e "${D}Select an option:${N}"
	echo -e ""
	
	echo -e "${G}Build Image${N} ${D}................${N} ${C}[b]${N}"
	echo -e "${G}Hash Password${N} ${D}..............${N} ${C}[h]${N}"
	echo -e "${G}Kill Port${N} ${D}..................${N} ${C}[k]${N}"
	echo -e "${G}Populate Database${N} ${D}..........${N} ${C}[p]${N}"
	echo -e ""

	# Read Option
	read OPTION

	# Log
	echo -e ""
fi

# Run Option
shopt -s nocasematch

case $OPTION in
	# Build Image
	b | build)
		# Read Input
		INPUT=$2

		# Empty?
		if [ -z "$INPUT" ]; then
			# Log
			echo -e -n "${D}Image name: ${N}"

			# Read Input
			read INPUT

			# Log
			echo -e ""
		fi

		# Script
		$(dirname "$0")/build.sh $INPUT
	;;

	# Hash Password
	h | hash)
		# Read Input
		INPUT=$2

		# Empty?
		if [ -z "$INPUT" ]; then
			# Log
			echo -e -n "${D}Password: ${N}"

			# Read Input
			read INPUT

			# Log
			echo -e ""
		fi

		# Script
		$(dirname "$0")/bcrypt.sh $INPUT
	;;

	# Kill Port
	k | kill)
		# Read Input
		INPUT=$2

		# Empty?
		if [ -z "$INPUT" ]; then
			# Log
			echo -e -n "${D}Port: ${N}"

			# Save Position
			tput sc

			# Read Input
			read INPUT

			# Empty?
			[ -z "$INPUT" ] && tput rc && echo -e "3000"
			
			# Log
			echo -e ""
		fi

		# Script
		$(dirname "$0")/kill.sh $INPUT
	;;

	# Populate Database
	p | populate)
		# Script
		node -r dotenv/config $(dirname "$0")/populate.js
	;;

	# Not Found?
	*)
		# Log
    	echo -e "${R}Script \"$OPTION\" not found.${N}"
    ;;
esac
