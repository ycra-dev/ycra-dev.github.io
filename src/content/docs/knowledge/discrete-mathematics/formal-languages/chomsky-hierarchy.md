---
title: "Chomsky Hierarchy"
description: "촘스키 위계(Chomsky hierarchy)는 구문법(phrase-structure grammar)을 생성 규칙의 제한 수준에 따라 type 0부터 type 3까지 네 가지 유형으로 분류하는 체계로, 각 유형은 인식 가능한 언어의 범위와 이를 인식하는 계산 모델..."
tags: ['Chomsky Hierarchy', 'Grammar Types', 'Type 0', 'Type 1', 'Type 2', 'Type 3', 'Context Sensitive', 'Computation Theory']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/chomsky-hierarchy
sidebar:
  order: 2
---

## 핵심 개념

미국 언어학자 노엄 촘스키(Noam Chomsky)가 1950년대에 도입한 이 분류 체계는 다음과 같다:

| 유형 | 이름 | 생성 규칙 제한 | 인식 기계 |
|------|------|---------------|----------|
| Type 0 | 무제한 문법 | 제한 없음 | 튜링 기계 |
| Type 1 | 문맥 의존 문법 | w1 = lAr, w2 = lwr (w != lambda) | 선형 한정 오토마타 |
| Type 2 | 문맥 자유 문법 | w1은 단일 비터미널 | 푸시다운 오토마타 |
| Type 3 | 정규 문법 | A -> aB 또는 A -> a | 유한 상태 오토마타 |

**포함 관계**: Type 3 언어 ⊂ Type 2 언어 ⊂ Type 1 언어 ⊂ Type 0 언어

각 유형의 핵심 특징:

- **Type 0 (무제한)**: 생성 규칙에 아무 제한이 없으며, 튜링 기계가 인식하는 언어와 동치이다.
- **Type 1 (문맥 의존)**: 비터미널 A를 대체할 때 주변 문맥(l과 r)이 보존되어야 한다. 비축소(noncontracting) 성질을 가진다.
- **Type 2 (문맥 자유)**: 비터미널을 문맥에 관계없이 대체할 수 있으므로 "문맥 자유"라 한다. 프로그래밍 언어 구문 정의에 핵심적으로 사용된다.
- **Type 3 (정규)**: 가장 제한적이며, 유한 상태 기계로 인식할 수 있다.

## 예시

각 유형에 해당하는 언어 예시:

```
Type 3 (정규 언어): {0^m 1^n | m, n >= 0}
  문법: S -> 0S, S -> 1A, S -> 1, A -> 1A, A -> 1, S -> lambda

Type 2 (문맥 자유, 정규는 아님): {0^n 1^n | n >= 0}
  문법: S -> 0S1, S -> lambda
  (0과 1의 개수를 맞춰야 하므로 유한 상태 기계로는 불가)

Type 1 (문맥 의존, 문맥 자유는 아님): {0^n 1^n 2^n | n >= 0}
  문법: S -> C, C -> 0CAB, S -> lambda, BA -> AB,
        0A -> 01, 1A -> 11, 1B -> 12, 2B -> 22

Type 0 (무제한): 튜링 기계로만 인식 가능한 언어
```

## 관련 개념

- [Formal Language and Grammar](/knowledge/mathematics/formal-language-and-grammar/): 촘스키 위계의 기반이 되는 형식 문법
- [Context-Free Grammar](/knowledge/mathematics/context-free-grammar/): Type 2 문법의 상세 설명
- [Regular Grammar and Regular Language](/knowledge/mathematics/regular-grammar-and-regular-language/): Type 3 문법과 정규 언어
- [Turing Machine](/knowledge/mathematics/turing-machine/): Type 0 문법과 동치인 계산 모델
- [Finite-State Automaton](/knowledge/mathematics/finite-state-automaton/): Type 3 언어를 인식하는 기계
