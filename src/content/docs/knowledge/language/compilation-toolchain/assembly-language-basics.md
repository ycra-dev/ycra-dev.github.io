---
title: "어셈블리어 (Assembly Language)"
description: "기계어를 사람이 읽을 수 있는 기호적 형태로 표현한 저수준 프로그래밍 언어로 어셈블러가 기계어로 번역한다"
tags: ["Language", "Assembly", "Machine-Code", "Low-Level"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/language/assembly-language-basics
sidebar:
  order: 21
---

## 핵심 개념

어셈블리어는 기계어(machine language)를 사람이 읽을 수 있는 기호적 형태로 표현한 저수준 프로그래밍 언어이다. MOV, ADD, JMP 같은 니모닉(mnemonic)을 사용하며, **어셈블러(assembler)**라는 프로그램이 이를 기계어로 번역한다.

## 동작 원리

컴퓨터의 CPU는 0과 1로 이루어진 기계어만 이해할 수 있다. 어셈블리어는 이 문제를 해결하기 위해 기계어 명령어에 기억하기 쉬운 약어(니모닉)를 부여한다.

### 주요 특징
1. **1:1 대응**: 어셈블리어 명령 하나가 기계어 명령 하나에 대응된다.
2. **CPU 종속적**: CPU 아키텍처(Intel x86, ARM 등)마다 어셈블리어가 다르다. x86용으로 작성한 코드는 ARM에서 실행할 수 없다.
3. **어셈블러가 번역**: 어셈블러라는 프로그램이 기호적 표현을 실제 기계어 비트 패턴으로 변환한다.

초기 프로그래머들은 기계어를 직접 작성해야 했다. 어셈블리어의 등장으로 프로그래밍 생산성이 크게 향상되었지만, 여전히 하드웨어에 밀접하게 묶여 있어 이식성이 없었다. 이 한계를 극복하기 위해 C, Fortran 같은 고급 언어와 컴파일러가 개발되었다.

## 예시

기계어 vs 어셈블리어 비교:

```
기계어 (2진수):         어셈블리어:
10110000 01100001  →    MOV AL, 97     ; AL 레지스터에 97 저장
00000100 00000010  →    ADD AL, 2      ; AL에 2를 더함
11101011 00000101  →    JMP label      ; label로 점프
```

간단한 덧셈 프로그램 (x86 어셈블리):

```asm
; 두 수의 합 계산
MOV AX, 5       ; AX 레지스터에 5 저장
MOV BX, 3       ; BX 레지스터에 3 저장
ADD AX, BX      ; AX = AX + BX = 8
; 결과: AX에 8이 저장됨
```

동일한 작업을 고급 언어(Python)로 표현하면:

```python
result = 5 + 3   # 한 줄로 끝남
```

## 관련 개념

- [컴파일러 (Compiler)](/knowledge/language/compiler-basics/) - 고급 언어를 어셈블리어/기계어로 변환하는 프로그램
- [CPU](/knowledge/computer-architecture/cpu-basics/) - 어셈블리어가 직접 제어하는 하드웨어
- [명령어 실행 주기 (Fetch-Decode-Execute Cycle)](/knowledge/computer-architecture/fetch-decode-execute-cycle/) - CPU가 어셈블리/기계어 명령을 처리하는 과정
- [인터프리터 (Interpreter)](/knowledge/language/interpreter-basics/) - 어셈블리어와 다른 번역 방식을 사용하는 실행 모델
- [이진수 (Binary Number)](/knowledge/computer-architecture/binary-number/) - 기계어의 기반이 되는 이진수 체계

## 출처

- Understanding the Digital World, Chapter 5
