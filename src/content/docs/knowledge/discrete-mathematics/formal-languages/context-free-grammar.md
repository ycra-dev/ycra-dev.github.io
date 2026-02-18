---
title: "Context-Free Grammar"
description: "문맥 자유 문법(context-free grammar, CFG)은 모든 생성 규칙이 w1 -> w2 형태이며 w1이 단일 비터미널 기호인 type 2 문법으로, 비터미널 기호를 주변 문맥에 관계없이 대체할 수 있어 프로그래밍 언어의 구문 정의에 핵심적으로 사용된다"
tags: ['Context Free Grammar', 'Type 2 Grammar', 'Derivation Tree', 'Parse Tree', 'Backus Naur Form', 'Bnf', 'Compiler']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/context-free-grammar
sidebar:
  order: 4
---

## 핵심 개념

### 문맥 자유의 의미

"문맥 자유"란 비터미널 A가 문자열 내 어디에 나타나든 동일한 규칙으로 대체할 수 있음을 뜻한다. 즉, A -> w 규칙이 있으면 A가 나타나는 모든 곳에서 w로 대체 가능하다. 이는 type 1(문맥 의존) 문법과 대비되는데, 문맥 의존 문법에서는 lAr -> lwr처럼 A 주변의 문맥(l, r)이 특정 조건을 만족해야 대체가 가능하다.

### 유도 트리 (Derivation Tree / Parse Tree)

문맥 자유 문법의 유도 과정은 **유도 트리**(순서 있는 루트 트리)로 시각화할 수 있다:
- 루트: 시작 기호
- 내부 정점: 비터미널 기호
- 잎: 터미널 기호
- 자식 노드: 생성 규칙의 오른쪽에 있는 기호들(왼쪽에서 오른쪽 순서)

### 배커스-나우어 형식 (Backus-Naur Form, BNF)

BNF는 type 2 문법을 표기하는 또 다른 방법이다:
- `->` 대신 `::=` 사용
- 비터미널을 `< >` 안에 표기
- 같은 좌변을 가진 규칙들을 `|`로 구분하여 하나로 결합
- 프로그래밍 언어(Java, ALGOL 등)의 구문 정의에 광범위하게 사용

### 파싱 (Parsing)

문자열이 문맥 자유 문법에 의해 생성되는지 판별하는 방법:
- **하향식 파싱(top-down parsing)**: 시작 기호부터 출발하여 주어진 문자열을 유도
- **상향식 파싱(bottom-up parsing)**: 주어진 문자열에서 역방향으로 생성 규칙을 되돌려 시작 기호에 도달

## 예시

ALGOL 60의 식별자를 BNF로 정의:

```
<identifier> ::= <letter> | <identifier><letter> | <identifier><digit>
<letter>     ::= a | b | ... | z
<digit>      ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

식별자 `x99a`의 유도 과정:
```
<identifier>
=> <identifier><letter>      (규칙 1의 세 번째 선택)
=> <identifier>a             (<letter> -> a)
=> <identifier><digit><digit>a
=> <identifier>99a
=> <letter>99a
=> x99a
```

부호 있는 정수의 BNF 정의:
```
<signed integer> ::= <sign><integer>
<sign>           ::= + | -
<integer>        ::= <digit> | <digit><integer>
<digit>          ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

## 관련 개념

- [Formal Language and Grammar](/knowledge/mathematics/formal-language-and-grammar/): 문맥 자유 문법이 속하는 형식 문법 체계
- [Chomsky Hierarchy](/knowledge/mathematics/chomsky-hierarchy/): CFG의 위치 (Type 2)
- [Regular Grammar and Regular Language](/knowledge/mathematics/regular-grammar-and-regular-language/): CFG보다 제한적인 Type 3 문법
- [Tree](/knowledge/mathematics/tree/): 유도 트리는 순서 있는 루트 트리의 한 예
- [Algorithm](/knowledge/algorithms/algorithm/): 파싱 알고리즘 (하향식, 상향식)
