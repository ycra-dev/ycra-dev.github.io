---
title: "RSA 암호 체계 (RSA Cryptosystem)"
description: "RSA 암호 체계는 큰 소수의 곱의 인수분해가 어렵다는 점에 기반한 공개키 암호 시스템으로, 암호화, 복호화, 디지털 서명을 지원한다"
tags: ['Rsa Cryptosystem', 'Public Key', 'Encryption', 'Digital Signature', 'Number Theory']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rsa-cryptosystem
sidebar:
  order: 5
---

## 핵심 개념

**키 생성**:
1. 두 개의 큰 소수 p, q를 무작위로 선택 (각각 1024비트 이상)
2. n = pq 계산
3. ϕ(n) = (p-1)(q-1) 계산
4. gcd(e, ϕ(n)) = 1인 작은 홀수 e 선택 (공개 지수, 보통 65537)
5. d = e^{-1} mod ϕ(n) 계산 (비밀 지수)
6. 공개키: (e, n), 비밀키: (d, n)

**암호화**: C = M^e mod n (M은 평문, C는 암호문)
**복호화**: M = C^d mod n

**정확성 (오일러 정리 기반)**:
```
C^d = (M^e)^d = M^{ed} (mod n)
ed ≡ 1 (mod ϕ(n))이므로 ed = 1 + kϕ(n)
M^{ed} = M · (M^{ϕ(n)})^k ≡ M · 1^k ≡ M (mod n)
```

**디지털 서명**:
- 서명 생성: σ = M^d mod n (비밀키로 서명)
- 서명 검증: M' = σ^e mod n (공개키로 검증, M' == M 확인)

**보안 가정**:
- n = pq의 인수분해가 계산적으로 어려움
- p, q를 알면 ϕ(n)을 계산하고 d를 구할 수 있으므로 보안이 깨짐
- 현재 가장 좋은 인수분해 알고리즘도 다항 시간이 아님

**필요 구성 요소**:
- 큰 소수 생성: 밀러-라빈 소수 판별법
- 모듈러 지수 연산: 반복 제곱법 O(β³)
- 모듈러 역원: 확장 유클리드 알고리즘

## 예시

```
소규모 예시:
p = 11, q = 29
n = 319, ϕ(n) = 10 × 28 = 280

e = 3 선택 (gcd(3, 280) = 1 ✓)
d = 3^{-1} mod 280 = 187 (∵ 3 × 187 = 561 = 2 × 280 + 1)

공개키: (3, 319), 비밀키: (187, 319)

암호화: M = 100
  C = 100^3 mod 319 = 254

복호화:
  M = 254^{187} mod 319 = 100 ✓
```

## 관련 개념

- [모듈러 연산 (Modular Arithmetic)](/knowledge/algorithms/modular-arithmetic/) - RSA의 수학적 기반
- [소수 판정 (Primality Testing)](/knowledge/algorithms/primality-testing/) - 큰 소수 생성에 필수
- [GCD](/knowledge/algorithms/gcd/) - 키 생성 시 서로소 확인
- [중국인의 나머지 정리 (Chinese Remainder Theorem)](/knowledge/algorithms/chinese-remainder-theorem/) - RSA 복호화 가속
