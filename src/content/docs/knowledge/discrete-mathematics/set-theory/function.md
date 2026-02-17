---
title: "Function"
description: "함수(Function) f: A → B는 집합 A의 각 원소에 집합 B의 정확히 하나의 원소를 대응시키는 할당(assignment)이다"
tags: ['Function', 'Mapping', 'Domain', 'Codomain', 'Range', 'Image', 'Preimage']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/function
sidebar:
  order: 5
---

## 핵심 개념

함수는 이산수학과 컴퓨터과학에서 가장 핵심적인 개념 중 하나이다. 알고리즘의 시간 복잡도를 표현하고, 수열과 문자열을 정의하며, 암호학과 해시 함수 등 다양한 분야에서 사용된다.

**핵심 구성요소:**
- **정의역(domain)**: 입력값의 집합 A
- **공역(codomain)**: 가능한 출력값의 집합 B
- **치역(range/image)**: 실제 출력값의 집합 {f(a) | a ∈ A} ⊆ B
- f(a) = b일 때, b는 a의 **상(image)**, a는 b의 **역상(preimage)**

**함수의 관계적 정의**: 함수 f: A → B는 A × B의 부분집합 R로, 각 a ∈ A에 대해 정확히 하나의 (a, b) ∈ R이 존재한다.

**함수의 그래프**: {(a, f(a)) | a ∈ A}는 A × B의 부분집합으로, 함수를 시각적으로 표현한다.

**실수값/정수값 함수의 산술**: f₁, f₂: A → R일 때,
- (f₁ + f₂)(x) = f₁(x) + f₂(x)
- (f₁ · f₂)(x) = f₁(x) · f₂(x)

**부분 함수(partial function)**: A의 부분집합에서만 정의된 함수. 예: f(n) = √n은 음의 정수에서 미정의. 프로그래밍에서 무한 루프나 오버플로우로 인해 결과를 반환하지 못하는 경우가 이에 해당한다.

**중요한 함수들:**
- **바닥 함수(floor)**: ⌊x⌋ = x 이하의 최대 정수
- **천장 함수(ceiling)**: ⌈x⌉ = x 이상의 최소 정수
- **팩토리얼**: n! = 1 · 2 · ... · n (0! = 1)

바닥/천장 함수의 유용한 성질:
- ⌊x + n⌋ = ⌊x⌋ + n (n은 정수)
- ⌊−x⌋ = −⌈x⌉
- x − 1 < ⌊x⌋ ≤ x ≤ ⌈x⌉ < x + 1

## 예시

```
함수 정의:
f: Z → Z, f(x) = x²
  정의역: Z, 공역: Z, 치역: {0, 1, 4, 9, 16, ...}

비트열 함수:
f: {길이 2 이상의 비트열} → {00, 01, 10, 11}
f(11010) = 10  (마지막 2비트 추출)

바닥/천장 함수:
⌊1/2⌋ = 0,  ⌈1/2⌉ = 1
⌊-1/2⌋ = -1, ⌈-1/2⌉ = 0
⌊3.1⌋ = 3,  ⌈3.1⌉ = 4
⌊7⌋ = 7,    ⌈7⌉ = 7
```

바이트 계산 응용:
```
100비트를 인코딩하는 데 필요한 바이트 수:
⌈100/8⌉ = ⌈12.5⌉ = 13바이트
```

프로그래밍 언어에서의 함수:
```python
import math

def f(x):
    return x ** 2

# 바닥/천장 함수
print(math.floor(3.7))   # 3
print(math.ceil(3.2))    # 4
print(math.factorial(6)) # 720
```

## 관련 개념

- [Injection Surjection Bijection](/knowledge/mathematics/injection-surjection-bijection/) - 단사, 전사, 전단사 함수
- [Function Composition](/knowledge/mathematics/function-composition/) - 함수의 합성과 역함수
- [Sequence](/knowledge/mathematics/sequence/) - 수열은 정수 부분집합에서의 함수
- [Set](/knowledge/mathematics/set/) - 함수의 정의역과 공역은 집합
- [Cartesian Product](/knowledge/mathematics/cartesian-product/) - 함수의 그래프는 A × B의 부분집합
