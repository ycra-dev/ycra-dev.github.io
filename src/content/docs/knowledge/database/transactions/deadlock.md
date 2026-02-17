---
title: "Deadlock"
description: "교착 상태(Deadlock)는 둘 이상의 트랜잭션이 서로 상대방이 보유한 잠금을 기다리며 어느 쪽도 진행할 수 없는 상태로, 잠금 기반 동시성 제어에서 불가피하게 발생할 수 있는 문제이다"
tags: ['Deadlock', 'Deadlock Prevention', 'Deadlock Detection', 'Concurrency Control']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/database/deadlock
sidebar:
  order: 11
---

## 핵심 개념

교착 상태는 트랜잭션 집합 {T0, T1, ..., Tn}에서 T0이 T1이 보유한 데이터를 기다리고, T1이 T2가 보유한 데이터를 기다리고, ..., Tn이 T0이 보유한 데이터를 기다리는 순환 대기 상황이다.

**교착 상태 처리 방법:**

**1. 교착 상태 예방(Deadlock Prevention):**

- **모든 잠금 사전 획득:** 트랜잭션이 실행 전에 필요한 모든 잠금을 한꺼번에 획득한다. 단점: 필요한 잠금을 미리 알기 어렵고, 자원 활용도가 낮다.

- **순서 기반 잠금:** 데이터 항목에 전체 순서를 부여하고, 그 순서대로만 잠금을 요청하도록 한다. 트리 프로토콜이 이 방식의 한 예이다.

- **타임스탬프 기반 방식:**
  - **Wait-Die:** 오래된 트랜잭션(작은 타임스탬프)만 대기 가능, 새 트랜잭션은 롤백(die)
  - **Wound-Wait:** 오래된 트랜잭션이 새 트랜잭션을 선점(wound), 새 트랜잭션만 대기 가능

  두 방식 모두 롤백된 트랜잭션이 재시작할 때 원래 타임스탬프를 유지하여 기아(starvation)를 방지한다.

- **잠금 타임아웃:** 잠금 대기에 시간 제한을 두고, 타임아웃되면 롤백한다. 구현이 간단하지만 적절한 타임아웃 값 설정이 어렵다.

**2. 교착 상태 탐지와 복구(Deadlock Detection and Recovery):**

- **대기 그래프(Wait-For Graph):** 트랜잭션을 노드로, "Ti가 Tj를 기다림"을 간선으로 표현한다. 그래프에 사이클이 존재하면 교착 상태이다. 주기적으로 사이클을 검사한다.

- **복구:** 교착 상태 발견 시 하나 이상의 트랜잭션을 희생(victim)으로 선택하여 롤백한다. 희생자 선택 기준: 수행된 작업량, 남은 작업량, 사용 중인 데이터 항목 수 등.

- **기아 방지:** 같은 트랜잭션이 반복적으로 희생자로 선택되지 않도록, 롤백 횟수를 비용 함수에 포함한다.

## 예시

교착 상태 발생 예:
```
T3: lock-X(B);
    read(B);
    B := B - 50;
    write(B);
                T4: lock-S(A);
                    read(A);
                    lock-S(B);     ← T3이 B의 X-lock 보유, T4 대기
    lock-X(A);                     ← T4가 A의 S-lock 보유, T3 대기

→ T3은 T4를 기다리고, T4는 T3을 기다림 → 교착 상태!
```

대기 그래프:
```
T3 → T4  (T3이 T4가 가진 A의 잠금을 기다림)
T4 → T3  (T4가 T3이 가진 B의 잠금을 기다림)
→ 사이클 존재 → 교착 상태
```

Wait-Die 방식 적용 (T3 타임스탬프=5, T4 타임스탬프=10):
```
T3이 B를 잠금한 상태에서 T4가 B를 요청:
  T4(10) > T3(5) → T4는 기다리지 않고 롤백 (die)
→ 교착 상태 미연에 방지
```

## 관련 개념

- [Two-Phase Locking](/knowledge/database/two-phase-locking/)
- [Lock-Based Protocol](/knowledge/database/lock-based-protocol/)
- [Timestamp-Based Protocol](/knowledge/database/timestamp-based-protocol/)
- [Transaction](/knowledge/database/transaction/)
