---
title: "Formal Language and Grammar"
description: "형식 언어(formal language)는 알파벳(vocabulary) V 위의 문자열 집합 V*의 부분집합이며, 구(phrase-structure) 문법 G = (V, T, S, P)는 알파벳 V, 터미널 기호 집합 T, 시작 기호 S, 생성 규칙 집합 P로 구..."
tags: ['Formal Language', 'Phrase Structure Grammar', 'Vocabulary', 'Production', 'Derivation', 'Computation Theory']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/formal-language-and-grammar
sidebar:
  order: 1
---

## 핵심 개념

형식 언어는 자연어와 달리 명확하게 정의된 구문 규칙(syntax rules)에 의해 생성된다. 문법의 핵심 요소는 다음과 같다:

- **알파벳(vocabulary) V**: 기호들의 유한한 비공 집합
- **터미널 기호(terminal symbols) T**: V의 부분집합으로, 더 이상 대체할 수 없는 최종 기호
- **비터미널 기호(nonterminal symbols) N = V - T**: 생성 규칙에 의해 다른 문자열로 대체될 수 있는 기호
- **시작 기호(start symbol) S**: 유도가 시작되는 특별한 비터미널 기호
- **생성 규칙(productions) P**: z0 -> z1 형태의 규칙으로, 문자열 내에서 z0를 z1로 대체 가능함을 명시

**유도(derivation)**: w0에서 w1을 직접 유도할 수 있으면 w0 => w1로 표기하고, 여러 단계를 거쳐 유도할 수 있으면 w0 *=> wn으로 표기한다.

**문법 G가 생성하는 언어**: L(G) = {w in T* | S *=> w}, 즉 시작 기호 S에서 유도 가능한 모든 터미널 문자열의 집합이다.

## 예시

문법 G = (V, T, S, P)에서 V = {S, 0, 1}, T = {0, 1}, 생성 규칙 P = {S -> 11S, S -> 0}인 경우:

```
S => 0                    (S -> 0 적용)
S => 11S => 110           (S -> 11S, S -> 0 적용)
S => 11S => 1111S => 11110  (S -> 11S 두 번, S -> 0 적용)
```

따라서 L(G) = {0, 110, 11110, 1111110, ...} = 짝수 개의 1로 시작하고 0으로 끝나는 문자열의 집합

또 다른 예로, {0^n 1^n | n >= 0}을 생성하는 문법:
- 생성 규칙: S -> 0S1, S -> lambda
- S => 0S1 => 00S11 => 000S111 => 000111 (n=3인 경우)

## 관련 개념

- [Chomsky Hierarchy](/knowledge/mathematics/chomsky-hierarchy/): 문법의 4가지 분류 체계
- [Context-Free Grammar](/knowledge/mathematics/context-free-grammar/): 가장 널리 사용되는 문법 유형(type 2)
- [Regular Grammar and Regular Language](/knowledge/mathematics/regular-grammar-and-regular-language/): 가장 제한적인 문법 유형(type 3)
- [Set](/knowledge/mathematics/set/): 형식 언어는 문자열 집합의 부분집합
- [Recursive Definition](/knowledge/mathematics/recursive-definition/): 문법의 생성 규칙은 재귀적 구조를 가짐
