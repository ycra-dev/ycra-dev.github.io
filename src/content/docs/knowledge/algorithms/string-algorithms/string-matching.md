---
title: "String Matching"
description: "문자열 매칭(String Matching)은 길이 n인 텍스트 T에서 길이 m인 패턴 P의 모든 출현 위치(유효 시프트)를 찾는 문제이다"
tags: ['String Matching', 'Pattern Matching', 'Text Search', 'Algorithms']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/string-matching
sidebar:
  order: 1
---

## 핵심 개념

**문제 정의**:
- 텍스트 T[1:n], 패턴 P[1:m], 알파벳 Σ
- 시프트 s가 유효: T[s+1:s+m] = P[1:m]
- 목표: 모든 유효 시프트 찾기

**알고리즘별 시간 복잡도 비교**:

| 알고리즘 | 전처리 | 매칭 |
|---------|--------|------|
| Naive | 0 | O((n-m+1)m) |
| Rabin-Karp | Θ(m) | O((n-m+1)m) 최악, O(n) 평균 |
| Finite Automaton | O(m|Σ|) | Θ(n) |
| KMP | Θ(m) | Θ(n) |
| Suffix Array | O(n lg n) | O(m lg n + km) |

**Naive 알고리즘의 비효율성**: 시프트 s에서 얻은 정보를 s+1에서 활용하지 않는다. 이전 비교에서 이미 알게 된 텍스트 정보를 재활용하는 것이 개선의 핵심이다.

**핵심 개념**:
- **접두사(prefix)**: w ⊏ x ↔ x = wy
- **접미사(suffix)**: w ⊐ x ↔ x = yw
- **접미사 함수 σ(x)**: P의 접미사이기도 한 x의 접미사 중 가장 긴 것의 길이
- **중첩 접미사 보조정리 (Lemma 32.1)**: 접미사 관계의 이행성과 비교

## 예시

Naive 문자열 매칭:
```
NAIVE-STRING-MATCHER(T, P, n, m)
1  for s = 0 to n - m
2      if P[1:m] == T[s+1:s+m]
3          print "Pattern occurs with shift" s

예시: T = "abcabaabcabac", P = "abaa"
s=0: abca ≠ abaa
s=1: bcab ≠ abaa
s=2: caba ≠ abaa
s=3: abaa = abaa  ← 유효 시프트!
...
```

## 관련 개념

- [Rabin-Karp](/knowledge/algorithms/rabin-karp/) - 해시 기반 문자열 매칭
- [Knuth-Morris-Pratt](/knowledge/algorithms/knuth-morris-pratt/) - 실패 함수 기반 선형 시간 매칭
- [Finite Automaton](/knowledge/algorithms/finite-automaton/) - 오토마타 기반 매칭
- [Suffix Array](/knowledge/algorithms/suffix-array/) - 접미사 배열 기반 다목적 매칭
