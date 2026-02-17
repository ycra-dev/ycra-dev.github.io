---
title: "Data Transfer Instruction"
description: "데이터 전송 명령어(Data Transfer Instruction)는 메모리와 레지스터 사이에서 데이터를 이동시키는 명령어로, 대표적으로 load(메모리 → 레지스터)와 store(레지스터 → 메모리)가 있다"
tags: ['Instruction', 'Memory', 'Load', 'Store', 'Mips', 'Operand']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/data-transfer-instruction
sidebar:
  order: 13
---

## 핵심 개념

MIPS에서 산술 연산은 레지스터의 피연산자에 대해서만 수행되므로, 메모리에 있는 데이터를 처리하려면 먼저 레지스터로 전송해야 한다. load word(lw)는 메모리에서 워드를 읽어 레지스터에 넣고, store word(sw)는 레지스터의 값을 메모리에 저장한다. 메모리 주소는 베이스 레지스터와 오프셋의 합으로 계산된다. MIPS는 바이트 주소 지정(byte addressing)을 사용하므로 워드 주소는 4의 배수이다. 정렬 제약(alignment restriction)에 따라 워드는 4의 배수 주소에서 시작해야 한다. 메모리 접근은 레지스터 접근보다 느리고 에너지를 더 소비하므로, 컴파일러는 자주 사용되는 변수를 레지스터에 유지하려 한다.

## 예시

```assembly
# MIPS 데이터 전송 명령어 예시

# load word: 메모리에서 레지스터로
lw $t0, 32($s3)    # $t0 = Memory[$s3 + 32]
                    # 배열 A[8]을 로드 (8 × 4 = 32)

# store word: 레지스터에서 메모리로
sw $t0, 48($s3)    # Memory[$s3 + 48] = $t0
                    # A[12]에 저장 (12 × 4 = 48)

# 바이트 단위 전송
lb $t0, 0($sp)     # 바이트 로드 (부호 확장)
lbu $t0, 0($sp)    # 바이트 로드 (0 확장)
sb $t0, 0($gp)     # 바이트 저장
```

## 관련 개념

- [Register](/knowledge/computer-architecture/register/)
- [Memory Hierarchy](/knowledge/computer-architecture/memory-hierarchy/)
- [Instruction Set](/knowledge/computer-architecture/instruction-set/)
- [Addressing Mode](/knowledge/computer-architecture/addressing-mode/)
- [Word](/knowledge/computer-architecture/word/)
