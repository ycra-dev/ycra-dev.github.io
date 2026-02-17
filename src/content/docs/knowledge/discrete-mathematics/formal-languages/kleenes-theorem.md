---
title: "Kleene's Theorem"
description: "클리네의 정리(Kleene's theorem, 1956)는 집합이 정규 집합(regular set)인 것과 유한 상태 오토마타에 의해 인식되는 것이 동치임을 증명하는 오토마타 이론의 핵심 정리이다"
tags: ['Kleenes Theorem', 'Regular Set', 'Finite State Automaton', 'Automata Theory', 'Equivalence']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/kleenes-theorem
sidebar:
  order: 9
---

## 핵심 개념

### 정리의 내용

**집합이 정규 집합이다 <=> 그 집합을 인식하는 유한 상태 오토마타가 존재한다.**

이 정리에 의해 다음 세 가지가 모두 동치가 된다:
1. 정규 표현식으로 표현 가능한 집합
2. 유한 상태 오토마타(DFA 또는 NFA)에 의해 인식되는 집합
3. 정규 문법(type 3)에 의해 생성되는 언어

### 증명의 핵심 아이디어 (정규 집합 -> FSA)

정규 집합이 FSA에 의해 인식됨을 보이기 위해, 정규 표현식의 재귀적 정의에 따라 각 구성 요소에 대한 NFA를 구성한다:

1. **기본 경우**:
   - 공집합: 최종 상태가 없는 오토마타
   - {lambda}: 시작 상태가 곧 최종 상태이고 전이가 없는 오토마타
   - {a}: s0 --a--> s1 (s1이 최종 상태)

2. **결합(AB)**: MA와 MB를 직렬 연결. MA의 최종 상태 도달 시 MB의 시작 상태로 전이

3. **합집합(A ∪ B)**: MA와 MB를 병렬 연결. 새 시작 상태에서 MA와 MB의 시작 상태 전이를 모두 복사

4. **클리네 폐포(A*)**: MA의 최종 상태에서 시작 상태로 돌아가는 전이 추가. 새 시작 상태를 최종 상태로 설정 (lambda 인식)

### 정규 문법과의 관계 (정리 2)

정규 문법이 생성하는 집합은 정규 집합과 정확히 일치한다:
- **문법 -> 오토마타**: 각 비터미널 A에 대해 상태 sA 생성, 생성 규칙 A -> aB는 sA --a--> sB 전이로, A -> a는 sA --a--> sF(최종 상태) 전이로 변환
- **오토마타 -> 문법**: 각 상태에 비터미널 기호 할당, 상태 전이 s --a--> t는 As -> aAt 생성 규칙으로, 최종 상태로의 전이 s --a--> f는 As -> a로 변환

### 정규 집합이 아닌 것의 증명

{0^n 1^n | n >= 0}이 정규 집합이 아님을 비둘기집 원리로 증명:
- N개 상태를 가진 FSA에 0^N 1^N을 입력하면, 처음 N+1개 상태 중 같은 상태가 반복됨
- 이 루프를 한 번 더 돌면 0의 개수만 증가하여 0^(N+t) 1^N도 인식해야 하는데, 이는 모순

## 예시

정규 표현식 `1* ∪ 01`로부터 NFA 구성:

```
1단계: 1을 인식하는 NFA
  s1 --1--> s2 (s2가 최종)

2단계: 1*을 인식하는 NFA (클리네 폐포 구성)
  s3(시작, 최종) --1--> s4(최종)
  s4 --1--> s4 (루프)

3단계: 01을 인식하는 NFA (결합 구성)
  s6 --0--> s7, s8 --1--> s9(최종)
  합치면: s8 --0--> s9 --1--> s10(최종)

4단계: 1* ∪ 01 (합집합 구성)
  새 시작 상태에서 1* NFA와 01 NFA 모두로 전이
```

정규 문법에서 NFA 구성 예:
```
문법: S -> 1A, S -> 0, S -> lambda, A -> 0A, A -> 1A, A -> 1
NFA:  s0 --1--> s1, s0 --0--> s2(최종), s1 --0,1--> s1, s1 --1--> s2
      s0도 최종 상태 (S -> lambda 때문)
```

## 관련 개념

- [Regular Expression](/knowledge/mathematics/regular-expression/): 클리네 정리의 한쪽 (정규 표현식/정규 집합)
- [Finite-State Automaton](/knowledge/mathematics/finite-state-automaton/): 클리네 정리의 다른 쪽 (FSA 인식)
- [Nondeterministic Finite-State Automaton](/knowledge/mathematics/nondeterministic-finite-state-automaton/): 증명에서 NFA 구성이 핵심
- [Regular Grammar and Regular Language](/knowledge/mathematics/regular-grammar-and-regular-language/): 정규 문법과 정규 집합의 동치 (정리 2)
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/): 비정규 집합 증명에 비둘기집 원리 사용
