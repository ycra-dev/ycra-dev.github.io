---
title: "Condition Code"
description: "조건 코드(Condition Code)는 프로세서의 프로그램 상태 워드에 저장되는 비트로, 이전 연산의 결과에 대한 정보(부호, 영, 올림, 오버플로우)를 나타내며 조건 분기에 사용된다"
tags: ['Branch', 'Flags', 'Armv7', 'X86', 'Comparison']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/condition-code
sidebar:
  order: 23
---

## 핵심 개념

ARM과 x86은 조건 코드 기반의 조건 분기를 사용한다. 전통적인 4비트 조건 코드는 negative, zero, carry, overflow이다. ARM에서는 산술/논리 명령어에서 선택적으로 조건 코드를 설정할 수 있어 파이프라인 구현에서의 문제를 줄인다. CMP 명령어는 두 피연산자를 빼고 차이로 조건 코드를 설정한다. 반면 MIPS는 조건 코드를 사용하지 않고, slt 명령어로 레지스터 값을 비교하여 분기 결정을 한다. x86에서는 조건 코드가 연산의 부수 효과(side effect)로 설정되며, 대부분 결과와 0의 비교에 사용된다.

## 예시

```
# ARM 조건 코드 예시
# N (Negative): 결과가 음수
# Z (Zero): 결과가 0
# C (Carry): 올림 발생
# V (Overflow): 오버플로우 발생

# ARM:
CMP  R0, R1          # R0 - R1 수행, 조건 코드 설정
BEQ  equal_label     # Z=1이면 분기 (R0 == R1)
BGT  greater_label   # N==V이고 Z=0이면 분기 (R0 > R1)

# MIPS (조건 코드 없음):
slt  $t0, $s0, $s1   # $t0 = ($s0 < $s1) ? 1 : 0
bne  $t0, $zero, Label
```

## 관련 개념

- [ARMv7 Instruction Set](/knowledge/computer-architecture/armv7-instruction-set/)
- [x86 Instruction Set](/knowledge/computer-architecture/x86-instruction-set/)
- [MIPS Instruction Set](/knowledge/computer-architecture/mips-instruction-set/)
