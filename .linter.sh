#!/bin/bash
cd /home/kavia/workspace/code-generation/tictactoe-duel-44204-0dc73d23/tic_tac_toe_game
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

