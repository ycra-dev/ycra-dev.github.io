---
title: "Sample Space"
description: "표본공간(sample space)은 실험에서 발생할 수 있는 모든 가능한 결과(outcome)의 집합이며, 사건(event)은 표본공간의 부분집합이다"
tags: ['Sample Space', 'Probability', 'Event', 'Experiment', 'Discrete Probability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/sample-space
sidebar:
  order: 1
---

## 핵심 개념

확률 이론의 가장 기본적인 구조는 실험(experiment), 표본공간(sample space), 사건(event)의 세 가지 개념으로 이루어진다. 실험은 주어진 가능한 결과 중 하나를 산출하는 절차이고, 표본공간 S는 그 가능한 결과들의 집합이다. 사건 E는 표본공간의 부분집합(E ⊆ S)으로 정의된다.

라플라스의 정의에 따르면, 유한하고 동일한 가능성을 가진 결과들로 이루어진 표본공간 S에서 사건 E의 확률은 다음과 같다:

$$p(E) = \frac{|E|}{|S|}$$

확률의 기본 성질:
- 모든 사건 E에 대해 0 ≤ p(E) ≤ 1 (E ⊆ S이므로 0 ≤ |E| ≤ |S|)
- 여사건(complement)의 확률: p(E̅) = 1 - p(E)
- 합사건의 확률: p(E₁ ∪ E₂) = p(E₁) + p(E₂) - p(E₁ ∩ E₂)

## 예시

**주사위 굴리기 실험:**
- 표본공간: S = {1, 2, 3, 4, 5, 6}
- 사건 "홀수가 나옴": E = {1, 3, 5}
- p(E) = |E|/|S| = 3/6 = 1/2

**두 개의 주사위 합이 7인 사건:**
- 표본공간: |S| = 6² = 36 (곱의 법칙)
- 성공 결과: {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}
- p(합=7) = 6/36 = 1/6

**여사건 활용 예시 (10비트 문자열에서 0이 하나 이상 있을 확률):**
```
E = "적어도 하나의 0이 존재"
E̅ = "모든 비트가 1"

p(E) = 1 - p(E̅) = 1 - 1/2^10 = 1 - 1/1024 = 1023/1024
```

## 관련 개념

- [Set](/knowledge/mathematics/set/) - 표본공간과 사건은 집합으로 정의됨
- [Combination](/knowledge/mathematics/combination/) - 사건의 원소 수를 셀 때 조합이 사용됨
- [Probability Distribution](/knowledge/mathematics/probability-distribution/) - 표본공간 위에 확률을 할당하는 함수
