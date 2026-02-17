---
title: "Distributed Deadlock Detection"
description: "분산 교착상태 감지(Distributed Deadlock Detection)는 분산 데이터베이스 시스템에서 여러 노드에 걸쳐 발생하는 교착상태를 탐지하는 기법이다"
tags: ['Deadlock', 'Wait For Graph', 'Distributed Locking', 'False Cycle', 'Centralized Detection']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/distributed-deadlock-detection
sidebar:
  order: 26
---

## 핵심 개념

분산 시스템에서 트랜잭션이 여러 노드의 데이터에 잠금을 요청할 수 있으므로, 교착상태가 여러 노드에 걸쳐 발생할 수 있다. 로컬 대기 그래프에는 순환이 없지만, 글로벌 대기 그래프에는 순환이 존재하는 상황이 가능하다.

**중앙 집중식 감지(Centralized Detection)**: 하나의 코디네이터 노드가 모든 노드의 로컬 대기 그래프를 수집하여 글로벌 대기 그래프를 구성한다. 글로벌 그래프에서 순환을 탐지하면 교착상태로 판단하고, 순환에 포함된 트랜잭션 중 하나를 중단(abort)한다.

**거짓 순환(False Cycles)** 문제: 로컬 대기 그래프가 비동시적으로 수집되면, 실제로는 존재하지 않는 순환이 글로벌 그래프에 나타날 수 있다. 트랜잭션 T1이 T2를 기다리는 간선이 Node A에서 수집되고, T2가 이미 잠금을 해제한 후 T2가 T1을 기다리는 간선이 Node B에서 수집되면, 글로벌 그래프에 거짓 순환이 형성된다.

거짓 순환으로 인해 불필요하게 트랜잭션이 중단될 수 있지만, 정확성(교착상태를 놓치는 것)에는 영향을 미치지 않는다. 거짓 순환을 줄이기 위해 타임스탬프 기반 검증이나, 순환 감지 후 관련 노드에 재확인하는 방법이 사용된다.

**타임아웃 기반 접근**: 실제 시스템에서는 복잡한 글로벌 교착상태 감지 대신, 타임아웃을 사용하는 경우가 많다. 트랜잭션이 일정 시간 이상 잠금을 기다리면 교착상태로 간주하고 중단한다. 간단하지만, 거짓 양성(실제로는 교착상태가 아닌데 중단)이 발생할 수 있다.

## 예시

```
-- 분산 교착상태 예시

Node A:                    Node B:
  T1 → lock(x) 보유        T2 → lock(y) 보유
  T1 → lock(y) 대기 중      T2 → lock(x) 대기 중

로컬 대기 그래프:
  Node A: T1 → T2 (T1이 T2를 기다림)
  Node B: T2 → T1 (T2가 T1을 기다림)

각 로컬 그래프에는 순환 없음!

글로벌 대기 그래프:
  T1 → T2 → T1  (순환 존재 → 교착상태!)

-- 거짓 순환 예시:
시점 1 (Node A 그래프 수집):
  T1 → T2 (T1이 T2의 잠금 대기)

시점 2 (Node B 그래프 수집, T2가 이미 잠금 해제 후):
  T2 → T3 → T1 (새로운 대기 관계)

글로벌 그래프: T1 → T2 → T3 → T1 (순환!)
실제로는: T2가 이미 잠금을 해제했으므로 교착상태 아님
→ 거짓 순환으로 인한 불필요한 트랜잭션 중단

-- 해결: 중앙 코디네이터가 순환 감지 후 관련 노드에 재확인
  코디네이터 → Node A: "T1이 아직 T2를 기다리나요?"
  Node A: "아니요, T2가 이미 잠금 해제함"
  → 거짓 순환으로 판단, 중단하지 않음
```

## 관련 개념

- [Two-Phase Commit](/knowledge/database/two-phase-commit/)
- [Distributed Database System](/knowledge/database/distributed-database-system/)
- [Coordinator Selection](/knowledge/database/coordinator-selection/)
- [CAP Theorem](/knowledge/database/cap-theorem/)
