---
title: "Monte Carlo Algorithm"
description: "몬테카를로 알고리즘(Monte Carlo algorithm)은 하나 이상의 단계에서 무작위 선택을 하는 확률적 알고리즘으로, 항상 답을 내지만 작은 확률로 잘못된 답을 낼 수 있으며, 계산을 충분히 수행하면 오류 확률이 급격히 감소한다"
tags: ['Monte Carlo', 'Probabilistic Algorithm', 'Randomized Algorithm', 'Primality Testing', 'Probability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/monte-carlo-algorithm
sidebar:
  order: 11
---

## 핵심 개념

결정론적 알고리즘은 동일한 입력에 항상 동일한 경로를 따르지만, 몬테카를로 알고리즘은 무작위 선택을 통해 효율성을 얻는다.

**결정 문제에 대한 몬테카를로 알고리즘의 구조:**
1. 각 단계(test)에서 "true" 또는 "unknown"을 응답
2. "true"가 한 번이라도 나오면 → 최종 답: "true" (확실히 참)
3. 모든 k번의 시행에서 "unknown"이면 → 최종 답: "false"
4. 참인 답이 "false"일 때 → 항상 정확 (모든 시행이 "unknown")
5. 참인 답이 "true"일 때 → 오류 가능 (모든 시행이 우연히 "unknown"일 수 있음)

**오류 확률 분석:**
한 번의 테스트에서 "true"를 탐지할 확률이 p이면:
- n번 독립 시행 후 오류 확률 = (1-p)^n
- p ≠ 0이면, n → ∞일 때 오류 확률 → 0

**핵심 장점:** 결정론적 알고리즘이 O(n) 시간이 필요한 문제를 O(1) 시간에 해결할 수 있다 (작은 오류 확률을 감수하면).

## 예시

**품질 관리 (칩 배치 검사):**
```
미검사 배치에서 불량 칩 확률 = 0.1
양품 확률 = 0.9

불량 칩을 발견하면 → "true" (미검사 배치)
양품이면 → "unknown" (아직 모름)

k개의 칩을 검사한 후 모두 양품일 확률:
  미검사 배치인데 "false"로 판단할 확률 = 0.9^k

k = 66:  오류 확률 < 0.001       (1/1000 미만)
k = 132: 오류 확률 < 0.000001    (1/1,000,000 미만)

→ O(1) 시간 (배치 크기 n에 무관!)
  결정론적 방법: O(n) 시간 필요
```

**확률적 소수 판별 (밀러-라빈 테스트):**
```
질문: "n이 합성수인가?"

합성수 n이 밀러 테스트를 통과할 확률 < 1/4 (각 기저 b에 대해)

k번 독립 시행 후:
  합성수를 소수로 잘못 판단할 확률 < (1/4)^k

k = 10:  오류 확률 < 1/1,048,576    (약 100만분의 1)
k = 30:  오류 확률 < 1/10^18         (사실상 불가능)
```

**Python으로 몬테카를로 소수 판별 구현:**
```python
import random

def miller_rabin_test(n, k=30):
    """
    몬테카를로 소수 판별
    n: 판별할 정수
    k: 반복 횟수 (오류 확률 < (1/4)^k)
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # n-1 = 2^r × d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False  # "true" - 합성수 확실

    return True  # "false" - 아마도 소수

# 테스트
print(miller_rabin_test(104729))  # True (소수)
print(miller_rabin_test(104730))  # False (합성수)

# 200자리 소수 찾기 (RSA 키 생성에 사용)
def find_large_prime(digits):
    while True:
        n = random.randint(10**(digits-1), 10**digits - 1)
        if n % 2 == 0:
            n += 1
        if miller_rabin_test(n, 30):
            return n
```

## 관련 개념

- [Bernoulli Trial](/knowledge/mathematics/bernoulli-trial/) - 각 테스트는 독립적인 베르누이 시행
- [Independence](/knowledge/mathematics/independence/) - 반복 시행의 독립성이 오류 확률 분석의 기반
- [Algorithm](/knowledge/algorithms/algorithm/) - 결정론적 알고리즘 vs 확률적 알고리즘
- [Probability Distribution](/knowledge/mathematics/probability-distribution/) - 오류 확률은 기하분포적으로 감소
