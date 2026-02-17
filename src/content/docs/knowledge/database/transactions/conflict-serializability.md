---
title: "Conflict Serializability"
description: "충돌 직렬 가능성(Conflict Serializability)은 스케줄 내의 충돌하는 연산 쌍의 순서가 어떤 직렬 스케줄에서의 순서와 동일한 경우를 의미하며, 실제 데이터베이스 시스템에서 직렬 가능성을 판단하는 데 가장 널리 사용되는 기준이다"
tags: ['Conflict Serializability', 'Precedence Graph', 'Concurrency', 'Schedule']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/conflict-serializability
sidebar:
  order: 5
---

## 핵심 개념

**충돌(Conflict)의 정의:**
두 연산이 다음 조건을 모두 만족하면 충돌한다:
1. 서로 다른 트랜잭션에 속함
2. 같은 데이터 항목에 접근
3. 적어도 하나가 쓰기(write) 연산

충돌의 유형:
- **read-write 충돌:** 하나가 읽고 다른 하나가 쓰는 경우
- **write-write 충돌:** 둘 다 쓰는 경우
- read-read는 충돌이 아님 (둘 다 읽기만 하므로)

**충돌 동치(Conflict Equivalent):**
두 스케줄 S와 S'이 충돌 동치라 함은, 충돌하지 않는 연속된 연산 쌍을 교환하는 것만으로 S를 S'로 변환할 수 있다는 의미이다.

**선행 그래프(Precedence Graph)를 이용한 판별:**
충돌 직렬 가능성을 검사하는 효율적인 방법은 선행 그래프를 구성하는 것이다:
1. 각 트랜잭션을 노드로 생성
2. Ti의 연산이 Tj의 충돌 연산보다 먼저 실행되면 Ti → Tj 간선 추가
3. 그래프에 사이클이 없으면 충돌 직렬 가능

선행 그래프가 비순환(acyclic)이면, 위상 정렬(topological sort)을 통해 동등한 직렬 순서를 구할 수 있다. 이 순서는 유일하지 않을 수 있다.

**충돌 직렬 가능성과 뷰 직렬 가능성의 관계:**
모든 충돌 직렬 가능 스케줄은 뷰 직렬 가능하다. 그러나 역은 성립하지 않는다. 뷰 직렬 가능성은 "블라인드 쓰기"(값을 읽지 않고 쓰는 것)가 있는 경우에 충돌 직렬 가능하지 않지만 뷰 직렬 가능한 스케줄을 허용한다. 뷰 직렬 가능성 검사는 NP-hard이므로 실제 시스템에서는 충돌 직렬 가능성을 사용한다.

## 예시

T1과 T2의 스케줄에서 충돌 직렬 가능성 판별:

```
스케줄 S:
  T1: read(A)
  T2: read(A)
  T1: write(A)
  T2: write(A)
  T1: read(B)
  T2: read(B)
  T1: write(B)
  T2: write(B)
```

충돌 쌍 분석:
```
1. T1:read(A) vs T2:write(A) → T1 → T2 (T1이 먼저)
2. T2:read(A) vs T1:write(A) → T2 → T1 (T2가 먼저)
```

선행 그래프:
```
T1 → T2  (충돌 1에서)
T2 → T1  (충돌 2에서)
→ 사이클 존재! → 충돌 직렬 가능하지 않음
```

충돌 직렬 가능한 스케줄의 예:
```
스케줄 S':
  T1: read(A)
  T1: write(A)
  T2: read(A)
  T2: write(A)
  T1: read(B)
  T1: write(B)
  T2: read(B)
  T2: write(B)

선행 그래프: T1 → T2 (사이클 없음)
→ T1, T2 직렬 순서와 동등
```

## 관련 개념

- [Serializability](/knowledge/database/serializability/)
- [Schedule](/knowledge/database/schedule/)
- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Transaction](/knowledge/database/transaction/)
- [Cascadeless Schedule](/knowledge/database/cascadeless-schedule/)
