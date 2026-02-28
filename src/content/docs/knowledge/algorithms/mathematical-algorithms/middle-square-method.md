---
title: "Middle-Square Method"
description: "Von Neumann이 1946년 제안한 최초의 컴퓨터 기반 의사난수 생성 방법으로, 이전 난수를 제곱하여 중간 자릿수를 추출하는 역사적 실패 사례"
tags: ["Algorithms", "PRNG", "MathematicalAlgorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/middle-square-method
sidebar:
  order: 38
---

## 핵심 개념

중간 제곱법(Middle-Square Method)은 John von Neumann이 1946년경 제안한 최초의 컴퓨터 기반 의사난수 생성 알고리즘이다. 이전 난수를 제곱하여 그 중간 자릿수를 다음 난수로 사용하는 방식으로, 이론적 뒷받침 없이 직관에만 의존한 대표적 실패 사례로 기억된다.

## 동작 원리

**알고리즘 절차:**
1. 2n자리 초기값 X₀을 선택한다
2. X를 제곱하여 4n자리 수를 얻는다
3. 중간의 2n자리를 추출하여 다음 난수 X₊₁로 사용한다
4. 반복한다

**심각한 결함:**
1. **수렴(Degeneration)**: 수열이 짧은 주기에 갇히는 경향이 있다
   - 0이 한 번 나타나면 이후 계속 0이 생성된다
   - Knuth가 직접 시도한 "슈퍼 난수 생성기(Algorithm K)"도 `6065038420`이라는 자기 복제 고정점으로 즉시 수렴했다
2. **이론적 약점**: 최상위 n자리가 0이면 이후 수들은 점점 작아져 결국 0에 도달한다
3. **짧은 주기**: 20비트 수를 사용해도 가장 긴 주기는 142에 불과함 (Metropolis 실험)

**역사**: N. Metropolis가 2자리 10진수에 대해 완전 분석 → 12개의 서로 다른 수렴 주기 발견. 4자리 시작값 16개 중 12개가 주기(6100→2100→4100→8100→6100→...)에 수렴함.

중간 제곱법은 "무작위 방법은 무작위로 선택되어서는 안 된다"는 핵심 교훈을 남겼다.

## 예시

```python
def middle_square(x, n_digits=10):
    """Von Neumann의 중간 제곱법"""
    x_squared = x * x
    # 4n자리 수에서 중간 2n자리 추출
    divisor = 10 ** (n_digits // 2)
    modulus = 10 ** n_digits
    return (x_squared // divisor) % modulus

# 10자리 수 사용
x = 5772156649
for _ in range(5):
    x = middle_square(x)
    print(x)
# 결국 고정점이나 짧은 주기로 수렴
```

## 관련 개념

- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
- [Period Length](/knowledge/algorithms/mathematical-algorithms/period-length/)
- [Linear Congruential Method](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
