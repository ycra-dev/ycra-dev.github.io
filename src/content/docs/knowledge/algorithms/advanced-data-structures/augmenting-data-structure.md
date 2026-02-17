---
title: "Augmenting Data Structure"
description: "데이터 구조 확장(Augmenting Data Structure)은 기존의 표준 데이터 구조에 추가 정보를 저장하고 새로운 연산을 지원하도록 수정하는 알고리즘 설계 기법이다"
tags: ['Augmenting Data Structure', 'Red Black Tree', 'Data Structure Design', 'Algorithm Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/augmenting-data-structure
sidebar:
  order: 1
---

## 핵심 개념

**확장의 4단계**:
1. **기본 데이터 구조 선택**: 예를 들어 레드-블랙 트리.
2. **추가 정보 결정**: 각 노드에 어떤 추가 속성을 저장할지 결정. 예: size (순서 통계 트리), max (구간 트리).
3. **추가 정보 유지 검증**: 기본 수정 연산(삽입, 삭제)이 추가 정보를 효율적으로 유지할 수 있는지 확인.
4. **새 연산 개발**: 추가 정보를 활용하는 새 연산 설계. 예: OS-SELECT, OS-RANK, INTERVAL-SEARCH.

**정리 17.1 (레드-블랙 트리 확장 정리)**: 각 노드 x의 속성 f 값이 x, x.left, x.right의 정보(x.left.f, x.right.f 포함)로만 O(1) 시간에 계산 가능하면, 삽입과 삭제가 O(lg n) 시간을 유지하면서 f를 유지할 수 있다.

**증명 핵심**:
- f의 변경은 트리에서 위로만 전파된다: x.f 변경 -> x.p.f 갱신 필요 -> ... -> 루트까지
- 높이가 O(lg n)이므로 전파에 O(lg n) 시간
- 삽입/삭제의 회전은 O(1)개이므로, 각 회전 후 O(lg n)에 f 갱신 가능
- 총 O(lg n) 유지

**실용적 고려사항**:
- 단계들을 정확한 순서로 따르지 않아도 됨. 병렬적으로 진행하며 시행착오도 필요.
- 유지 비용이 높으면 다른 추가 정보를 고려해야 함.
- 때로는 기존 연산의 속도를 높이기 위해 확장하기도 함 (새 연산 개발 대신).

## 예시

```
// 순서 통계 트리: 레드-블랙 트리 + size 속성
// 각 노드: x.size = x.left.size + x.right.size + 1
// 새 연산: OS-SELECT(i번째 원소), OS-RANK(순위 계산)
// 유지: 삽입/삭제 시 경로상 O(lg n)개 노드의 size 갱신
//       회전 시 O(1)에 size 갱신

// 구간 트리: 레드-블랙 트리 + max 속성
// 각 노드: x.max = max{x.int.high, x.left.max, x.right.max}
// 새 연산: INTERVAL-SEARCH(겹치는 구간 찾기)
// 유지: 정리 17.1에 의해 O(lg n)

// LEFT-ROTATE 시 size 갱신 (O(1)):
// y.size = x.size          // y가 x의 위치를 차지
// x.size = x.left.size + x.right.size + 1  // x의 자식이 바뀜
```

## 관련 개념

- [Order-Statistics Tree](/knowledge/algorithms/order-statistics-tree/)
- [Interval Tree](/knowledge/algorithms/interval-tree/)
- [Red-Black Tree](/knowledge/algorithms/red-black-tree/)
- [Binary Search Tree](/knowledge/algorithms/binary-search-tree/)
- [Data Structure](/knowledge/algorithms/data-structure/)
