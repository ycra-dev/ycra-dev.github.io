---
title: "ARMv8 Instruction Set"
description: "ARMv8은 ARM의 64비트 주소 확장 버전으로, 2007년에 설계가 시작되어 2013년에 공개되었으며, 32비트 ARMv7을 완전히 재설계한 아키텍처이다"
tags: ['Arm', '64 Bit', 'Risc', 'Instruction Set Architecture']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/armv8-instruction-set
sidebar:
  order: 28
---

## 핵심 개념

ARMv8은 단순한 레지스터 폭 확장이 아닌 전면적 개편을 수행했다. ARMv7의 특이한 기능들을 대부분 제거: 조건부 실행 필드 제거, 즉시값 필드를 단순 12비트 상수로 변경, 블록 로드/스토어 제거, PC를 일반 레지스터에서 제외. MIPS에 있던 유용한 기능을 추가: 32개 범용 레지스터(하나는 0으로 고정), 나누기 명령어 추가, beq/bne에 해당하는 분기 명령어 추가. 결과적으로 ARMv8의 명령어 세트 철학은 ARMv7보다 MIPS에 훨씬 가깝다.

## 예시

```
# ARMv7에서 제거된 기능:
# - 조건부 실행 필드 (거의 모든 명령어에 있던 4비트)
# - Load Multiple / Store Multiple
# - PC가 레지스터로 접근 가능했던 것

# ARMv8에서 추가된 MIPS 유사 기능:
# - 32개 범용 레지스터 (하나는 0으로 하드와이어)
# - 나누기 명령어
# - branch if equal / branch if not equal
```

## 관련 개념

- [ARMv7 Instruction Set](/knowledge/computer-architecture/armv7-instruction-set/)
- [RISC-V Instruction Set](/knowledge/computer-architecture/risc-v-instruction-set/)
