#!/bin/bash
# ssh-test.sh - SSH 연결 테스트 스크립트

KEY_FILE=$1
PUBLIC_IP=$2
USERNAME=${3:-ubuntu}

if [ -z "$KEY_FILE" ] || [ -z "$PUBLIC_IP" ]; then
    echo "사용법: ./ssh-test.sh <키파일> <퍼블릭IP> [사용자명]"
    echo ""
    echo "예시:"
    echo "  ./ssh-test.sh my-key.pem 1.2.3.4"
    echo "  ./ssh-test.sh my-key.pem 1.2.3.4 ec2-user"
    exit 1
fi

echo "=== SSH 연결 테스트 시작 ==="
echo "키 파일: $KEY_FILE"
echo "퍼블릭 IP: $PUBLIC_IP"
echo "사용자명: $USERNAME"
echo ""

# 키 파일 존재 확인
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ 오류: 키 파일 '$KEY_FILE'을 찾을 수 없습니다."
    exit 1
fi

# 키 파일 권한 확인
echo "1. 키 파일 권한 확인..."
ls -la "$KEY_FILE"
echo ""

# 키 파일 권한 수정
echo "2. 키 파일 권한 수정..."
chmod 400 "$KEY_FILE"
echo "수정된 권한:"
ls -la "$KEY_FILE"
echo ""

# 네트워크 연결 테스트
echo "3. 네트워크 연결 테스트..."
if ping -c 1 "$PUBLIC_IP" > /dev/null 2>&1; then
    echo "✅ Ping 테스트 성공"
else
    echo "⚠️  Ping 테스트 실패 (방화벽에서 차단될 수 있음)"
fi

# SSH 포트 연결 테스트
echo "4. SSH 포트(22) 연결 테스트..."
if timeout 5 bash -c "</dev/tcp/$PUBLIC_IP/22" > /dev/null 2>&1; then
    echo "✅ SSH 포트(22) 연결 성공"
else
    echo "❌ SSH 포트(22) 연결 실패"
    echo "   - 보안 그룹에서 SSH(22) 포트가 열려있는지 확인하세요"
    echo "   - 인스턴스가 실행 중인지 확인하세요"
fi

# SSH 연결 테스트
echo "5. SSH 연결 테스트..."
ssh -o ConnectTimeout=10 -o BatchMode=yes -o StrictHostKeyChecking=no -i "$KEY_FILE" "$USERNAME@$PUBLIC_IP" "echo 'SSH 연결 성공!'" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ SSH 연결 성공!"
    echo ""
    echo "이제 다음 명령어로 연결할 수 있습니다:"
    echo "  ssh -i $KEY_FILE $USERNAME@$PUBLIC_IP"
else
    echo "❌ SSH 연결 실패!"
    echo ""
    echo "문제 해결 방법:"
    echo "1. 키 파일이 올바른지 확인"
    echo "2. 보안 그룹에서 SSH(22) 포트가 열려있는지 확인"
    echo "3. 인스턴스가 실행 중인지 확인"
    echo "4. 사용자명이 올바른지 확인:"
    echo "   - Ubuntu: ubuntu"
    echo "   - Amazon Linux: ec2-user"
    echo "   - RHEL/CentOS: root"
    echo ""
    echo "5. verbose 모드로 더 자세한 정보 확인:"
    echo "   ssh -v -i $KEY_FILE $USERNAME@$PUBLIC_IP"
fi




