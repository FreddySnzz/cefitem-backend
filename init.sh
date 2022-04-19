#!/bin/sh

echo "Running Dev Mode"
#./wait-for-it.sh -t 0 mysql:3306
# ./wait-for-it.sh -t 0 postgres:5432
# npx sequelize db:drop 
npx sequelize db:create
npx sequelize db:migrate
yarn start
