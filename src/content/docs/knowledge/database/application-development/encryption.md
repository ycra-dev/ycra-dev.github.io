---
title: "Encryption"
description: "암호화(Encryption)는 데이터를 복호화(decryption) 과정 없이는 읽을 수 없는 형태로 변환하는 과정으로, 대칭키 암호화와 공개키(비대칭키) 암호화의 두 가지 주요 방식이 있으며, 데이터 보호, 인증, 디지털 서명 등에 사용된다"
tags: ['Encryption', 'Symmetric Key', 'Public Key', 'Aes', 'Digital Signature', 'Security']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/encryption
sidebar:
  order: 13
---

## 핵심 개념

암호화는 데이터 보안의 근간이다. 좋은 암호화 기법의 조건은 세 가지이다. 첫째, 권한 있는 사용자가 쉽게 암호화/복호화할 수 있어야 한다. 둘째, 알고리즘의 비밀이 아닌 암호화 키에 보안이 의존해야 한다. 셋째, 침입자가 복호화 키를 추론하기가 극히 어려워야 한다.

대칭키 암호화(Symmetric-Key Encryption)는 암호화와 복호화에 동일한 키를 사용한다. AES(Advanced Encryption Standard)가 대표적이며, 128비트 데이터 블록 단위로 동작하고 128/192/256비트 키를 지원한다. 대칭키의 약점은 안전한 키 전달 메커니즘이 필요하다는 것이다. 이전 표준인 DES는 1977년 채택되어 널리 사용되었으나 현재는 AES로 대체되었다.

공개키 암호화(Public-Key Encryption)는 암호화에 공개키(public key)를, 복호화에 개인키(private key)를 사용한다. 공개키로부터 개인키를 추론하는 것이 계산적으로 불가능하므로, 공개키를 자유롭게 배포할 수 있다. 이 방식은 두 개의 큰 소수의 곱은 구하기 쉽지만 역으로 소인수 분해는 극히 어렵다는 수학적 원리에 기반한다. RSA가 대표적이다. 공개키 암호화는 안전하지만 계산 비용이 높아, 실무에서는 공개키로 대칭키를 교환하고 이후 대칭키로 통신하는 하이브리드 방식을 사용한다.

데이터베이스에서의 암호화는 여러 수준에서 적용된다. 디스크 블록 수준의 암호화는 물리적 접근으로부터 보호하고, 속성 수준의 암호화는 민감한 데이터(신용카드 번호 등)만 선택적으로 암호화한다. 소규모 값의 암호화 시 사전 공격(dictionary attack)을 방지하기 위해 초기화 벡터(initialization vector)나 솔트(salt) 비트를 추가한다.

디지털 서명(Digital Signature)은 공개키 암호화의 역방향 활용으로, 개인키로 데이터를 "서명"하고 공개키로 검증한다. 데이터의 인증성과 부인 방지(non-repudiation)를 보장한다. 디지털 인증서(Digital Certificate)는 인증 기관(CA)이 공개키에 서명하여 웹 사이트의 정당성을 증명하며, HTTPS 프로토콜의 기반이다.

챌린지-응답(Challenge-Response) 시스템은 네트워크를 통해 비밀번호를 직접 전송하지 않고 암호화를 이용하여 인증하는 방식이다. 서버가 챌린지 문자열을 보내면 사용자가 비밀 키로 암호화하여 반환하고, 서버가 같은 키로 복호화하여 검증한다.

## 예시

```
-- 대칭키 암호화 (AES) 개념
-- 원문: "Perryridge"
-- 키: 128비트 비밀키
-- 암호문: "Qfsszsjehf..." (실제 AES 출력은 이진 데이터)
-- 같은 키로 복호화하여 원문 복원

-- 공개키 암호화 (RSA) 개념
-- 사용자 U1의 키 쌍: (공개키 E1, 개인키 D1)
-- U2가 U1에게 데이터 전송 시:
--   암호문 = Encrypt(데이터, E1)  -- U1의 공개키로 암호화
--   원문 = Decrypt(암호문, D1)    -- U1의 개인키로만 복호화 가능

-- 디지털 서명
--   서명 = Encrypt(해시(문서), D1)  -- 개인키로 서명
--   검증: Decrypt(서명, E1) == 해시(문서)?  -- 공개키로 검증
```

```sql
-- 데이터베이스 수준 암호화 예시 (개념)
-- 속성 수준 암호화: 신용카드 번호만 암호화
CREATE TABLE customer (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    -- credit_card는 암호화된 형태로 저장
    credit_card_encrypted VARBINARY(256)
);

-- 사전 공격 방지를 위한 솔트 사용
-- 같은 원문도 다른 솔트로 인해 다른 암호문 생성
-- Encrypt("1234-5678", key, salt1) ≠ Encrypt("1234-5678", key, salt2)
```

## 관련 개념

- [SQL Injection](/knowledge/database/sql-injection/)
- [Cross-Site Scripting](/knowledge/database/cross-site-scripting/)
- [Session Management](/knowledge/database/session-management/)
- [Web Application Architecture](/knowledge/database/web-application-architecture/)
