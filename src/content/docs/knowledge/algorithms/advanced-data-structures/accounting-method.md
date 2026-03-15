---
title: "회계 방법 (Accounting Method)"
description: "회계 방법(Accounting Method)은 각 연산에 서로 다른 분할 상환 비용을 부여하고, 실제 비용보다 많이 지불한 초과분을 데이터 구조 내 특정 객체에 \"크레딧(credit)\"으로 저장하여 나중에 비싼 연산의 비용을 충당하는 분할 상환 분석 기법이다"
tags: ['Accounting Method', 'Amortized Analysis', 'Credit', 'Prepaid Cost']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/accounting-method
sidebar:
  order: 9
---

## 핵심 개념

**동작 원리**:
- 각 연산에 분할 상환 비용 c_hat_i를 부여한다.
- c_hat_i > c_i (실제 비용)이면, 차액을 크레딧으로 저장한다.
- c_hat_i < c_i이면, 저장된 크레딧으로 부족분을 충당한다.

**핵심 제약 조건**: 모든 n에 대해 총 분할 상환 비용 >= 총 실제 비용이어야 한다:
- sum{c_hat_i} >= sum{c_i} (for all n)
- 즉, 총 크레딧은 항상 비음수(nonnegative)이어야 한다.

**집합 분석과의 차이**: 집합 분석은 모든 연산에 같은 분할 상환 비용을 부여하지만, 회계 방법은 연산 종류에 따라 다른 비용을 부여할 수 있다. 이는 더 직관적인 분석을 가능하게 한다.

**장점**: 크레딧을 특정 객체에 연결함으로써 비용의 흐름을 직관적으로 이해할 수 있다.

## 예시

**스택 연산**:
```
// 분할 상환 비용 부여:
//   PUSH:     $2 (실제 $1 + $1 크레딧을 객체에 저장)
//   POP:      $0 (객체에 저장된 $1로 실제 비용 충당)
//   MULTIPOP: $0 (각 pop된 객체의 $1 크레딧으로 충당)

// PUSH할 때 $1을 해당 플레이트에 올려놓음
// POP/MULTIPOP할 때 플레이트의 $1을 사용
// 스택에 있는 플레이트 수 >= 0이므로 크레딧은 항상 비음수
// n번 연산의 총 분할 상환 비용 = O(n)
```

**이진 카운터 INCREMENT**:
```
// 분할 상환 비용 부여:
//   비트를 0->1로 설정: $2 (실제 $1 + $1 크레딧을 해당 비트에 저장)
//   비트를 1->0으로 리셋: $0 (비트에 저장된 $1로 충당)

// INCREMENT는 최대 1개의 비트를 0->1로 설정
// -> 분할 상환 비용 = $2
// 1-비트는 항상 $1 크레딧을 보유 -> 크레딧 비음수 보장
// n번 INCREMENT의 총 비용 <= $2n = O(n)
```

**동적 테이블 TABLE-INSERT**:
```
// 분할 상환 비용: $3
// $1: 현재 삽입의 실제 비용
// $1: 삽입된 항목에 저장 (나중에 확장 시 자신의 재삽입 비용)
// $1: 이미 테이블에 있는 항목 하나에 저장 (재삽입 비용)
// 테이블이 가득 찰 때까지 모든 항목에 $1씩 축적됨
// 확장 시 모든 항목의 크레딧으로 재삽입 비용 충당
```

## 관련 개념

- [분할 상환 분석 (Amortized Analysis)](/knowledge/algorithms/amortized-analysis/)
- [집합 분석 (Aggregate Analysis)](/knowledge/algorithms/aggregate-analysis/)
- [퍼텐셜 방법 (Potential Method)](/knowledge/algorithms/potential-method/)
- [동적 테이블 (Dynamic Table)](/knowledge/algorithms/dynamic-table/)
