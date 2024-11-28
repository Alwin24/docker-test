#!/bin/bash

# Stop and remove the container if it exists
docker-compose down

# Remove unused Docker images and containers
docker system prune -f
