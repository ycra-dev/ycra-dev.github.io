---
title: "의사 난수 생성기 (PRNG)"
description: "완전히 결정론적이지만 통계적 테스트를 통과하는 '무작위처럼 보이는' 수열을 생성하는 알고리즘"
tags: ["Algorithms", "Randomness", "Simulation", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/pseudorandom-number-generator
sidebar:
  order: 22
---

## 핵심 개념

의사난수 생성기(Pseudorandom Number Generator, PRNG)는 컴퓨터의 산술 연산으로 완전히 결정론적으로 생성되지만, 통계적 테스트를 통과하는 "무작위처럼 보이는" 수열을 만드는 알고리즘이다.

**진정한 난수 vs 의사난수**:
- 진정한 난수: 각 수가 이전 수와 무관하게 순전히 우연에 의해 결정
- 의사난수: 초기값(seed)이 주어지면 항상 동일한 수열 생성 → 완전히 예측 가능

Knuth의 핵심 경고: "무작위 번호는 무작위로 선택된 방법으로 생성해서는 안 된다. 이론이 사용되어야 한다."

## 동작 원리

**PRNG가 필요한 이유**:
- **재현성**: 동일한 시드로 동일한 결과 → 디버깅 가능
- **속도**: 물리적 난수 장치보다 훨씬 빠름
- **충분한 무작위성**: 대부분의 응용에서 통계 테스트 통과면 충분

**PRNG의 주요 활용 분야**:
| 분야 | 응용 |
|------|------|
| 시뮬레이션 | 핵물리, 운영연구, 유한요소법 |
| 샘플링 | 전체를 탐색할 수 없을 때 대표 샘플 추출 |
| 수치해석 | Monte Carlo 방법 |
| 암호학 | 편향 없는 비트 생성 (암호학적으로 안전한 PRNG 필요) |
| 게임/그래픽 | 생동감 있는 랜덤 요소 |

**주기(Period)**: 결정론적 수열은 유한한 상태 집합에서 동작하므로 반드시 주기를 가진다. 실용적인 PRNG는 주기가 충분히 길어야 한다.

**주요 PRNG 알고리즘**:
1. **선형 합동법(LCG)**: X_{n+1} = (aX_n + c) mod m — 가장 기본적, 이론 완비
2. **가산 피보나치(Additive Fibonacci)**: X_n = (X_{n-24} + X_{n-55}) mod m — 매우 긴 주기
3. **Mersenne Twister**: 주기 2^19937-1, 현대 표준 (Python의 random 모듈)
4. **Xorshift**: 비트 연산 기반, 현대 암호학적 응용

## 예시

```python
import random
import time

# Python의 기본 PRNG (Mersenne Twister)
random.seed(42)
print([random.random() for _ in range(5)])
# 동일한 시드 → 항상 동일한 수열

# 재현성 시연
random.seed(42)
seq1 = [random.random() for _ in range(5)]
random.seed(42)
seq2 = [random.random() for _ in range(5)]
print(seq1 == seq2)  # True

# 간단한 LCG 구현
class LCG:
    def __init__(self, seed, m=2**32, a=1664525, c=1013904223):
        self.x = seed
        self.m = m; self.a = a; self.c = c

    def random(self):
        self.x = (self.a * self.x + self.c) % self.m
        return self.x / self.m

lcg = LCG(seed=42)
print([f"{lcg.random():.4f}" for _ in range(5)])

# PRNG 품질 검정: 균등 분포 확인
import statistics
samples = [lcg.random() for _ in range(10000)]
print(f"평균: {statistics.mean(samples):.4f}")  # ≈ 0.5
print(f"표준편차: {statistics.stdev(samples):.4f}")  # ≈ 0.2887
```

## 관련 개념

- [선형 합동법 (Linear Congruential Method)](/knowledge/algorithms/mathematical-algorithms/linear-congruential-method/)
- [몬테카를로 방법 (Monte Carlo Method)](/knowledge/algorithms/mathematical-algorithms/monte-carlo-method/)
- [주기 길이 (Period Length)](/knowledge/algorithms/mathematical-algorithms/period-length/)
- [Chi-Square Test](/knowledge/discrete-mathematics/probability/chi-square-test/)
