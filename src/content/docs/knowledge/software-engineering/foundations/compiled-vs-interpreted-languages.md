---
title: "컴파일 언어 vs 인터프리터 언어 (Compiled vs Interpreted Languages)"
description: "소스코드를 실행 전에 기계어로 변환하는 컴파일 언어와, 실행 시점에 한 줄씩 해석하는 인터프리터 언어의 차이와 트레이드오프이다."
tags: ["Software Engineering", "Programming Languages", "Compilers"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/foundations/compiled-vs-interpreted-languages
sidebar:
  order: 25
---

## 핵심 개념

컴파일 언어는 소스코드를 실행 전에 CPU가 직접 읽을 수 있는 기계어로 변환(컴파일)한다. 인터프리터 언어는 소스코드를 실행 시점에 한 줄씩 읽고 해석하며 실행한다. 두 방식의 핵심 트레이드오프는 **실행 속도 vs 개발 편의성**이다.

## 동작 원리

```
컴파일 언어:
소스코드 → [컴파일러] → 기계어 바이너리 → CPU 직접 실행
장점: 빠른 실행 속도, 실행 전 타입 오류 발견
단점: 빌드 시간 필요, OS/하드웨어별 재컴파일

인터프리터 언어:
소스코드 → [인터프리터] → 한 줄씩 해석 → 실행
장점: 즉시 실행, 플랫폼 독립적, REPL 가능
단점: 상대적으로 느린 실행 속도
```

현대 언어는 두 방식을 혼합한다. Java는 바이트코드로 컴파일 후 JVM이 인터프리트하고, Python과 JavaScript도 내부적으로 바이트코드를 사용하며 JIT(Just-In-Time) 컴파일을 적용한다.

## 예시

| 언어 | 방식 | 대표 사용처 |
|------|------|------------|
| C, C++, Rust | 컴파일 | 시스템, 게임 엔진, 임베디드 |
| Python, Ruby | 인터프리터 | 스크립팅, 데이터 사이언스 |
| Java, C# | 하이브리드(바이트코드) | 엔터프라이즈, 웹 백엔드 |
| JavaScript | JIT 컴파일 | 웹 브라우저, Node.js |

## 관련 개념

- [함수형 프로그래밍](/knowledge/software-engineering/foundations/functional-programming/)
- [객체지향 프로그래밍](/knowledge/software-engineering/foundations/object-oriented-programming/)
