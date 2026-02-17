---
title: "Primality Testing"
description: "소수 판별(Primality Testing)은 주어진 정수 n이 소수인지 합성수인지 판별하는 문제로, 밀러-라빈(Miller-Rabin) 확률적 검사가 가장 널리 사용되는 효율적인 방법이다"
tags: ['Primality Testing', 'Miller Rabin', 'Randomized Algorithm', 'Number Theory', 'Cryptography']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/primality-testing
sidebar:
  order: 4
---

## 핵심 개념

**단순 시험 나눗셈**: n이 √n 이하의 소수로 나누어지는지 확인
- 시간: O(√n) = O(2^{β/2}), β는 n의 비트 수
- 지수 시간이므로 큰 수에는 비실용적

**페르마 소수 판별**: a^{n-1} ≡ 1 (mod n) 검사
- 소수이면 항상 성립 (페르마 소정리)
- 합성수인데도 성립하는 경우 존재 (카마이클 수)
- 따라서 불완전한 판별법

**밀러-라빈 소수 판별 (Miller-Rabin Primality Test)**:
```
n-1 = 2^s · t  (t는 홀수)로 분해

MILLER-RABIN(n, s)  // s번 반복
1  for j = 1 to s
2      a = RANDOM(2, n-2)
3      if WITNESS(a, n)  // a가 n의 합성수 증인인지
4          return COMPOSITE
5  return PRIME  // 아마 소수

WITNESS(a, n)
1  n-1 = 2^t · u (u 홀수)
2  x = a^u mod n
3  for i = 1 to t
4      y = x^2 mod n
5      if y == 1 and x ≠ 1 and x ≠ n-1
6          return TRUE  // n은 합성수 (비자명 제곱근)
7      x = y
8  if x ≠ 1
9      return TRUE  // 페르마 검사 실패
10 return FALSE
```

**정확성**:
- n이 소수이면 항상 PRIME 반환
- n이 합성수이면 각 반복에서 최소 3/4 확률로 COMPOSITE 반환
- s번 반복 후 오류 확률: (1/4)^s 이하
- s = 50이면 오류 확률 < 2^{-100} (사실상 확실)

**시간 복잡도**: O(s · β³), β = ⌊lg n⌋ + 1

## 예시

```
n = 561 (카마이클 수: 합성수지만 페르마 검사를 통과)
561 = 3 × 11 × 17

페르마 검사: 2^{560} ≡ 1 (mod 561) ← 속임!

밀러-라빈 검사 (a = 7):
560 = 2^4 × 35
7^{35} mod 561 = 241
241² mod 561 = 298
298² mod 561 = 166
166² mod 561 = 67
67² mod 561 ≠ 1
→ WITNESS = TRUE, n은 합성수!
```

큰 소수 생성 절차:
```
1. β-비트 홀수 n을 무작위 생성
2. MILLER-RABIN(n, 50) 수행
3. COMPOSITE이면 1로 돌아감
4. PRIME이면 n 반환
소수 정리에 의해 β-비트 정수 중 소수 밀도 ≈ 1/β
평균 O(β) 번 시도 후 소수 발견
```

## 관련 개념

- [RSA Cryptosystem](/knowledge/algorithms/rsa-cryptosystem/) - 큰 소수 생성에 밀러-라빈 사용
- [Modular Arithmetic](/knowledge/algorithms/modular-arithmetic/) - 모듈러 지수 연산 기반
- [GCD](/knowledge/algorithms/gcd/) - 소수 판별의 보조 도구
- [Chinese Remainder Theorem](/knowledge/algorithms/chinese-remainder-theorem/) - 소수 기반 분해
