---
title: "저장 프로그램 개념 (Stored-Program Concept)"
description: "저장 프로그램 개념(Stored-Program Concept)은 명령어와 다양한 유형의 데이터가 숫자로 메모리에 저장될 수 있다는 아이디어로, 저장 프로그램 컴퓨터의 근간이 되는 개념이다"
tags: ['Von Neumann', 'Computer Architecture', 'Memory', 'Instruction', 'Fundamental Concept']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/stored-program-concept
sidebar:
  order: 2
---

## 핵심 개념

저장 프로그램 개념은 컴퓨팅의 비밀 중 하나로, 두 가지 핵심 원리에 기반한다: (1) 명령어는 숫자로 표현된다, (2) 프로그램은 숫자처럼 읽고 쓸 수 있도록 메모리에 저장된다. 이 개념의 발명은 컴퓨팅의 잠재력을 해방시켰다. 메모리에 회계 프로그램을 로드하면 회계 컴퓨터가 되고, 문서 편집기를 로드하면 문서 편집 컴퓨터가 된다. 명령어를 데이터와 동일하게 취급하면 메모리 하드웨어와 시스템 소프트웨어가 크게 단순화된다. 또한 컴파일러가 사람에게 편리한 표기법으로 작성된 코드를 컴퓨터가 이해하는 코드로 번역하는 것이 가능해진다.

이 개념의 핵심은 비트 패턴 자체에는 내재된 의미가 없다는 것이다. 동일한 비트 패턴이 부호 있는 정수, 부호 없는 정수, 부동소수점 수, 명령어, 문자열 등을 나타낼 수 있다. 무엇을 표현하는지는 해당 비트 패턴에 대해 수행되는 연산에 의해 결정된다. 명령어 세트의 설계는 프로그램 실행에 필요한 명령어 수, 명령어당 클럭 사이클 수, 클럭 속도 사이의 균형을 요구한다.

## 예시

```
저장 프로그램 컴퓨터의 메모리 내용 예시:

메모리 주소    내용              유형
0x00400000    0x01098020       MIPS 명령어 (add $s0,$t0,$t1)
0x00400004    0x8d080020       MIPS 명령어 (lw $t0,32($t0))
...
0x10000000    "Hello World"    문자열 데이터
0x10000010    42               정수 데이터
...

→ 명령어와 데이터가 모두 숫자로 같은 메모리에 저장됨
→ 프로그램을 교체하면 컴퓨터의 기능이 변함
```

```
# 동일한 비트 패턴의 다양한 해석
# 00000001010010110100100000100000 (32비트)

# 16진수: 0x014B4820
# 부호 없는 정수: 21,710,880
# MIPS 명령어: add $t1, $t2, $t3
# IEEE 754 부동소수점: 약 3.73 x 10^(-38)

# → 비트 패턴 자체에는 의미가 없음
# → 해석하는 명령어/컨텍스트가 의미를 결정
```

## 관련 개념

- [기계어 (Machine Language)](/knowledge/computer-architecture/machine-language/)
- [ISA (명령어 집합 아키텍처)](/knowledge/computer-architecture/instruction-set-architecture/)
- [메모리 계층 구조 (Memory Hierarchy)](/knowledge/computer-architecture/memory-hierarchy/)
- [명령어 형식 (Instruction Format)](/knowledge/computer-architecture/instruction-format/)
- [부동소수점 (Floating Point)](/knowledge/computer-architecture/floating-point/)
- [2의 보수 (Two's Complement)](/knowledge/computer-architecture/twos-complement/)
