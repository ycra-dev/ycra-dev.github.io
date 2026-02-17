---
title: "Chinese Remainder Theorem"
description: "중국인의 나머지 정리(Chinese Remainder Theorem, CRT)는 쌍별 서로소(pairwise coprime)인 법 n_1, n_2, "
tags: ['Chinese Remainder Theorem', 'Number Theory', 'Modular Arithmetic', 'Congruences', 'Isomorphism']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/chinese-remainder-theorem
sidebar:
  order: 3
---

## 핵심 개념

**정리 내용**: n_1, n_2, ..., n_k가 쌍별 서로소이고 n = n_1·n_2·...·n_k일 때:

연립 합동식:
```
x ≡ a_1 (mod n_1)
x ≡ a_2 (mod n_2)
...
x ≡ a_k (mod n_k)
```
은 ℤ_n에서 유일한 해를 가진다.

**대수적 해석 (동형 사상)**:
```
ℤ_n ≅ ℤ_{n_1} × ℤ_{n_2} × ... × ℤ_{n_k}
```
대응: a ↔ (a mod n_1, a mod n_2, ..., a mod n_k)

이 대응은 덧셈과 곱셈 모두에 대해 환 동형(ring isomorphism)이다.

**해의 구성**:
```
N_i = n / n_i  (나머지 법들의 곱)
M_i = N_i^{-1} mod n_i  (확장 유클리드로 계산)
x = Σ_{i=1}^{k} a_i · M_i · N_i (mod n)
```

**응용**:
1. **RSA 복호화 가속**: M^d mod n을 M^d mod p와 M^d mod q로 분리 계산
   - 각 계산이 더 작은 수에서 수행되어 약 4배 가속
2. **큰 정수 연산**: 대수 연산을 작은 법에서 병렬 수행 후 CRT로 합성
3. **오류 검출**: 여분의 법을 추가하여 계산 오류 검출

## 예시

```
n_1 = 3, n_2 = 5, n_3 = 7이면 n = 105

연립 합동식:
x ≡ 2 (mod 3)
x ≡ 3 (mod 5)
x ≡ 2 (mod 7)

해 구성:
N_1 = 35, M_1 = 35^{-1} mod 3 = 2^{-1} mod 3 = 2
N_2 = 21, M_2 = 21^{-1} mod 5 = 1^{-1} mod 5 = 1
N_3 = 15, M_3 = 15^{-1} mod 7 = 1^{-1} mod 7 = 1

x = 2·2·35 + 3·1·21 + 2·1·15 (mod 105)
  = 140 + 63 + 30 (mod 105)
  = 233 mod 105
  = 23

검증: 23 mod 3 = 2 ✓, 23 mod 5 = 3 ✓, 23 mod 7 = 2 ✓
```

## 관련 개념

- [Modular Arithmetic](/knowledge/algorithms/modular-arithmetic/) - CRT의 수학적 기반
- [GCD](/knowledge/algorithms/gcd/) - 서로소 조건과 역원 계산
- [RSA Cryptosystem](/knowledge/algorithms/rsa-cryptosystem/) - CRT를 통한 RSA 가속
- [Primality Testing](/knowledge/algorithms/primality-testing/) - 소수 관련 응용
