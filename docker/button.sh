#!/usr/bin/env bash

sleep ${SLEEP_TIME}

sed \
-e "s/\$DATABASE_HOST/$DATABASE_HOST/g" \
-e "s/\$DATABASE_PORT/$DATABASE_PORT/g" \
-e "s/\$DATABASE_USERNAME/$DATABASE_USERNAME/g" \
-e "s/\$DATABASE_PASSWORD/$DATABASE_PASSWORD/g" \
< ormconfig.template.json > ormconfig.json

cat ormconfig.json

export NODE_ENV=production

echo "Applying migrations"

npm run migrations

echo "Applied migrations"

sleep 1

echo "Starting server"

npm run start:docker
