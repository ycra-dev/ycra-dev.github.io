---
title: "Lookup Table (LUT)"
description: "LUT(Lookup Table)는 FPGA에서 각 셀에 포함된 소량의 논리와 RAM으로 구성된 프로그래밍 가능한 기본 블록으로, 임의의 논리 함수를 구현할 수 있다"
tags: ['Lut', 'Fpga', 'Programmable Logic', 'Truth Table']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/lookup-table
sidebar:
  order: 13
---

## 핵심 개념

LUT는 FPGA의 기본 구성 요소로, 본질적으로 작은 프로그래밍 가능한 RAM이다. n개의 입력을 가진 LUT는 2^n개의 엔트리를 가지는 진리표를 저장하여 임의의 n-입력 부울 함수를 구현할 수 있다.

예를 들어 4-입력 LUT는 16개의 1비트 엔트리를 가지며, 4개의 입력이 RAM의 주소로 사용되어 해당 주소의 값이 출력된다. 이 방식으로 4-입력에 대한 모든 가능한 조합 논리 함수(총 65,536가지)를 구현할 수 있다.

FPGA에서 각 셀은 하나 이상의 LUT와 플립플롭을 포함하며, 셀 간의 프로그래밍 가능한 상호 연결을 통해 더 복잡한 논리 회로를 구성한다. LUT의 내용은 FPGA 구성 시 SRAM에 로드되므로, 동일한 하드웨어로 다양한 논리 기능을 구현할 수 있다.

## 예시

```
4-입력 LUT로 2-bit 가산기의 carry 출력 구현:

입력: A, B, Cin (3개 입력 사용, 1개 미사용)
출력: Cout = (A AND B) OR (A AND Cin) OR (B AND Cin)

LUT 내용 (주소 → 출력):
  000 → 0  (A=0, B=0, Cin=0: Cout=0)
  001 → 0  (A=0, B=0, Cin=1: Cout=0)
  010 → 0  (A=0, B=1, Cin=0: Cout=0)
  011 → 1  (A=0, B=1, Cin=1: Cout=1)
  100 → 0  (A=1, B=0, Cin=0: Cout=0)
  101 → 1  (A=1, B=0, Cin=1: Cout=1)
  110 → 1  (A=1, B=1, Cin=0: Cout=1)
  111 → 1  (A=1, B=1, Cin=1: Cout=1)
```

## 관련 개념

- [Field Programmable Gate Array (FPGA)](/knowledge/computer-architecture/field-programmable-gate-array-fpga/)
- [Programmable Logic Device (PLD)](/knowledge/computer-architecture/programmable-logic-device-pld/)
- [Combinational Element](/knowledge/computer-architecture/combinational-element/)
