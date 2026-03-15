---
title: "정지 문제 (Halting Problem)"
description: "정지 문제(Halting Problem)는 \"임의의 프로그램 P와 입력 I가 주어졌을 때, P가 입력 I로 실행되면 유한 시간 내에 정지하는지 판별할 수 있는 일반적인 절차가 존재하는가?\"라는 문제이다"
tags: ['Halting Problem', 'Undecidability', 'Unsolvable Problem', 'Turing', 'Computability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/halting-problem
sidebar:
  order: 11
---

## 핵심 개념

정지 문제는 컴퓨터 과학에서 가장 유명한 정리 중 하나로, 계산 가능성 이론의 근본적 한계를 보여준다.

**왜 단순한 실행으로는 안 되는가:**
프로그램을 실행해서 정지하면 답을 알 수 있지만, 정지하지 않을 경우 "영원히 정지하지 않는 것인지" 아니면 "아직 정지하지 않은 것인지" 구별할 수 없다. 어떤 프로그램은 10억 년 후에야 정지할 수도 있다.

**Turing의 증명 (귀류법):**

1. **가정**: 정지 문제를 해결하는 절차 H(P, I)가 존재한다고 가정한다.
   - H(P, I)는 프로그램 P가 입력 I로 정지하면 "halt"를, 무한 루프에 빠지면 "loops forever"를 출력한다.

2. **핵심 구성**: 프로그램 자체가 데이터로 사용될 수 있다는 점을 이용하여, 새로운 절차 K(P)를 구성한다:
   - H(P, P)가 "loops forever"를 출력하면 → K(P)는 정지한다.
   - H(P, P)가 "halt"를 출력하면 → K(P)는 무한 루프에 빠진다.
   - 즉, K는 H의 출력과 정반대로 행동한다.

3. **모순 도출**: K를 자기 자신에게 입력하면 (K(K)):
   - H(K, K) = "loops forever"이면 → K(K)가 정지 → 그런데 H의 정의에 의하면 H(K, K) = "halt"이어야 → 모순
   - H(K, K) = "halt"이면 → K(K)가 무한 루프 → H의 정의에 의하면 H(K, K) = "loops forever"이어야 → 모순

4. **결론**: 어떤 경우든 모순이 발생하므로, H는 존재할 수 없다.

이 결과는 **모든 문제를 해결하는 알고리즘이 존재하는 것은 아니다**라는 근본적인 한계를 보여준다.

## 예시

정지 문제의 구조를 도식화하면:

```
프로그램 H(P, I):
  입력: 프로그램 P, 입력 I
  출력: "halt" 또는 "loops forever"

프로그램 K(P):
  if H(P, P) = "loops forever" then halt
  if H(P, P) = "halt" then loop forever

K(K)를 호출하면?
  → H(K, K)가 무엇을 출력하든 모순이 발생!
```

이 증명은 대각선 논법(diagonalization)과 유사한 자기 참조적 구조를 사용한다. [[Proof by Contradiction]]의 대표적 적용 사례이다.

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/) - 알고리즘의 한계를 보여주는 문제
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 정지 문제의 증명에 사용된 증명 기법
- [다루기 쉬움 (Tractability)](/knowledge/algorithms/tractability/) - 풀 수 없는 문제 vs. 다루기 어려운 문제의 구분
- [Proposition](/knowledge/mathematics/proposition/) - 증명의 논리적 구조
- [Cardinality](/knowledge/mathematics/cardinality/) - 대각선 논법과의 연관성
