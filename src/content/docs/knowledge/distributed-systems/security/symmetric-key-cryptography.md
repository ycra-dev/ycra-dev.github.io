---
title: "대칭키 암호 (Symmetric-Key Cryptography)"
description: "암호화와 복호화에 동일한 키를 사용하는 암호 방식으로 AES가 현재 표준이며 키 분배 문제가 핵심 약점이다"
tags: ["Security", "Cryptography", "Symmetric-Key", "AES", "DES"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/distributed-systems/symmetric-key-cryptography
sidebar:
  order: 28
---

## 핵심 개념

대칭키 암호(Symmetric-Key Cryptography)는 암호화와 복호화에 **동일한 키**를 사용하는 암호 방식이다. 발신자와 수신자가 사전에 같은 비밀 키를 공유하고, 이 키로 메시지를 암호화하고 복호화한다. AES가 현재 표준이며, 키 분배 문제가 핵심 약점이다.

## 동작 원리

**역사적 발전**:
- **DES(Data Encryption Standard, 1977)**: 미국 정부 표준. 56비트 키. 1990년대 후반 컴퓨팅 능력 향상으로 브루트 포스 공격에 취약해짐.
- **Triple DES(3DES)**: DES를 3번 적용하여 보안 강화. 과도기적 해결책.
- **AES(Advanced Encryption Standard, 2001)**: DES의 후속 표준. 128/192/256비트 키 지원. 현재 전 세계적으로 가장 널리 사용되는 대칭키 암호.

**키 길이와 보안**:
- 키 길이가 1비트 늘어날 때마다 가능한 키의 수는 2배로 증가
- 56비트(DES): 2^56 ≈ 7.2 × 10^16 가지 → 현대 컴퓨터로 몇 시간 내 해독 가능
- 128비트(AES): 2^128 ≈ 3.4 × 10^38 가지 → 우주의 나이만큼 시간이 걸려도 불가능
- 256비트(AES): 사실상 영원히 해독 불가

**키 분배 문제(Key Distribution Problem)**:
대칭키 암호의 근본적 약점은 "안전한 통신을 하려면 먼저 키를 안전하게 전달해야 한다"는 모순이다. 이 문제를 해결한 것이 공개키 암호이다.

**장단점**:
- 장점: 연산 속도가 빠르다. 대량의 데이터를 암호화하는 데 적합.
- 단점: 키 분배 문제. 통신 당사자 수가 늘어나면 관리해야 할 키가 기하급수적으로 증가 (n명 → n(n-1)/2개 키).

## 예시

AES 암호화 개념:
```
키: 0110 1010 ... (128비트 = 16바이트)

평문:  "비밀 메시지입니다"
       ↓ AES 암호화 (키 사용)
암호문: 7a 3f b2 91 c4 ... (읽을 수 없는 바이트열)
       ↓ AES 복호화 (같은 키 사용)
평문:  "비밀 메시지입니다"
```

키 분배 문제 시나리오:
```
Alice와 Bob이 암호화 통신을 하려면:
1. Alice가 비밀 키를 생성
2. 이 키를 Bob에게 안전하게 전달해야 함
3. 하지만 통신 채널이 도청당할 수 있음
4. 직접 만나서 교환? → 비현실적 (인터넷 쇼핑 시 매번 만날 수 없음)
→ 공개키 암호로 해결
```

키 관리 문제:
```
3명(A, B, C)이 서로 비밀 통신: 3개 키 필요 (AB, AC, BC)
10명: 45개 키 필요
100명: 4,950개 키 필요
1,000명: 499,500개 키 필요
→ n(n-1)/2 = O(n²) 키 필요
```

## 관련 개념

- [암호학 (Cryptography)](/knowledge/distributed-systems/cryptography/) - 암호학의 두 축 중 하나
- [공개키 암호 (Public-Key Cryptography)](/knowledge/distributed-systems/public-key-cryptography/) - 키 분배 문제를 해결하는 비대칭 방식

## 출처

- Understanding the Digital World, Chapter 12
