#!/usr/bin/env bash

sleep ${SLEEP_TIME}

echo "Applying migrations"

npm migrations

echo "Applied migrations"

sleep 1

echo "Starting server"

npm start
