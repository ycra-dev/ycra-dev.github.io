---
title: "TLS/SSL (전송 계층 보안)"
description: "TLS(Transport Layer Security)는 공개 키 암호화와 PKI를 사용하여 네트워크 노드 간 통신을 보호하는 프로토콜로, SSL(Secure Sockets Layer)의 후속 버전이다"
tags: ['Security', 'Cryptography', 'HTTPS', 'Transport Layer', 'Encryption', 'Certificate']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/tls-ssl
sidebar:
  order: 16
---

## 핵심 개념

TLS는 TCP 연결을 래핑하는 별도의 보안 계층으로 동작한다. HTTP와 결합하면 HTTPS가 되며, SMTP 등 다른 프로토콜도 보호할 수 있다. OSI 모델에서 레이어 4와 7 사이에 위치한다.

**TLS의 보호 범위:**
- 클라이언트와 서버 간 TLS 연결이 수립되면 URL과 모든 헤더를 포함한 교환 내용이 암호화
- 공격자는 TCP 연결을 통해 호스트와 포트만 확인 가능

**TLS 인증 방식:**
- **단방향 TLS**: 클라이언트가 서버를 검증 (일반적 웹 HTTPS)
- **양방향 TLS(Mutual TLS)**: 클라이언트도 서버에 자신의 인증서를 제시하여 신원 증명. Netflix 셋톱박스가 API에 인증하는 방식으로 사용

**버전 관리:**
- SSL 모든 버전과 TLS 1.0은 알려진 취약점이 있어 비활성화해야 함
- TLS 1.2가 권장 최소 버전
- TLS 1.3은 주요 변경 사항을 도입

**openssl 명령어:**
- 관리자의 TLS 멀티툴로, 키 쌍 생성, 인증서 서명 요청(CSR) 작성, 원격 서버의 TLS 속성 디버깅 등 다양한 암호화 작업 수행 가능

## 예시

```bash
# 2048비트 개인 키 생성
openssl genrsa -out admin.com.key 2048

# 인증서 서명 요청(CSR) 생성
openssl req -new -key admin.com.key -out admin.com.csr

# 인증서 속성 확인
openssl x509 -in certificate.crt -text -noout

# 원격 서버 TLS 디버깅
openssl s_client -connect google.com:443

# TLS 버전 지원 확인
openssl s_client -connect server.com:443 -tls1_2

# Let's Encrypt 무료 인증서 발급 (certbot 사용)
sudo certbot --nginx -d www.example.com
```

## 관련 개념

- [PKI와 인증 기관 (PKI and Certificate Authority)](/knowledge/linux/pki-certificate-authority/) - TLS 인증서의 신뢰 체계
- [공개 키 암호화 (Public Key Cryptography)](/knowledge/linux/public-key-cryptography/) - TLS의 기반 암호화 기술
- [대칭 키 암호화 (Symmetric Key Cryptography)](/knowledge/linux/symmetric-key-cryptography/) - TLS 세션에서의 데이터 암호화
- [SSH (보안 셸)](/knowledge/linux/ssh/) - TLS와 유사한 보안 원칙을 사용하는 프로토콜
