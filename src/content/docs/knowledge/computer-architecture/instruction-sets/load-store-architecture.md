---
title: "로드-스토어 아키텍처 (Load-Store Architecture)"
description: "로드-스토어 아키텍처(Load-Store Architecture)는 모든 연산이 레지스터 간에 이루어지며, 데이터 메모리는 오직 로드와 스토어 명령어를 통해서만 접근할 수 있는 명령어 세트 아키텍처이다"
tags: ['Risc', 'Instruction Set Architecture', 'Register Register', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/load-store-architecture
sidebar:
  order: 25
---

## 핵심 개념

레지스터-레지스터(register-register) 아키텍처라고도 불린다. 최초의 로드-스토어 아키텍처는 1963년의 CDC 6600이며, ARM과 MIPS가 최근의 대표적 예이다. 이와 대조적으로 레지스터-메모리 아키텍처(IBM 360, x86)는 산술 명령어에서 하나의 피연산자가 메모리에 있을 수 있고, 메모리-메모리 아키텍처(DEC VAX)는 모든 피연산자가 메모리에 있을 수 있다. 로드-스토어 설계는 명령어가 단순하고 일관적이어서 파이프라인 구현에 유리하며, 1982년 이후의 거의 모든 새로운 명령어 세트는 RISC 철학에 따라 로드-스토어 방식을 채택했다.

## 예시

```assembly
# 로드-스토어 아키텍처 (MIPS):
lw   $t0, 0($s0)    # 메모리 → 레지스터 (로드)
lw   $t1, 4($s0)    # 메모리 → 레지스터 (로드)
add  $t2, $t0, $t1  # 레지스터 연산만 가능
sw   $t2, 8($s0)    # 레지스터 → 메모리 (스토어)

# 레지스터-메모리 아키텍처 (x86):
# ADD EAX, [EBX]    # 메모리 피연산자 허용
```

## 관련 개념

- [RISC-V 명령어 집합 (RISC-V Instruction Set)](/knowledge/computer-architecture/risc-v-instruction-set/)
- [x86 명령어 집합 (x86 Instruction Set)](/knowledge/computer-architecture/x86-instruction-set/)
- [ARMv7 명령어 집합 (ARMv7 Instruction Set)](/knowledge/computer-architecture/armv7-instruction-set/)
