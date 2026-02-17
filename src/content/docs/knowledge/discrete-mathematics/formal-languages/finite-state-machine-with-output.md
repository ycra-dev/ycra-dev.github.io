---
title: "Finite-State Machine with Output"
description: "출력이 있는 유한 상태 기계(finite-state machine with output)는 M = (S, I, O, f, g, s0)로 정의되며, 유한한 상태 집합 S, 입력 알파벳 I, 출력 알파벳 O, 전이 함수 f, 출력 함수 g, 초기 상태 s0로 구성되어..."
tags: ['Finite State Machine', 'Mealy Machine', 'Moore Machine', 'Transducer', 'State Diagram', 'State Table']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/finite-state-machine-with-output
sidebar:
  order: 5
---

## 핵심 개념

### 구성 요소

- **상태 집합 S**: 기계가 취할 수 있는 유한한 상태들
- **입력 알파벳 I**: 기계에 입력할 수 있는 기호들의 유한 집합
- **출력 알파벳 O**: 기계가 생성할 수 있는 출력 기호들의 유한 집합
- **전이 함수 f: S x I -> S**: (현재 상태, 입력) 쌍에 대해 다음 상태를 결정
- **출력 함수 g: S x I -> O**: (현재 상태, 입력) 쌍에 대해 출력을 결정
- **초기 상태 s0**: 기계의 시작 상태

### 표현 방법

1. **상태표(state table)**: 각 (상태, 입력) 쌍에 대한 다음 상태와 출력을 표로 나타냄
2. **상태 다이어그램(state diagram)**: 방향 그래프로 표현하며, 간선에 "입력, 출력" 라벨을 붙임

### Mealy Machine vs Moore Machine

- **밀리 기계(Mealy machine)**: 출력이 전이(transition)에 의해 결정됨. 즉, g: S x I -> O. G. H. Mealy가 1955년에 제안.
- **무어 기계(Moore machine)**: 출력이 상태에 의해서만 결정됨. 즉, g: S -> O. E. F. Moore가 1956년에 제안.

### 유한한 메모리의 한계

유한 상태 기계의 상태는 제한된 메모리 역할을 한다. 이전에 읽은 입력의 속성을 기억하는 데 상태를 사용할 수 있지만, 상태가 유한하므로 무한한 정보를 기억할 수는 없다.

## 예시

**자판기 모델**: 30센트가 투입되면 음료를 제공하는 자판기
- 상태: s0(0센트) ~ s6(30센트)
- 입력: 5센트, 10센트, 25센트, 오렌지 버튼(O), 빨간 버튼(R)
- 출력: 없음(n), 거스름돈, 오렌지 주스, 사과 주스

**단위 지연 기계(unit-delay machine)**: 입력을 한 비트 지연시키는 기계
```
입력 문자열:  x1  x2  x3  ... xk
출력 문자열:  0   x1  x2  ... x(k-1)
```
상태 다이어그램:
- s0: 초기 상태 (출력 0)
- s1: 이전 입력이 1 (출력 1)
- s2: 이전 입력이 0 (출력 0)

**111 탐지기**: 마지막 3비트가 모두 1이면 출력 1, 아니면 0
```
상태: s0 (연속 1이 0개), s1 (연속 1이 1개), s2 (연속 1이 2개 이상)
전이: s2에서 입력 1 -> s2, 출력 1 (유일하게 출력이 1인 경우)
      입력 0 -> 모든 상태에서 s0, 출력 0
```

## 관련 개념

- [Finite-State Automaton](/knowledge/mathematics/finite-state-automaton/): 출력 대신 최종 상태를 가지는 유한 상태 기계
- [Graph](/knowledge/mathematics/graph/): 상태 다이어그램은 방향 그래프의 일종
- [Function](/knowledge/mathematics/function/): 전이 함수와 출력 함수는 함수의 구체적 적용
- [Regular Grammar and Regular Language](/knowledge/mathematics/regular-grammar-and-regular-language/): 유한 상태 기계가 인식하는 언어
