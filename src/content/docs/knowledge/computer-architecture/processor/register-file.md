---
title: "Register File"
description: "레지스터 파일(Register File)은 레지스터 번호를 지정하여 읽거나 쓸 수 있는 레지스터들의 집합으로 구성된 상태 요소이다"
tags: ['Processor', 'State Element', 'Mips', 'Datapath']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/register-file
sidebar:
  order: 7
---

## 핵심 개념

MIPS 프로세서의 레지스터 파일은 32개의 범용 레지스터를 포함한다. R-형식 명령어를 위해 두 개의 읽기 포트와 하나의 쓰기 포트가 필요하다. 레지스터 번호 입력은 5비트(32 = 2^5)이고, 데이터 입출력 버스는 각각 32비트이다. 레지스터 파일은 읽기 시에는 항상 지정된 레지스터의 내용을 출력하지만, 쓰기는 쓰기 제어 신호(RegWrite)가 활성화되고 클록 에지가 발생할 때만 수행된다. 에지 트리거 설계 덕분에 같은 클록 사이클에서 같은 레지스터를 읽고 쓸 수 있다.

읽기 포트는 멀티플렉서로 구현되며, 레지스터 번호를 멀티플렉서 선택 신호로 사용하여 해당 레지스터의 값을 출력한다. 쓰기 포트는 디코더를 사용하여 쓰기 대상 레지스터를 결정하고, Write 신호와 클럭을 조합하여 해당 레지스터의 D 플립플롭에 데이터를 기록한다. 읽기는 조합 논리(combinational)이므로 상태를 변경하지 않지만, 쓰기는 클럭 에지에서 발생하는 순차 이벤트이다. 같은 클럭 사이클에서 동일 레지스터를 읽고 쓸 경우, 읽기는 이전에 기록된 값을 반환한다. 현재 쓰기 중인 값을 즉시 반환하려면 추가 논리(포워딩)가 필요하다.

## 예시

```
레지스터 파일 인터페이스:
  입력:
    - Read Register 1 (5 bits) -> Read Data 1 (32 bits)
    - Read Register 2 (5 bits) -> Read Data 2 (32 bits)
    - Write Register (5 bits)
    - Write Data (32 bits)
    - RegWrite (1 bit control)

  예: add $t1, $t2, $t3
    Read Register 1 = $t2, Read Register 2 = $t3
    Write Register = $t1, RegWrite = 1
```

```
MIPS 레지스터 파일 (32개 레지스터, 각 32비트):

읽기 포트 구현:
  읽기레지스터번호1 → [32-to-1 멀티플렉서(32비트 폭)] → 읽기데이터1
  읽기레지스터번호2 → [32-to-1 멀티플렉서(32비트 폭)] → 읽기데이터2

쓰기 포트 구현:
  쓰기레지스터번호 → [5-to-32 디코더] → 32개 AND 게이트 (Write 신호와)
  쓰기데이터 → 각 레지스터의 D 입력에 연결
  Write 신호 + 클럭 → 선택된 레지스터의 C 입력 활성화

Verilog:
  assign ReadData1 = registers[ReadReg1];  // 조합 읽기
  always @(posedge clock)                   // 순차 쓰기
    if (RegWrite) registers[WriteReg] <= WriteData;
```

## 관련 개념

- [Datapath](/knowledge/computer-architecture/datapath/)
- [State Element](/knowledge/computer-architecture/state-element/)
- [Forwarding](/knowledge/computer-architecture/forwarding/)
- [Flip-Flop](/knowledge/computer-architecture/flip-flop/)
- [Decoder](/knowledge/computer-architecture/decoder/)
- [Multiplexor](/knowledge/computer-architecture/multiplexor/)
- [Procedure Call Convention](/knowledge/computer-architecture/procedure-call-convention/)
