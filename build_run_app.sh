#!/bin/bash

echo "🛑 Shutting down containers..."
docker-compose down --volumes --remove-orphans

echo "🔧 Rebuilding containers without cache..."
docker-compose build --no-cache

echo "🚀 Starting containers..."
docker-compose up
