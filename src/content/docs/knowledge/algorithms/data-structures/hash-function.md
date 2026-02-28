---
title: "Hash Function"
description: "해시 함수(Hash Function)는 키의 전체 집합 U를 해시 테이블의 슬롯 범위 {0, 1, "
tags: ['Hash Function', 'Hashing', 'Division Method', 'Multiplication Method', 'Universal Hashing', 'Random Hashing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/hash-function
sidebar:
  order: 8
---

## 핵심 개념

좋은 해시 함수는 독립 균일 해싱(independent uniform hashing)을 근사해야 한다. 즉, 각 키가 m개 슬롯 중 어느 곳에든 균일하게 독립적으로 해싱되어야 한다.

**정적 해싱(Static Hashing):**
1. **나눗셈 방법(Division Method):** h(k) = k mod m
   - 간단하고 빠르지만, m이 2의 거듭제곱에 가까운 소수가 아닐 때 성능이 저하될 수 있다
2. **곱셈 방법(Multiplication Method):** h(k) = floor(m(kA mod 1))
   - m에 독립적으로 상수 A를 선택할 수 있어 유연하다
3. **곱-시프트 방법(Multiply-Shift):** ha(k) = (ka mod 2^w) >> (w - l)
   - m = 2^l일 때, 곱셈/뺄셈/시프트 3개의 명령어로 구현 가능

**랜덤 해싱(Random Hashing):**
적대적 입력에 대비하기 위해 실행 시 해시 함수를 무작위로 선택한다.
- **보편적 해싱(Universal Hashing):** 해시 함수 족 H에서 임의 선택. 임의의 두 키 k1, k2에 대해 충돌 확률이 최대 1/m
- **수론 기반:** hab(k) = ((ak + b) mod p) mod m, a != 0
- **곱-시프트 기반:** 홀수 a에 대한 ha(k), 2/m-보편적

**변수 길이 입력:** 문자열 등 긴 입력은 암호학적 해시 함수(SHA-256 등) 또는 wee 해시 함수와 같은 특수 설계를 사용한다.

## 예시

```
// 나눗셈 방법
h(k) = k mod m
// m = 12, k = 100: h(100) = 100 mod 12 = 4

// 곱셈 방법
h(k) = floor(m * (kA mod 1))
// A = (sqrt(5) - 1) / 2 ≈ 0.6180339...

// 곱-시프트 방법 (실용적)
h_a(k) = (k*a mod 2^w) >> (w - l)
// k=123456, l=14, w=32, a=2654435769
// h_a(k) = 67

// 보편적 해시 함수 족 (수론 기반)
h_{a,b}(k) = ((a*k + b) mod p) mod m
// p=17, m=6: h_{3,4}(8) = ((3*8 + 4) mod 17) mod 6 = 11 mod 6 = 5
// 족의 크기: p(p-1) = 17*16 = 272개의 해시 함수
```

## TAOCP 분석 (Knuth, Vol.3)

TAOCP Section 6.4의 해시 함수 설계 원칙:

**Knuth의 곱셈법:**
황금비(Golden Ratio) A = (√5 - 1)/2 ≈ 0.6180339...를 권장:
- h(K) = ⌊M * {K * A}⌋ ({x}는 소수 부분)
- 컴퓨터 워드 크기 w에 대해: h(K) = ⌊K * A * w⌋ >> (log₂ w - log₂ M)

**다중 워드/가변 길이 키 (Horner's Rule 형태):**
l개의 문자 키 K = x₁x₂...xₗ에 대해:
h(K) = (...((x₁ * a + x₂) * a + x₃) * a + ... + xₗ) mod M

**좋은 해시 함수의 조건 (Knuth 제시):**
1. 균등 분포: 키가 {0,...,M-1}에 균등하게 분포
2. 계산 속도: 나눗셈 또는 곱셈 1-2회면 충분
3. 전체 키 의존: 키의 모든 비트가 주소에 영향
4. 독립성: 인접한 키들이 인접한 주소에 매핑되지 않아야 함

**나눗셈법 주의사항 (Knuth):**
- M이 2의 거듭제곱이면 키의 하위 비트만 사용되어 균등성 저하
- M이 10의 거듭제곱이면 키의 하위 자릿수만 사용
- M은 소수(prime)가 권장됨

## 관련 개념

- [Hash Table](/knowledge/algorithms/hash-table/)
- [Collision Resolution](/knowledge/algorithms/collision-resolution/)
- [Chaining](/knowledge/algorithms/chaining/)
- [Open Addressing](/knowledge/algorithms/open-addressing/)
