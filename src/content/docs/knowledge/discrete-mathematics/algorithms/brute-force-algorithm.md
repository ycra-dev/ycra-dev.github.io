---
title: "Brute-Force Algorithm"
description: "무차별 대입 알고리즘(Brute-Force Algorithm)은 문제의 정의와 용어의 정의에 직접적으로 기반하여, 특별한 최적화 기법 없이 가장 직관적이고 단순한 방식으로 문제를 해결하는 알고리즘 패러다임이다"
tags: ['Brute Force', 'Algorithmic Paradigm', 'Exhaustive Search', 'Naive Algorithm']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/brute-force-algorithm
sidebar:
  order: 5
---

## 핵심 개념

Brute-force는 가장 기본적인 알고리즘 설계 패러다임으로, 문제의 특수한 구조나 영리한 아이디어를 활용하지 않는다. 종종 가능한 모든 해를 나열하고 검사하는 방식(exhaustive search)을 사용한다.

**Brute-force 알고리즘의 특성:**
- 구현이 단순하고 직관적이다.
- 정확성을 보장하기 쉽다.
- 입력이 작을 때는 실용적으로 사용 가능하다.
- 대규모 입력에서는 비효율적인 경우가 많다.
- 더 효율적인 알고리즘 설계의 기준선(baseline)으로 활용된다.

**Brute-force 알고리즘의 예시들:**
1. **수열의 최대값 찾기**: 모든 원소를 하나씩 검사 → Θ(n)
2. **버블 정렬, 삽입 정렬, 선택 정렬**: 단순한 비교 기반 정렬 → Θ(n²)
3. **행렬 곱셈**: 정의에 따른 직접 계산 → Θ(n³)
4. **최근접 점 쌍 찾기**: 모든 점 쌍의 거리를 계산 → Θ(n²)
5. **나이브 문자열 매칭**: 모든 가능한 위치를 검사 → O(mn)

Brute-force가 항상 나쁜 것은 아니다. 최대값 찾기 알고리즘처럼 brute-force 자체가 최적인 경우도 있다. 그러나 많은 경우 분할 정복, 동적 프로그래밍, 탐욕 알고리즘 등의 더 효율적인 접근법이 존재한다.

## 예시

**최근접 점 쌍 찾기 (Brute-Force):**

```
procedure closest-pair((x1,y1), (x2,y2), ..., (xn,yn))
  min := infinity
  for i := 2 to n
    for j := 1 to i - 1
      if (xj - xi)^2 + (yj - yi)^2 < min then
        min := (xj - xi)^2 + (yj - yi)^2
        closest_pair := ((xi, yi), (xj, yj))
  return closest_pair
```

- n(n-1)/2개의 점 쌍을 모두 검사 → Θ(n²)
- 분할 정복 알고리즘을 사용하면 O(n log n)으로 개선 가능

**나이브 문자열 매칭:**

```
procedure string_match(n, m, t1...tn, p1...pm)
  for s := 0 to n - m
    j := 1
    while (j <= m and t[s+j] = p[j])
      j := j + 1
    if j > m then print "s is a valid shift"
```

텍스트 T = "eceyeye"에서 패턴 P = "eye"를 찾을 때:
- s=0: e≠e(1번째 비교 실패가 아닌, e=e이지만 c≠y) → 불일치
- s=1: c≠e → 불일치
- s=2: e=e, y=y, e=e → 유효한 시프트! (s=2)
- s=3: y≠e → 불일치
- s=4: e=e, y=y, e=e → 유효한 시프트! (s=4)

최악의 경우 O(mn)번의 비교가 필요하다.

## 관련 개념

- [Algorithm](/knowledge/mathematics/algorithm/) - 알고리즘 패러다임의 기본
- [Greedy Algorithm](/knowledge/mathematics/greedy-algorithm/) - 더 효율적인 알고리즘 패러다임
- [Sorting Algorithm](/knowledge/mathematics/sorting-algorithm/) - 버블/삽입 정렬이 brute-force의 예시
- [Time Complexity](/knowledge/mathematics/time-complexity/) - brute-force 알고리즘의 복잡도 분석
- [Linear Search](/knowledge/mathematics/linear-search/) - brute-force 탐색의 예시
- [Tractability](/knowledge/mathematics/tractability/) - brute-force의 한계와 효율적 알고리즘의 필요성
