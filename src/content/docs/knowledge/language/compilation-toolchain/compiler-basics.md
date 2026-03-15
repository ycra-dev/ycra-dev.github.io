---
title: "컴파일러 (Compiler) - 기초 개념"
description: "고급 프로그래밍 언어로 작성된 소스코드를 기계어 또는 어셈블리어로 변환하는 프로그램"
tags: ["Language", "Compiler", "Translation", "Software-Tools"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/language/compiler-basics
sidebar:
  order: 22
---

## 핵심 개념

컴파일러는 C, Java 등 고급 프로그래밍 언어로 작성된 소스코드를 기계어 또는 어셈블리어로 변환하는 프로그램이다. 소스코드 전체를 한 번에 분석하고 번역하여 **실행 가능한 프로그램(executable)**을 생성한다.

## 동작 원리

컴파일러의 등장으로 프로그래머가 특정 CPU의 명령어 집합을 몰라도 논리적으로 프로그램을 작성할 수 있게 되었고, 하나의 소스코드를 서로 다른 CPU 아키텍처용으로 컴파일할 수 있어 이식성이 크게 향상되었다.

### 컴파일 과정
1. **어휘 분석(Lexical Analysis)**: 소스코드를 토큰(token)으로 분리한다.
2. **구문 분석(Parsing)**: 토큰들이 문법 규칙에 맞는지 확인한다.
3. **코드 생성(Code Generation)**: 대상 CPU의 기계어/어셈블리어를 생성한다.
4. **최적화(Optimization)**: 실행 속도를 높이거나 메모리 사용을 줄이도록 코드를 개선한다.

### 컴파일러의 핵심 가치
- **추상화**: 하드웨어의 세부 사항을 숨겨 프로그래머가 문제 해결에 집중하게 한다.
- **이식성**: 동일한 C 코드를 Intel CPU용, ARM CPU용으로 각각 컴파일할 수 있다.
- **오류 검출**: 프로그램 실행 전에 문법 오류, 타입 오류 등을 찾아낸다.
- **최적화**: 사람이 직접 작성하기 어려운 수준의 기계어 최적화를 자동으로 수행한다.

최초의 주요 컴파일러는 1957년 IBM에서 개발한 Fortran 컴파일러이다.

## 예시

컴파일 과정의 흐름:

```
소스코드 (C 언어)          컴파일러          실행 파일
┌──────────────┐      ┌──────────┐      ┌──────────────┐
│ int x = 5;   │      │          │      │ 10110000     │
│ int y = 3;   │ ───► │ 컴파일러  │ ───► │ 00000101     │
│ int z = x+y; │      │          │      │ ...기계어... │
└──────────────┘      └──────────┘      └──────────────┘
                                         → 직접 실행 가능
```

컴파일러 vs 인터프리터 비교:

```
컴파일러 (C, C++, Go):
  소스코드 → [컴파일] → 실행파일 → [실행] → 결과
  ✓ 실행 속도 빠름
  ✓ 배포 시 소스코드 불필요
  ✗ 컴파일 시간 필요

인터프리터 (Python, JavaScript):
  소스코드 → [한 줄씩 실행] → 결과
  ✓ 즉시 실행 가능
  ✓ 대화형(interactive) 개발 가능
  ✗ 실행 속도 상대적으로 느림
```

## 관련 개념

- [어셈블리어 (Assembly Language)](/knowledge/language/assembly-language-basics/) - 컴파일러의 출력 대상 중 하나
- [인터프리터 (Interpreter)](/knowledge/language/interpreter-basics/) - 컴파일러와 대비되는 또 다른 실행 방식
- [CPU (중앙처리장치)](/knowledge/computer-architecture/cpu-basics/) - 컴파일러가 생성한 기계어를 실행하는 하드웨어

## 출처

- Understanding the Digital World, Chapter 5
