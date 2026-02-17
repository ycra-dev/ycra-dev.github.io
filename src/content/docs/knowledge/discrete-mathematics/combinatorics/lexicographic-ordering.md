---
title: "Lexicographic Ordering"
description: "사전식 순서(Lexicographic Ordering)란 순열이나 조합을 사전에서 단어를 나열하듯이 정렬하는 방법이다"
tags: ['Lexicographic Order', 'Permutation Generation', 'Combination Generation', 'Algorithm', 'Enumeration']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/lexicographic-ordering
sidebar:
  order: 12
---

## 핵심 개념

사전식 순서는 순열과 조합을 체계적으로 **생성(generation)**하는 알고리즘의 기초이다. 단순히 세는 것(counting)이 아니라 실제로 모든 배열을 나열해야 할 때 사용한다. 예를 들어 외판원 문제(TSP)에서 모든 경로를 탐색하거나, 부분합 문제에서 모든 부분집합을 검사할 때 필요하다.

**다음 순열 생성 알고리즘 (Algorithm 1):**
현재 순열 a1a2...an에서 다음 순열을 구하는 방법:
1. 오른쪽에서부터 aj < aj+1인 마지막 위치 j를 찾는다 (aj+1 > aj+2 > ... > an)
2. aj보다 큰 값 중 가장 작은 값 ak (j 오른쪽에서)를 찾는다
3. aj와 ak를 교환한다
4. j+1번째부터 n번째까지를 오름차순으로 정렬한다 (역순으로 뒤집기)

**부분집합 생성 (비트 문자열 방식):**
n개의 원소를 가진 집합의 모든 부분집합은 길이 n의 비트 문자열과 일대일 대응한다. 0부터 2^n - 1까지의 이진수를 증가 순서로 나열하면 모든 부분집합을 생성할 수 있다.

**다음 r-조합 생성 알고리즘 (Algorithm 3):**
현재 r-조합 {a1, a2, ..., ar} (오름차순)에서 다음 조합을 구하는 방법:
1. ai != n - r + i인 마지막 위치 i를 찾는다
2. ai를 ai + 1로 대체한다
3. i+1부터 r까지: aj = ai + (j - i)로 설정한다

## 예시

**다음 순열 찾기:**
362541에서 다음 순열:
```
1단계: 오른쪽에서 aj < aj+1인 위치 찾기
  a5=4 > a6=1, a4=5 > a5=4, a3=2 < a4=5 → j = 3

2단계: a3=2보다 큰 값 중 가장 작은 값
  오른쪽에서: 1(x), 4(✓) → ak = a5 = 4

3단계: a3과 a5 교환 → 364521

4단계: j+1=4부터 끝까지 오름차순 정렬
  521 → 125

결과: 364125
```

**{1,2,3}의 모든 순열 (사전식 순서):**
```
123 → 132 → 213 → 231 → 312 → 321
```

**비트 문자열로 부분집합 생성 ({a, b, c}):**
```
000 → {}
001 → {c}
010 → {b}
011 → {b, c}
100 → {a}
101 → {a, c}
110 → {a, b}
111 → {a, b, c}
```

**다음 4-조합 찾기:**
{1, 2, 5, 6}에서 {1, 2, 3, 4, 5, 6}의 다음 4-조합:
```
ai != 6-4+i인 마지막 i 찾기:
  a4=6 = 6-4+4=6 (같음)
  a3=5 = 6-4+3=5 (같음)
  a2=2 != 6-4+2=4 → i=2

a2 = 2+1 = 3
a3 = 3+1 = 4
a4 = 3+2 = 5

결과: {1, 3, 4, 5}
```

## 관련 개념

- [Permutation](/knowledge/mathematics/permutation/) - 순열을 체계적으로 생성
- [Combination](/knowledge/mathematics/combination/) - 조합을 체계적으로 생성
- [Algorithm](/knowledge/mathematics/algorithm/) - 사전식 순서 생성은 알고리즘 설계의 기초
- [Big-O Notation](/knowledge/mathematics/big-o-notation/) - 생성 알고리즘의 시간 복잡도 분석
- [Sequence](/knowledge/mathematics/sequence/) - 사전식 순서는 수열의 자연스러운 정렬
