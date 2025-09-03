#!/bin/bash

# Portainer 실행 스크립트
echo "🚀 Portainer를 시작합니다..."

# Portainer가 이미 실행 중인지 확인
if docker ps | grep -q portainer; then
    echo "✅ Portainer가 이미 실행 중입니다."
else
    echo "📦 Portainer를 시작합니다..."
    docker run -d \
        --name portainer \
        --restart unless-stopped \
        -p 9000:9000 \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v portainer_data:/data \
        portainer/portainer-ce:latest
    
    echo "✅ Portainer가 성공적으로 시작되었습니다!"
    echo "🌐 접속 주소: http://localhost:9000"
fi
