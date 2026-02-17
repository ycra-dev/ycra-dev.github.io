---
title: "PKI and Certificate Authority"
description: "PKI(Public Key Infrastructure)는 인증 기관(CA)이라는 신뢰할 수 있는 제3자를 통해 공개 키의 진정성을 보장하는 체계이며, CA는 디지털 인증서를 발급하여 공개 키와 소유자의 신원을 연결한다"
tags: ['Security', 'Cryptography', 'Pki', 'Certificate', 'Trust', 'Lets Encrypt']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/pki-certificate-authority
sidebar:
  order: 17
---

## 핵심 개념

인터넷 규모에서 공개 키의 진정성을 검증하는 것은 어려운 과제이다. PKI는 이 문제를 CA라는 신뢰할 수 있는 제3자를 통해 해결한다.

**PKI 작동 원리:**
1. Alice와 Bob은 서로 모르지만, 둘 다 CA를 신뢰하고 CA의 공개 키를 알고 있다
2. CA가 Alice와 Bob의 공개 키에 대한 인증서를 자신의 개인 키로 서명
3. Alice와 Bob은 CA의 보증을 확인하여 상대방의 공개 키가 합법적임을 확인

**주요 CA들:**
- GeoTrust, VeriSign 등의 인증서가 운영체제에 번들로 포함
- 현대 데스크톱/모바일 OS는 수백 개의 CA를 기본 신뢰

**Let's Encrypt:**
- 2016년 출시된 무료 인증서 서비스
- EFF, Mozilla Foundation, Cisco 등이 후원
- 자동화된 시스템으로 인증서 발급
- 2016년 말까지 2,400만 개 이상의 인증서 발급

**자체 CA 운영:**
- OpenSSL로 자체 CA를 생성하고 인트라넷 서비스 보호에 사용 가능
- 전문 CA 수준의 엄격한 보안이 없으면 오히려 취약점이 될 수 있음

**CA 침해 위험:**
CA가 해킹되면 전체 신뢰 체계가 무너진다. 여러 CA가 공격자에 의해 침해되거나 정부와 공모한 사례가 있다.

## 예시

```bash
# 자체 CA 생성
openssl genrsa -out ca.key 4096
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt

# 서버 키 및 CSR 생성
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr

# 자체 CA로 서버 인증서 서명
openssl x509 -req -days 365 -in server.csr \
  -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt

# 인증서 상세 정보 확인
openssl x509 -in server.crt -text -noout
# Validity:
#   Not Before: Feb 12 00:00:00 2026 GMT
#   Not After : Feb 12 00:00:00 2027 GMT

# Let's Encrypt로 무료 인증서 발급
sudo certbot certonly --standalone -d example.com
```

## 관련 개념

- [tls-ssl](/knowledge/linux/tls-ssl/) - PKI 인증서를 사용하는 주요 프로토콜
- [public-key-cryptography](/knowledge/linux/public-key-cryptography/) - PKI의 기반 암호화 기술
- [cryptographic-hash](/knowledge/linux/cryptographic-hash/) - 인증서 서명에 사용되는 해시
- [ssh](/knowledge/linux/ssh/) - SSH 호스트 키 검증과의 유사성
