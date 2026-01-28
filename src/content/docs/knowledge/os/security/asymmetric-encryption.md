---
title: "비대칭 암호화 (Asymmetric Encryption)"
description: "암호화와 복호화에 서로 다른 키(공개 키/개인 키)를 사용하는 암호화 방식"
tags: ["OS", "Security", "Cryptography"]
created: 2026-01-27
updated: 2026-01-27
draft: false
slug: knowledge/os/asymmetric-encryption
sidebar:
  order: 2
---

## 핵심 개념

비대칭 암호화(Asymmetric Encryption)는 암호화와 복호화에 **서로 다른 키**를 사용하는 방식이다. 공개 키(Public Key)로 암호화하고, 개인 키(Private Key)로 복호화한다. **공개 키 암호화**라고도 부른다.

대칭 암호화는 "비밀 키를 어떻게 안전하게 전달하느냐"라는 키 배포 문제가 있다. 1976년 Diffie-Hellman이 공개 채널에서도 안전하게 키를 교환할 수 있는 아이디어를 제안하면서 비대칭 암호화가 탄생했다.

쉽게 말해, 우편함에 누구나 편지를 넣을 수 있지만(공개 키), 열쇠는 소유자만 가지고 있는(개인 키) 것과 같다.

## 동작 원리

### 키 쌍의 특성

| 키 | 역할 | 공개 여부 |
|------|------|------|
| **Public Key (ke)** | 암호화에 사용 | 누구에게나 공개 |
| **Private Key (kd)** | 복호화에 사용 | 소유자만 비밀 유지 |

핵심 조건: 공개 키(ke)에서 개인 키(kd)를 **계산적으로 도출하는 것이 불가능**해야 한다.

### RSA 알고리즘 (Rivest-Shamir-Adleman)

가장 대표적인 비대칭 암호 알고리즘이다.

**키 생성 과정:**
1. 두 큰 소수 p, q 선택 (예: 각 2048비트)
2. N = p x q 계산
3. ke 선택: (p-1)(q-1)과 서로소인 수
4. kd 계산: ke x kd mod (p-1)(q-1) = 1

**암호화/복호화:**
```
암호화: c = m^ke mod N
복호화: m = c^kd mod N
```

### 예시 (작은 수로 이해하기)

```
p = 7, q = 13
N = 91
(p-1)(q-1) = 72
ke = 5  (72와 서로소)
kd = 29 (5 × 29 mod 72 = 1)

공개 키: (5, 91)
개인 키: (29, 91)

암호화: 69^5 mod 91 = 62
복호화: 62^29 mod 91 = 69
```

### 정상 통신과 MITM 공격

```
[정상 흐름]
Bob ──── 공개 키 ke ────→ Alice
Bob ←──── E_ke(m) ─────── Alice
Bob: D_kd(c) = m  (복호화 성공)

[MITM 공격]
Bob ── ke ──→ Attacker ── k_bad ──→ Alice
Bob ←── E_kbad(m) ── Attacker ←── Alice
→ Attacker가 m을 복호화 가능!
```

MITM(중간자 공격)에서 공격자가 가짜 공개 키를 전송할 수 있다. 이 문제를 해결하기 위해 **Digital Certificate**를 사용한다.

### Digital Certificate와 CA 신뢰 체인

**Digital Certificate** 구성:
- 서버 속성 (DN, 도메인명)
- 공개 키
- 유효 기간
- **CA(Certificate Authority)의 디지털 서명**
- X.509 표준 형식 사용

**신뢰 체인 (Chain of Trust):**

```
[인증서로 방어]
Bob ── cert(ke, CA서명) ──→ Alice
Alice: CA 서명 검증 → ke가 Bob의 것임을 확신

[신뢰 체인 구조]
Root CA (브라우저에 내장)
  └─ Intermediate CA
       └─ 서버 인증서
```

브라우저에 Root CA의 공개 키가 내장되어 있고, Root CA가 Intermediate CA를 보증하고, Intermediate CA가 서버 인증서를 보증하는 체인 구조이다.

### 장단점

| 장점 | 단점 |
|------|------|
| 공개 키를 자유롭게 배포 가능 | 계산 비용이 높음 (대칭 암호 대비) |
| 키 관리 단순화 (N명에 N개 키) | 대용량 데이터 암호화에 부적합 |

실무에서는 비대칭 암호로 **세션 키(대칭 키)**를 교환한 뒤, 실제 데이터는 대칭 암호로 암호화하는 하이브리드 방식을 사용한다.

## 예시

웹사이트 방문 시 HTTPS가 동작하는 흐름:
1. 브라우저가 서버에 접속 요청
2. 서버가 **인증서**(공개 키 + CA 서명)를 전송
3. 브라우저가 CA 서명을 검증하여 공개 키의 진위 확인
4. 브라우저가 **세션 키**를 생성, 공개 키로 암호화하여 전송
5. 이후 대칭 암호(세션 키)로 실제 데이터 암호화 통신

## 관련 개념

- [인증 (Authentication)](/knowledge/os/authentication/)
- [공격 유형 (Attack Types)](/knowledge/os/attack-types/)
- [코드 인젝션 (Code Injection)](/knowledge/os/code-injection/)
