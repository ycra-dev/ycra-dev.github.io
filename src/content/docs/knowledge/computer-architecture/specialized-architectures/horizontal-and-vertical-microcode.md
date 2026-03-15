---
title: "수평·수직 마이크로코드 (Horizontal and Vertical Microcode)"
description: "수평 마이크로코드(Horizontal Microcode)는 넓지만 짧은 마이크로명령어를 사용하여 하나의 명령어로 데이터패스의 모든 동작을 지정할 수 있는 방식이고, 수직 마이크로코드(Vertical Microcode)는 좁지만 긴 마이크로명령어를 사용하여 제한된 ..."
tags: ['Microcode', 'Horizontal Microcode', 'Vertical Microcode', 'Control Encoding']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/horizontal-and-vertical-microcode
sidebar:
  order: 10
---

## 핵심 개념

마이크로명령어의 폭을 줄이는 것은 제어 저장소 비용을 절감하는 핵심 기법이다. 두 가지 극단적 접근 방식이 있다:

**수평 마이크로코드 (최소 인코딩)**:
- 넓은 마이크로명령어 (수백 비트 가능)
- 각 제어 라인이 독립적인 비트로 표현
- 하나의 마이크로명령어로 모든 조합 가능
- 적은 수의 마이크로명령어 필요
- 디코더 불필요

**수직 마이크로코드 (최대 인코딩)**:
- 좁은 마이크로명령어
- 제어 라인을 인코딩하여 비트 수 감소
- 형식 필드(opcode)로 마이크로명령어 유형 구분
- 더 많은 마이크로명령어 필요
- 디코더 필요

**인코딩 기법**:
- 동시에 활성화될 수 없는 제어 라인을 하나의 필드로 인코딩 (예: 8개 라인 → 3비트 필드)
- 절약: 5비트/마이크로명령어, 비용: 3-to-8 디코더 추가
- 가끔 동시 설정되는 라인도 인코딩 가능 (추가 마이크로명령어 필요)

최적의 선택은 제어의 복잡도, 사용 빈도, 성능 요구사항에 따라 달라진다.

## 예시

```
수평 vs 수직 마이크로코드 비교:

수평 마이크로코드 (최소 인코딩):
┌──────────────────────────────────────────────┐
│ PCWrite│MemRead│IRWrite│ALUSrcA│... │AddrCtl│
│   1    │   1   │   1   │   0   │... │  00   │
└──────────────────────────────────────────────┘
 = 20비트, 각 비트가 직접 제어 라인에 연결

수직 마이크로코드 (최대 인코딩):
┌──────────────────────────┐
│ Format │ FieldA │ FieldB │
│  010   │  011   │  01    │
└──────────────────────────┘
 = 8비트, 디코더를 통해 제어 라인으로 확장

인코딩 예시:
원래: RegDst, RegWrite, ALUSrcA, ALUSrcB0, ALUSrcB1,
      MemtoReg, MemRead, MemWrite (8비트)
→ 동시 활성화가 7개 중 최대 1개이므로
인코딩: 3비트 필드로 축소 (3-to-8 디코더 필요)
절약: 마이크로명령어당 5비트

제어 저장소 크기 비교:
수평: 10 워드 × 20비트 = 200 bits
수직: 20 워드 × 10비트 = 200 bits (같은 크기일 수 있음)
→ 실제 효율은 제어 함수의 특성에 따라 달라짐
```

## 관련 개념

- [마이크로프로그램 제어 (Microprogrammed Control)](/knowledge/computer-architecture/microprogrammed-control/)
- [유한 상태 기계 제어 (FSM Control)](/knowledge/computer-architecture/finite-state-machine-control/)
- [ROM 제어 구현 (ROM Control Implementation)](/knowledge/computer-architecture/rom-control-implementation/)
- [제어 장치 (Control Unit)](/knowledge/computer-architecture/control-unit/)
