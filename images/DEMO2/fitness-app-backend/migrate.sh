#!/bin/bash

# Load .env variables
export $(grep -v '^#' .env | xargs)

# Run schema
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f database/migrations/schema.sql

# Run seed
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f database/seeds/seed_workouts.sql

echo "✅ Migration and seed completed."
