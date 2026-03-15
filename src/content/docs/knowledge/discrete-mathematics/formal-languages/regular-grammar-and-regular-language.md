---
title: "정규 문법과 정규 언어 (Regular Grammar and Regular Language)"
description: "정규 문법(regular grammar)은 모든 생성 규칙이 A -> aB, A -> a, 또는 S -> lambda 형태만 허용하는 type 3 문법이며, 정규 언어(regular language)는 정규 문법에 의해 생성되는 언어로, 유한 상태 오토마타에 의해..."
tags: ['Regular Grammar', 'Regular Language', 'Type 3 Grammar', 'Lexical Analysis', 'Finite State Automaton']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/regular-grammar-and-regular-language
sidebar:
  order: 3
---

## 핵심 개념

### 정규 문법의 제한

정규 문법의 생성 규칙은 매우 제한적이다:
- **A -> aB**: 비터미널 A가 터미널 a와 비터미널 B로 대체 (우선형 규칙)
- **A -> a**: 비터미널 A가 터미널 a로 대체 (종결 규칙)
- **S -> lambda**: 시작 기호만 공문자열로 대체 가능

여기서 A, B는 비터미널 기호이고 a는 터미널 기호이다. 이 제한으로 인해 정규 문법은 문맥 자유 문법(type 2)의 특수한 경우가 된다.

### 정규 언어의 한계

정규 언어는 유한한 메모리(유한 상태)만으로 인식 가능한 패턴만 표현할 수 있다. 예를 들어:
- {0^m 1^n | m, n >= 0}: 정규 언어 (0의 개수와 1의 개수가 독립적)
- {0^n 1^n | n >= 0}: 정규 언어가 아님 (0과 1의 개수를 맞추려면 무한한 "카운터"가 필요)

### 동치 관계

클리네의 정리에 의해 다음이 모두 동치이다:
1. 정규 문법에 의해 생성되는 언어
2. 유한 상태 오토마타에 의해 인식되는 언어
3. 정규 표현식으로 표현되는 집합 (정규 집합)

### 실용적 중요성

정규 문법과 정규 언어는 다음 분야에서 중요하다:
- **어휘 분석(lexical analysis)**: 프로그래밍 언어의 토큰 인식
- **텍스트 검색**: 패턴 매칭
- **프로토콜 검증**: 네트워크 프로토콜의 유효성 검증

## 예시

{0^m 1^n | m, n >= 0}을 생성하는 정규 문법:

```
G2 = (V, T, S, P)
V = {S, A, 0, 1}, T = {0, 1}
생성 규칙 P:
  S -> 0S    (0을 앞에 추가)
  S -> 1A    (1로 전환)
  S -> 1     (단일 1로 종결)
  A -> 1A    (1을 추가)
  A -> 1     (1로 종결)
  S -> lambda (공문자열 허용)
```

유도 예: 0011의 유도
```
S => 0S => 00S => 001A => 0011
```

정규 언어가 아닌 예 - {0^n 1^n | n >= 0}:
```
문맥 자유 문법(S -> 0S1, S -> lambda)으로는 생성 가능하지만,
어떤 정규 문법으로도 생성할 수 없다.
유한 상태 기계는 0의 개수를 "기억"할 수 없기 때문이다.
```

## 관련 개념

- [Formal Language and Grammar](/knowledge/mathematics/formal-language-and-grammar/): 정규 문법의 상위 개념
- [Chomsky Hierarchy](/knowledge/mathematics/chomsky-hierarchy/): Type 3 위치
- [Context-Free Grammar](/knowledge/mathematics/context-free-grammar/): 정규 문법을 포함하는 Type 2 문법
- [Finite-State Automaton](/knowledge/mathematics/finite-state-automaton/): 정규 언어를 인식하는 기계
- [Regular Expression](/knowledge/mathematics/regular-expression/): 정규 언어를 표현하는 또 다른 형식
- [Kleene's Theorem](/knowledge/mathematics/kleenes-theorem/): 정규 집합과 유한 상태 오토마타의 동치 증명
