---
title: "Potential Method"
description: "포텐셜 방법(Potential Method)은 데이터 구조 전체에 \"포텐셜 에너지\"를 부여하는 포텐셜 함수 Phi를 정의하고, 각 연산의 분할 상환 비용을 실제 비용과 포텐셜 변화량의 합으로 정의하는 분할 상환 분석 기법이다"
tags: ['Potential Method', 'Amortized Analysis', 'Potential Function', 'Energy']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/potential-method
sidebar:
  order: 10
---

## 핵심 개념

**정의**:
- D_0: 초기 데이터 구조, D_i: i번째 연산 후 데이터 구조
- Phi(D_i): D_i의 포텐셜 (실수값)
- c_i: i번째 연산의 실제 비용
- c_hat_i = c_i + Phi(D_i) - Phi(D_{i-1}): i번째 연산의 분할 상환 비용

**총 분할 상환 비용**:
- sum{c_hat_i} = sum{c_i} + Phi(D_n) - Phi(D_0)
- Phi(D_n) >= Phi(D_0)이면, 총 분할 상환 비용은 총 실제 비용의 상한이 된다.
- 실무적으로 Phi(D_0) = 0으로 설정하고, 모든 i에 대해 Phi(D_i) >= 0을 보장한다.

**직관**:
- 포텐셜 증가 (Phi(D_i) > Phi(D_{i-1})): 실제 비용보다 많이 지불 -> 에너지 축적
- 포텐셜 감소 (Phi(D_i) < Phi(D_{i-1})): 실제 비용보다 적게 지불 -> 축적된 에너지 사용

**회계 방법과의 관계**: 포텐셜 방법은 크레딧을 개별 객체가 아닌 데이터 구조 전체에 부여한다. 포텐셜 함수 선택에 따라 서로 다른 분할 상환 비용이 도출되지만, 모두 실제 비용의 유효한 상한이다.

**포텐셜 함수 설계의 핵심**: 비싼 연산이 발생할 때 포텐셜이 크게 감소하고, 저렴한 연산 시 포텐셜이 점진적으로 증가하도록 설계한다.

## 예시

**스택 연산**:
```
// Phi(D_i) = 스택에 있는 객체 수
// Phi(D_0) = 0, Phi(D_i) >= 0

// PUSH: c_hat = 1 + (s+1) - s = 2
// POP:  c_hat = 1 + (s-1) - s = 0
// MULTIPOP(k'개 pop): c_hat = k' + (s-k') - s = 0
// -> 모든 연산의 분할 상환 비용 O(1)
```

**이진 카운터 INCREMENT**:
```
// Phi(D_i) = i번째 연산 후 1-비트의 수 b_i
// t_i개 비트를 리셋, 최대 1개 비트를 설정
// c_i <= t_i + 1
// Delta_Phi <= 1 - t_i
// c_hat = c_i + Delta_Phi <= (t_i + 1) + (1 - t_i) = 2
```

**동적 테이블 (확장만)**:
```
// Phi(T) = 2 * (T.num - T.size/2)
// 확장 직후: T.num = T.size/2 -> Phi = 0
// 테이블이 가득 찰 때: T.num = T.size -> Phi = T.size

// 확장 없는 삽입: c_hat = 1 + 2 = 3
// 확장 있는 삽입 (i번째): c_hat = i + (3 - i) = 3
// -> 모든 삽입의 분할 상환 비용 = 3 = O(1)
```

## 관련 개념

- [Amortized Analysis](/knowledge/algorithms/amortized-analysis/)
- [Aggregate Analysis](/knowledge/algorithms/aggregate-analysis/)
- [Accounting Method](/knowledge/algorithms/accounting-method/)
- [Dynamic Table](/knowledge/algorithms/dynamic-table/)
- [Union Find](/knowledge/algorithms/union-find/)
