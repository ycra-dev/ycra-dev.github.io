---
title: "Analysis of Algorithms"
description: "특정 알고리즘의 정량적 성능 특성(실행 시간, 공간, 최적성)을 결정하는 학문 분야"
tags: ["Algorithms", "Performance", "Complexity", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/foundations/analysis-of-algorithms
sidebar:
  order: 29
---

## 핵심 개념

알고리즘 분석(Analysis of Algorithms)은 특정 알고리즘을 취하여 그 정량적 행동을 결정하는 학문 분야다. Knuth가 이 용어를 제안했으며, 다음 세 가지를 목표로 한다:

1. 알고리즘의 각 단계가 몇 번 실행되는지 결정
2. 알고리즘이 어떤 의미에서 최적인지 판단
3. 동일한 문제를 해결하는 여러 알고리즘 중 최선을 선택

"알고리즘 이론(Theory of Algorithms)"과는 다르다. 이론은 알고리즘의 존재/비존재를 다루지만, 분석은 구체적인 양적 측정을 수행한다.

## 동작 원리

**분석 방법론**:

| 분석 유형 | 설명 | 중요도 |
|-----------|------|--------|
| 최악의 경우(Worst Case) | 어떤 입력에서든 보장되는 상한 | 높음 |
| 평균의 경우(Average Case) | 전형적 입력에 대한 기대 성능 | 높음 |
| 최선의 경우(Best Case) | 이상적 입력에서의 하한 | 낮음 |

**점근적 표기법(Asymptotic Notation)**:
- **O(f(n))**: 상한 — "f(n)의 차수를 초과하지 않는다"
- **Ω(f(n))**: 하한 — "f(n)의 차수보다 작지 않다"
- **Θ(f(n))**: 정확한 차수 — O와 Ω를 동시에 만족

**MEM (Memory Access) 모델**: Knuth는 TAOCP에서 MIX 컴퓨터의 메모리 참조(mem) 횟수로 알고리즘을 측정한다. 현대에는 RAM 모델의 기본 연산 횟수를 센다.

**비수치 분석(Nonnumerical Analysis)**: 숫자가 우연히 나타나는 문제들 — 정렬, 탐색, 그래프 알고리즘 등 컴퓨터의 의사결정 능력을 사용하는 문제들의 분석이 TAOCP의 대부분을 차지한다.

## 예시

유클리드 알고리즘의 평균 분석:

```
n이 고정되고 m이 1부터 n까지 범위를 취할 때,
E1 단계의 평균 실행 횟수 T_n:

T_n ≈ (12 ln 2 / π²) × ln n
    ≈ 0.843 × ln n

결과: n의 자연로그에 비례 — 직관적으로 추측하기 어려운 결과
```

실용적 상수의 중요성:

```
O(n) 알고리즘도 실제 성능은 상수 인자에 크게 의존한다.
내부 루프에서 1마이크로초를 절약하면:
→ 1조 번 반복 시 약 11.6일 절약

따라서 점근적 표기법의 "상수 무시"는
실제 코드 최적화에서 위험할 수 있다.
```

## 관련 개념

- [Algorithm](/knowledge/algorithms/foundations/algorithm/)
- [Big-O Notation](/knowledge/algorithms/foundations/big-o-notation/)
- [Harmonic Numbers](/knowledge/algorithms/foundations/harmonic-numbers/)
- [Time Complexity](/knowledge/algorithms/foundations/time-complexity/)
