---
title: "자바 바이트코드 (Java Bytecode)"
description: "자바 바이트코드(Java Bytecode)는 자바 프로그램을 해석(interpret)하기 위해 설계된 명령어 세트의 명령어이다"
tags: ['Java', 'Jvm', 'Interpreter', 'Portability', 'Instruction Set']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/java-bytecode
sidebar:
  order: 12
---

## 핵심 개념

자바는 특정 타겟 컴퓨터의 어셈블리 언어 대신, 해석이 용이한 바이트코드 명령어로 먼저 컴파일된다. 이 명령어 세트는 자바 언어에 가깝게 설계되어 컴파일 단계가 간단하다. 자바 프로그램은 바이트코드의 바이너리 버전으로 배포된다. MIPS 명령어와의 주요 차이점은: (1) 레지스터 대신 스택 기반으로 동작, (2) 코드 크기 절약을 위해 1~5바이트의 가변 길이 명령어 사용, (3) 배열 범위 검사 같은 안전 기능 내장, (4) 가비지 컬렉터를 위한 주소/정수 구분, (5) 객체 할당이나 메서드 호출 같은 복잡한 연산을 수행하는 Java 전용 명령어 존재.

## 예시

```java
// Java while 루프
while (save[i] == k)
    i += 1;

// 해당 바이트코드 (7개 명령어, 13바이트):
// 0  aload_3          # save[] 를 스택에 푸시
// 1  iload_1          # i를 스택에 푸시
// 2  iaload           # save[i]를 스택에 놓기
// 3  iload_2          # k를 스택에 푸시
// 4  if_icompne, Exit # 같지 않으면 종료
// 7  iinc, 1, 1       # i += 1
// 10 goto 0           # 루프 맨 위로
```

## 관련 개념

- [JVM (자바 가상 머신)](/knowledge/language/java-virtual-machine/)
- [JIT 컴파일러 (Just In Time Compiler)](/knowledge/language/just-in-time-compiler/)
- [컴파일러 (Compiler)](/knowledge/language/compiler/)
