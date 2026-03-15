---
title: "공개 키 암호화 (Public Key Cryptography)"
description: "공개 키 암호화(비대칭 암호화)는 수학적으로 연결된 공개 키와 개인 키 쌍을 사용하여, 사전 키 교환 없이 안전한 통신과 디지털 서명을 가능하게 하는 암호화 방식이다"
tags: ['Security', 'Cryptography', 'Rsa', 'Asymmetric', 'Digital Signature', 'Diffie Hellman']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/public-key-cryptography
sidebar:
  order: 15
---

## 핵심 개념

1970년대에 발명된 공개 키 암호화는 대칭 키의 핵심 제약인 사전 키 교환 문제를 해결한 혁명적 발전이다.

**작동 원리:**
1. Alice가 키 쌍(공개 키 + 개인 키)을 생성하고 공개 키를 공개
2. Bob도 마찬가지로 키 쌍 생성 및 공개 키 공개
3. Alice가 Bob에게 메시지를 보낼 때, Bob의 공개 키로 암호화
4. 개인 키를 가진 Bob만이 메시지를 복호화 가능

**디지털 서명:**
Alice가 자신의 개인 키로 메시지에 서명하면, Bob은 Alice의 공개 키를 사용하여 메시지의 진정성(Alice가 보낸 것임)을 검증할 수 있다.

**주요 알고리즘:**
- **Diffie-Hellman-Merkle**: 최초의 공개 키 교환 방식
- **RSA**: Ron Rivest, Adi Shamir, Leonard Adleman이 개발한 암호화 시스템

**트랩도어 함수(Trapdoor Function):**
비대칭 암호화는 값을 계산하기는 쉽지만, 그 값을 만들어낸 단계를 역추적하기는 극히 어려운 수학적 개념에 기반한다. 성능 특성상 대량 데이터 암호화에는 비효율적이므로, 대칭 키 교환 수단으로 사용된 후 대칭 키가 실제 통신을 암호화하는 하이브리드 방식이 일반적이다.

## 예시

```bash
# RSA 2048비트 개인 키 생성
openssl genrsa -out private.pem 2048

# 개인 키에서 공개 키 추출
openssl rsa -in private.pem -pubout -out public.pem

# 공개 키로 파일 암호화
openssl rsautl -encrypt -pubin -inkey public.pem \
  -in message.txt -out message.enc

# 개인 키로 복호화
openssl rsautl -decrypt -inkey private.pem \
  -in message.enc -out message_decrypted.txt

# 디지털 서명 생성
openssl dgst -sha256 -sign private.pem -out signature.bin document.pdf

# 서명 검증
openssl dgst -sha256 -verify public.pem \
  -signature signature.bin document.pdf
```

## 관련 개념

- [대칭 키 암호화 (Symmetric Key Cryptography)](/knowledge/linux/symmetric-key-cryptography/) - 하이브리드 암호화에서 함께 사용
- [PKI와 인증 기관 (PKI and Certificate Authority)](/knowledge/linux/pki-certificate-authority/) - 공개 키의 신뢰성 보장 인프라
- [TLS/SSL (전송 계층 보안)](/knowledge/linux/tls-ssl/) - 공개 키 암호화를 활용하는 프로토콜
- [SSH (보안 셸)](/knowledge/linux/ssh/) - SSH 공개 키 인증
