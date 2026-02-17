---
title: "Nested-Loop Join"
description: "중첩 루프 조인(Nested-Loop Join)은 두 릴레이션의 조인을 구현하는 가장 기본적인 알고리즘으로, 외부 릴레이션의 각 튜플에 대해 내부 릴레이션의 모든 튜플을 순회하며 조인 조건을 검사하는 방식이다"
tags: ['Join', 'Nested Loop', 'Query Processing', 'Block Nested Loop']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/nested-loop-join
sidebar:
  order: 5
---

## 핵심 개념

**기본 중첩 루프 조인(Simple Nested-Loop Join):**
외부 릴레이션 r의 각 튜플 t_r에 대해 내부 릴레이션 s의 모든 튜플 t_s를 검사한다. 조인 조건의 종류와 관계없이 사용 가능하지만, 비용이 매우 높다. 최악의 경우 비용은 `n_r * b_s + b_r` 블록 전송과 `n_r + b_r` 디스크 탐색이다.

**블록 중첩 루프 조인(Block Nested-Loop Join):**
튜플 단위가 아닌 블록 단위로 중첩 루프를 수행하여 효율을 크게 개선한다. 외부 릴레이션의 각 블록에 대해 내부 릴레이션의 각 블록을 읽어 메모리에서 조인을 수행한다. 비용은 `b_r * b_s + b_r` 블록 전송과 `2 * b_r` 디스크 탐색이다.

더 큰 메모리가 사용 가능하면, 외부 릴레이션에 M-2 블록을 할당하고(1블록은 내부 릴레이션 입력용, 1블록은 출력용), 한 번에 M-2 블록을 처리하여 비용을 `⌈b_r/(M-2)⌉ * b_s + b_r` 블록 전송으로 줄일 수 있다.

**인덱스 중첩 루프 조인(Indexed Nested-Loop Join):**
내부 릴레이션에 조인 속성에 대한 인덱스가 있으면, 전체 스캔 대신 인덱스 조회를 사용할 수 있다. 각 외부 튜플에 대해 인덱스를 사용하여 조인 조건을 만족하는 내부 릴레이션의 튜플만 효율적으로 찾을 수 있다. 외부 릴레이션이 작고 내부 릴레이션의 인덱스 검색에서 소수의 튜플만 반환되는 경우 해시 조인보다 훨씬 낮은 비용을 가질 수 있다.

## 예시

student ⋈ takes 조인을 고려하자. student는 5000 레코드/100 블록, takes는 10000 레코드/400 블록이다.

```
블록 중첩 루프 조인 (student가 외부):
  블록 전송 = 100 * 400 + 100 = 40,100
  디스크 탐색 = 2 * 100 = 200

블록 중첩 루프 조인 (takes가 외부):
  블록 전송 = 400 * 100 + 400 = 40,400
  디스크 탐색 = 2 * 400 = 800
```

student를 외부 릴레이션으로 사용하는 것이 탐색 횟수가 적어 더 효율적이다. 메모리가 M=20이면:

```
블록 전송 = ⌈100/18⌉ * 400 + 100 = 6 * 400 + 100 = 2,500
디스크 탐색 = 2 * ⌈100/18⌉ = 12
```

## 관련 개념

- [Hash Join](/knowledge/database/hash-join/)
- [Merge Join](/knowledge/database/merge-join/)
- [Query Processing](/knowledge/database/query-processing/)
- [Selection Operation](/knowledge/database/selection-operation/)
