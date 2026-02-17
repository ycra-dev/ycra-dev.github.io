---
title: "Combinatorial Proof"
description: "조합적 증명(Combinatorial Proof)이란 대수적 조작 대신 계수 논증(counting argument)을 사용하여 항등식을 증명하는 방법이다"
tags: ['Combinatorial Proof', 'Double Counting', 'Bijective Proof', 'Identity', 'Counting Argument']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/combinatorial-proof
sidebar:
  order: 9
---

## 핵심 개념

조합적 증명은 대수적 증명보다 거의 항상 짧고 더 많은 통찰을 제공한다. 이항계수와 관련된 많은 항등식이 조합적 증명으로 증명될 수 있다.

**이중 계수 증명(Double Counting Proof):**
항등식의 양변이 같은 대상의 집합을 서로 다른 방법으로 세는 것임을 보인다. 두 방법으로 세어도 같은 집합의 크기이므로 양변은 같다.

**전사 증명(Bijective Proof):**
항등식의 양변이 세는 두 집합 사이에 전단사 함수(bijection)가 존재함을 보인다. 전단사 함수가 있으면 두 집합의 크기가 같으므로 양변은 같다.

조합적 증명의 일반적인 전략:
1. 항등식의 한쪽이 세는 대상을 파악한다
2. 다른 쪽도 같은 대상을 다르게 세거나, 같은 크기의 집합을 셈을 보인다
3. 계수 논증을 구성하여 등식을 확립한다

이 증명 기법은 파스칼 항등식, 반데르몽드 항등식, 이항계수의 합 항등식 등에 광범위하게 적용된다.

## 예시

**C(n, r) = C(n, n-r)의 전사 증명:**
n개의 원소를 가진 집합 S에서:
```
크기 r인 부분집합 A를 여집합 A_bar에 대응시키는 함수는
크기 r인 부분집합과 크기 (n-r)인 부분집합 사이의 전단사 함수이다.
따라서 C(n, r) = C(n, n-r)
```

**sum_{k=0}^{n} C(n, k) = 2^n의 이중 계수 증명:**
```
좌변: 크기 0인 부분집합 + 크기 1인 부분집합 + ... + 크기 n인 부분집합
    = 모든 부분집합의 수
우변: 각 원소를 포함/비포함으로 결정하는 2^n가지 방법
    = 모든 부분집합의 수
양변이 같은 대상(n개 원소 집합의 모든 부분집합)을 세므로 같다.
```

**파스칼 항등식의 조합적 증명:**
```
C(n+1, k)를 증명하기 위해:
- 집합 T (n+1개 원소)에서 크기 k인 부분집합의 수
- 특정 원소 a를 기준으로:
  a를 포함하는 경우: C(n, k-1) (나머지에서 k-1개 선택)
  a를 포함하지 않는 경우: C(n, k) (나머지에서 k개 선택)
∴ C(n+1, k) = C(n, k-1) + C(n, k)
```

**반데르몽드 항등식의 조합적 증명:**
```
C(m+n, r)는 m개와 n개의 원소를 합친 집합에서 r개 선택하는 수
= 첫 집합에서 (r-k)개, 둘째 집합에서 k개 선택하는 모든 경우의 합
= sum_{k=0}^{r} C(m, r-k) * C(n, k)
```

## 관련 개념

- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 증명 기법의 하나
- [Binomial Coefficient](/knowledge/mathematics/binomial-coefficient/) - 조합적 증명이 가장 많이 적용되는 대상
- [Pascal's Identity](/knowledge/mathematics/pascals-identity/) - 조합적 증명의 대표적인 예시
- [Bijection](/knowledge/mathematics/bijection/) - 전사 증명의 핵심 도구
- [Set](/knowledge/mathematics/set/) - 부분집합 세기에 기반한 증명
