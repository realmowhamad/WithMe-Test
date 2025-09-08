#!/bin/sh

# Check if we're in development or production mode
if [ "$NODE_ENV" = "production" ]; then
    echo "Building and starting production frontend..."
    npm run build
    npm run preview -- --host 0.0.0.0 --port 3000
else
    echo "Starting development frontend..."
    npm run dev -- --host 0.0.0.0 --port 5173
fi
