---
title: "인터프리터 (Interpreter)"
description: "프로그램의 소스코드를 한 줄씩 읽어 즉시 실행하는 프로그램으로 별도의 실행 파일을 생성하지 않는다"
tags: ["Language", "Interpreter", "Runtime", "Dynamic"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/language/interpreter-basics
sidebar:
  order: 23
---

## 핵심 개념

인터프리터는 프로그램의 소스코드를 **한 줄씩** 읽어 즉시 실행하는 프로그램이다. 컴파일러와 달리 별도의 실행 파일을 생성하지 않으며, 소스코드가 곧 실행 대상이 된다.

## 동작 원리

인터프리터 방식은 소스코드를 실행 직전에 해석하므로 프로그래머가 코드를 작성하고 바로 결과를 확인할 수 있다. 이는 탐색적 프로그래밍과 빠른 프로토타이핑에 유리하다.

### 작동 방식
1. 소스코드 한 줄을 읽는다.
2. 해당 줄을 분석하고 의미를 파악한다.
3. 즉시 실행하여 결과를 생성한다.
4. 다음 줄로 넘어간다.

### 가상 머신(Virtual Machine)과의 결합
현대 인터프리터 언어들은 순수한 인터프리터 방식보다 진화한 형태를 사용한다:
- **Python**: 소스코드를 바이트코드(bytecode)로 컴파일한 뒤 Python 가상 머신이 실행한다.
- **Java**: 소스코드를 바이트코드로 컴파일 → JVM(Java Virtual Machine)이 실행한다.
- **JavaScript**: 브라우저 내 엔진(V8 등)이 JIT(Just-In-Time) 컴파일러를 사용하여 실행 중에 기계어로 변환한다.

### 장단점

**장점**:
- 즉시 실행 가능 (컴파일 대기 시간 없음)
- 대화형 셸(REPL)로 코드를 한 줄씩 테스트 가능
- 플랫폼 독립적 (인터프리터만 있으면 어디서든 실행)

**단점**:
- 실행 속도가 컴파일된 프로그램보다 느림 (매번 해석 과정 필요)
- 실행 시 원본 소스코드 또는 인터프리터가 필요

## 예시

Python REPL (대화형 인터프리터):

```python
>>> 2 + 3          # 입력 즉시 실행
5
>>> name = "World"
>>> print(f"Hello, {name}!")
Hello, World!
>>> [x**2 for x in range(5)]
[0, 1, 4, 9, 16]
```

컴파일 vs 인터프리터 실행 흐름:

```
컴파일 방식 (C):
  hello.c → [gcc 컴파일러] → hello.exe → [OS가 실행] → "Hello"
  (번역 단계와 실행 단계가 분리됨)

인터프리터 방식 (Python):
  hello.py → [python 인터프리터가 즉시 실행] → "Hello"
  (번역과 실행이 동시에 일어남)

JIT 컴파일 방식 (JavaScript):
  app.js → [V8 엔진이 실행하면서 자주 쓰는 부분을 기계어로 컴파일]
  (인터프리터의 편의성 + 컴파일러의 속도를 결합)
```

## 관련 개념

- [컴파일러 (Compiler)](/knowledge/language/compiler-basics/) - 인터프리터와 대비되는 번역/실행 방식
- [어셈블리어 (Assembly Language)](/knowledge/language/assembly-language-basics/) - 인터프리터가 궁극적으로 번역해야 하는 저수준 명령

## 출처

- Understanding the Digital World, Chapter 5
