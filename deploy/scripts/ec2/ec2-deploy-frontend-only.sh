#!/bin/bash

# EC2 Frontend Only Deployment Script

set -e  # Exit on error

# 프로젝트 루트 경로 설정
PROJECT_ROOT=${PROJECT_ROOT:-$(pwd)}
COMPOSE_FILE="${PROJECT_ROOT}/deploy/configs/docker/docker-compose.frontend-only.yml"

echo "Starting EC2 frontend only deployment..."
echo "📁 Project root: ${PROJECT_ROOT}"
echo "📄 Compose file: ${COMPOSE_FILE}"

# SSL certificate check and generation
if [ ! -f "${PROJECT_ROOT}/deploy/configs/nginx/ssl/cert.pem" ] || [ ! -f "${PROJECT_ROOT}/deploy/configs/nginx/ssl/key.pem" ]; then
    echo "SSL certificate not found. Generating self-signed certificate..."
    mkdir -p "${PROJECT_ROOT}/deploy/configs/nginx/ssl"
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "${PROJECT_ROOT}/deploy/configs/nginx/ssl/key.pem" \
        -out "${PROJECT_ROOT}/deploy/configs/nginx/ssl/cert.pem" \
        -subj "/C=KR/ST=Seoul/L=Seoul/O=DevLoper/CN=localhost"
    echo "Self-signed SSL certificate generation completed"
fi

# Docker service status check
echo "Checking Docker service status..."
if ! systemctl is-active --quiet docker; then
    echo "Docker service is not running. Starting..."
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# Clean up existing containers
echo "Cleaning up existing containers..."
docker-compose -f "${COMPOSE_FILE}" down --remove-orphans

# Clean up existing images (optional)
read -p "Do you want to delete all existing Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Deleting existing images..."
    docker system prune -af
fi

# Build frontend image
echo "Building frontend image..."
docker-compose -f "${COMPOSE_FILE}" build --no-cache

# Start containers
echo "Starting frontend containers..."
docker-compose -f "${COMPOSE_FILE}" up -d

# Wait for health check
echo "Waiting for service health check..."
sleep 15

# Status check
echo "Checking service status..."
docker-compose -f "${COMPOSE_FILE}" ps

# Log check
echo "Checking recent logs..."
docker-compose -f "${COMPOSE_FILE}" logs --tail=30

# System resource check
echo "Checking system resources..."
echo "Memory usage:"
free -h
echo ""
echo "Disk usage:"
df -h
echo ""
echo "Docker usage:"
docker system df

# Port usage check
echo "Checking port usage status..."
echo "Port 80:"
sudo netstat -tlnp | grep :80 || echo "No process using port 80"
echo ""
echo "Port 443:"
sudo netstat -tlnp | grep :443 || echo "No process using port 443"

echo "EC2 frontend only deployment completed!"
echo "Access URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Monitoring: docker-compose -f \"${COMPOSE_FILE}\" logs -f"
echo "Container management: docker-compose -f \"${COMPOSE_FILE}\" ps"
echo "Restart: docker-compose -f \"${COMPOSE_FILE}\" restart"
echo "Stop: docker-compose -f \"${COMPOSE_FILE}\" down"
