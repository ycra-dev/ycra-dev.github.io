---
title: "Finite Automaton for String Matching"
description: "문자열 매칭 유한 오토마타는 주어진 패턴 P에 특화된 결정적 유한 오토마톤(DFA)을 구축하여 텍스트의 각 문자를 정확히 한 번 검사하며 Θ(n) 시간에 모든 패턴 출현을 찾는 방법이다"
tags: ['Finite Automaton', 'String Matching', 'State Machine', 'Transition Function', 'Preprocessing']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/finite-automaton
sidebar:
  order: 3
---

## 핵심 개념

**유한 오토마톤 M = (Q, q_0, A, Σ, δ)**:
- Q = {0, 1, ..., m}: 상태 집합 (m+1개)
- q_0 = 0: 시작 상태
- A = {m}: 수락 상태 (패턴 완전 매칭)
- Σ: 입력 알파벳
- δ: 전이 함수

**전이 함수 정의**:
```
δ(q, a) = σ(P[:q] · a)
```
σ는 접미사 함수: P의 접두사이면서 x의 접미사인 최장 문자열의 길이

**매칭 과정** (Θ(n)):
```
FINITE-AUTOMATON-MATCHER(T, δ, n, m)
1  q = 0
2  for i = 1 to n
3      q = δ(q, T[i])
4      if q == m
5          print "shift" i - m
```

**핵심 불변량**: q = σ(T[:i])
- 상태 q는 현재까지 읽은 텍스트의 접미사와 일치하는 패턴 접두사의 최대 길이

**두 가지 경우의 전이**:
1. a = P[q+1]: "spine" 전이 → δ(q, a) = q + 1 (매칭 계속)
2. a ≠ P[q+1]: 불일치 → 패턴 자기 자신과의 매칭 정보를 사용하여 최장 유효 접두사로 이동

**시간 복잡도**:
- 전처리: O(m|Σ|) — 모든 (상태, 문자) 쌍에 대해 전이 계산
- 매칭: Θ(n) — 각 문자당 O(1)
- KMP는 전처리를 Θ(m)으로 줄임

## 예시

```
패턴 P = "ababaca", Σ = {a, b, c}

전이 함수 δ (일부):
상태  a  b  c
  0   1  0  0
  1   1  2  0
  2   3  0  0
  3   1  4  0
  4   5  0  0
  5   1  4  6
  6   7  0  0
  7   1  2  0

텍스트 T = "abababacaba" 처리:
i=1: δ(0,a)=1
i=2: δ(1,b)=2
i=3: δ(2,a)=3
i=4: δ(3,b)=4
i=5: δ(4,a)=5
i=6: δ(5,b)=4  (불일치 시 상태 4로 되돌아감)
i=7: δ(4,a)=5
i=8: δ(5,c)=6
i=9: δ(6,a)=7  ← 수락! 시프트 2에서 패턴 발견
```

## 관련 개념

- [String Matching](/knowledge/algorithms/string-matching/) - 오토마타 기반 매칭
- [Knuth-Morris-Pratt](/knowledge/algorithms/knuth-morris-pratt/) - 오토마타의 공간 최적화 버전
- [Rabin-Karp](/knowledge/algorithms/rabin-karp/) - 해시 기반 대안적 접근
