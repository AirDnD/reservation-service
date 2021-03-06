#!/bin/bash

dropdb --if-exists reservation
dropuser --if-exists reservation_user

createdb reservation
psql reservation < ./db/pschema.sql

psql template1 -c "create user reservation_user;"
psql template2 -c "alter user reservation_user password 'root';"
psql template3 -c "grant all on DATABASE reservation to reservation_user;"
psql reservation -c "GRANT ALL on ALL TABLES in SCHEMA public to reservation_user;"


