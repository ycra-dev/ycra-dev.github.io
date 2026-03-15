---
title: "KMP 알고리즘 (Knuth-Morris-Pratt Algorithm)"
description: "크누스-모리스-프랫 알고리즘(KMP)은 실패 함수(failure function)를 전처리하여 불일치 발생 시 불필요한 비교를 건너뛰어 Θ(n) 매칭 시간과 Θ(m) 전처리 시간을 달성하는 문자열 매칭 알고리즘이다"
tags: ['Knuth Morris Pratt', 'Kmp', 'String Matching', 'Failure Function', 'Prefix Function']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/knuth-morris-pratt
sidebar:
  order: 4
---

## 핵심 개념

**핵심 아이디어**: 유한 오토마타 기반 매칭의 공간 최적화 버전. 불일치 시 패턴의 접두사 정보를 활용하여 이미 일치한 부분을 재활용한다.

**접두사 함수(Prefix function) π**:
```
π[q] = max{k : k < q 이고 P[:k] ⊐ P[:q]}
```
- P[:q]의 proper prefix이면서 동시에 suffix인 가장 긴 문자열의 길이
- 불일치 시 다음으로 시도할 패턴 위치를 지시

**KMP 매칭**:
```
KMP-MATCHER(T, P, n, m)
1  π = COMPUTE-PREFIX-FUNCTION(P, m)
2  q = 0                    // 일치 문자 수
3  for i = 1 to n
4      while q > 0 and P[q+1] ≠ T[i]
5          q = π[q]         // 실패 시 접두사 함수 따라 이동
6      if P[q+1] == T[i]
7          q = q + 1        // 다음 문자 일치
8      if q == m
9          print "shift" i - m
10         q = π[q]         // 다음 매치 찾기
```

**접두사 함수 계산**:
```
COMPUTE-PREFIX-FUNCTION(P, m)
1  let π[1:m] be new array
2  π[1] = 0
3  k = 0
4  for q = 2 to m
5      while k > 0 and P[k+1] ≠ P[q]
6          k = π[k]
7      if P[k+1] == P[q]
8          k = k + 1
9      π[q] = k
10 return π
```

**시간 복잡도**:
- 전처리: Θ(m) — 상각 분석으로 while 루프가 총 O(m)번 실행
- 매칭: Θ(n) — 유사한 상각 분석
- 총: Θ(n + m)

유한 오토마타 방법(O(m|Σ|) 전처리)보다 전처리가 빠르고 Σ에 독립적이다.

## 예시

```
패턴 P = "ababaca"의 접두사 함수:
q:   1  2  3  4  5  6  7
P:   a  b  a  b  a  c  a
π:   0  0  1  2  3  0  1

해석:
- π[5] = 3: P[:5] = "ababa"에서 "aba"가 접두사이자 접미사
- 위치 6에서 불일치 시 → q = π[5] = 3으로 이동
  (이미 "aba"가 일치한 것으로 간주)

매칭 예시: T = "abababacaba"
i=1: a 일치, q=1
i=2: b 일치, q=2
i=3: a 일치, q=3
i=4: b 일치, q=4
i=5: a 일치, q=5
i=6: T[6]=b ≠ P[6]=c, 불일치 → π[5]=3이므로 q=3으로 이동
i=6: T[6]=b 일치(P[4]=b), q=4
i=7: a 일치, q=5
i=8: c 일치, q=6
i=9: a 일치, q=7=m → 시프트 2에서 패턴 발견!
```

## 관련 개념

- [문자열 매칭 (String Matching)](/knowledge/algorithms/string-matching/) - KMP가 풀어야 하는 문제
- [Finite Automaton](/knowledge/algorithms/finite-automaton/) - KMP의 이론적 기반
- [Rabin-Karp](/knowledge/algorithms/rabin-karp/) - 해시 기반 대안적 접근
- [접미사 배열 (Suffix Array)](/knowledge/algorithms/suffix-array/) - 더 다양한 질의를 지원하는 자료구조
