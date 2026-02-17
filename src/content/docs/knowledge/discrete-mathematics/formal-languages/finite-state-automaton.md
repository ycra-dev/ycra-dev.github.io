---
title: "Finite-State Automaton"
description: "유한 상태 오토마타(finite-state automaton, FSA)는 M = (S, I, f, s0, F)로 정의되며, 유한한 상태 집합 S, 입력 알파벳 I, 전이 함수 f: S x I -> S, 초기 상태 s0, 최종(수용) 상태 집합 F로 구성되어 출력을..."
tags: ['Finite State Automaton', 'Dfa', 'Deterministic', 'Language Recognition', 'Accepting State', 'Transition Function']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/finite-state-automaton
sidebar:
  order: 6
---

## 핵심 개념

### 결정적 유한 오토마타 (DFA)

결정적 유한 오토마타는 각 (상태, 입력) 쌍에 대해 정확히 하나의 다음 상태가 결정된다:
- **전이 함수**: f: S x I -> S (각 쌍에 대해 유일한 결과)
- **최종 상태(final/accepting state)**: F ⊆ S, 상태 다이어그램에서 이중 원으로 표시
- **문자열 인식**: 입력 문자열 x가 초기 상태 s0에서 시작하여 최종 상태에 도달하면 인식(수용)됨
- **인식 언어**: L(M) = {x in I* | f(s0, x) in F}

### 확장된 전이 함수

전이 함수 f를 문자열에 대해 재귀적으로 확장할 수 있다:
- f(s, lambda) = s (모든 상태 s에 대해)
- f(s, xa) = f(f(s, x), a) (s in S, x in I*, a in I)

### 동치 오토마타

두 유한 상태 오토마타가 같은 언어를 인식하면 **동치(equivalent)**라 한다. 동치인 오토마타 중 최소 상태 수를 가진 것을 구하는 **기계 최소화(machine minimization)** 절차가 존재하며, 이는 상태들의 동치 클래스를 이용한다.

### 설계 기법

DFA를 설계할 때 상태는 입력 문자열의 특정 속성을 "기억"하는 역할을 한다:
- 이미 읽은 문자열의 접미사 패턴
- 특정 기호의 출현 횟수 (유한한 범위 내)
- 특정 패턴의 발견 여부

## 예시

**연속된 00을 포함하는 비트 문자열을 인식하는 DFA**:

```
상태: s0 (초기, 마지막 입력이 0이 아님)
      s1 (마지막 입력이 0, 연속 00 미발견)
      s2 (연속 00 발견 - 최종 상태)

전이:
  s0 --0--> s1    s0 --1--> s0
  s1 --0--> s2    s1 --1--> s0
  s2 --0--> s2    s2 --1--> s2

F = {s2}
```

문자열 "10010"의 처리:
```
s0 -1-> s0 -0-> s1 -0-> s2 -1-> s2 -0-> s2
                         ^최종 상태 도달 -> 인식!
```

**홀수 개의 1과 두 개 이상의 연속 0으로 끝나는 비트 문자열 인식**:
```
6개 상태 필요:
- 1의 개수 짝/홀 x 끝부분 연속 0의 수(0개, 1개, 2개 이상) = 2 x 3 = 6
- 최종 상태: 홀수 개의 1 AND 연속 0이 2개 이상
```

## 관련 개념

- [Finite-State Machine with Output](/knowledge/mathematics/finite-state-machine-with-output/): 출력이 있는 유한 상태 기계 (Mealy/Moore)
- [Nondeterministic Finite-State Automaton](/knowledge/mathematics/nondeterministic-finite-state-automaton/): 비결정적 변형
- [Regular Expression](/knowledge/mathematics/regular-expression/): DFA가 인식하는 언어를 표현하는 대수적 방법
- [Kleene's Theorem](/knowledge/mathematics/kleenes-theorem/): 정규 집합과 FSA의 동치 관계
- [Graph](/knowledge/mathematics/graph/): 상태 다이어그램은 레이블된 방향 그래프
