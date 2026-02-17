---
title: "Just In Time Compiler"
description: "JIT(Just In Time) 컴파일러는 런타임에 동작하는 컴파일러로, 인터프리트되는 코드 세그먼트를 실행 중인 컴퓨터의 네이티브 코드로 변환한다"
tags: ['Jit', 'Java', 'Jvm', 'Runtime Compilation', 'Optimization']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/just-in-time-compiler
sidebar:
  order: 13
---

## 핵심 개념

이식성을 유지하면서 실행 속도를 향상시키기 위해 개발되었다. JIT 컴파일러는 실행 중인 프로그램을 프로파일링하여 "핫(hot)" 메서드를 찾아 해당 가상 머신이 실행되는 네이티브 명령어 세트로 컴파일한다. 컴파일된 부분은 다음 실행 시를 위해 저장되어, 프로그램이 실행될 때마다 점점 빨라진다. 인터프리터와 컴파일의 균형이 시간에 따라 발전하여, 자주 실행되는 자바 프로그램은 인터프리터 오버헤드를 거의 겪지 않는다. 벤치마크 결과, JIT 컴파일러를 사용한 Java는 최적화되지 않은 C보다 2.1배 빠르고, 가장 높은 수준으로 최적화된 C 코드의 1.13배 이내의 성능을 보인다.

## 예시

```
# JIT 컴파일러 동작 과정
1. JVM이 바이트코드를 인터프리트하며 실행
2. 프로파일러가 자주 실행되는 "핫 메서드" 식별
3. JIT가 핫 메서드를 네이티브 코드(x86, ARM 등)로 컴파일
4. 컴파일된 코드 캐시에 저장
5. 이후 호출 시 네이티브 코드 직접 실행
```

## 관련 개념

- [Java Virtual Machine](/knowledge/computer-architecture/java-virtual-machine/)
- [Java Bytecode](/knowledge/computer-architecture/java-bytecode/)
- [Compiler](/knowledge/computer-architecture/compiler/)
