---
title: "점화식 (Recurrence Relation)"
description: "수열 {aₙ}에 대한 점화식(Recurrence Relation)은 aₙ을 이전 항들 a₀, a₁, "
tags: ['Recurrence Relation', 'Recursion', 'Fibonacci', 'Iteration', 'Closed Form', 'Dynamic Programming']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/recurrence-relation
sidebar:
  order: 9
---

## 핵심 개념

점화식은 수열의 각 항을 명시적 공식 대신 이전 항들과의 관계로 정의하는 방법이다. 이는 재귀적 알고리즘, 동적 프로그래밍, 분할 정복 알고리즘의 시간 복잡도 분석 등에서 핵심적으로 활용된다.

**점화식의 구성요소:**
1. **점화 관계**: aₙ = f(aₙ₋₁, aₙ₋₂, ...) 형태의 등식
2. **초기 조건**: 점화가 적용되기 전의 항들의 값

**피보나치 수열**: 가장 유명한 점화식의 예
- fₙ = fₙ₋₁ + fₙ₋₂ (n ≥ 2)
- 초기 조건: f₀ = 0, f₁ = 1
- 결과: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

**점화식 풀기 - 반복법(Iteration):**
- **전진 대입(forward substitution)**: 초기값에서 시작하여 aₙ까지 순차적으로 계산
- **후진 대입(backward substitution)**: aₙ에서 시작하여 초기값까지 역추적

점화식을 풀면 **닫힌 공식(closed formula)**을 얻는다. 이는 n만으로 직접 aₙ을 계산할 수 있는 명시적 표현이다.

**점화식의 응용:**
- **복리 계산**: Pₙ = (1 + r)Pₙ₋₁ → Pₙ = (1 + r)ⁿ P₀
- **알고리즘 분석**: 병합 정렬의 T(n) = 2T(n/2) + n
- **조합 계수**: 파스칼의 삼각형에서 C(n,k) = C(n-1,k-1) + C(n-1,k)
- **동적 프로그래밍**: 최적 부분 구조를 이용한 재귀적 문제 해결

**팩토리얼의 점화식:**
aₙ = n · aₙ₋₁, a₁ = 1 → aₙ = n!

점화식은 수학적 귀납법으로 그 해의 정확성을 증명할 수 있다. 추측한 닫힌 공식이 점화식과 초기 조건을 모두 만족하는지 검증하는 것이다.

**점화식을 세우는 기법 (Ch.8 심화):**
점화식을 세우는 과정은 계수 문제를 해결하는 핵심 기법이다. 문제의 크기가 n인 경우의 수를 더 작은 크기의 경우의 수로 표현함으로써, 직접 세기 어려운 문제를 체계적으로 풀 수 있다. 점화식을 푸는 방법에는 반복 대입(iteration), 특성 방정식(characteristic equation), 생성함수(generating function) 등이 있다.

**하노이 탑**: n개의 원반을 옮기는 최소 이동 횟수
- H_n = 2H_{n-1} + 1, H_1 = 1
- 반복 대입으로 풀면: H_n = 2^n - 1

**비트 문자열 세기**: 연속 0이 두 개 없는 길이 n 비트 문자열의 수
- a_n = a_{n-1} + a_{n-2}, a_1 = 2, a_2 = 3
- 끝이 1인 경우(a_{n-1}개)와 끝이 10인 경우(a_{n-2}개)로 분할

## 예시

```
예제 1: 선형 점화식
aₙ = aₙ₋₁ + 3, a₀ = 2
a₁ = 2 + 3 = 5
a₂ = 5 + 3 = 8
a₃ = 8 + 3 = 11
닫힌 공식: aₙ = 2 + 3n (등차수열)

예제 2: 피보나치 수열
f₀ = 0, f₁ = 1, fₙ = fₙ₋₁ + fₙ₋₂
f₂ = 1, f₃ = 2, f₄ = 3, f₅ = 5, f₆ = 8

예제 3: 복리
P₀ = 10,000달러, 연이율 11%
Pₙ = 1.11 · Pₙ₋₁
→ Pₙ = (1.11)ⁿ × 10,000
→ P₃₀ = (1.11)³⁰ × 10,000 ≈ $228,922.97

해의 검증:
aₙ = 3n이 aₙ = 2aₙ₋₁ - aₙ₋₂의 해인가?
2aₙ₋₁ - aₙ₋₂ = 2·3(n-1) - 3(n-2) = 6n - 6 - 3n + 6 = 3n = aₙ ✓
```

Python에서의 점화식:
```python
# 피보나치 - 재귀적 (비효율)
def fib_recursive(n):
    if n <= 1: return n
    return fib_recursive(n-1) + fib_recursive(n-2)

# 피보나치 - 반복적 (효율적, 동적 프로그래밍)
def fib_iterative(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b

print(fib_iterative(10))  # 55
```

## 관련 개념

- [Sequence](/knowledge/mathematics/sequence/) - 수열의 일반적 정의와 표기법
- [Function](/knowledge/mathematics/function/) - 점화식으로 정의된 수열도 함수
- [Rules of Inference](/knowledge/mathematics/rules-of-inference/) - 점화식의 논리적 구조
- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 점화식은 수열의 재귀적 정의에서 핵심 규칙
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 점화식에서 얻은 명시적 공식을 증명하는 데 사용
- [Linear Homogeneous Recurrence Relation](/knowledge/mathematics/linear-homogeneous-recurrence-relation/) - 가장 체계적으로 풀 수 있는 점화식 유형
- [Generating Function](/knowledge/mathematics/generating-function/) - 점화식을 푸는 또 다른 강력한 방법
- [Dynamic Programming](/knowledge/mathematics/dynamic-programming/) - 점화식을 활용하는 알고리즘 패러다임
