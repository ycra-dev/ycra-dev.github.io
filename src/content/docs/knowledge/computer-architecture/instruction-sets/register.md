---
title: "레지스터 (Register)"
description: "레지스터(Register)는 하드웨어에 직접 구축된 제한된 수의 특수한 고속 저장 위치로, 프로세서가 산술 연산의 피연산자로 직접 사용한다"
tags: ['Hardware', 'CPU', 'Operand', 'Fast Storage', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/register
sidebar:
  order: 7
---

## 핵심 개념

레지스터는 컴퓨터의 가장 빠른 저장 장치이며, 메모리 계층구조의 최상위에 위치한다. MIPS 아키텍처에서는 32개의 32비트 레지스터가 있으며, 이 숫자는 "작은 것이 빠르다(smaller is faster)"라는 설계 원칙에 따른다. 레지스터 수가 너무 많으면 클럭 사이클 시간이 증가할 수 있고, 명령어 형식에서 더 많은 비트가 필요하다. MIPS에서 레지스터는 용도별로 분류된다: $s0-$s7(저장 레지스터), $t0-$t9(임시 레지스터), $a0-$a3(인수 레지스터), $v0-$v1(반환값 레지스터), $sp(스택 포인터), $ra(리턴 주소). 컴파일러는 자주 사용되는 변수를 레지스터에 할당하고, 나머지는 메모리에 "스필(spill)"한다.

## 예시

```
MIPS 32개 레지스터 규약:
$zero (0번): 항상 0
$at   (1번): 어셈블러 임시용
$v0-$v1 (2-3번): 함수 반환값
$a0-$a3 (4-7번): 함수 인수
$t0-$t7 (8-15번): 임시 레지스터 (callee가 보존 안 함)
$s0-$s7 (16-23번): 저장 레지스터 (callee가 보존)
$t8-$t9 (24-25번): 추가 임시 레지스터
$gp (28번): 전역 포인터
$sp (29번): 스택 포인터
$fp (30번): 프레임 포인터
$ra (31번): 리턴 주소
```

## 관련 개념

- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [명령어 집합 (Instruction Set)](/knowledge/computer-architecture/instruction-set/)
- [스택 (Stack)](/knowledge/computer-architecture/stack/)
- [데이터 전송 명령어 (Data Transfer Instruction)](/knowledge/computer-architecture/data-transfer-instruction/)
