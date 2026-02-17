---
title: "Mathematical Induction"
description: "수학적 귀납법(Mathematical Induction)은 모든 양의 정수 n에 대해 명제 P(n)이 참임을 증명하는 증명 기법으로, 기초 단계(Basis Step)에서 P(1)이 참임을 보이고, 귀납 단계(Inductive Step)에서 임의의 양의 정수 k에 ..."
tags: ['Mathematical Induction', 'Proof Technique', 'Basis Step', 'Inductive Step', 'Inductive Hypothesis']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/mathematical-induction
sidebar:
  order: 1
---

## 핵심 개념

수학적 귀납법은 추론 규칙(rule of inference)으로 표현하면 다음과 같다:

**(P(1) ∧ ∀k(P(k) → P(k+1))) → ∀nP(n)**

증명은 두 부분으로 구성된다:

1. **기초 단계 (Basis Step)**: P(1)이 참임을 직접 검증한다. 경우에 따라 P(0)이나 다른 정수 b에서 시작할 수도 있다.
2. **귀납 단계 (Inductive Step)**: 임의의 정수 k >= b에 대해 P(k)가 참이라고 가정(귀납 가설, Inductive Hypothesis)하고, 이 가정 하에 P(k+1)이 참임을 보인다.

수학적 귀납법의 타당성은 정수의 정렬 원리(Well-Ordering Property)로부터 증명된다. 핵심은 P(k)가 모든 정수에 대해 참이라고 가정하는 것이 아니라, 임의의 하나의 정수 k에 대해 P(k)가 참이면 P(k+1)도 참이 된다는 조건문을 증명하는 것이다. 따라서 순환 논증(circular reasoning)이 아니다.

수학적 귀납법의 장점은 추측(conjecture)이 참인지 증명할 수 있다는 것이고, 단점은 새로운 정리를 발견하는 도구가 아니라는 것이다. 즉, 먼저 공식을 알아야 증명할 수 있다.

## 예시

**예시 1: 합 공식 증명**

1 + 2 + ... + n = n(n+1)/2 임을 증명한다.

- **기초 단계**: n=1일 때, 1 = 1(1+1)/2 = 1. 참.
- **귀납 가설**: 1 + 2 + ... + k = k(k+1)/2 가정.
- **귀납 단계**:
  ```
  1 + 2 + ... + k + (k+1) = k(k+1)/2 + (k+1)
                           = (k(k+1) + 2(k+1)) / 2
                           = (k+1)(k+2) / 2
  ```
  이것은 P(k+1)과 일치하므로 증명 완료.

**예시 2: 부등식 증명**

n < 2^n 이 모든 양의 정수 n에 대해 참임을 증명한다.

- **기초 단계**: 1 < 2^1 = 2. 참.
- **귀납 가설**: k < 2^k 가정.
- **귀납 단계**: k+1 < 2^k + 1 <= 2^k + 2^k = 2^(k+1). 증명 완료.

**예시 3: 나눗셈 결과 증명**

n^3 - n 이 3으로 나누어 떨어짐을 증명한다.

- **기초 단계**: 1^3 - 1 = 0은 3으로 나누어 떨어진다.
- **귀납 가설**: k^3 - k가 3으로 나누어 떨어진다고 가정.
- **귀납 단계**:
  ```
  (k+1)^3 - (k+1) = (k^3 + 3k^2 + 3k + 1) - (k+1)
                   = (k^3 - k) + 3(k^2 + k)
  ```
  첫째 항은 귀납 가설에 의해 3의 배수이고, 둘째 항은 3의 배수이므로 증명 완료.

## 관련 개념

- [Mathematical Proof](/knowledge/mathematics/mathematical-proof/) - 수학적 귀납법은 증명 기법의 한 종류이다
- [Strong Induction](/knowledge/mathematics/strong-induction/) - 수학적 귀납법의 확장된 형태
- [Well-Ordering Property](/knowledge/mathematics/well-ordering-property/) - 수학적 귀납법의 타당성 근거
- [Predicate Logic](/knowledge/mathematics/predicate-logic/) - P(n)은 술어 논리의 명제 함수이다
- [Quantifier](/knowledge/mathematics/quantifier/) - 전칭 양화사 ∀nP(n)을 증명하는 방법이다
- [Proposition](/knowledge/mathematics/proposition/) - 기초 단계에서 검증하는 개별 명제
