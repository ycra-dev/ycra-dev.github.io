---
title: "동적 테이블 (Dynamic Table)"
description: "동적 테이블(Dynamic Table)은 삽입과 삭제에 따라 크기가 동적으로 확장(expansion)되거나 축소(contraction)되는 테이블 자료 구조이다"
tags: ['Dynamic Table', 'Amortized Analysis', 'Table Expansion', 'Table Contraction', 'Load Factor']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/dynamic-table
sidebar:
  order: 11
---

## 핵심 개념

**부하 인자(Load Factor)**: alpha(T) = T.num / T.size (저장된 항목 수 / 총 슬롯 수). 빈 테이블의 부하 인자는 1로 정의한다.

**테이블 확장 전략**: 가득 찬 테이블에 삽입 시 크기를 2배로 늘린다.
- 확장 후 부하 인자 = 1/2
- 부하 인자는 항상 >= 1/2 유지
- 분할 상환 비용: O(1) (세 가지 분석 방법 모두 동일 결과)

**확장+축소 전략 설계의 함정**: 크기를 2배로 늘리고, 반이 비면 반으로 줄이면(alpha < 1/2에서 축소) 문제 발생. 삽입/삭제가 번갈아 일어나면 매번 확장/축소가 발생하여 연산당 Theta(n) 시간이 걸린다.

**올바른 전략**: 확장은 alpha = 1에서 2배로, 축소는 alpha < 1/4에서 1/2로. 이렇게 하면:
- 부하 인자: 항상 1/4 <= alpha <= 1
- 확장/축소 사이에 충분한 연산이 축적되어 비용 분산 가능

**포텐셜 함수**:
- alpha >= 1/2일 때: Phi(T) = 2 * T.num - T.size
- alpha < 1/2일 때: Phi(T) = T.size/2 - T.num
- alpha = 1/2일 때 Phi = 0
- 확장/축소 직후 Phi = 0 (비용 완전 충당)

**분할 상환 비용 결과**: 삽입과 삭제 모두 O(1). 따라서 n개 연산의 총 비용은 O(n).

## 예시

```
TABLE-INSERT(T, x)
  if T.size == 0
    allocate T.table with 1 slot
    T.size = 1
  if T.num == T.size                   // 테이블이 가득 참
    allocate new-table with 2*T.size slots
    insert all items in T.table into new-table
    free T.table
    T.table = new-table
    T.size = 2 * T.size
  insert x into T.table
  T.num = T.num + 1

// 확장이 없는 경우: 실제 비용 = 1, Delta_Phi = 2, c_hat = 3
// 확장이 있는 경우 (i번째 연산): 실제 비용 = i, Delta_Phi = 3-i, c_hat = 3

// 집합 분석으로 확인:
// n번 삽입의 총 비용 <= n + sum{2^j : j=0..floor(lg(n-1))} < n + 2n = 3n
// 분할 상환 비용 = 3n/n = 3 = O(1)
```

## 관련 개념

- [분할 상환 분석 (Amortized Analysis)](/knowledge/algorithms/amortized-analysis/)
- [집합 분석 (Aggregate Analysis)](/knowledge/algorithms/aggregate-analysis/)
- [회계 방법 (Accounting Method)](/knowledge/algorithms/accounting-method/)
- [퍼텐셜 방법 (Potential Method)](/knowledge/algorithms/potential-method/)
- [해시 테이블 (Hash Table)](/knowledge/algorithms/hash-table/)
