#!/bin/sh
/usr/bin/mysqld_safe --skip-grant-tables &
sleep 20
mysql -u root -e "CREATE DATABASE cefitem-backend-db"
mysql -u root mydb < /tmp/dump.sql
