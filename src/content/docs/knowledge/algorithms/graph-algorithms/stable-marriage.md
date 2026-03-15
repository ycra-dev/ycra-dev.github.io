---
title: "안정 결혼 (Stable Marriage)"
description: "안정 결혼 문제(Stable Marriage Problem)는 n명의 남성과 n명의 여성이 각각 상대방에 대한 선호 순위를 가질 때, 블로킹 페어(blocking pair)가 없는 안정 매칭(stable matching)을 찾는 문제이다"
tags: ['Stable Marriage', 'Gale Shapley', 'Deferred Acceptance', 'Matching', 'Preference']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/stable-marriage
sidebar:
  order: 29
---

## 핵심 개념

안정 결혼 문제는 Gale과 Shapley가 1962년에 제안한 지연 수락(deferred acceptance) 알고리즘으로 항상 해결 가능하다.

**핵심 정의**:
- **블로킹 페어(Blocking Pair)**: 매칭 M에서, 현재 파트너보다 서로를 더 선호하는 남녀 쌍 (m, w)
  - m이 현재 파트너보다 w를 선호하고, w도 현재 파트너보다 m을 선호
- **안정 매칭(Stable Matching)**: 블로킹 페어가 없는 완전 매칭

**Gale-Shapley 알고리즘 (남성 제안 방식)**:
1. 각 남성은 자유 상태로 시작
2. 자유인 남성이 아직 제안하지 않은 여성 중 가장 선호하는 여성에게 제안
3. 여성이 자유이면 임시로 수락
4. 여성이 이미 매칭되어 있으면:
   - 현재 파트너보다 제안자를 더 선호하면: 기존 파트너를 거절하고 제안자 수락
   - 아니면: 제안자를 거절
5. 모든 남성이 매칭될 때까지 반복

**속성**:
- **종료 보장**: 최대 n^2번의 제안 후 종료 -> O(n^2) 시간
- **안정성 보장**: 결과 매칭은 항상 안정적 (Theorem)
- **존재성**: 모든 인스턴스에 대해 안정 매칭이 존재
- **유일하지 않음**: 여러 안정 매칭이 존재할 수 있음

**제안측 최적성**:
- 남성이 제안하는 Gale-Shapley는 남성에게 최적(man-optimal)
- 각 남성은 모든 안정 매칭 중 가장 선호하는 파트너를 얻음
- 동시에 여성에게는 최악(woman-pessimal): 각 여성은 모든 안정 매칭 중 가장 덜 선호하는 파트너를 얻음

## 예시

```
GALE-SHAPLEY(남성 선호, 여성 선호)
1  모든 남성과 여성을 자유로 초기화
2  while 자유인 남성 m이 존재하고 m이 아직 제안하지 않은 여성이 존재
3      w = m의 선호 목록에서 아직 제안하지 않은 최상위 여성
4      if w가 자유
5          (m, w) 임시 매칭
6      else if w가 현재 파트너 m'보다 m을 선호
7          (m, w) 임시 매칭, m'은 자유로 전환
8      else
9          w가 m을 거절 (아무 변화 없음)
10 return 매칭

예시 (n=3):
남성 선호: m1: [w1, w2, w3], m2: [w1, w3, w2], m3: [w1, w2, w3]
여성 선호: w1: [m2, m1, m3], w2: [m1, m3, m2], w3: [m1, m2, m3]

라운드 1: m1->w1(수락), m2->w1(w1은 m2>m1, m1해제), m3->w1(w1은 m2>m3, 거절)
라운드 2: m1->w2(수락), m3->w2(w2는 m1>m3, 거절)
라운드 3: m3->w3(수락)
결과: {(m1,w2), (m2,w1), (m3,w3)} - 안정 매칭
```

## 관련 개념

- [이분 매칭 (Bipartite Matching)](/knowledge/algorithms/bipartite-matching/)
- [헝가리 알고리즘 (Hungarian Algorithm)](/knowledge/algorithms/hungarian-algorithm/)
- [그래프 (Graph)](/knowledge/algorithms/graph/)
