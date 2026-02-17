---
title: "Sequential Logic"
description: "순차 논리(Sequential Logic)는 메모리를 포함하는 논리 블록으로, 출력이 현재 입력뿐만 아니라 내부 메모리에 저장된 상태(state)에도 의존하는 디지털 논리 시스템이다"
tags: ['State Element', 'Memory', 'Finite State Machine', 'Combinational Logic', 'Clock']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/sequential-logic
sidebar:
  order: 3
---

## 핵심 개념

순차 논리는 조합 논리와 달리 상태를 가지며, 같은 입력에 대해서도 현재 상태에 따라 다른 출력을 생성할 수 있다. 순차 논리의 기본 구성 요소는 래치, 플립플롭 등의 메모리 요소이다. 동기식 순차 논리에서는 클럭 신호에 의해 상태 변경 시점이 결정되며, 에지 트리거 방법론에서 상태 요소는 활성 클럭 에지에서만 갱신된다. 순차 논리 시스템의 기본 구조는: 상태 레지스터 출력 -> 조합 논리 -> 상태 레지스터 입력의 피드백 루프이다. 클럭 주기는 상태 요소의 전파 지연, 조합 논리 지연, 설정 시간의 합보다 길어야 안정적으로 동작한다. 유한 상태 기계(FSM)는 순차 논리의 대표적인 설계 패러다임으로, 프로세서 제어 유닛 설계에 핵심적으로 활용된다.

## 예시

```
순차 논리 기본 구조:

  ┌──────────┐    ┌──────────────┐    ┌──────────┐
  │ 상태      │→→→│  조합 논리    │→→→│  상태     │
  │ 레지스터  │    │(다음 상태 함수│    │ 레지스터  │
  │ (현재상태)│    │ + 출력 함수) │    │(다음 상태)│
  └──────────┘    └──────────────┘    └──────────┘
       ↑                                    │
       └────────────────────────────────────┘
                    클럭 에지에서 갱신

조합 논리 vs 순차 논리:
  조합: 출력 = f(입력)           (상태 없음)
  순차: 출력 = f(입력, 상태)     (상태 있음)
        다음상태 = g(입력, 상태)
```

## 관련 개념

- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Flip-Flop](/knowledge/computer-architecture/flip-flop/)
- [Finite-State Machine](/knowledge/computer-architecture/finite-state-machine/)
- [Edge-Triggered Clocking](/knowledge/computer-architecture/edge-triggered-clocking/)
- [Register File](/knowledge/computer-architecture/register-file/)
