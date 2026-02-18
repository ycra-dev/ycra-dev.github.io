---
title: "Hardware Description Language"
description: "하드웨어 기술 언어(HDL)는 디지털 하드웨어의 동작과 구조를 기술하기 위한 프로그래밍 언어로, 시뮬레이션/디버깅과 논리 합성을 통한 실제 하드웨어 구현이라는 두 가지 목적으로 사용된다"
tags: ['Verilog', 'Vhdl', 'Logic Design', 'Hardware Synthesis', 'Digital Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/hardware-description-language
sidebar:
  order: 9
---

## 핵심 개념

대표적인 HDL에는 C 기반의 Verilog와 Ada 기반의 VHDL이 있으며, 산업계에서는 Verilog가 더 많이 사용된다. HDL은 행동적 기술(behavioral specification)과 구조적 기술(structural specification)을 모두 지원한다. 행동적 기술은 시스템의 기능적 동작을 기술하고, 구조적 기술은 계층적 조직을 기술한다. Verilog의 주요 데이터 타입으로는 조합 신호를 나타내는 wire와 상태를 저장하는 reg가 있다. 현대 설계에서는 대부분 데이터패스는 구조적으로 기술하고, 제어 논리는 행동적으로 기술한 후 논리 합성 도구로 게이트 수준 설계를 생성한다. 조합 논리는 assign 문이나 완전한 sensitivity list를 가진 always 블록으로 기술하며, 순차 논리는 클럭 에지를 감지하는 always 블록으로 기술한다.

## 예시

```verilog
// Verilog로 4-to-1 멀티플렉서 기술
module Mult4to1(In1, In2, In3, In4, Sel, Out);
  input [31:0] In1, In2, In3, In4;
  input [1:0] Sel;
  output reg [31:0] Out;

  always @(In1, In2, In3, In4, Sel)
    case (Sel)
      2'b00: Out <= In1;
      2'b01: Out <= In2;
      2'b10: Out <= In3;
      2'b11: Out <= In4;
    endcase
endmodule

// 조합 논리: assign 문 (wire에 대해)
assign Sum = A ^ B ^ CarryIn;
assign CarryOut = (A & B) | (A & CarryIn) | (B & CarryIn);
```

## 관련 개념

- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Sequential Logic](/knowledge/computer-architecture/sequential-logic/)
