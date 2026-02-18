---
title: "Field Programmable Gate Array (FPGA)"
description: "FPGA(Field Programmable Gate Array)는 조합 논리 블록과 플립플롭을 모두 포함하는 구성 가능한 집적 회로로, 최종 사용자가 하드웨어 기능을 프로그래밍할 수 있다"
tags: ['Fpga', 'Programmable Logic', 'Digital Design', 'Reconfigurable Computing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/fpga
sidebar:
  order: 11
---

## 핵심 개념

FPGA는 FPD(Field Programmable Device)의 한 종류로, 순수 조합 논리만 제공하는 PLD와 달리 조합 논리와 순차 논리(플립플롭)를 모두 포함한다. FPGA의 내부 구조는 2차원 배열로 구성되며, 각 셀은 게이트와 플립플롭의 조합으로 특정 기능을 수행하도록 프로그래밍할 수 있다. 셀 간의 상호 연결도 프로그래밍 가능하여, 수십만 게이트 규모의 복잡한 논리 기능을 구현할 수 있다.

FPGA의 구성(configuration) 방식에는 두 가지가 있다:
- **Antifuse 기술**: 프로그래밍 시 영구적인 연결을 생성하여 변경 불가
- **SRAM 기반 제어**: 전원 투입 시 SRAM에 구성 정보를 다운로드하여 스위치를 제어. 재구성이 가능하지만 전원이 꺼지면 설정이 사라짐

현대 FPGA는 단순한 논리 블록 외에도 가산기 조각, RAM 블록, 심지어 32비트 RISC 코어까지 포함할 수 있다. FPGA 면적의 약 90%는 상호 연결(interconnect)에 할당되고, 논리 및 메모리 블록에는 약 10%만 사용된다.

## 예시

```verilog
// FPGA에서 구현되는 간단한 카운터 예시 (Verilog)
module counter(
    input clk,
    input reset,
    output reg [7:0] count
);
    always @(posedge clk or posedge reset) begin
        if (reset)
            count <= 8'b0;
        else
            count <= count + 1;
    end
endmodule
// FPGA의 LUT과 플립플롭을 사용하여 이 카운터가 구현됨
```

## 관련 개념

- [Antifuse](/knowledge/computer-architecture/antifuse/)
- [Combinational Element](/knowledge/computer-architecture/combinational-element/)
- [State Element](/knowledge/computer-architecture/state-element/)
