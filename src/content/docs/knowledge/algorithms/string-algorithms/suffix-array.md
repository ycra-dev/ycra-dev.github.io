---
title: "Suffix Array"
description: "접미사 배열(Suffix Array)은 문자열의 모든 접미사를 사전순으로 정렬한 인덱스 배열로, 패턴 검색뿐만 아니라 최장 반복 부분 문자열, 두 문자열의 최장 공통 부분 문자열 등 다양한 문자열 문제를 해결할 수 있는 자료구조이다"
tags: ['Suffix Array', 'String Matching', 'Longest Common Prefix', 'Text Indexing', 'Sorting']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/suffix-array
sidebar:
  order: 5
---

## 핵심 개념

**접미사 배열 SA[1:n]**: 텍스트 T[1:n]의 접미사 T[i:n]을 사전순 정렬한 후, 각 접미사의 시작 인덱스 i를 저장한 배열.

**구축 시간**: O(n lg n) — 접미사들의 정렬에 기반

**LCP 배열(Longest Common Prefix Array)**:
- LCP[i]: SA에서 인접한 두 접미사 SA[i-1]과 SA[i]의 최장 공통 접두사 길이
- O(n) 시간에 계산 가능 (접미사 배열이 주어졌을 때)

**패턴 매칭**: 이진 탐색 사용
- 패턴 P[1:m]을 접미사 배열에서 이진 탐색
- 시간: O(m lg n + km), k는 출현 횟수

**추가 응용**:
1. **최장 반복 부분 문자열**: LCP 배열의 최대값
2. **최장 공통 부분 문자열**: 두 문자열을 구분자로 연결 후 접미사 배열 구축, 서로 다른 문자열에서 온 인접 접미사의 최대 LCP
3. **문자열 내 패턴 출현 횟수**: 이진 탐색 범위의 크기

**접미사 배열 vs 접미사 트리**:
- 접미사 트리: O(n) 구축, O(n) 공간, 다양한 연산 지원
- 접미사 배열: O(n lg n) 구축, 더 작은 상수 공간, 실무적으로 더 많이 사용

## 예시

```
T = "banana$"  ($ = 센티넬, 모든 문자보다 작음)

모든 접미사:
i=1: banana$
i=2: anana$
i=3: nana$
i=4: ana$
i=5: na$
i=6: a$
i=7: $

사전순 정렬:
SA[1]=7: $
SA[2]=6: a$
SA[3]=4: ana$
SA[4]=2: anana$
SA[5]=1: banana$
SA[6]=3: nana$
SA[7]=5: na$

LCP 배열:
LCP[2]=0: $와 a$ → 0
LCP[3]=1: a$와 ana$ → "a" (길이 1)
LCP[4]=3: ana$와 anana$ → "ana" (길이 3)
LCP[5]=0: anana$와 banana$ → 0
LCP[6]=0: banana$와 nana$ → 0
LCP[7]=2: nana$와 na$ → "na" (길이 2)

최장 반복 부분 문자열: max(LCP) = 3 → "ana"
```

패턴 "ana" 검색:
```
이진 탐색: SA에서 "ana"로 시작하는 접미사 범위 찾기
→ SA[3]=4, SA[4]=2 → 위치 4와 2에서 출현
```

## 관련 개념

- [String Matching](/knowledge/algorithms/string-matching/) - 접미사 배열의 핵심 응용
- [Knuth-Morris-Pratt](/knowledge/algorithms/knuth-morris-pratt/) - 단일 패턴 매칭의 대안
- [Rabin-Karp](/knowledge/algorithms/rabin-karp/) - 해시 기반 매칭의 대안
