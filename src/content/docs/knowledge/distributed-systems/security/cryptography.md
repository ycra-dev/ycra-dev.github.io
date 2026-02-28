---
title: "암호학 (Cryptography)"
description: "평문을 키를 사용하여 암호문으로 변환하고 인가된 수신자만 원래 정보를 복원할 수 있도록 하는 정보 보호 기술이다"
tags: ["Security", "Cryptography", "Encryption", "Cipher"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/cryptography
sidebar:
  order: 27
---

## 핵심 개념

암호학(Cryptography)은 평문(plaintext)을 키(key)를 사용하여 암호문(ciphertext)으로 변환하고, 인가된 수신자만 원래 정보를 복원할 수 있도록 하는 정보 보호 기술이다.

## 동작 원리

**기본 개념**:
- **평문(Plaintext)**: 원래의 읽을 수 있는 메시지
- **암호문(Ciphertext)**: 암호화된 읽을 수 없는 메시지
- **암호화(Encryption)**: 평문 → 암호문 변환
- **복호화(Decryption)**: 암호문 → 평문 변환
- **키(Key)**: 암호화/복호화에 사용되는 비밀 정보

**역사적 발전**:
1. **시저 암호(Caesar Cipher)**: 각 글자를 일정 수만큼 이동. 단순 치환 암호의 시작.
2. **비즈네르 암호(Vigenere Cipher)**: 키워드를 사용한 다중 알파벳 치환. 수세기 동안 해독 불가로 여겨짐.
3. **에니그마(Enigma)**: 2차 세계대전 독일군의 기계식 암호. 앨런 튜링 등이 해독에 성공.
4. **현대 암호**: 수학적 복잡성에 기반한 컴퓨터 암호. 대칭키(AES)와 공개키(RSA) 방식.

**핵심 원칙 (Kerckhoffs의 원칙)**:
암호 시스템의 안전성은 알고리즘의 비밀이 아니라 **키의 비밀**에 의존해야 한다. 알고리즘은 공개되어도 키만 안전하면 암호는 안전해야 한다.

**현대 암호학의 두 축**:
- **대칭키 암호**: 같은 키로 암호화/복호화. 빠르지만 키 분배 문제.
- **공개키 암호**: 공개키/개인키 쌍 사용. 키 분배 문제 해결. 느림.

현대 인터넷 보안(HTTPS, 전자상거래, 온라인 뱅킹)은 암호학 없이는 불가능하다. 디지털 서명, 해시 함수, 블록체인 등 모든 보안 기술의 기초이다.

## 예시

시저 암호 (키=3):
```
평문:  HELLO WORLD
       H→K, E→H, L→O, L→O, O→R ...
암호문: KHOOR ZRUOG

복호화: 각 글자를 3만큼 역방향 이동
```

현대 암호화 개념:
```
대칭키 암호 (AES):
  평문 + 키(256비트) → 암호화 알고리즘 → 암호문
  암호문 + 같은 키 → 복호화 알고리즘 → 평문

공개키 암호 (RSA):
  평문 + 수신자의 공개키 → 암호화 → 암호문
  암호문 + 수신자의 개인키 → 복호화 → 평문
```

HTTPS 접속 시 암호화 흐름:
```
1. 브라우저 → 서버: 공개키 요청
2. 서버 → 브라우저: 공개키 전송 (인증서와 함께)
3. 브라우저: 임시 대칭키 생성 → 공개키로 암호화하여 전송
4. 이후 양쪽 모두 대칭키로 빠르게 암호화 통신
```

## 관련 개념

- [대칭키 암호 (Symmetric-Key Cryptography)](/knowledge/distributed-systems/symmetric-key-cryptography/) - 대칭키 암호의 상세
- [공개키 암호 (Public-Key Cryptography)](/knowledge/distributed-systems/public-key-cryptography/) - 공개키 암호의 상세
- [디지털 서명 (Digital Signature)](/knowledge/distributed-systems/digital-signature/) - 암호학의 응용: 발신자 인증
- [암호학적 해시 (Cryptographic Hash)](/knowledge/distributed-systems/cryptographic-hash/) - 암호학의 응용: 데이터 무결성
- [블록체인 (Blockchain)](/knowledge/distributed-systems/blockchain-basics/) - 암호학 기술의 종합적 응용
- [Tor](/knowledge/distributed-systems/tor/) - 암호화를 이용한 익명 통신

## 출처

- Understanding the Digital World, Chapter 12
