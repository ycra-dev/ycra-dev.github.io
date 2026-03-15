---
title: "에러 프론 (Error Prone)"
description: "Java 컴파일러를 확장하여 AST 안티패턴을 식별하는 정적 분석 도구로, 실제 버그가 될 수 있는 코드 패턴을 컴파일 시점에 잡아냄"
tags: ["Software Engineering", "Static Analysis", "Java"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/software-engineering/quality-and-configuration/error-prone
sidebar:
  order: 316
---

## 핵심 개념

Error Prone은 Java 컴파일러를 확장하여 AST(Abstract Syntax Tree) 안티패턴을 식별하는 정적 분석 도구이다. 실제 버그가 될 수 있는 코드 패턴을 컴파일 시점에 잡아낸다. C++에서는 clang-tidy가 동일한 역할을 수행한다.

## 동작 원리

Error Prone은 Google의 Tricorder에 통합된 핵심 분석 도구 중 하나이다. Error Prone의 "ERROR" 수준 검사들은 Google의 Java 컴파일러에 모두 활성화되어 있어, 해당 오류가 코드베이스에 새로 도입되는 것을 원천 차단한다.

컴파일러 통합 검사의 3가지 기준:
1. 조치 가능하고 수정이 쉬울 것 (자동 수정 제안 포함)
2. 유효 오탐이 없을 것
3. 스타일이나 베스트 프랙티스가 아닌 **정확성(correctness)**에만 영향을 미칠 것

새로운 컴파일러 검사를 활성화하려면 먼저 코드베이스의 모든 기존 인스턴스를 정리해야 한다. Google은 MapReduce 방식으로 클러스터 전체에서 컴파일러를 병렬 실행하여 이를 수행한다.

## 예시

`long` 타입 필드 `f`의 해시 계산 코드:
```java
result = 31 * result + (int) (f ^ (f >>> 32));
```
`f`가 `int` 타입이면 32비트 우측 시프트는 무연산(no-op)이 되어 `f`가 자기 자신과 XOR되어 해시 값에 영향을 주지 않는 버그가 발생한다. Error Prone이 이 버그를 31건 발견하여 수정했다.

## 관련 개념

- [트리코더 (Tricorder)](/knowledge/software-engineering/quality-and-configuration/tricorder/)
- [실효적 오탐 (Effective False Positive)](/knowledge/software-engineering/quality-and-configuration/effective-false-positive/)
- [프리서밋 검사 (Presubmit Check)](/knowledge/software-engineering/quality-and-configuration/presubmit-check/)
