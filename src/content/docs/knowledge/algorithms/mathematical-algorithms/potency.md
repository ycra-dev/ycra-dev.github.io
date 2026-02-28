---
title: "Potency"
description: "선형 합동 수열의 곱셈인수 품질을 측정하는 지표로, b^s ≡ 0 (mod m)을 만족하는 최소 정수 s를 나타내며 s ≥ 5이어야 허용 가능한 랜덤성을 가진다"
tags: ["Algorithms", "PRNG", "MathematicalAlgorithms", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/potency
sidebar:
  order: 42
---

## 핵심 개념

효력(Potency)은 선형 합동 수열의 곱셈인수 품질을 측정하는 지표다. 곱셈인수 a에서 b = a − 1로 놓을 때, b^s ≡ 0 (mod m)을 만족하는 최소 정수 s를 효력이라 한다. s ≥ 5이어야 허용 가능한 랜덤성으로 간주된다.

## 동작 원리

**배경:** a = z^k + 1 형태의 곱셈인수(z는 기수)는 곱셈 대신 시프트+덧셈으로 구현 가능해 하드웨어에서 매력적이지만, 실제로는 랜덤성이 매우 나쁘다.

**효력 정의:** b = a − 1이 m의 각 소인수의 배수일 때 (최대 주기 조건 충족 시), b^s ≡ 0 (mod m)을 만족하는 최소 s

**효력에 따른 랜덤성:**
- s = 1: X_n ≡ cn (mod m), 전혀 랜덤하지 않음 (등차수열)
- s = 2: 연속 세 값 (X_n, X_{n+1}, X_{n+2})가 3차원 공간의 4개 평면 위에만 놓임
- s = 3: 여전히 의존성이 너무 강함
- s ≥ 5: 허용 가능한 랜덤성으로 간주

**m = 2^35에서 a = 2^k + 1의 경우:**

| k 범위 | 효력 s | 평가 |
|--------|--------|------|
| k ≥ 18 | s = 2 | 최악 |
| k = 12~17 | s = 3 | 불충분 |
| k = 9~11 | s = 4 | 경계선 |
| k ≤ 8 | s ≥ 5 | 허용 (단, a가 너무 작아서 별도 문제) |

**중요한 교훈:** 효력이 높은 것은 필요조건이지만 충분조건이 아니다. 효력은 나쁜 생성기를 배제하는 데만 사용하고, 좋은 생성기를 승인하는 기준으로는 쓰지 않는다. 최종적으로는 스펙트럼 테스트를 통과해야 한다.

## 예시

```python
def potency(a, m):
    """선형 합동 생성기의 효력 계산"""
    b = a - 1
    bs = b
    for s in range(1, 100):
        if bs % m == 0:
            return s
        bs = (bs * b)
    return None  # 효력이 매우 큼

# m = 2^35에서 다양한 k값 테스트
m = 2**35
for k in [18, 15, 10, 7]:
    a = 2**k + 1
    b = a - 1  # = 2^k
    bs = b
    for s in range(1, 10):
        if bs % m == 0:
            print(f"k={k}, a=2^{k}+1, potency={s}")
            break
        bs = bs * b

# 결과:
# k=18, potency=2  (최악: 효력 너무 낮음)
# k=15, potency=3  (불충분)
# k=10, potency=4  (경계선)
# k=7,  potency=5  (허용)
```

## 관련 개념

- [Linear Congruential Method](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
- [Period Length](/knowledge/algorithms/mathematical-algorithms/period-length/)
- [Spectral Test](/knowledge/algorithms/mathematical-algorithms/spectral-test/)
- [Pseudorandom Number Generator](/knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator/)
