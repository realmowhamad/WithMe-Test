#!/bin/bash

# Wait for database to be ready
./wait-for-it.sh db:5432 -- python manage.py migrate

# Create superuser if it doesn't exist
python manage.py create_superuser

# Check if we're in development or production mode
if [ "$DEBUG" = "True" ]; then
    echo "Starting Django development server..."
    python manage.py runserver 0.0.0.0:8000
else
    echo "Starting Django with Gunicorn..."
    python manage.py collectstatic --noinput
    gunicorn --bind 0.0.0.0:8000 simple_backend.wsgi:application
fi
