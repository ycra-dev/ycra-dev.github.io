---
title: "Multiplexor"
description: "멀티플렉서(Multiplexor)는 제어 신호(셀렉터)에 의해 여러 데이터 입력 중 하나를 선택하여 출력하는 조합 논리 블록으로, n개의 데이터 입력에 대해 ceil(log2(n))개의 선택 입력이 필요하다"
tags: ['Combinational Logic', 'Selector', 'Datapath', 'Logic Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/multiplexor
sidebar:
  order: 6
---

## 핵심 개념

멀티플렉서는 "선택기(selector)"라고도 불리며, 프로세서 데이터패스에서 광범위하게 사용된다. 2입력 멀티플렉서의 논리 함수는 C = (A AND NOT S) OR (B AND S)이다. 멀티플렉서는 세 부분으로 구성된다: (1) 선택 신호를 디코딩하는 디코더, (2) 각 입력을 디코더 출력과 결합하는 AND 게이트 배열, (3) AND 게이트 출력을 합하는 OR 게이트. 32비트 데이터를 다루기 위해 1비트 멀티플렉서를 32개 배열하여 32비트 멀티플렉서를 구성한다. ALU에서는 멀티플렉서가 수행할 연산(AND, OR, 덧셈, slt 등)의 결과를 선택하는 데 사용된다. Verilog에서는 if 표현식이나 case 문으로 표현한다.

## 예시

```
2-to-1 멀티플렉서:
  S=0 → 출력=A
  S=1 → 출력=B
  논리식: C = (A · S') + (B · S)

4-to-1 멀티플렉서:
  S[1:0]=00 → 출력=In0
  S[1:0]=01 → 출력=In1
  S[1:0]=10 → 출력=In2
  S[1:0]=11 → 출력=In3

32비트 멀티플렉서 배열:
  [MUX₀] [MUX₁] [MUX₂] ... [MUX₃₁]
  모든 MUX가 동일한 선택 신호(S)를 공유

Verilog:
  always @(*)
    case (Sel)
      2'b00: Out <= In0;
      2'b01: Out <= In1;
      2'b10: Out <= In2;
      2'b11: Out <= In3;
    endcase
```

## 관련 개념

- [Combinational Logic](/knowledge/computer-architecture/combinational-logic/)
- [Decoder](/knowledge/computer-architecture/decoder/)
- [Arithmetic Logic Unit](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [Datapath](/knowledge/computer-architecture/datapath/)
