---
title: "Rabin-Karp Algorithm"
description: "라빈-카프 알고리즘(Rabin-Karp Algorithm)은 해싱을 이용한 문자열 매칭 알고리즘으로, 패턴의 해시값과 텍스트의 각 위치에서의 해시값을 비교하여 후보를 빠르게 걸러내는 방법이다"
tags: ['Rabin Karp', 'String Matching', 'Hashing', 'Rolling Hash', 'Fingerprint']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/rabin-karp
sidebar:
  order: 2
---

## 핵심 개념

**핵심 아이디어**: 문자열을 숫자로 해석하고 모듈러 연산으로 비교

**전처리** (Θ(m)):
```
p = P[1:m]을 d진법 숫자로 해석한 값 mod q
t_0 = T[1:m]을 d진법 숫자로 해석한 값 mod q
```

**롤링 해시(Rolling Hash)** — 상수 시간 갱신:
```
t_{s+1} = (d(t_s - T[s+1]·h) + T[s+m+1]) mod q
여기서 h = d^{m-1} mod q
```
최상위 자릿수를 제거하고, 한 자리 왼쪽으로 이동(×d)하고, 새 최하위 자릿수를 추가한다.

**매칭 과정**:
1. p = t_s (mod q)이면 "히트(hit)" → 실제 문자열 비교로 검증
2. p ≠ t_s (mod q)이면 확실히 불일치 → 다음 시프트로 이동

**허위 히트(Spurious Hit)**: t_s ≡ p (mod q)이지만 T[s+1:s+m] ≠ P[1:m]
- q를 충분히 크게 선택하면 허위 히트 빈도가 줄어듦
- 기대 허위 히트 수: O(n/q)

**시간 복잡도**:
- 전처리: Θ(m)
- 최악: Θ((n-m+1)m) — naive와 동일
- 기대(유효 시프트 O(1)개, q ≥ m): O(n+m) = O(n)

**장점**: 2차원 패턴 매칭 등으로 쉽게 일반화 가능

## 예시

```
RABIN-KARP-MATCHER(T, P, n, m, d, q)
1  h = d^{m-1} mod q
2  p = 0, t_0 = 0
3-6 호너 법칙으로 p와 t_0 계산 (mod q)
7  for s = 0 to n - m
8      if p == t_s           // 히트?
9          if P[1:m] == T[s+1:s+m]  // 실제 검증
10             print "shift" s
11     if s < n - m
12         t_{s+1} = (d(t_s - T[s+1]·h) + T[s+m+1]) mod q

예시: P = "31415", q = 13
p = 31415 mod 13 = 7

텍스트 내 윈도우별 해시값:
... 7(히트!) ... 7(허위 히트) ...
히트 시 실제 문자열 비교로 확인
```

## 관련 개념

- [String Matching](/knowledge/algorithms/string-matching/) - 문자열 매칭 문제의 한 해법
- [Knuth-Morris-Pratt](/knowledge/algorithms/knuth-morris-pratt/) - 더 나은 최악 시간의 대안
- [Modular Arithmetic](/knowledge/algorithms/modular-arithmetic/) - 롤링 해시의 수학적 기반
