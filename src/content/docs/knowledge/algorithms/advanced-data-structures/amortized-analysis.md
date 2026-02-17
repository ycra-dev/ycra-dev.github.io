---
title: "Amortized Analysis"
description: "분할 상환 분석(Amortized Analysis)은 일련의 데이터 구조 연산에 대해 전체 연산 비용의 평균을 구하여, 개별 연산의 최악 비용이 높더라도 평균 비용이 작음을 보이는 분석 기법이다"
tags: ['Amortized Analysis', 'Algorithm Analysis', 'Worst Case', 'Average Cost']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/amortized-analysis
sidebar:
  order: 7
---

## 핵심 개념

분할 상환 분석은 평균 분석(average-case analysis)과 근본적으로 다르다:
- **평균 분석**: 입력의 확률 분포를 가정하고 기대 비용을 구한다.
- **분할 상환 분석**: 확률을 사용하지 않으며, 모든 가능한 연산 시퀀스에 대해 최악의 총 비용 상한을 제공한다.

**핵심 아이디어**: 비싼 연산은 드물게 발생하고, 대부분의 연산은 저렴하다. 비싼 연산의 비용을 저렴한 연산들에 분산시켜 균등화한다.

세 가지 주요 기법:
1. **집합 분석(Aggregate Analysis)**: n개 연산의 총 비용 T(n)의 상한을 구하고, 분할 상환 비용을 T(n)/n으로 정의한다. 모든 연산의 분할 상환 비용이 동일하다.
2. **회계 방법(Accounting Method)**: 각 연산에 서로 다른 분할 상환 비용을 부여한다. 초과 지불분을 크레딧으로 특정 객체에 저장하여 나중에 비싼 연산의 비용을 충당한다.
3. **포텐셜 방법(Potential Method)**: 전체 데이터 구조에 포텐셜 에너지를 부여한다. 분할 상환 비용 = 실제 비용 + 포텐셜 변화량.

**적용 조건**: 총 분할 상환 비용이 총 실제 비용의 상한이 되어야 한다. 회계 방법에서는 총 크레딧이 음이 되면 안 되고, 포텐셜 방법에서는 Phi(D_n) >= Phi(D_0)이어야 한다.

## 예시

**스택의 MULTIPOP**: PUSH, POP, MULTIPOP 세 연산의 n번 시퀀스.
- 개별 최악 비용: MULTIPOP은 O(n)
- 나이브 분석: O(n^2)
- 분할 상환 분석: 각 객체가 최대 한 번 push되고 한 번 pop되므로, 총 비용 O(n), 연산당 O(1)

**이진 카운터 INCREMENT**: k비트 카운터를 0부터 증가시킬 때.
- 개별 최악 비용: O(k)
- 나이브 분석: O(nk)
- 집합 분석: bit A[i]는 floor(n/2^i)번 뒤집힘 -> 총 < 2n -> 연산당 O(1)

## 관련 개념

- [Aggregate Analysis](/knowledge/algorithms/aggregate-analysis/)
- [Accounting Method](/knowledge/algorithms/accounting-method/)
- [Potential Method](/knowledge/algorithms/potential-method/)
- [Dynamic Table](/knowledge/algorithms/dynamic-table/)
- [Worst-Case Analysis](/knowledge/algorithms/worst-case-analysis/)
