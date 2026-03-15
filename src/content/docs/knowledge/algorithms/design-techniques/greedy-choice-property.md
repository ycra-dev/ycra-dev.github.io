---
title: "탐욕 선택 속성 (Greedy Choice Property)"
description: "그리디 선택 성질(Greedy-Choice Property)은 지역적으로 최적인 (그리디) 선택을 함으로써 전역적으로 최적인 해를 구성할 수 있다는 성질이다"
tags: ['Greedy Choice Property', 'Greedy Algorithm', 'Optimization', 'Proof Technique']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/greedy-choice-property
sidebar:
  order: 9
---

## 핵심 개념

그리디 선택 성질은 그리디 알고리즘의 정당성을 증명하기 위한 핵심 요소이다. DP와의 결정적 차이점은 선택의 시점에 있다:

- **DP**: 선택은 부분 문제의 해에 의존한다. 즉, 먼저 부분 문제를 풀고 그 결과를 보고 선택한다.
- **그리디**: 선택은 미래의 부분 문제 해에 의존하지 않는다. 현재까지의 선택에만 의존하여 즉시 결정한다. 그 후 남은 부분 문제를 푼다.

**증명 기법**: 그리디 선택 성질의 전형적인 증명 방법:
1. 전역 최적 해가 존재한다고 가정한다.
2. 이 최적 해가 그리디 선택을 포함하지 않는 경우, 그리디 선택으로 교체(substitute)해도 해의 질이 나빠지지 않음을 보인다.
3. 따라서 그리디 선택을 포함하는 최적 해가 반드시 존재한다.

이 "교환 논증(exchange argument)" 기법은 그리디 알고리즘의 정당성 증명에서 가장 많이 사용되는 방법이다.

**그리디 선택의 효율성**: 그리디 선택은 보통 빠르게 이루어진다. 예를 들어 활동 선택에서는 정렬 후 O(1)에, 허프만 코딩에서는 우선순위 큐를 사용하여 O(lg n)에 선택한다. 더 넓은 범위의 선택을 고려하는 DP에 비해 효율적이다.

## 예시

**활동 선택 문제에서의 증명 (정리 15.1)**:
- 그리디 선택: 가장 먼저 끝나는 활동 a_m을 선택
- 증명: 최적 해 A_k에서 가장 먼저 끝나는 활동 a_j를 a_m으로 교체해도 호환성이 유지됨
  (f_m <= f_j이므로 a_m과 나머지 활동들은 여전히 호환)
- 따라서 a_m을 포함하는 최적 해가 존재한다

**허프만 코딩에서의 증명 (보조정리 15.2)**:
- 그리디 선택: 빈도가 가장 낮은 두 문자 x, y를 형제 리프로 배치
- 증명: 최적 트리 T에서 최대 깊이의 형제 a, b를 x, y와 교환해도 비용이 증가하지 않음

**오프라인 캐싱에서의 증명 (정리 15.5)**:
- 그리디 선택: 가장 먼 미래에 접근될 블록을 퇴출 (furthest-in-future)
- 증명: 다른 블록을 퇴출하는 최적 해 S를 수정하여 같거나 더 적은 캐시 미스를 가진 해 S'를 구성

## 관련 개념

- [탐욕 알고리즘 (Greedy Algorithm)](/knowledge/algorithms/greedy-algorithm/)
- [활동 선택 (Activity Selection)](/knowledge/algorithms/activity-selection/)
- [허프만 코딩 (Huffman Coding)](/knowledge/algorithms/huffman-coding/)
- [최적 부분 구조 (Optimal Substructure)](/knowledge/algorithms/optimal-substructure/)
- [동적 프로그래밍 (Dynamic Programming)](/knowledge/algorithms/dynamic-programming/)
