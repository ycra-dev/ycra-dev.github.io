---
title: "Strong Induction"
description: "강한 귀납법(Strong Induction)은 수학적 귀납법의 변형으로, 귀납 단계에서 P(k)만 가정하는 대신 P(1), P(2), "
tags: ['Strong Induction', 'Complete Induction', 'Proof Technique', 'Well Ordering', 'Mathematical Induction']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/strong-induction
sidebar:
  order: 3
---

## 핵심 개념

강한 귀납법의 형식적 정의는 다음과 같다:

**기초 단계**: P(1)이 참임을 검증한다.
**귀납 단계**: [P(1) ∧ P(2) ∧ ... ∧ P(k)] → P(k+1) 이 모든 양의 정수 k에 대해 참임을 보인다.

일반 수학적 귀납법과의 핵심적 차이는 귀납 가설의 강도에 있다:
- **수학적 귀납법**: P(k)만 가정하여 P(k+1)을 증명
- **강한 귀납법**: P(1) ∧ P(2) ∧ ... ∧ P(k) 전부를 가정하여 P(k+1)을 증명

강한 귀납법이 더 유연한 증명 기법인 이유는 k보다 작은 모든 경우의 결과를 사용할 수 있기 때문이다. 수학적 귀납법, 강한 귀납법, 정렬 원리는 모두 동치(equivalent)이며, 하나의 타당성으로부터 나머지 둘의 타당성을 증명할 수 있다.

강한 귀납법은 기초 단계에서 여러 개의 초기 경우를 증명해야 할 수 있다. 예를 들어, 귀납 단계에서 P(k-3)을 사용해야 한다면 P(b), P(b+1), P(b+2), P(b+3)까지 기초 단계에서 검증해야 한다.

실질적 사용 지침: P(k) → P(k+1)을 직접 보이기 어려울 때, 즉 P(k+1)을 증명하기 위해 P(k) 이전의 결과들(P(j), j < k)도 필요할 때 강한 귀납법을 사용한다.

## 예시

**예시 1: 소인수분해 존재성 (산술의 기본정리)**

1보다 큰 모든 정수 n은 소수들의 곱으로 표현될 수 있음을 증명한다.

- **기초 단계**: P(2)는 참이다. 2는 소수이므로 소수 하나의 곱이다.
- **귀납 가설**: 2 <= j <= k인 모든 정수 j에 대해 P(j)가 참이라고 가정.
- **귀납 단계**: k+1이 소수이면 자명하게 참. k+1이 합성수이면 k+1 = a * b (2 <= a <= b < k+1)로 쓸 수 있다. 귀납 가설에 의해 a와 b 모두 소수들의 곱으로 표현되므로, k+1도 소수들의 곱으로 표현된다.

이 증명에서 P(k)만으로는 부족하고 P(a)와 P(b) (a, b < k+1)가 필요하므로 강한 귀납법이 필수적이다.

**예시 2: 우표 문제**

12센트 이상의 모든 우표 금액은 4센트와 5센트 우표로 구성할 수 있음을 증명한다.

- **기초 단계**: P(12)=4+4+4, P(13)=4+4+5, P(14)=4+5+5, P(15)=5+5+5. 모두 참.
- **귀납 가설**: 12 <= j <= k (k >= 15)인 모든 j에 대해 P(j) 가정.
- **귀납 단계**: P(k-3)이 참이므로(k-3 >= 12), k-3센트 금액에 4센트 우표 하나를 추가하면 k+1센트를 만들 수 있다.

**예시 3: 다각형 삼각분할**

n개의 변을 가진 단순 다각형은 n-2개의 삼각형으로 분할 가능하다.

- **기초 단계**: T(3)은 참. 삼각형 자체가 1 = 3-2개의 삼각형이다.
- **귀납 단계**: 내부 대각선 ab로 다각형 P를 Q(s변)와 R(t변)로 분할. 3 <= s, t <= k이므로 귀납 가설에 의해 Q는 s-2개, R은 t-2개 삼각형으로 분할. 전체 삼각형 수: (s-2)+(t-2) = s+t-4 = (k+1)-2.

## 관련 개념

- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 강한 귀납법의 기본형
- [Well-Ordering Property](/knowledge/mathematics/well-ordering-property/) - 강한 귀납법의 타당성 근거
- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 강한 귀납법은 증명 기법의 하나
- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 재귀적으로 정의된 대상에 대한 증명에 자주 사용
