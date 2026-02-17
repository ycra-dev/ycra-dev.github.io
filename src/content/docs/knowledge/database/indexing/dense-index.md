---
title: "Dense Index"
description: "밀집 인덱스(Dense Index)는 파일에 존재하는 모든 검색 키 값에 대해 인덱스 엔트리를 가지는 순서 인덱스로, 각 엔트리가 해당 검색 키를 가진 레코드(또는 첫 번째 레코드)에 대한 포인터를 포함한다"
tags: ['Dense Index', 'Index Entry', 'Clustering Index', 'Nonclustering Index', 'Search Key']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/dense-index
sidebar:
  order: 2
---

## 핵심 개념

밀집 인덱스의 동작은 클러스터링 여부에 따라 다르다:

1. **밀집 클러스터링 인덱스**: 검색 키 값과 해당 값을 가진 첫 번째 데이터 레코드에 대한 포인터를 저장한다. 같은 검색 키를 가진 나머지 레코드는 파일이 정렬되어 있으므로 첫 번째 레코드 이후에 순차적으로 위치한다.

2. **밀집 비클러스터링 인덱스**: 같은 검색 키 값을 가진 모든 레코드에 대한 포인터 목록을 저장해야 한다. 파일이 해당 검색 키 순서로 정렬되어 있지 않으므로, 각 레코드의 위치를 개별적으로 기록해야 한다.

밀집 인덱스는 희소 인덱스보다 레코드 검색이 빠르다. 검색 키 값을 인덱스에서 찾으면 즉시 해당 레코드에 접근할 수 있다. 반면, 더 많은 공간을 차지하고 삽입/삭제 시 유지 보수 오버헤드가 크다.

밀집 인덱스와 희소 인덱스 사이의 좋은 절충안은 블록당 하나의 인덱스 엔트리를 가진 희소 인덱스이다. 이 경우 블록 내 레코드를 찾기 위한 추가 시간은 블록이 이미 메모리에 적재되어 있으므로 무시할 수 있다.

## 예시

밀집 인덱스 검색 예시:

```
instructor 파일 (ID 기준 정렬):
블록1: [10101, Srinivasan] [12121, Wu]    [15151, Mozart]
블록2: [22222, Einstein]   [32343, El Said] [33456, Gold]
블록3: [45565, Katz]       [58583, Califieri]
블록4: [76543, Singh]      [76766, Crick]
블록5: [83821, Brandt]     [98345, Kim]

밀집 인덱스 (ID에 대해):
10101 → 블록1, 오프셋0
12121 → 블록1, 오프셋1
15151 → 블록1, 오프셋2
22222 → 블록2, 오프셋0
32343 → 블록2, 오프셋1
...
98345 → 블록5, 오프셋1

검색: ID = 22222
1. 인덱스에서 22222 직접 찾음
2. 포인터 따라 블록2, 오프셋0으로 이동
3. 레코드 즉시 반환

비교: 희소 인덱스라면
- 22222 이하의 가장 큰 인덱스 엔트리(예: 10101) 찾기
- 블록1부터 순차 탐색 필요
```

## 관련 개념

- [Sparse Index](/knowledge/database/sparse-index/)
- [Ordered Index](/knowledge/database/ordered-index/)
- [B-Plus Tree](/knowledge/database/b-plus-tree/)
- [Sequential File](/knowledge/database/sequential-file/)
