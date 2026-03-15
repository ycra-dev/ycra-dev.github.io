---
title: "마이크로프로그램 제어 (Microprogrammed Control)"
description: "마이크로프로그래밍된 제어(Microprogrammed Control)는 제어 워드(마이크로명령어)를 메모리에 저장하고, 시퀀서(카운터)를 사용하여 순차적으로 실행하는 제어 유닛 구현 방식이다"
tags: ['Microcode', 'Microprogramming', 'Control Unit', 'Sequencer']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/microprogrammed-control
sidebar:
  order: 7
---

## 핵심 개념

마이크로프로그래밍된 제어의 핵심 아이디어는 FSM의 다음 상태 함수를 명시적 카운터로 대체하는 것이다. 순차적 상태 진행은 카운터 증가로 처리하고, 비순차적 분기는 디스패치 테이블로 처리한다.

**구성 요소**:
- **마이크로프로그램 카운터**: 현재 상태(마이크로명령어 주소) 저장
- **가산기**: 상태를 증가시켜 카운터 역할
- **디스패치 ROM**: opcode에 따라 비순차적 다음 상태를 지정
- **주소 제어 논리**: 다음 상태 선택 방법 결정 (AddrCtl)

**주소 선택 방법** (2비트 AddrCtl):
- 0: 상태를 0으로 설정 (Fetch로 복귀)
- 1: 디스패치 ROM 1 사용
- 2: 디스패치 ROM 2 사용
- 3: 증가된 상태 사용 (순차 진행)

**크기 비교**:
- 10개 제어 워드 x 18비트 = 180 bits
- 2개 디스패치 테이블 x 64 x 4비트 = 512 bits
- 총: 692 bits (분할 ROM의 4.3 Kb보다 훨씬 작음)

이 구조가 자체적으로 작은 컴퓨터와 유사하기 때문에 "마이크로코드" 또는 "마이크로프로그래밍된 제어"라고 불린다.

## 예시

```
마이크로프로그래밍된 제어 유닛 구조:

                  ┌──────────────┐
  Op[5:0] ───────>│ 디스패치 ROM  │
                  └──────┬───────┘
                         │
  ┌─────────┐    ┌───────v────────┐
  │ 제어    │<───│  주소 선택     │
  │ 메모리  │    │  논리          │<── AddrCtl
  │ (ROM/   │    └───────^────────┘
  │  PLA)   │            │
  └────┬────┘    ┌───────┴────────┐
       │         │  가산기(+1)     │
       │         └───────^────────┘
       │                 │
       │         ┌───────┴────────┐
       └────────>│ 마이크로프로그램 │
  제어 출력      │  카운터         │
  (데이터패스)   └────────────────┘

제어 워드 형식:
[데이터패스 제어(16비트) | AddrCtl(2비트)]

디스패치 ROM 예시:
Op      | 명령어  | 다음 상태
100011  | lw      | 0010 (상태 2)
101011  | sw      | 0010 (상태 2)
000000  | R-type  | 0110 (상태 6)
000100  | beq     | 1000 (상태 8)
```

## 관련 개념

- [유한 상태 기계 제어 (FSM Control)](/knowledge/computer-architecture/finite-state-machine-control/)
- [수평·수직 마이크로코드 (Horizontal and Vertical Microcode)](/knowledge/computer-architecture/horizontal-and-vertical-microcode/)
- [ROM 제어 구현 (ROM Control Implementation)](/knowledge/computer-architecture/rom-control-implementation/)
- [제어 장치 (Control Unit)](/knowledge/computer-architecture/control-unit/)
- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
