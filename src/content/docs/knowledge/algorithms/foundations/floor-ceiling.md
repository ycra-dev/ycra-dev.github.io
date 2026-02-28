---
title: "Floor and Ceiling Functions"
description: "바닥 함수 ⌊x⌋(x 이하의 최대 정수)와 천장 함수 ⌈x⌉(x 이상의 최소 정수), 그리고 이로부터 정의되는 나머지 연산(mod)"
tags: ["Mathematics", "Algorithms", "Number Theory", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/floor-ceiling
sidebar:
  order: 36
---

## 핵심 개념

**바닥 함수(Floor)** ⌊x⌋는 x 이하의 가장 큰 정수이고, **천장 함수(Ceiling)** ⌈x⌉는 x 이상의 가장 작은 정수다. 나머지 연산(mod)은 이를 바탕으로 정의된다.

```
⌊3.7⌋ = 3,   ⌊-3.7⌋ = -4  (중요: -3이 아님!)
⌈3.2⌉ = 4,   ⌈-3.2⌉ = -3
x mod y = x - y⌊x/y⌋    (y ≠ 0)
```

Knuth는 TAOCP Vol.1, Section 1.2.4에서 이 함수들을 알고리즘 분석의 기본 도구로 체계적으로 다룬다.

## 동작 원리

**기본 성질**:
```
⌊x⌋ ≤ x < ⌊x⌋ + 1          (바닥 함수)
⌈x⌉ - 1 < x ≤ ⌈x⌉          (천장 함수)
⌊x + n⌋ = ⌊x⌋ + n           (n이 정수일 때)
⌊-x⌋ = -⌈x⌉                (대칭)
⌈x⌉ = ⌊x⌋ + 1              (x가 정수가 아닐 때)
```

**유용한 항등식**:
```
⌊x/2⌋ + ⌈x/2⌉ = x           (모든 정수 x)
⌊lg n⌋ + 1 = 이진수 자릿수   (n ≥ 1)
⌈log₁₀ n⌉ = 십진수 자릿수   (n ≥ 1)
```

**나머지 연산(mod)의 성질**:
```
0 ≤ x mod y < y    (y > 0)
(x + y) mod n = ((x mod n) + (y mod n)) mod n
(xy) mod n = ((x mod n)(y mod n)) mod n
```

**알고리즘에서의 활용**:
- **배열 인덱스**: `index mod array_size` → 원형 버퍼
- **해시 함수**: `key mod table_size` → 해시 테이블
- **비트 조작**: `x mod 2 = x AND 1` → 홀짝 판별
- **이진 트리 높이**: `⌊lg n⌋` (n개 노드)
- **힙 부모/자식**: 인덱스 i의 부모 = `⌊(i-1)/2⌋`

**Hermite 공식** (소수 부분 {x} = x - ⌊x⌋ 이용):
```
⌊x + y⌋ = ⌊x⌋ + ⌊y⌋ + ⌊{x} + {y}⌋
```

## 예시

```python
import math

# 기본 함수
print(math.floor(3.7))   # 3
print(math.floor(-3.7))  # -4 (주의!)
print(math.ceil(3.2))    # 4
print(math.ceil(-3.2))   # -3

# Python의 %는 수학적 mod와 동일 (y > 0이면 항상 0 ≤ result < y)
print(7 % 3)    # 1
print(-7 % 3)   # 2  (수학적: -7 - 3*⌊-7/3⌋ = -7 - 3*(-3) = 2)
print(7 % -3)   # -2 (y < 0이면 result ≤ 0)

# 이진 자릿수 계산
def bits_needed(n):
    return math.floor(math.log2(n)) + 1 if n > 0 else 1

print(bits_needed(255))   # 8  (11111111)
print(bits_needed(256))   # 9  (100000000)

# 원형 버퍼
def circular_next(i, size):
    return (i + 1) % size

# 힙에서 부모/자식 인덱스
def parent(i): return (i - 1) // 2
def left_child(i): return 2 * i + 1
def right_child(i): return 2 * i + 2

# 분할 (나눗셈과 나머지를 동시에)
quotient, remainder = divmod(17, 5)  # 3, 2
print(f"17 = {quotient} × 5 + {remainder}")
```

## 관련 개념

- [Logarithm](/knowledge/algorithms/foundations/logarithm/)
- [Modular Arithmetic](/knowledge/algorithms/mathematical-algorithms/modular-arithmetic/)
- [Hash Function](/knowledge/algorithms/data-structures/hash-function/)
