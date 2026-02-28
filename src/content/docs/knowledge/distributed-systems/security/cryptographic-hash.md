---
title: "암호학적 해시 (Cryptographic Hash)"
description: "임의 길이의 입력 데이터를 고정 길이의 출력값으로 변환하는 단방향 함수로 역산이 불가능하고 충돌 내성을 가진다"
tags: ["Security", "Cryptography", "Hash", "SHA", "Integrity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/cryptographic-hash
sidebar:
  order: 31
---

## 핵심 개념

암호학적 해시(Cryptographic Hash)는 임의 길이의 입력 데이터를 고정 길이의 출력값(다이제스트)으로 변환하는 **단방향 함수**로, 역산이 불가능하고 충돌 내성을 가진다. 디지털 세계의 "지문(fingerprint)"과 같다.

## 동작 원리

**핵심 속성**:
1. **고정 길이 출력**: 입력이 1바이트든 1기가바이트든 출력 크기는 동일
2. **단방향성(One-way)**: 해시값으로부터 원래 입력을 역산하는 것이 사실상 불가능
3. **충돌 내성(Collision Resistance)**: 같은 해시값을 가지는 서로 다른 두 입력을 찾는 것이 극도로 어려움
4. **눈사태 효과(Avalanche Effect)**: 입력이 1비트만 변해도 출력이 완전히 달라짐

**주요 알고리즘**:
- **MD5**: 128비트 출력. 한때 널리 사용되었으나 충돌이 발견되어 보안 용도로는 더 이상 권장되지 않음
- **SHA-1**: 160비트 출력. 역시 충돌이 발견되어 비권장
- **SHA-2 (SHA-256, SHA-512)**: 현재 표준. 256비트 또는 512비트 출력. 안전하다고 간주됨
- **SHA-3**: 최신 표준. SHA-2와 다른 구조(Keccak)로 설계

**활용 분야**:
- **디지털 서명**: 메시지 전체 대신 해시를 서명하여 효율성 확보
- **무결성 검증**: 파일 다운로드 후 해시 비교로 변조 여부 확인
- **비밀번호 저장**: 비밀번호의 해시만 저장 (원본 비밀번호를 저장하지 않음)
- **블록체인**: 블록의 무결성과 체인 연결에 해시 사용

## 예시

SHA-256 해시 예시:
```
입력: "Hello"
해시: 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969

입력: "Hello!" (느낌표 하나 추가)
해시: 334d016f755cd6dc58c53a86e183882f8ec14f52fb05345887c8a5edd42c87b7

→ 한 글자 차이인데 해시값이 완전히 다름 (눈사태 효과)
```

비밀번호 저장:
```
서버의 비밀번호 데이터베이스:
  user1: SHA-256("mypassword123") = 5e884898da...
  user2: SHA-256("qwerty456")    = 65e84be33f...

로그인 시:
1. 사용자가 비밀번호 입력: "mypassword123"
2. 서버: SHA-256("mypassword123") = 5e884898da...
3. 저장된 해시와 비교: 일치 → 로그인 허용

장점: 데이터베이스가 유출되어도 원래 비밀번호를 알 수 없음
```

파일 무결성 검증:
```
소프트웨어 다운로드 페이지:
  파일: linux-iso.img
  SHA-256: a1b2c3d4e5f6...

다운로드 후 확인:
  $ sha256sum linux-iso.img
  a1b2c3d4e5f6...  → 일치하면 파일이 변조되지 않았음을 확인
```

## 관련 개념

- [디지털 서명 (Digital Signature)](/knowledge/distributed-systems/digital-signature/) - 메시지의 해시를 서명하여 효율성과 보안 확보
- [암호학 (Cryptography)](/knowledge/distributed-systems/cryptography/) - 암호학의 핵심 구성 요소

## 출처

- Understanding the Digital World, Chapter 12
