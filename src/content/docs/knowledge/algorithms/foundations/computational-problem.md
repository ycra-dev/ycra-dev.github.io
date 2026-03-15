---
title: "계산 문제 (Computational Problem)"
description: "계산 문제(Computational Problem)는 원하는 입출력 관계를 일반적 용어로 기술한 명세이며, 알고리즘은 이 관계를 달성하기 위한 구체적 계산 절차를 기술한다"
tags: ['Computational Problem', 'Problem Instance', 'Input Output']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/computational-problem
sidebar:
  order: 2
---

## 핵심 개념

계산 문제는 임의의 크기를 가진 문제 인스턴스(problem instance)에 대해 입출력 관계를 정의한다. 문제의 인스턴스란 문제를 풀기 위해 필요한 입력(문제 명세에 부과된 제약 조건을 만족하는)으로 구성된다.

흥미로운 알고리즘 문제의 두 가지 공통 특성:
1. **후보 해가 매우 많다**: 대다수는 문제를 풀지 못하며, 모든 후보를 명시적으로 검사하지 않고 올바른 해를 찾는 것이 도전 과제이다.
2. **실용적 응용이 있다**: 최단 경로, 일정 관리, 자원 배분 등 실제 문제에 직접 적용된다.

모든 문제가 명확한 후보 해 집합을 갖는 것은 아니다. 예를 들어 이산 푸리에 변환(DFT)은 시간 영역 신호를 주파수 영역으로 변환하는 문제이다.

## 예시

```
정렬 문제 (Sorting Problem):
  문제 명세: n개의 수를 단조 증가 순서로 재배열하라
  인스턴스: ⟨31, 41, 59, 26, 41, 58⟩
  해: ⟨26, 31, 41, 41, 58, 59⟩

최단 경로 문제 (Shortest Path Problem):
  문제 명세: 그래프에서 두 정점 사이의 최단 경로를 찾아라
  인스턴스: 특정 도로 지도와 출발지/목적지
  해: 최소 거리 경로
```

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
- [정확성 (Correctness)](/knowledge/algorithms/correctness/)
