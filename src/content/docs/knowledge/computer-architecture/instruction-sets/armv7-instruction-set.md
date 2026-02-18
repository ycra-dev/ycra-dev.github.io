---
title: "ARMv7 Instruction Set"
description: "ARMv7은 임베디드 장치에서 가장 널리 사용되는 32비트 명령어 세트 아키텍처로, 2016년까지 1000억 개 이상의 장치에 탑재되었다"
tags: ['Arm', 'Risc', 'Instruction Set Architecture', 'Embedded Processor', 'Condition Code']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/armv7-instruction-set
sidebar:
  order: 27
---

## 핵심 개념

ARM은 MIPS와 같은 해에 출시되었으며 유사한 철학을 따른다. MIPS와의 주요 유사점: 고정 길이 명령어, 로드-스토어 아키텍처, 주소 공간 크기 등. 주요 차이점: (1) MIPS는 32개 레지스터인 반면 ARM은 16개, (2) ARM은 9가지 데이터 주소 모드를 지원(MIPS는 3가지), (3) 전통적인 4비트 조건 코드(negative, zero, carry, overflow) 사용, (4) 모든 명령어에 조건부 실행 옵션 내장(4비트 조건 필드), (5) 블록 로드/스토어 명령어로 여러 레지스터를 한 명령어로 저장/복원 가능. ARM의 12비트 즉시값 필드는 8비트를 회전시키는 독특한 해석 방식을 사용한다.

## 예시

```
# ARM vs MIPS 명령어 형식 비교
# ARM: 4비트 조건 + 작은 레지스터 필드 (16개 레지스터)
# MIPS: 조건 필드 없음 + 큰 레지스터 필드 (32개 레지스터)

# ARM 조건부 실행 예시:
# CMP R0, R1           # R0와 R1 비교, 조건 코드 설정
# ADDGT R2, R3, R4     # R0 > R1이면 R2 = R3 + R4
# ADDLE R2, R5, R6     # R0 <= R1이면 R2 = R5 + R6
```

## 관련 개념

- [ARMv8 Instruction Set](/knowledge/computer-architecture/armv8-instruction-set/)
- [RISC-V Instruction Set](/knowledge/computer-architecture/risc-v-instruction-set/)
- [Condition Code](/knowledge/computer-architecture/condition-code/)
