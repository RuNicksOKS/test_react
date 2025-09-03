#!/bin/bash
# web-console-troubleshoot.sh - AWS 웹 콘솔 접속 문제 해결 스크립트

echo "=== AWS 웹 콘솔 EC2 접속 문제 해결 가이드 ==="
echo ""

echo "🔍 문제 진단 단계:"
echo ""

echo "1️⃣ 인스턴스 상태 확인:"
echo "   - AWS 콘솔 → EC2 → 인스턴스 → 상태가 '실행 중'인지 확인"
echo "   - 상태 검사가 '2/2 통과'인지 확인"
echo ""

echo "2️⃣ 보안 그룹 설정 확인:"
echo "   - EC2 → 보안 그룹 → 인스턴스에 연결된 보안 그룹 선택"
echo "   - 인바운드 규칙에 SSH(22) 포트가 열려있는지 확인"
echo "   - 소스가 0.0.0.0/0 또는 특정 IP로 설정되어 있는지 확인"
echo ""

echo "3️⃣ 인스턴스 유형 확인:"
echo "   - t3.micro, t3.small 등은 웹 콘솔 접속 지원"
echo "   - 일부 GPU 인스턴스나 특수 목적 인스턴스는 지원 안 될 수 있음"
echo ""

echo "🛠️ 해결 방법:"
echo ""

echo "방법 1: 보안 그룹에 EC2 Instance Connect IP 추가"
echo "   - SSH 규칙에 다음 IP 범위 추가:"
echo "     * 18.206.107.24/29 (us-east-1 리전)"
echo "     * 18.208.4.0/29 (us-east-1 리전)"
echo "     * 또는 임시로 0.0.0.0/0 (모든 IP) 허용"
echo ""

echo "방법 2: 인스턴스 재부팅"
echo "   - EC2 → 인스턴스 → 인스턴스 상태 → 인스턴스 재부팅"
echo "   - 재부팅 완료 후 다시 접속 시도"
echo ""

echo "방법 3: 브라우저 관련 문제 해결"
echo "   - 다른 브라우저에서 시도"
echo "   - 시크릿/프라이빗 모드에서 시도"
echo "   - 브라우저 캐시 및 쿠키 삭제"
echo "   - 브라우저 확장 프로그램 비활성화"
echo ""

echo "방법 4: 로컬 SSH 연결 (대안)"
echo "   - 키 파일 다운로드 (AWS 콘솔에서)"
echo "   - 키 파일 권한 설정: chmod 400 your-key.pem"
echo "   - SSH 연결: ssh -i your-key.pem ubuntu@your-ec2-public-ip"
echo ""

echo "방법 5: AWS CLI를 통한 접속"
echo "   - AWS CLI 설치 후"
echo "   - aws ec2-instance-connect send-ssh-public-key 명령어 사용"
echo ""

echo "📋 체크리스트:"
echo "   □ 인스턴스가 실행 중인가?"
echo "   □ 상태 검사가 통과했는가?"
echo "   □ 보안 그룹에 SSH(22) 포트가 열려있는가?"
echo "   □ 인스턴스 유형이 웹 콘솔 접속을 지원하는가?"
echo "   □ 다른 브라우저에서 시도해봤는가?"
echo "   □ 인스턴스를 재부팅해봤는가?"
echo ""

echo "🚨 여전히 문제가 있다면:"
echo "   - AWS 지원팀에 문의"
echo "   - 인스턴스 콘솔 출력 확인 (부팅 문제 진단)"
echo "   - CloudWatch 로그 확인"
echo "   - VPC 및 네트워크 설정 확인"
echo ""

echo "💡 팁:"
echo "   - 웹 콘솔 접속이 안 될 때는 로컬 SSH 연결을 사용하는 것이 더 안정적"
echo "   - 프로덕션 환경에서는 보안 그룹을 최소한의 IP만 허용하도록 설정"
echo "   - 정기적으로 인스턴스 상태 및 보안 그룹 설정 점검"
