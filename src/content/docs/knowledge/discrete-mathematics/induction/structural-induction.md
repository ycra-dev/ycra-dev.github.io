---
title: "구조적 귀납법 (Structural Induction)"
description: "구조적 귀납법(Structural Induction)은 재귀적으로 정의된 집합의 모든 원소가 특정 성질을 만족함을 증명하는 기법으로, 기초 단계에서 초기 원소들에 대해 성질이 성립함을 보이고, 재귀 단계에서 성질이 성립하는 원소들로부터 새로 생성된 원소에 대해서도..."
tags: ['Structural Induction', 'Proof Technique', 'Recursive Definition', 'Recursively Defined Sets', 'Binary Tree']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/structural-induction
sidebar:
  order: 7
---

## 핵심 개념

구조적 귀납법의 증명 구조는 재귀적 정의의 구조를 그대로 따른다:

**기초 단계 (Basis Step)**: 재귀적 정의의 기초 단계에서 지정된 모든 원소에 대해 성질이 성립함을 보인다.

**재귀 단계 (Recursive Step)**: 재귀적 정의의 재귀 단계에서 사용되는 원소들에 대해 성질이 참이면, 새로 생성된 원소에 대해서도 성질이 참임을 보인다.

구조적 귀납법의 타당성은 수학적 귀납법으로부터 유도된다. P(n)을 "재귀 단계를 n번 이하 적용하여 생성된 모든 원소에 대해 성질이 성립한다"로 정의하면:
- P(0): 기초 단계의 원소들에 대해 성립 (구조적 귀납법의 기초 단계)
- P(k) → P(k+1): 구조적 귀납법의 재귀 단계의 결과

따라서 수학적 귀납법에 의해 P(n)이 모든 n >= 0에 대해 참이 되고, 이는 재귀적 정의로 생성된 모든 원소에 대해 성질이 성립함을 의미한다.

구조적 귀납법은 대상의 종류에 따라 기초 단계와 재귀 단계의 구체적 형태가 달라진다:
- **문자열**: 빈 문자열에 대해 기초, 문자 추가에 대해 재귀
- **정형식**: 원자 공식에 대해 기초, 연결사 적용에 대해 재귀
- **트리**: 단일 꼭짓점(또는 빈 트리)에 대해 기초, 트리 결합에 대해 재귀

## 예시

**예시 1: 정형식의 괄호 수 동일성**

명제 논리의 모든 정형식에서 왼쪽 괄호와 오른쪽 괄호의 개수가 같음을 증명한다.

- **기초 단계**: T, F, 명제 변수 s에는 괄호가 없으므로 왼쪽=오른쪽=0. 성립.
- **재귀 단계**: p, q의 왼쪽 괄호 수가 각각 lp, lq이고 오른쪽 괄호 수가 rp, rq라 하자. lp = rp, lq = rq 가정.
  - (¬p): 왼쪽 = lp + 1, 오른쪽 = rp + 1. 같다.
  - (p ∧ q) 등: 왼쪽 = lp + lq + 1, 오른쪽 = rp + rq + 1. 같다.

**예시 2: 문자열 길이의 덧셈 성질**

l(xy) = l(x) + l(y) 임을 구조적 귀납법으로 증명한다 (l은 문자열 길이 함수).

- **기초 단계**: l(xλ) = l(x) = l(x) + 0 = l(x) + l(λ). 성립.
- **재귀 단계**: l(xy) = l(x) + l(y)라 가정 (y에 대한 귀납 가설).
  ```
  l(xya) = l(xy) + 1           (l의 재귀적 정의)
          = l(x) + l(y) + 1     (귀납 가설)
          = l(x) + l(ya)        (l(ya) = l(y) + 1이므로)
  ```

**예시 3: 풀 이진 트리의 꼭짓점 수 상한**

풀 이진 트리 T에 대해 n(T) <= 2^(h(T)+1) - 1 임을 증명한다.

- **기초 단계**: 단일 루트 트리에서 n(T)=1, h(T)=0. 1 <= 2^1 - 1 = 1. 성립.
- **재귀 단계**: T = T1 · T2에서
  ```
  n(T) = 1 + n(T1) + n(T2)
      <= 1 + (2^(h(T1)+1) - 1) + (2^(h(T2)+1) - 1)    (귀납 가설)
      <= 2 * max(2^(h(T1)+1), 2^(h(T2)+1)) - 1
       = 2 * 2^(max(h(T1),h(T2))+1) - 1
       = 2^(h(T)+1) - 1
  ```

## 관련 개념

- [Recursive Definition](/knowledge/mathematics/recursive-definition/) - 구조적 귀납법이 적용되는 대상의 정의 방식
- [Mathematical Induction](/knowledge/mathematics/mathematical-induction/) - 구조적 귀납법의 타당성 근거
- [Strong Induction](/knowledge/mathematics/strong-induction/) - 구조적 귀납법과 관련된 증명 기법
