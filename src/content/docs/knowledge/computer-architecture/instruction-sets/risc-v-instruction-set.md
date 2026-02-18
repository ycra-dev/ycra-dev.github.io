---
title: "RISC-V Instruction Set"
description: "RISC-V는 학계에서 탄생한 오픈 아키텍처 명령어 세트로, RISC-V International이 관리하며 ARM, MIPS, x86과 달리 특정 회사가 소유하지 않는다"
tags: ['Risc', 'Open Architecture', 'Instruction Set Architecture', 'Load Store']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/risc-v-instruction-set
sidebar:
  order: 26
---

## 핵심 개념

MIPS와 동일한 설계 철학을 공유하며, 25년 후배임에도 매우 유사하다. MIPS와의 공통점: 모든 명령어가 32비트 폭, 32개 범용 레지스터(하나는 0으로 고정), 메모리 접근은 오직 로드/스토어로만, 다중 레지스터 로드/스토어 없음, 모든 데이터 크기에 대해 동일한 주소 모드. 주요 차이점: 조건 분기 방식으로 MIPS는 비교 명령어(slt)로 레지스터를 0 또는 1로 설정한 후 beq/bne로 분기하지만, RISC-V는 두 레지스터를 직접 비교하는 분기 명령어를 제공한다.

## 예시

```
# RISC-V vs MIPS 조건 분기 비교

# MIPS: "if a < b, branch"
slt  $t0, $s0, $s1    # $t0 = 1 if $s0 < $s1
bne  $t0, $zero, Label  # branch if $t0 != 0

# RISC-V: "if a < b, branch"
blt  x10, x11, Label   # 직접 비교 후 분기
```

## 관련 개념

- [ARMv8 Instruction Set](/knowledge/computer-architecture/armv8-instruction-set/)
- [Load-Store Architecture](/knowledge/computer-architecture/load-store-architecture/)
