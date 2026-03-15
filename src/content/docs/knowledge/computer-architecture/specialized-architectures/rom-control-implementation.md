---
title: "ROM 제어 구현 (ROM Control Implementation)"
description: "ROM(Read-Only Memory) 제어 구현은 제어 함수의 완전한 진리표를 ROM에 인코딩하여 제어 유닛을 구현하는 방식이다"
tags: ['Rom', 'Control Unit', 'Truth Table', 'Digital Design']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/rom-control-implementation
sidebar:
  order: 8
---

## 핵심 개념

ROM 구현은 FSM 제어 함수를 구현하는 가장 단순한 방법이다. 입력(opcode + 상태 비트)이 ROM의 주소가 되고, 각 주소의 내용이 제어 출력이 된다.

**단일 ROM 구현**:
- 입력: 6비트 opcode + 4비트 상태 = 10비트 주소
- 출력: 16비트 데이터패스 제어 + 4비트 다음 상태 = 20비트
- 총 크기: 2^10 x 20 = 20 Kbits

**분할 ROM 구현 (최적화)**:
- ROM 1: 데이터패스 제어 (4비트 상태 입력 → 16비트 출력) = 2^4 x 16 = 256 bits
- ROM 2: 다음 상태 (10비트 입력 → 4비트 출력) = 2^10 x 4 = 4096 bits
- 총: 4,352 bits (단일 ROM의 약 1/5)

ROM의 단점은 완전한 진리표를 구현하므로, 입력 조합의 대부분이 사용되지 않거나 중복되는 경우에 낭비가 크다는 것이다. 예를 들어 상태 0에서는 opcode에 관계없이 다음 상태가 항상 1이므로, 64개의 동일한 엔트리가 존재한다.

## 예시

```
ROM 주소 구성:
주소[9:4] = Op[5:0]  (opcode)
주소[3:0] = S[3:0]   (현재 상태)

ROM 내용 예시 (다음 상태 부분):
상태 | lw(100011) | sw(101011) | R-type(000000) | beq(000100)
-----+------------+------------+----------------+------------
  0  | 0001       | 0001       | 0001           | 0001
  1  | 0010       | 0010       | 0110           | 1000
  2  | 0011       | 0101       | xxxx           | xxxx
  3  | 0100       | xxxx       | xxxx           | xxxx
  6  | xxxx       | xxxx       | 0111           | xxxx
  ...

분할 ROM의 크기 비교:
단일 ROM:   2^10 × 20 = 20,480 bits
분할 ROM:   2^4 × 16 + 2^10 × 4 = 4,352 bits
→ 약 78% 크기 절감
```

## 관련 개념

- [유한 상태 기계 제어 (FSM Control)](/knowledge/computer-architecture/finite-state-machine-control/)
- [PLA 제어 구현 (PLA Control Implementation)](/knowledge/computer-architecture/pla-control-implementation/)
- [마이크로프로그램 제어 (Microprogrammed Control)](/knowledge/computer-architecture/microprogrammed-control/)
- [제어 장치 (Control Unit)](/knowledge/computer-architecture/control-unit/)
