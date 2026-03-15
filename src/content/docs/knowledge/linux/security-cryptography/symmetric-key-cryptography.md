---
title: "대칭 키 암호화 (Symmetric Key Cryptography)"
description: "대칭 키 암호화는 송신자와 수신자가 동일한 비밀 키를 사용하여 메시지를 암호화하고 복호화하는 암호화 방식이다"
tags: ['Security', 'Cryptography', 'Aes', 'Encryption', 'Shared Secret']
created: 2026-02-12
updated: 2026-02-17
draft: true
slug: knowledge/linux/symmetric-key-cryptography
sidebar:
  order: 14
---

## 핵심 개념

대칭 키 암호화는 가장 오래된 암호화 형태로, Alice와 Bob이 동일한 비밀 키를 공유하여 메시지를 암호화/복호화한다. 키를 미리 안전하게 교환해야 하는 것이 핵심 제약 사항이다.

**장점:**
- CPU 사용량과 암호화된 페이로드 크기 면에서 효율적
- 효율적인 암호화/복호화가 필요한 애플리케이션에 적합

**단점:**
- 미리 비밀 키를 안전하게 교환해야 함
- 완벽한 보안을 위해서는 직접 대면 교환이 필요

**주요 알고리즘:**
- **AES (Advanced Encryption Standard)**: NIST가 선정한 가장 널리 사용되는 대칭 키 알고리즘
- **Twofish/Blowfish**: Bruce Schneier가 설계한 대안적 알고리즘

대칭 키 암호화는 SSH, TLS, IPsec VPN, PGP 등 거의 모든 네트워크 보안 프로토콜에서 사용된다. 실무에서는 공개 키 암호화로 세션을 설정하고 대칭 키를 교환한 후, 대칭 키로 실제 통신을 암호화하는 하이브리드 암호화 시스템이 일반적이다.

## 예시

```bash
# OpenSSL을 사용한 AES-256 대칭 암호화
# 파일 암호화
openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.bin
# 비밀번호 입력 프롬프트 표시

# 파일 복호화
openssl enc -d -aes-256-cbc -in encrypted.bin -out decrypted.txt

# 키 파일을 사용한 암호화
openssl enc -aes-256-cbc -salt -in data.txt -out data.enc \
  -pass file:/path/to/keyfile
```

## 관련 개념

- [공개 키 암호화 (Public Key Cryptography)](/knowledge/linux/public-key-cryptography/) - 대칭 키 교환 문제를 해결하는 비대칭 암호화
- [TLS/SSL (전송 계층 보안)](/knowledge/linux/tls-ssl/) - 대칭/비대칭 하이브리드 암호화 사용
- [SSH (보안 셸)](/knowledge/linux/ssh/) - 세션 암호화에 대칭 키 사용
- [VPN (가상 사설 네트워크)](/knowledge/linux/vpn/) - VPN 터널의 데이터 암호화
