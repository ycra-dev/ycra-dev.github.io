---
title: "Finite-State Machine"
description: "유한 상태 기계(Finite-State Machine, FSM)는 상태 집합, 입력에 따라 상태 전이를 결정하는 다음 상태 함수, 그리고 현재 상태에 기반한 출력 함수로 구성된 순차 논리 함수이다"
tags: ['Control', 'Sequential Logic', 'Next State Function', 'Multicycle']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/finite-state-machine
sidebar:
  order: 5
---

## 핵심 개념

다중 사이클 프로세서의 제어를 구현하는 데 FSM이 사용된다. 각 상태는 하나의 클록 사이클에 해당하며, 해당 상태에서 활성화될 제어 신호를 지정한다. 다음 상태 함수는 현재 상태와 명령어의 opcode에 따라 다음 상태를 결정한다. MIPS 다중 사이클 구현에서는 약 10개의 상태가 있으며, 처음 두 상태(instruction fetch, decode)는 모든 명령어에 공통이고, 이후 상태는 명령어 유형에 따라 분기된다. Moore 기계는 출력이 현재 상태에만 의존하고, Mealy 기계는 입력과 현재 상태 모두에 의존한다.

캐시 제어와 같은 복잡한 다단계 연산에서는 단일 사이클 제어와 달리, 각 단계에서 설정할 신호와 다음 단계를 모두 지정해야 한다. FSM은 이러한 다단계 제어를 위한 가장 일반적인 방법이다. FSM은 보통 그래프로 표현되며, 상태(state)들의 집합과 상태 전환 방향으로 구성된다. FSM은 현재 상태를 보유하는 임시 레지스터와, 데이터패스 신호와 다음 상태를 결정하는 조합 논리 블록으로 구현된다. Moore 머신은 속도와 크기 면에서 구현 장점이 있다.

n비트 저장 장치는 2^n개의 상태를 표현할 수 있다. 두 기계는 기능적으로 동등하며 상호 변환 가능하다. 무어 기계는 더 빠를 수 있고, 밀리 기계는 더 적은 상태로 구현 가능하다. FSM은 상태 레지스터와 다음 상태/출력 함수를 구현하는 조합 논리 블록으로 구현되며, PLA나 ROM으로 조합 논리를 구현할 수 있다. 프로세서 제어 유닛의 핵심 설계 기법이다.

## 예시

```
FSM 상태 전이 (간략화):
State 0 (IF) -> State 1 (ID) -> State 2 (Memory Address, if lw/sw)
                              -> State 6 (Execute, if R-type)
                              -> State 8 (Branch completion, if beq)
                              -> State 9 (Jump completion, if j)

State 2 -> State 3 (Memory Read, if lw) or State 5 (Memory Write, if sw)
State 3 -> State 4 (Write Back) -> State 0
```

```
# 간단한 캐시 컨트롤러 FSM (4개 상태)

[Idle] ---(유효한 읽기/쓰기 요청)---> [Compare Tag]

[Compare Tag]:
  - 태그 일치 + Valid = 1 (히트):
    -> 읽기: 데이터 반환, Cache Ready 설정 -> [Idle]
    -> 쓰기: 데이터 기록, dirty bit 설정 -> [Idle]
  - 미스 + dirty bit = 1:
    -> [Write-Back]
  - 미스 + dirty bit = 0:
    -> [Allocate]

[Write-Back] ---(128비트 블록 메모리에 기록)---> [Allocate]
  (메모리 Ready 신호 대기)

[Allocate] ---(새 블록 메모리에서 읽기)---> [Compare Tag]
  (메모리 Ready 신호 대기)
```

```
교통 신호등 FSM (무어 기계):

상태: NSgreen (남북 초록), EWgreen (동서 초록)
입력: NScar (남북 차량), EWcar (동서 차량)
출력: NSlite, EWlite

상태 전이:
  NSgreen + EWcar → EWgreen
  NSgreen + EWcar' → NSgreen
  EWgreen + NScar → NSgreen
  EWgreen + NScar' → EWgreen

구현:
  NextState = (CurrentState' · EWcar) + (CurrentState · NScar')
  NSlite = CurrentState'
  EWlite = CurrentState

그래프 표현:
  (NSgreen) --[EWcar]--> (EWgreen)
     ↑                      │
     └──────[NScar]──────────┘
```

## 관련 개념

- [Multicycle Implementation](/knowledge/computer-architecture/multicycle-implementation/)
- [Control Unit](/knowledge/computer-architecture/control-unit/)
- [Write-Back](/knowledge/computer-architecture/write-back/)
- [Cache Coherence](/knowledge/computer-architecture/cache-coherence/)
- [Nonblocking Cache](/knowledge/computer-architecture/nonblocking-cache/)
- [Sequential Logic](/knowledge/computer-architecture/sequential-logic/)
- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Programmable Logic Array](/knowledge/computer-architecture/programmable-logic-array/)
- [Datapath](/knowledge/computer-architecture/datapath/)
