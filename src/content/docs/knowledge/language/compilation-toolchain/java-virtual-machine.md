---
title: "JVM (자바 가상 머신)"
description: "자바 가상 머신(JVM, Java Virtual Machine)은 자바 바이트코드를 해석하여 실행하는 소프트웨어 인터프리터 프로그램이다"
tags: ['Jvm', 'Java Bytecode', 'Interpreter', 'Portability']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/language/java-virtual-machine
sidebar:
  order: 11
---

## 핵심 개념

JVM은 명령어 세트 아키텍처를 시뮬레이션하는 프로그램이다. 별도의 어셈블리 단계가 필요 없으며, 컴파일러가 주소를 채우거나 JVM이 런타임에 찾는다. 인터프리터의 장점은 이식성(portability)이다 -- 소프트웨어 JVM이 제공되면 거의 모든 기기에서 자바 프로그램을 실행할 수 있다. 현재 수억 개의 장치에서 JVM이 발견된다. 단점은 전통적으로 컴파일된 C 프로그램에 비해 약 10배 느린 성능이다. JVM은 클래스 파일을 동적으로 로드, 링크, 초기화하며, 최적화를 위해 JIT 컴파일러와 함께 사용될 수 있다.

## 예시

```
# JVM 실행 흐름
1. JVM 시작 → main 클래스 메서드 탐색
2. 클래스 파일(.class) 로드
3. 바이트코드 검증 및 링크
4. 클래스 초기화
5. 바이트코드 해석 실행
6. "핫" 메서드 → JIT 컴파일러가 네이티브 코드로 변환
```

## 관련 개념

- [자바 바이트코드 (Java Bytecode)](/knowledge/language/java-bytecode/)
- [JIT 컴파일러 (Just In Time Compiler)](/knowledge/language/just-in-time-compiler/)
