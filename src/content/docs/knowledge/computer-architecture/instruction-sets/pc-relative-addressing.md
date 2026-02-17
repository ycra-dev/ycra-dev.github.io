---
title: "PC-Relative Addressing"
description: "PC-상대 주소 지정(PC-Relative Addressing)은 프로그램 카운터(PC)와 명령어 내의 상수를 더하여 분기 대상 주소를 계산하는 주소 지정 방식이다"
tags: ['Addressing Mode', 'Branch', 'Program Counter', 'Instruction Encoding', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/pc-relative-addressing
sidebar:
  order: 12
---

## 핵심 개념

조건 분기 명령어는 16비트 주소 필드만 가지고 있어 직접 전체 메모리 주소를 표현할 수 없다. PC-상대 주소 지정은 대부분의 분기가 가까운 명령어로 향한다는 관찰에 기반한다(SPEC 벤치마크에서 약 절반이 16 명령어 이내). PC를 기준 레지스터로 사용하면 현재 명령어 근처의 +/-2^15 워드(약 +/-128KB) 범위 내에서 분기할 수 있다. MIPS에서는 하드웨어 편의상 다음 명령어(PC + 4)를 기준으로 오프셋을 계산한다. 또한 주소 필드를 바이트 주소가 아닌 워드 주소로 해석하여 범위를 4배 확장한다. 이는 "흔한 경우를 빠르게" 원칙의 예이다.

## 예시

```
bne $s0, $s1, Exit 명령어의 주소 계산:

명령어 위치: 80012 (바이트 주소)
오프셋 필드: 2 (워드 단위)

분기 대상 주소 = (PC + 4) + (오프셋 × 4)
              = (80012 + 4) + (2 × 4)
              = 80016 + 8
              = 80024

멀리 떨어진 분기가 필요한 경우:
  beq $s0, $s1, L1   (L1이 너무 멀면)
  →
  bne $s0, $s1, L2   # 조건 반전
  j   L1             # 무조건 점프 (26비트 주소)
  L2: ...
```

## 관련 개념

- [Program Counter](/knowledge/computer-architecture/program-counter/)
- [Conditional Branch](/knowledge/computer-architecture/conditional-branch/)
- [Addressing Mode](/knowledge/computer-architecture/addressing-mode/)
- [Instruction Format](/knowledge/computer-architecture/instruction-format/)
