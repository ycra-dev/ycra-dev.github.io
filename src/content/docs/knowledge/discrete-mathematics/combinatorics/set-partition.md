---
title: "집합 분할 (Set Partition)"
description: "집합 {1,...,n}을 서로소인 비어있지 않은 부분집합들의 합집합으로 나누는 방법 — 동치 관계와 1:1 대응하며 RGS(제한 증가 문자열)로 컴퓨터 내부 표현"
tags: ["Combinatorics", "Partitions", "Equivalence", "Bell Number", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/combinatorics/set-partition
sidebar:
  order: 23
---

## 핵심 개념

집합 분할(Set Partition)은 집합 {1,2,...,n}을 공통 원소 없는(disjoint) 비어있지 않은 부분집합(블록)들의 합집합으로 나누는 방법이다. 이는 동치 관계(equivalence relation)와 1:1 대응한다.

n원소 집합의 분할 수 = 벨 수(Bell Number) Bₙ.

## 동작 원리

**제한 증가 문자열(Restricted Growth String, RGS):**
집합 분할의 컴퓨터 내부 표현. 문자열 a₁a₂...aₙ으로:
- a₁ = 0
- aⱼ ≤ 1 + max(a₁,...,aⱼ₋₁)

이 조건이 정확히 {1,...,n}의 집합 분할과 1:1 대응.

**표준 표기:**
각 블록의 최솟값 기준으로 블록을 정렬. 예: {1,3}|{2,4}가 표준.

**Algorithm H (사전순 생성):**
보조 배열 b₁b₂...bₙ 유지 (bⱼ₊₁ = 1 + max(a₁,...,aⱼ)):
- aₙ 증가 → 불가능하면 이전 위치로 역추적

**Ehrlich 그레이 코드:**
각 단계에서 RGS의 정확히 한 자릿수만 변경 → 원소 하나가 한 블록에서 다른 블록으로 이동.

**응용:**
- 컴파일러의 기호 테이블, 유니온-파인드
- 압운 체계(rhyme scheme) 표현
- 정치경제학: "연합(coalition)" 모델

## 예시

```python
def set_partitions(n):
    """{1,...,n}의 모든 집합 분할을 RGS로 생성 (Algorithm H)"""
    a = [0] * (n + 1)  # a[1..n]
    b = [1] * (n + 1)  # b[j] = max(a[1..j-1]) + 1

    while True:
        yield a[1:n+1]

        # 마지막 자릿수 증가 시도
        if a[n] < b[n]:
            a[n] += 1
            continue

        # 역추적: 가장 오른쪽 증가 가능한 위치 찾기
        j = n - 1
        while j > 1 and a[j] >= b[j]:
            j -= 1
        if j == 1:
            break

        a[j] += 1
        new_max = max(b[j], a[j])
        for k in range(j + 1, n + 1):
            a[k] = 0
            b[k] = new_max + 1

def rgs_to_blocks(rgs):
    """RGS를 블록 표현으로 변환"""
    blocks = {}
    for i, label in enumerate(rgs, 1):
        blocks.setdefault(label, []).append(i)
    return list(blocks.values())

# 예시: n=3의 B₃=5가지 분할
# [0,0,0] → {1,2,3}
# [0,0,1] → {1,2}|{3}
# [0,1,0] → {1,3}|{2}
# [0,1,1] → {1}|{2,3}
# [0,1,2] → {1}|{2}|{3}

for rgs in set_partitions(3):
    print(rgs, "→", rgs_to_blocks(rgs))
```

## 관련 개념

- [벨 수 (Bell Number)](/knowledge/discrete-mathematics/combinatorics/bell-number/)
- [제한 성장 문자열 (Restricted Growth String)](/knowledge/discrete-mathematics/combinatorics/restricted-growth-string/)
- [그레이 코드 (Gray Code)](/knowledge/discrete-mathematics/combinatorics/gray-code/)
- [순열 생성 (Permutation Generation)](/knowledge/discrete-mathematics/combinatorics/permutation-generation/)
