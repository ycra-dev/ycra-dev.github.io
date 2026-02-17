---
title: "Distributed Query Processing"
description: "분산 질의 처리(Distributed Query Processing)는 지리적으로 분산된 데이터베이스 시스템에서 질의를 처리하는 기법이다"
tags: ['Distributed Database', 'Semijoin', 'Bloom Filter', 'Network Cost', 'Query Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/distributed-query-processing
sidebar:
  order: 19
---

## 핵심 개념

분산 환경에서는 노드 간 데이터 전송 비용이 매우 크므로, 전송할 데이터의 양을 최소화하는 것이 질의 최적화의 핵심 목표이다.

**조인 위치 결정**: 두 릴레이션이 서로 다른 사이트에 있을 때, 한 릴레이션을 다른 사이트로 전송하거나, 두 릴레이션을 제3의 사이트로 전송하여 조인할 수 있다. 최적화기는 전송 비용과 로컬 처리 비용을 모두 고려하여 결정한다.

**세미조인 전략(Semijoin Strategy)**: 네트워크 비용을 크게 줄일 수 있는 핵심 기법이다.
1. 사이트 S1에서 릴레이션 r의 조인 속성 값을 투영(project)하여 사이트 S2로 전송한다.
2. S2에서 릴레이션 s와 세미조인하여 실제 조인에 참여하는 튜플만 필터링한다.
3. 필터링된 s의 튜플만 S1으로 전송하여 최종 조인을 수행한다.

세미조인의 핵심은 전체 릴레이션 대신 조인에 필요한 튜플만 전송하므로, 조인 선택도가 낮을 때(조인에 참여하는 튜플이 소수일 때) 통신 비용을 크게 줄인다.

**블룸 필터를 이용한 세미조인 최적화**: 조인 속성 값의 집합을 전송하는 대신, 블룸 필터를 전송한다. 블룸 필터는 공간 효율적이며, 거짓 양성(false positive)은 있지만 거짓 음성(false negative)은 없다. 따라서 일부 불필요한 튜플이 전송될 수 있지만, 필요한 튜플이 누락되지는 않는다.

## 예시

```
-- 세미조인 전략 예시
-- r(A, B)은 서울에, s(A, C)는 뉴욕에 저장
-- 질의: r ⋈ s ON r.A = s.A

방법 1 (단순 전송): s 전체를 서울로 전송
  전송량: |s| × tuple_size(s) = 100만 × 200B = 200MB

방법 2 (세미조인):
  Step 1: 서울에서 π_A(r) = {1, 5, 8, 12, ...}를 뉴욕으로 전송
    전송량: |π_A(r)| × size(A) = 10만 × 8B = 0.8MB
  Step 2: 뉴욕에서 s ⋉ π_A(r) 계산 → 조인 참여 튜플만 선택
    매칭 튜플: 5000개
  Step 3: 필터링된 s를 서울로 전송
    전송량: 5000 × 200B = 1MB
  총 전송량: 0.8MB + 1MB = 1.8MB (vs 200MB)

방법 3 (블룸 필터 세미조인):
  Step 1: 서울에서 r.A 값으로 블룸 필터 생성 후 뉴욕으로 전송
    전송량: 블룸 필터 크기 ≈ 100KB
  Step 2: 뉴욕에서 블룸 필터로 s 필터링
    매칭 튜플: 5200개 (200개 거짓 양성 포함)
  Step 3: 필터링된 s를 서울로 전송
    전송량: 5200 × 200B = 1.04MB
  총 전송량: 0.1MB + 1.04MB = 1.14MB
```

## 관련 개념

- [Bloom Filter](/knowledge/database/bloom-filter/)
- [Parallel Join](/knowledge/database/parallel-join/)
- [Parallel Query Optimization](/knowledge/database/parallel-query-optimization/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
- [Intra-Query Parallelism](/knowledge/database/intra-query-parallelism/)
