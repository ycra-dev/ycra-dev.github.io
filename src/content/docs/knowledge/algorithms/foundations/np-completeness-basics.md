---
title: "NP-완전 (NP-Completeness)"
description: "다항 시간 내에 해결하는 알고리즘이 알려져 있지 않은 문제들의 클래스로 외판원 문제가 대표적 예시"
tags: ["Algorithm", "NP-Complete", "Complexity-Theory", "P-vs-NP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/np-completeness-basics
sidebar:
  order: 42
---

## 핵심 개념

NP-완전(NP-Complete)은 다항 시간(polynomial time) 내에 해결하는 알고리즘이 알려져 있지 않은 문제들의 클래스이다. 이 문제들은 서로 동치(equivalent)여서, 하나라도 효율적으로 풀 수 있으면 나머지 모두 효율적으로 풀 수 있다.

## 동작 원리

### P vs NP 문제
- **P (Polynomial)**: 다항 시간 내에 풀 수 있는 문제. 예: 정렬, 탐색.
- **NP (Nondeterministic Polynomial)**: 해답이 주어지면 다항 시간 내에 검증할 수 있는 문제.
- **P = NP?**: "검증이 쉬운 문제는 풀기도 쉬운가?" — 컴퓨터 과학 최대의 미해결 문제이다. 클레이 수학연구소의 밀레니엄 문제 중 하나로 100만 달러의 상금이 걸려 있다.

### 대표적인 NP-완전 문제: 외판원 문제 (Traveling Salesman Problem)
N개의 도시를 각각 한 번씩 방문하고 출발점으로 돌아오는 최단 경로를 찾는 문제이다. 도시 수가 늘어나면 가능한 경로의 수가 폭발적으로 증가한다 ((N-1)!/2 가지). 20개 도시만 해도 약 6.1 × 10^16 가지 경로가 존재한다.

### 실용적 대응
NP-완전 문제를 만나면 다음 중 하나를 선택해야 한다:
1. 작은 입력에서만 정확한 해를 구한다.
2. **근사 알고리즘**으로 "충분히 좋은" 해를 빠르게 구한다.
3. **휴리스틱**을 사용하여 대부분의 경우에 잘 작동하는 방법을 쓴다.

택배 배송 경로 최적화, 시간표 작성, 회로 설계 등 많은 실제 문제가 NP-완전이다.

## 예시

외판원 문제 - 도시 수에 따른 가능한 경로 수:

```
도시 수    가능한 경로 수        탐색 시간 (초당 10억 개)
  5             12                 즉시
 10        181,440                 즉시
 15    43,589,145,600              약 44초
 20    ~6.1 × 10^16               약 2년
 25    ~3.1 × 10^23               약 1,000만 년
```

NP-완전 문제의 검증 vs 풀이:

```
스도쿠 비유:
- 풀기: 빈칸을 모두 채우는 것 → 어려움 (NP)
- 검증: 완성된 답이 규칙에 맞는지 확인 → 쉬움 (P)

P = NP? → "검증이 쉬우면 풀기도 쉬운가?"
대부분의 학자들은 P ≠ NP라고 믿지만, 아직 증명하지 못했다.
```

## 관련 개념

- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm-basics/) - NP-완전 문제에는 효율적 알고리즘이 알려져 있지 않음
- [시간 복잡도 (Time Complexity)](/knowledge/algorithms/time-complexity-basics/) - 지수 시간 복잡도와의 관계
- [정렬 알고리즘 (Sorting Algorithm)](/knowledge/algorithms/sorting-algorithm-basics/) - P에 속하는 효율적 알고리즘의 예시

## 출처

- Understanding the Digital World, Chapter 4
