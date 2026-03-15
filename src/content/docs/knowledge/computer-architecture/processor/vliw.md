---
title: "VLIW (초장 명령어)"
description: "VLIW(Very Long Instruction Word)는 하나의 긴 명령어에 여러 개의 독립적인 연산을 묶어 동시에 발행하는 명령어 아키텍처로, 컴파일러가 병렬화 결정을 담당한다"
tags: ['Instruction Level Parallelism', 'Instruction Set', 'Tpuv3', 'Compiler']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/vliw
sidebar:
  order: 31
---

## 핵심 개념

VLIW 아키텍처에서는 컴파일러가 명령어 수준 병렬성(ILP)을 분석하고 여러 연산을 하나의 긴 명령어 워드에 패킹한다. 하드웨어가 동적으로 명령어 간 의존성을 검사하는 수퍼스칼라 프로세서와 달리, VLIW는 이 복잡성을 컴파일러에게 맡겨 하드웨어를 단순화한다. TPUv3의 TensorCore는 322비트 VLIW 명령어를 사용하여 한 번에 8개의 연산을 발행한다: 스칼라 ALU 2개, 벡터 ALU 2개, 벡터 로드와 스토어, 행렬 곱셈 및 전치 유닛으로의 데이터 큐잉 2슬롯. VLIW는 인오더(in-order) 머신에서 컴파일러가 연산, 메모리, 네트워크 활동을 오버랩시켜 효율을 높인다.

정적 다중 발행(static multiple issue)의 대표적 구현이 VLIW이다. 한 클록에 발행될 명령어 집합을 이슈 패킷(issue packet)이라 하며, 이를 하나의 큰 명령어로 볼 수 있다. 예를 들어, 2-issue MIPS 프로세서에서는 하나의 ALU/분기 명령어와 하나의 load/store 명령어를 64비트 정렬된 쌍으로 동시 발행한다. 컴파일러가 해저드 회피와 코드 스케줄링을 담당하며, 사용 불가 슬롯에는 nop을 삽입한다. 일부 VLIW 설계에서는 다른 프로세서 모델로 이동 시 재컴파일이 필요한 단점이 있다.

## 예시

```
TPUv3 VLIW 명령어 구조 (322비트):

[스칼라ALU1 | 스칼라ALU2 | 벡터ALU1 | 벡터ALU2 | 벡터로드 | 벡터스토어 | MXU큐 | 전치큐]
     |            |            |           |           |          |          |        |
     v            v            v           v           v          v          v        v
  8개 연산이 한 클럭 사이클에 동시 발행

비교:
- 수퍼스칼라: 하드웨어가 동적으로 병렬 연산 탐색 → 복잡한 하드웨어
- VLIW: 컴파일러가 정적으로 병렬 연산 결정 → 단순한 하드웨어
```

## 관련 개념

- [TPUv3 슈퍼컴퓨터 (TPUv3 Supercomputer)](/knowledge/computer-architecture/tpuv3-supercomputer/)
- [명령어 수준 병렬성 (ILP)](/knowledge/computer-architecture/instruction-level-parallelism/)
- [슈퍼스칼라 (Superscalar)](/knowledge/computer-architecture/superscalar/)
- [다중 발행 (Multiple Issue)](/knowledge/computer-architecture/multiple-issue/)
- [루프 풀기 (Loop Unrolling)](/knowledge/language/loop-unrolling/)
- [레지스터 리네이밍 (Register Renaming)](/knowledge/computer-architecture/register-renaming/)
