---
title: "유한 상태 기계 제어 (FSM Control)"
description: "유한 상태 기계(FSM) 제어는 현재 상태와 입력(opcode)을 받아 데이터패스 제어 신호와 다음 상태를 출력하는 순차적 제어 유닛 구현 방식이다"
tags: ['Fsm', 'Control Unit', 'Sequential Logic', 'State Machine']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/finite-state-machine-control
sidebar:
  order: 6
---

## 핵심 개념

FSM 제어는 멀티사이클 데이터패스를 위한 순차 제어 유닛의 가장 직접적인 구현 방법이다. 제어 유닛은 두 부분으로 구성된다:

1. **조합 논리 제어**: 상태가 없으며, 진리표나 게이트로 구현. ALU 제어나 단일 사이클 구현에 사용
2. **순차 제어(FSM)**: 상태를 가지며, 상태 레지스터와 다음 상태 함수를 포함

**FSM 제어의 구성**:
- **상태 레지스터**: 현재 상태를 저장 (4비트로 10개 상태 인코딩)
- **제어 논리**: 두 가지 기능을 수행
  - 데이터패스 제어 출력: 현재 상태 비트에만 의존
  - 다음 상태 함수: 현재 상태 비트와 opcode 입력에 의존

MIPS 멀티사이클 구현의 경우 10개 상태, 6비트 opcode 입력, 16개 데이터패스 제어 출력, 4개 다음 상태 출력이 필요하다. 이를 ROM 또는 PLA로 구현할 수 있다.

## 예시

```
FSM 제어 유닛 구조:

        ┌──────────────────────┐
 Op[5:0]│                      │ 데이터패스
 ──────>│    제어 논리          │───> 제어 출력 (16비트)
        │   (조합 논리)         │
 S[3:0] │                      │ NS[3:0]
 ──────>│                      │──────┐
        └──────────────────────┘      │
           ↑                          │
           │    ┌──────────┐          │
           └────│ 상태      │<─────────┘
                │ 레지스터   │
                └──────────┘
                    ↑ clk

상태 인코딩 예시 (10개 상태):
상태 0: 0000 (명령어 페치)
상태 1: 0001 (디코드/레지스터 페치)
상태 2: 0010 (메모리 주소 계산)
상태 3: 0011 (메모리 접근 - lw)
상태 4: 0100 (메모리 읽기 완료)
...
```

## 관련 개념

- [ROM 제어 구현 (ROM Control Implementation)](/knowledge/computer-architecture/rom-control-implementation/)
- [PLA 제어 구현 (PLA Control Implementation)](/knowledge/computer-architecture/pla-control-implementation/)
- [마이크로프로그램 제어 (Microprogrammed Control)](/knowledge/computer-architecture/microprogrammed-control/)
- [제어 장치 (Control Unit)](/knowledge/computer-architecture/control-unit/)
- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
