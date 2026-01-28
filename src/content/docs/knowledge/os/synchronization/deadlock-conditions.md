---
title: "교착 상태 필요조건 (Necessary Conditions)"
description: "교착 상태가 발생하려면 반드시 동시에 성립해야 하는 4가지 조건"
tags: ["OS", "Deadlock", "Concurrency"]
created: 2026-01-23
updated: 2026-01-27
slug: knowledge/os/deadlock-conditions
sidebar:
  order: 20
---

## 핵심 개념

교착 상태가 발생하려면 4가지 조건이 **모두** 동시에 성립해야 합니다. Coffman 등이 1971년 정립한 조건으로, 하나라도 깨면 교착 상태가 불가능합니다.

## 4가지 조건

| 조건 | 설명 |
|------|------|
| **상호 배제 (Mutual Exclusion)** | 최소 하나의 자원이 비공유 모드로 점유됨. 한 번에 한 스레드만 사용 가능 |
| **점유 대기 (Hold and Wait)** | 자원을 하나 이상 보유한 스레드가 다른 자원을 추가로 기다림 |
| **비선점 (No Preemption)** | 자원은 보유 스레드가 자발적으로만 해제 가능. 강제 회수 불가 |
| **순환 대기 (Circular Wait)** | T0→T1→T2→...→Tn→T0 형태의 대기 사이클 존재 |

순환 대기는 점유 대기를 내포합니다.

## 예시

**비유**: 4개의 자물쇠가 모두 잠겨야 문이 열리지 않는 금고. 하나라도 열면 금고 열림

**시나리오**:
- T1: `first_mutex` 획득 후 `second_mutex` 대기
- T2: `second_mutex` 획득 후 `first_mutex` 대기
- → 상호배제(mutex) + 점유대기(하나 보유하고 대기) + 비선점(자발적 해제만) + 순환대기(T1↔T2) = 교착 상태

## 관련 개념

- [[교착 상태 (Deadlock)]]
- [[자원 할당 그래프 (Resource-Allocation Graph)]]
- [[안전 상태 (Safe State)]]
