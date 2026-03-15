---
title: "로그 (Logarithm)"
description: "b^y = x에서 y = log_b(x)로 정의되는 함수로, 알고리즘 분석에서 분할 정복의 깊이와 정보량을 표현하는 핵심 수학 도구"
tags: ["Mathematics", "Algorithms", "Analysis", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/logarithm
sidebar:
  order: 35
---

## 핵심 개념

로그(Logarithm) log_b(x)는 b^y = x를 만족하는 y값이다. 컴퓨터 과학에서 로그는 알고리즘 복잡도 분석의 핵심이며, 다음 세 가지 밑이 주로 사용된다:

- **log₂n (이진 로그, lg n)**: 이진 탐색, 이진 트리 높이, 비트 수
- **ln n (자연 로그)**: 평균 경우 분석, 조화수의 점근식
- **log₁₀n (상용 로그)**: 십진 자릿수 계산

어떤 밑으로든 log는 "몇 번이나 절반으로 나눌 수 있는가"를 측정한다.

## 동작 원리

**기본 성질**:
```
log_b(xy) = log_b(x) + log_b(y)    (곱 → 합)
log_b(x/y) = log_b(x) - log_b(y)   (나눗셈 → 뺄셈)
log_b(x^r) = r × log_b(x)           (거듭제곱 → 곱)
log_b(x) = log_c(x) / log_c(b)     (밑 변환 공식)
```

**밑 변환**: log₂n = ln n / ln 2 ≈ 1.443 × ln n
→ 모든 로그는 상수 배 차이만 있으므로 O 표기에서 밑을 생략한다.

**알고리즘에서의 로그**:

| 알고리즘/개념 | 로그 역할 |
|--------------|-----------|
| 이진 탐색 | 단계 수 = ⌊log₂n⌋ |
| 이진 트리 높이 | h = ⌊log₂n⌋ (n개 노드) |
| 이진 표현 자릿수 | k = ⌊log₂n⌋ + 1 |
| 합병 정렬 재귀 깊이 | ⌈log₂n⌉ |
| 정보량 (엔트로피) | -log₂(p) 비트 |

**이진 로그의 중요 값**:
```
lg 2 = 1, lg 4 = 2, lg 8 = 3, lg 16 = 4
lg 1024 = 10, lg(10^6) ≈ 19.9, lg(10^9) ≈ 29.9
```

**오일러-마스케로니 상수와의 관계**: H_n = ln n + γ + O(1/n)

## 예시

```python
import math

# 세 가지 주요 로그
n = 1000000
print(f"log₂({n}) = {math.log2(n):.2f}")    # 19.93
print(f"ln({n}) = {math.log(n):.2f}")        # 13.82
print(f"log₁₀({n}) = {math.log10(n):.2f}")  # 6.00

# 이진 탐색 필요 단계 수
def binary_search_steps(n):
    return math.ceil(math.log2(n + 1))

print(f"1,000개 탐색: 최대 {binary_search_steps(1000)}번")   # 10
print(f"10억개 탐색: 최대 {binary_search_steps(10**9)}번")  # 30

# 비트 수 계산
def bits_needed(n):
    return math.floor(math.log2(n)) + 1 if n > 0 else 1

print(f"255를 표현: {bits_needed(255)}비트")   # 8
print(f"256를 표현: {bits_needed(256)}비트")   # 9

# 로그 복잡도 성장 비교
for n in [10, 100, 1000, 10000]:
    print(f"n={n:5d}: O(log n)={math.log2(n):.1f}, "
          f"O(n)={n}, O(n log n)={n*math.log2(n):.0f}")
```

## 관련 개념

- [빅오 표기법 (Big-O Notation)](/knowledge/algorithms/foundations/big-o-notation/)
- [알고리즘 분석 (Analysis of Algorithms)](/knowledge/algorithms/foundations/analysis-of-algorithms/)
- [조화수 (Harmonic Numbers)](/knowledge/algorithms/foundations/harmonic-numbers/)
- [바닥 함수와 천장 함수 (Floor and Ceiling Functions)](/knowledge/algorithms/foundations/floor-ceiling/)
