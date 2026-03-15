---
title: "기계어 (Machine Language)"
description: "기계어(Machine Language)는 컴퓨터 하드웨어가 직접 이해하고 실행할 수 있는 이진수(binary) 형태의 명령어 표현이다"
tags: ['Binary', 'Instruction Encoding', 'Hardware', 'Processor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/machine-language
sidebar:
  order: 5
---

## 핵심 개념

기계어는 0과 1의 비트 패턴으로 구성되며, 프로세서가 직접 해독하고 실행하는 최하위 수준의 프로그래밍 언어이다. 모든 고급 언어 프로그램은 궁극적으로 기계어로 번역되어야 실행될 수 있다. 저장 프로그램 개념(stored-program concept)에 따르면, 기계어 명령어는 숫자로 표현되어 메모리에 데이터와 함께 저장된다. 이 개념은 컴퓨팅의 근본적인 원리 중 하나이다. 기계어 프로그램은 바이너리 파일로 배포되며, 이를 통해 동일한 명령어 집합을 사용하는 컴퓨터 간에 "바이너리 호환성(binary compatibility)"이 가능하다.

## 예시

MIPS 기계어 예시 (add $t0, $s1, $s2):
```
10진수 필드:  0    17   18   8    0    32
이진수:      000000 10001 10010 01000 00000 100000
             [op]   [rs]  [rt]  [rd] [shamt][funct]
```

- op: 연산 종류 (R-format = 0)
- rs: 첫 번째 소스 레지스터 ($s1 = 17)
- rt: 두 번째 소스 레지스터 ($s2 = 18)
- rd: 목적 레지스터 ($t0 = 8)
- funct: 특정 연산 (add = 32)

## 관련 개념

- [어셈블리어 (Assembly Language)](/knowledge/computer-architecture/assembly-language/)
- [명령어 형식 (Instruction Format)](/knowledge/computer-architecture/instruction-format/)
- [저장 프로그램 개념 (Stored-Program Concept)](/knowledge/computer-architecture/stored-program-concept/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
- [연산 코드 (Opcode)](/knowledge/computer-architecture/opcode/)
