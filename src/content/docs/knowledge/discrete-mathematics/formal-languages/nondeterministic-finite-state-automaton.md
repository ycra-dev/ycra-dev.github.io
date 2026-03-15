---
title: "비결정적 유한 상태 오토마타 (Nondeterministic Finite-State Automaton)"
description: "비결정적 유한 상태 오토마타(NFA)는 M = (S, I, f, s0, F)로 정의되며, 전이 함수 f: S x I -> P(S)가 각 (상태, 입력) 쌍에 대해 가능한 다음 상태들의 집합을 반환하는 유한 상태 오토마타로, 하나의 입력에 대해 여러 가능한 경로가 ..."
tags: ['Nfa', 'Nondeterministic', 'Automaton', 'Subset Construction', 'Dfa Equivalence', 'Language Recognition']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/nondeterministic-finite-state-automaton
sidebar:
  order: 7
---

## 핵심 개념

### DFA와의 차이점

- **DFA**: f: S x I -> S (각 쌍에 대해 정확히 하나의 다음 상태)
- **NFA**: f: S x I -> P(S) (각 쌍에 대해 가능한 다음 상태들의 **집합**, P(S)는 S의 멱집합)

NFA에서는 같은 상태에서 같은 입력을 받아도 여러 상태로 전이할 수 있다. 이는 기계가 동시에 여러 경로를 "추측(guess)"하며 탐색하는 것과 같다.

### 문자열 인식 방식

NFA가 문자열 x = x1x2...xk를 인식하는 과정:
1. 첫 입력 x1은 s0에서 상태 집합 S1 = f(s0, x1)으로 전이
2. 다음 입력 x2는 S1의 각 상태에서 가능한 다음 상태들의 합집합 S2로 전이
3. 이를 반복하여 최종 상태 집합 Sk에 F의 원소가 하나라도 있으면 문자열을 인식

핵심: **어떤 경로든 하나라도** 최종 상태에 도달하면 인식한다.

### NFA에서 DFA로의 변환 (부분 집합 구성법)

**정리 1**: NFA가 인식하는 모든 언어는 DFA로도 인식 가능하다.

변환 방법 (subset construction):
1. DFA의 각 상태 = NFA 상태들의 부분집합
2. DFA의 시작 상태 = {s0}
3. DFA에서 상태 {si1, si2, ..., sik}에 입력 x를 주면 -> f(si1, x) ∪ f(si2, x) ∪ ... ∪ f(sik, x)
4. DFA의 최종 상태 = NFA의 최종 상태를 포함하는 모든 부분집합

최악의 경우 DFA는 2^n개의 상태를 가질 수 있다 (NFA가 n개 상태일 때).

### NFA의 유용성

NFA는 DFA와 동치이지만, 많은 경우 NFA로 설계하는 것이 훨씬 간단하다. 특히 클리네 정리의 증명에서 정규 표현식으로부터 오토마타를 구성할 때 NFA를 먼저 만들고, 필요시 DFA로 변환하는 전략이 효과적이다.

## 예시

NFA 예시 (상태 다이어그램):
```
     0         1
s0 -----> s0  s0 -----> s1
     0,1       1
s0 -----> s2  s2 -----> 없음
     1         0
s1 -----> s4  s4 -----> s3
                        (s0과 s4가 최종 상태)
```

인식 언어: L = {0^n, 0^n 01, 0^n 11 | n >= 0}

DFA로의 변환 예:
```
DFA 상태:        NFA 상태 부분집합
{s0}      --0--> {s0, s2}       (s0에서 0: s0과 s2로 전이)
{s0, s2}  --1--> {s1, s4}       (s0->s1, s2->s4)
{s1, s4}  --0--> {s3}           (s1->s3, s4->s3)
{s3}      --0--> 공집합         (s3에서 0: 없음)
...
최종 상태: {s0}, {s0, s2}, {s1, s4}, {s4}, {s3, s4} 등
          (s0 또는 s4를 포함하는 모든 부분집합)
```

## 관련 개념

- [Finite-State Automaton](/knowledge/mathematics/finite-state-automaton/): NFA의 결정적 버전 (DFA)
- [Kleene's Theorem](/knowledge/mathematics/kleenes-theorem/): 정규 집합에서 NFA 구성에 NFA가 핵심적으로 사용됨
- [Regular Expression](/knowledge/mathematics/regular-expression/): 정규 표현식에서 NFA로의 변환
- [Set](/knowledge/mathematics/set/): 부분집합 구성법에서 멱집합 P(S) 사용
- [Turing Machine](/knowledge/mathematics/turing-machine/): 비결정성 개념이 튜링 기계에도 확장됨
