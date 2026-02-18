---
title: "Compiler"
description: "컴파일러(Compiler)는 고급 프로그래밍 언어로 작성된 프로그램을 어셈블리 언어 또는 기계어 명령어로 번역하는 프로그램이다"
tags: ['Systems Software', 'Translation', 'High Level Language', 'Code Generation']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/compiler
sidebar:
  order: 1
---

## 핵심 개념

컴파일러는 시스템 소프트웨어의 핵심 구성요소로, C, C++, Java 같은 고급 언어의 문장을 하드웨어가 실행할 수 있는 명령어로 변환한다. 현대 프로그래밍 언어의 정교함과 하드웨어가 실행하는 명령어의 단순함을 고려하면, 이 번역 과정은 매우 복잡하다. 컴파일러는 명령어 수(instruction count)와 CPI 모두에 영향을 미치므로 프로그램 성능에 중대한 영향을 준다. 컴파일러의 효율성은 소스 언어 명령어를 컴퓨터 명령어로 어떻게 변환하느냐에 따라 달라지며, 최적화 기법을 통해 더 적은 명령어나 더 빠른 명령어를 선택할 수 있다.

컴파일러는 프로그램 번역 계층(translation hierarchy)의 첫 번째 단계를 담당한다. 고급 언어 프로그램은 어셈블리 언어보다 훨씬 적은 코드 라인으로 같은 작업을 수행할 수 있어 프로그래머 생산성이 크게 향상된다. 1975년에는 메모리가 작고 컴파일러가 비효율적이어서 많은 운영체제와 어셈블러가 어셈블리 언어로 작성되었으나, DRAM 칩 당 메모리 용량이 백만 배 이상 증가하면서 프로그램 크기에 대한 우려가 줄었고, 최적화 컴파일러는 어셈블리 언어 전문가만큼 좋은(때로는 더 나은) 코드를 생성할 수 있게 되었다.

## 예시

C 코드에서 MIPS 어셈블리로의 컴파일 과정:
```c
// C 소스 코드
a = b + c;
```

```assembly
# 컴파일된 MIPS 어셈블리
add $s0, $s1, $s2    # a = b + c
```

```
# 어셈블된 기계어 (바이너리)
000000 10001 10010 10000 00000 100000
```

C 함수를 MIPS 어셈블리로 변환하는 과정:
```c
// C 소스 코드 (x.c)
int add(int a, int b) {
    return a + b;
}
```
컴파일러가 생성하는 어셈블리 코드 (x.s):
```assembly
add $v0, $a0, $a1   # return a + b
jr  $ra              # return
```

## 관련 개념

- [Assembly Language](/knowledge/computer-architecture/assembly-language/)
- [Machine Language](/knowledge/computer-architecture/machine-language/)
- [Instruction Set Architecture](/knowledge/computer-architecture/instruction-set-architecture/)
- [Instruction Count](/knowledge/computer-architecture/instruction-count/)
- [CPI](/knowledge/computer-architecture/cpi/)
- [Assembler](/knowledge/language/assembler/)
- [Linker](/knowledge/language/linker/)
- [Object File](/knowledge/language/object-file/)
