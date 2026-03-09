---
title: "Young Tableau"
description: "영 타블로(Young Tableau)는 행과 열이 모두 증가하는 정수 배열로, Robinson-Schensted-Knuth 대응을 통해 순열 이론과 깊이 연결된다"
tags: ["Young Tableau", "Tableaux", "Combinatorics", "Permutations", "TAOCP", "RSK"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/sorting-selection/young-tableau
sidebar:
  order: 25
---

## 핵심 개념

**영 타블로(Young Tableau)**는 형태(shape) (n1, n2, ..., nm) (n1 ≥ n2 ≥ ... ≥ nm > 0)를 가지는 정수 배열로, i번째 행에 ni개의 원소가 왼쪽 정렬되어 있으며, 각 행은 왼쪽에서 오른쪽으로, 각 열은 위에서 아래로 순서가 증가한다. Alfred Young이 행렬 표현 연구를 위해 도입했다.

## 동작 원리

**Robinson-Schensted-Knuth(RSK) 대응 (Theorem A)**: n개 원소의 모든 순열과, n개 원소로 구성된 같은 형태의 타블로 쌍 (P, Q)의 집합 사이에 일대일 대응이 존재한다.

**Algorithm I (타블로 삽입)**: 원소 x를 타블로 P에 삽입:
1. x를 1행에서 x보다 큰 최소 원소와 교체 (bumping)
2. 교체된 원소를 2행으로, 이를 반복
3. 마지막 행에서 끝에 추가

**훅 공식 (Theorem H, Frame-Robinson-Thrall)**: 형태 (n1,...,nm)의 타블로 수 = n! / (모든 셀의 훅 길이의 곱)
- 훅(hook): 셀 자신 + 그 아래 셀들 + 그 오른쪽 셀들

**Corollary B**: n개 원소 타블로의 수 = n개 원소의 대합(involution)의 수

**최대 단조 부분수열 (Schensted)**: P의 열 수 = 최장 증가 부분수열 길이, P의 행 수 = 최장 감소 부분수열 길이

## 예시

```
형태 (4,2,1)의 Young 타블로 예:
  1  3  5  7
  2  6
  4

훅 길이 계산 (형태 3,2, 셀 번호 1~5를 행 순서로):
  셀(1,1)=1: 훅={1,2,3,4} → 길이 4
  셀(1,2)=2: 훅={2,3,5} → 길이 3
  셀(1,3)=3: 훅={3} → 길이 1
  셀(2,1)=4: 훅={4,5} → 길이 2
  셀(2,2)=5: 훅={5} → 길이 1
  타블로 수 = 5!/(4·3·1·2·1) = 120/24 = 5
```

## 관련 개념

- [Involutions](/knowledge/algorithms/sorting-selection/involutions/)
- [Permutation Cycles](/knowledge/algorithms/sorting-selection/permutation-cycles/)
- [Inversions](/knowledge/algorithms/sorting-selection/inversions/)
