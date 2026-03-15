---
title: "워드 (Word)"
description: "워드(Word)는 컴퓨터에서 자연스러운 접근 단위로, 일반적으로 32비트(4바이트)의 그룹이며, MIPS 아키텍처에서 레지스터의 크기에 해당한다"
tags: ['Data Unit', 'Register', 'Memory', 'Mips', 'Bit']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/word
sidebar:
  order: 7
---

## 핵심 개념

워드는 프로세서가 한 번에 처리하는 데이터의 기본 단위이다. MIPS 아키텍처에서 워드는 32비트이며, 이는 레지스터 크기, 명령어 길이, 기본 데이터 전송 단위와 일치한다. 메모리에서 워드 주소는 4바이트(4의 배수) 간격으로 배치되며, 이를 바이트 주소 지정(byte addressing)이라 한다. MIPS는 빅 엔디안(big-endian) 방식을 사용하여 워드의 가장 왼쪽(큰) 바이트 주소를 워드 주소로 사용한다. 64비트 아키텍처(MIPS-64, ARMv8 등)에서는 워드가 64비트로 확장된다. 하프워드(16비트)와 바이트(8비트) 접근을 위한 별도의 명령어도 제공된다.

## 예시

```
MIPS 메모리에서의 워드 배치 (바이트 주소 지정):

주소 0:  [바이트0][바이트1][바이트2][바이트3]  ← 워드 0
주소 4:  [바이트4][바이트5][바이트6][바이트7]  ← 워드 1
주소 8:  [바이트8][바이트9][바이트A][바이트B]  ← 워드 2
주소 12: [바이트C][바이트D][바이트E][바이트F]  ← 워드 3

32비트 워드 = 4바이트
→ 연속 워드 주소의 차이 = 4
→ 배열 A[i]의 바이트 주소 = 기본 주소 + i × 4
```

## 관련 개념

- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [데이터 전송 명령어 (Data Transfer Instruction)](/knowledge/computer-architecture/data-transfer-instruction/)
- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [명령어 형식 (Instruction Format)](/knowledge/computer-architecture/instruction-format/)
