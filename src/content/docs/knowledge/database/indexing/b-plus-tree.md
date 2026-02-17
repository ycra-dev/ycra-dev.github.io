---
title: "B-Plus Tree"
description: "B+트리(B+-Tree)는 데이터베이스에서 가장 널리 사용되는 인덱스 구조로, 루트에서 모든 리프까지의 경로 길이가 동일한 균형 트리(balanced tree)이며, 삽입과 삭제에도 자동으로 균형을 유지한다"
tags: ['B Plus Tree', 'Balanced Tree', 'Index Structure', 'Fanout', 'Node Split', 'Range Query']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/b-plus-tree
sidebar:
  order: 4
---

## 핵심 개념

B+트리의 각 노드는 최대 n-1개의 검색 키 값과 n개의 포인터를 포함한다(n은 차수). 리프 노드는 (검색 키, 레코드 포인터) 쌍을 저장하며, 인접 리프 노드로의 포인터를 통해 순차 접근을 지원한다. 내부 노드는 자식 노드로의 경로를 안내하는 검색 키 값을 저장한다.

주요 특성:
- 루트를 제외한 모든 노드는 최소 ceil(n/2)개의 포인터를 가진다.
- 리프 노드는 ceil((n-1)/2)~(n-1)개의 검색 키 값을 저장한다.
- 트리의 높이는 O(log_{ceil(n/2)}(N))으로, 실제 디스크 기반 B+트리는 높이가 3~4 이하인 경우가 많다.

검색(find) 연산은 루트에서 시작하여 검색 키 값과 노드의 키를 비교하며 리프까지 탐색한다. 범위 검색(findRange)은 하한 키의 리프 위치를 찾은 뒤, 리프 노드의 연결 포인터를 따라 상한까지 순차 탐색한다.

삽입 시 리프 노드가 가득 차면 노드 분할(split)이 발생한다. 리프 분할 시 키를 반으로 나누고 중간 키를 부모로 올린다. 부모도 가득 차면 분할이 연쇄적으로 전파되며, 루트가 분할되면 트리 높이가 1 증가한다. 삭제 시 노드의 키가 최소 개수 미만이 되면 형제 노드와 병합(merge)하거나 재분배(redistribution)한다.

팬아웃(fanout)이 높아 디스크 접근 횟수가 매우 적다. 예를 들어 n=100이면 100만 개의 검색 키를 높이 3의 트리에 저장할 수 있다.

## 예시

B+트리 구조 (n=4, 검색 키: instructor name):

```
          [Mozart]
         /        \
   [Einstein, Gold]  [Mozart, Srinivasan]
      /    |    \       /      |      \
[Brandt  [Einstein [Gold  [Katz   [Mozart  [Singh
Califieri] El Said]  ]    Kim]   Srinivasan] Wu]
Crick]

검색: "Gold" 찾기
1. 루트 [Mozart]: Gold < Mozart → 왼쪽 자식
2. 내부 [Einstein, Gold]: Gold >= Gold → 오른쪽 자식
3. 리프 [Gold]: 발견! → 레코드 포인터 반환

범위 검색: "Einstein" ≤ name ≤ "Katz"
1. "Einstein" 리프 도착
2. Einstein → Gold → Katz 순서로 리프 체인 순회
```

## 관련 개념

- [Ordered Index](/knowledge/database/ordered-index/)
- [Dense Index](/knowledge/database/dense-index/)
- [Sparse Index](/knowledge/database/sparse-index/)
- [Hash Index](/knowledge/database/hash-index/)
- [LSM Tree](/knowledge/database/lsm-tree/)
