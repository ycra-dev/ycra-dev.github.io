---
title: "Hash Join"
description: "해시 조인(Hash Join)은 해시 함수를 사용하여 두 릴레이션을 조인 속성 값에 따라 파티션으로 나눈 후, 같은 파티션끼리 매칭하여 조인을 수행하는 알고리즘으로, 등가 조인(equi-join)과 자연 조인에 효율적으로 적용된다"
tags: ['Join', 'Hash Join', 'Partitioning', 'Query Processing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/hash-join
sidebar:
  order: 7
---

## 핵심 개념

해시 조인은 크게 **분할 단계(Partitioning Phase)**와 **빌드-프로브 단계(Build-Probe Phase)**로 구성된다.

**분할 단계:** 해시 함수 h를 사용하여 릴레이션 r과 s를 각각 n_h개의 파티션으로 분할한다. 조인 속성 값이 같은 튜플은 같은 해시 값을 갖으므로 같은 파티션에 배치된다. 따라서 r_i의 튜플은 s_i의 튜플과만 매칭하면 된다.

**빌드-프로브 단계:** 각 파티션 i에 대해, 더 작은 릴레이션(빌드 릴레이션, 보통 s)의 파티션 s_i를 메모리에 읽어 인-메모리 해시 인덱스를 구축한다. 그런 다음 큰 릴레이션(프로브 릴레이션, 보통 r)의 파티션 r_i의 각 튜플로 해시 인덱스를 프로브하여 매칭 튜플을 찾는다.

**재귀적 분할:** 빌드 릴레이션의 크기가 b_s이고 M이 메모리 블록 수일 때, 재귀적 분할 없이 처리하려면 `M > √b_s` 조건을 만족해야 한다. 이 조건이 불만족이면 파티션을 다시 분할하는 재귀적 분할이 필요하다.

**비용 분석 (재귀적 분할 불필요 시):**
- 블록 전송: `3(b_r + b_s) + 4n_h`
- 디스크 탐색: `2(⌈b_r/b_b⌉ + ⌈b_s/b_b⌉) + 2n_h`

**하이브리드 해시 조인(Hybrid Hash Join):** 메모리가 충분히 크지만 빌드 릴레이션 전체를 담을 수는 없을 때 최적화하는 방법이다. 첫 번째 파티션을 메모리에 유지하여 디스크 쓰기/읽기를 절약한다. 빌드 릴레이션이 메모리보다 약간만 큰 경우 상당한 비용 절감을 제공한다.

## 예시

takes ⋈ student 자연 조인에서 M=20, b_student=100, b_takes=400인 경우:

```
student를 빌드 릴레이션으로 사용 (더 작은 릴레이션)
파티션 수: n_h = ⌈b_s/M⌉ = ⌈100/20⌉ = 5

각 student 파티션 크기: 100/5 = 20블록 → 메모리에 적합

비용:
  블록 전송 = 3(100 + 400) = 1,500
  디스크 탐색 = 2(⌈100/3⌉ + ⌈400/3⌉) + 2*5 = 2(34 + 134) + 10 = 346
```

빌드 입력 전체가 메모리에 들어가면 n_h=0으로 설정 가능하며, 이 경우:
```
비용 = b_r + b_s 블록 전송 + 2 탐색
     = 100 + 400 = 500 블록 전송
```

## 관련 개념

- [Nested-Loop Join](/knowledge/database/nested-loop-join/)
- [Merge Join](/knowledge/database/merge-join/)
- [Query Processing](/knowledge/database/query-processing/)
- [Query Optimization](/knowledge/database/query-optimization/)
