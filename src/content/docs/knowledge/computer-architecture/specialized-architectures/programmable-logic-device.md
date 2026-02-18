---
title: "Programmable Logic Device (PLD)"
description: "PLD(Programmable Logic Device)는 조합 논리를 포함하는 집적 회로로, 최종 사용자가 논리 기능을 구성할 수 있다"
tags: ['Pld', 'Programmable Logic', 'Digital Design', 'Combinational Logic']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/programmable-logic-device
sidebar:
  order: 12
---

## 핵심 개념

PLD는 FPD(Field Programmable Device)의 한 종류로, 두 가지 형태로 나뉜다:
- **Simple PLD (SPLD)**: PLA 또는 PAL로 구성된 단순한 형태
- **Complex PLD**: 여러 논리 블록과 구성 가능한 상호 연결을 허용하는 복잡한 형태

PLD에서 PLA는 사용자가 프로그래밍할 수 있는 AND-plane과 OR-plane을 가진다. 반면 PAL(Programmable Array Logic)은 AND-plane만 프로그래밍 가능하고 OR-plane은 고정되어 있다. PAL은 PLA보다 구조가 단순하여 속도가 빠르지만, 구현할 수 있는 논리 함수의 범위가 제한된다.

PLD의 연결 구성은 영구적(antifuse) 또는 재구성 가능(SRAM 기반)할 수 있으며, 연결 패턴에 따라 어떤 논리 함수가 구현되는지가 결정된다.

## 예시

```
PLA 구조 예시:
입력: A, B, C

AND-plane (프로그래밍 가능):
  Product term 1: A AND B
  Product term 2: NOT A AND C
  Product term 3: B AND C

OR-plane (프로그래밍 가능):
  Output F1 = term1 OR term2
  Output F2 = term2 OR term3

PAL에서는 OR-plane이 고정됨:
  Output F1 = term1 OR term2 (고정)
  AND-plane만 사용자가 프로그래밍
```

## 관련 개념

- [Antifuse](/knowledge/computer-architecture/antifuse/)
- [Combinational Element](/knowledge/computer-architecture/combinational-element/)
