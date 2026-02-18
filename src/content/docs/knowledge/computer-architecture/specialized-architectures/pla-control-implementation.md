---
title: "PLA Control Implementation"
description: "PLA(Programmable Logic Array) 제어 구현은 AND-plane과 OR-plane으로 구성된 2단 논리 구조를 사용하여 제어 함수를 구현하는 방식으로, ROM보다 더 효율적으로 희소한 진리표를 인코딩할 수 있다"
tags: ['Pla', 'Control Unit', 'Programmable Logic', 'Digital Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pla-control-implementation
sidebar:
  order: 9
---

## 핵심 개념

PLA는 ROM과 달리 진리표의 활성 출력을 생성하는 항목만 인코딩하면 되므로, 입력 조합의 대부분이 사용되지 않는 제어 함수에 훨씬 효율적이다.

**PLA의 구조**:
- **AND-plane**: 입력과 그 역을 조합하여 곱항(product term/minterm) 생성
- **OR-plane**: 곱항들을 조합하여 출력 생성
- 각 출력은 곱항들의 논리합(OR)

**MIPS 멀티사이클 제어의 PLA 구현**:
- 17개 고유 곱항 (10개는 현재 상태만 의존, 7개는 opcode와 상태 의존)
- PLA 크기: (10 입력 x 17 곱항) + (20 출력 x 17 곱항) = 510
- 단일 ROM(20 Kb)이나 분할 ROM(4.3 Kb)보다 훨씬 작음

**분할 PLA (추가 최적화)**:
- PLA 1: 4 입력, 10 곱항, 16 출력 → 크기 200
- PLA 2: 10 입력, 7 곱항, 4 출력 → 크기 98
- 총: 298 (단일 PLA의 약 55%)

PLA 셀의 크기가 ROM 비트보다 약간 클 수 있지만, 전체적으로 PLA가 훨씬 효율적인 구현이다.

## 예시

```
PLA 구현 구조:

입력                   곱항(AND)              출력(OR)
─────                 ─────────              ──────
Op5  ────┐            ┌─────────┐
Op4  ────┤            │ minterm │──────── PCWrite
Op3  ────┤   AND      │   0     │──────── MemRead
Op2  ────┤  plane     ├─────────┤         ...
Op1  ────┤            │ minterm │
Op0  ────┤            │   1     │
S3   ────┤            ├─────────┤   OR
S2   ────┤            │  ...    │  plane
S1   ────┤            ├─────────┤
S0   ────┘            │ minterm │──────── NS0
                      │  16     │──────── NS1
                      └─────────┘

크기 비교:
ROM (단일):     20,480 bits
ROM (분할):     4,352 bits
PLA (단일):     ~510 units
PLA (분할):     ~298 units
→ PLA가 ROM보다 훨씬 컴팩트
```

## 관련 개념

- [Finite-State Machine Control](/knowledge/computer-architecture/finite-state-machine-control/)
- [ROM Control Implementation](/knowledge/computer-architecture/rom-control-implementation/)
- [Control Unit](/knowledge/computer-architecture/control-unit/)
