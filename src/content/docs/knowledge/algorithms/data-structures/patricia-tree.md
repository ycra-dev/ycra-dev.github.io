---
title: "Patricia Tree"
description: "Patricia 트리(Practical Algorithm To Retrieve Information Coded In Alphanumeric)는 트라이에서 단일 자식을 가진 노드를 압축하여 공간을 절약한 압축 이진 트라이다"
tags: ["Patricia Tree", "Digital Searching", "Compressed Trie", "Space Efficient", "Bit Comparison", "TAOCP"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/data-structures/patricia-tree
sidebar:
  order: 37
---

## 핵심 개념

Patricia 트리(Practical Algorithm To Retrieve Information Coded In Alphanumeric, D. R. Morrison 1968)는 트라이에서 단일 자식을 가진 노드를 압축하여 공간을 절약한 압축 이진 트라이다. 각 내부 노드는 SKIP 필드를 통해 건너뛸 비트 수를 기록하며, 링크가 위를 향할 수 있는 독특한 구조를 갖는다.

**핵심 아이디어:**
일반 트라이에서 단일 자식 노드(하나의 방향으로만 분기되는 노드)는 불필요하다. Patricia는 이를 SKIP 필드로 대체하여 다음에 검사할 비트 위치를 직접 지정한다.

## 동작 원리

**노드 구조:**
```
NODE = {
    KEY: 저장된 키
    SKIP: 이 노드에서 검사할 비트 위치 (건너뛴 비트 수)
    LLINK: 왼쪽 자식 (비트=0)
    RLINK: 오른쪽 자식 (비트=1)
}
```

**업 링크(Up Link):**
Patricia의 가장 특이한 특징: 리프 대신 위 방향 링크를 사용. 탐색이 이미 방문한 노드로의 링크에 도달하면 해당 노드에서 키 전체를 비교하여 성공/실패 결정.

**Algorithm P (탐색):**
1. 루트에서 시작
2. 현재 노드의 SKIP 비트 위치를 검사하여 분기
3. 링크가 위를 향하면(업 링크) 해당 노드 키와 전체 비교
4. 일치하면 성공, 불일치하면 실패

**삽입:**
1. 탐색 실패 후 불일치 비트 위치 q를 찾음
2. SKIP[q]에 해당하는 노드 사이에 새 노드 삽입
3. 새 노드의 한 링크는 자기 자신 또는 위를 향하는 업 링크

**공간 효율:**
- N개의 키에 대해 정확히 N-1개의 내부 노드
- 일반 트라이의 최대 N log N개 노드 대비 크게 절약
- 추가 SKIP 필드만 필요 (노드당 1개)

**성능:**
- 탐색: O(log N) 비트 검사 + 1번의 전체 키 비교
- 랜덤 이진 키에서 평균 비트 검사 수: ≈ log₂ N

**트라이 vs Patricia 비교:**

| 특성 | Trie | Patricia |
|------|------|---------|
| 노드 수 | N/ln2 평균 | N-1개 |
| 비트 검사 | O(log N) | O(log N) |
| 삽입 복잡도 | 단순 | 복잡 |
| 업 링크 | 없음 | 있음 |

## 예시

```
키 집합: {ABCD, ABCE, ABCF}
트라이에서는 A→B→C 분기가 단일 자식 → Patricia에서 SKIP=3으로 통합
루트의 SKIP=3: 첫 3비트를 건너뛰고 4번째 비트에서 분기

2비트 키 {00, 01, 10, 11}의 Patricia 트리:
일반 이진 트라이보다 내부 노드 1개 절약
- 루트 SKIP=0: 첫 비트에서 분기
- 각 자식 SKIP=1: 두 번째 비트에서 분기 (업 링크 사용)
```

## 관련 개념

- [Trie](/knowledge/algorithms/data-structures/trie/)
- [Digital Search Tree](/knowledge/algorithms/data-structures/digital-search-tree/)
- [Radix Search](/knowledge/algorithms/data-structures/radix-search/)
- [B-Tree](/knowledge/algorithms/data-structures/b-tree/)
