---
title: "위상 정렬 (Topological Sort)"
description: "위상 정렬(Topological Sort)은 방향 비순환 그래프(DAG) G = (V, E)의 모든 정점을 선형 순서로 배열하여, 간선 (u, v)가 존재하면 u가 v보다 앞에 오도록 하는 것이다"
tags: ['Topological Sort', 'Dag', 'Directed Acyclic Graph', 'Depth First Search', 'Ordering']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/topological-sort
sidebar:
  order: 6
---

## 핵심 개념

위상 정렬은 사건 간의 선행(precedence) 관계를 모델링하는 DAG에서 유효한 실행 순서를 결정하는 데 사용된다. 사이클이 있는 방향 그래프에서는 위상 정렬이 불가능하다.

**알고리즘 (DFS 기반)**:
1. DFS를 실행하여 각 정점의 종료 시간(finish time) v.f를 계산
2. 정점이 종료될 때마다 연결 리스트의 맨 앞에 삽입
3. 연결 리스트의 순서가 위상 정렬 결과

**시간 복잡도**: Theta(V + E) - DFS 시간 + 삽입 시간

**정확성의 핵심 (Lemma 20.11)**:
- 방향 그래프 G가 비순환 <=> DFS가 역간선(back edge)을 생성하지 않음
- DAG에서 간선 (u, v)가 탐색될 때, v.f < u.f 가 항상 성립 (Theorem 20.12)

**대안적 알고리즘 (Kahn's algorithm)**:
1. 진입 차수(in-degree)가 0인 정점을 반복적으로 선택하여 출력
2. 해당 정점과 나가는 간선을 제거
3. O(V + E) 시간에 구현 가능

**응용**:
- 작업 스케줄링 (의존성 있는 작업의 실행 순서)
- 컴파일러의 심볼 의존성 해결
- 교과목 이수 순서 결정
- PERT 차트 분석에서 임계 경로 찾기

## 예시

```
TOPOLOGICAL-SORT(G)
1  call DFS(G) to compute finish times v.f for each vertex v
2  as each vertex is finished, insert it onto the front of a linked list
3  return the linked list of vertices

예시 DAG:
  옷 입기 순서
  양말 --> 신발
  속옷 --> 바지 --> 신발
       --> 바지 --> 벨트
  셔츠 --> 넥타이 --> 재킷
       --> 벨트   --> 재킷

가능한 위상 정렬:
  속옷, 바지, 셔츠, 넥타이, 벨트, 재킷, 양말, 신발
```

## 관련 개념

- [깊이 우선 탐색 (Depth-First Search)](/knowledge/algorithms/depth-first-search/)
- [그래프 (Graph)](/knowledge/algorithms/graph/)
- [강한 연결 요소 (Strongly Connected Component)](/knowledge/algorithms/strongly-connected-component/)
- [동적 프로그래밍 (Dynamic Programming)](/knowledge/algorithms/dynamic-programming/)
