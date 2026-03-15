---
title: "플립플롭 (Flip-Flop)"
description: "플립플롭(Flip-Flop)은 클럭 에지에서만 내부 상태가 변경되는 메모리 요소로, 출력이 저장된 상태 값과 같으며, 래치와 달리 투명하지 않다(not transparent)"
tags: ['Memory Element', 'Sequential Logic', 'D Flip Flop', 'Latch', 'State Element']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/flip-flop
sidebar:
  order: 4
---

## 핵심 개념

플립플롭과 래치는 가장 단순한 메모리 요소이다. 래치(latch)는 클럭이 활성 상태일 때 입력 변화가 즉시 출력에 반영되는 투명한 구조이고, 플립플롭은 클럭 에지 순간에만 상태가 변경된다. D 플립플롭은 가장 기본적인 형태로, 데이터 입력(D)과 클럭 입력(C)을 받아 클럭 에지에서 D 값을 저장한다. 하강 에지 D 플립플롭은 두 개의 D 래치(마스터-슬레이브)를 연결하여 구현한다: 클럭이 높을 때 마스터 래치가 열려 입력을 추적하고, 클럭이 떨어지면 마스터가 닫히고 슬레이브가 열려 마스터의 값을 캡처한다. 입력은 설정 시간(setup time) 전부터 유지 시간(hold time) 후까지 유효해야 한다. 플립플롭 배열로 멀티비트 레지스터를 구성하고, 이를 확장하여 레지스터 파일을 구현한다.

## 예시

```
D 플립플롭 (하강 에지 트리거):

  [D 래치(마스터)] → [D 래치(슬레이브)]
     C에 의해 제어      C'에 의해 제어

Verilog 기술:
module DFF(clock, D, Q, Qbar);
  input clock, D;
  output reg Q;
  output Qbar;
  assign Qbar = ~Q;
  always @(posedge clock)  // 상승 에지에서 동작
    Q = D;
endmodule

타이밍 요구사항:
  |← setup time →|← hold time →|
  ─────────────────┤클럭에지├──────
  D 입력이 이 구간 동안 안정해야 함
```

## 관련 개념

- [에지 트리거 클로킹 (Edge-Triggered Clocking)](/knowledge/computer-architecture/edge-triggered-clocking/)
- [레지스터 파일 (Register File)](/knowledge/computer-architecture/register-file/)
- [순차 논리 (Sequential Logic)](/knowledge/computer-architecture/sequential-logic/)
- [SRAM (정적 랜덤 액세스 메모리)](/knowledge/computer-architecture/sram/)
