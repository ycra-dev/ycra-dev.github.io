---
title: "한정자 (Quantifier)"
description: "양화사(Quantifier)는 술어가 정의역(domain of discourse)의 원소에 대해 참인 범위를 표현하여 술어를 명제로 변환하는 논리적 장치이다"
tags: ['Quantifier', 'Universal Quantifier', 'Existential Quantifier', 'Domain Of Discourse', 'Predicate Logic']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/quantifier
sidebar:
  order: 7
---

## 핵심 개념

**전칭 양화사(Universal Quantifier, ∀):**
- ∀xP(x)는 "정의역의 모든 x에 대해 P(x)가 참이다"를 의미한다.
- 하나의 **반례(counterexample)**만으로 ∀xP(x)가 거짓임을 증명할 수 있다.
- 정의역이 유한하여 원소가 x₁, x₂, ..., xₙ일 때, ∀xP(x)는 논리곱 P(x₁) ∧ P(x₂) ∧ ... ∧ P(xₙ)과 동치이다.

**존재 양화사(Existential Quantifier, ∃):**
- ∃xP(x)는 "P(x)가 참인 원소 x가 정의역에 적어도 하나 존재한다"를 의미한다.
- 정의역이 유한할 때, ∃xP(x)는 논리합 P(x₁) ∨ P(x₂) ∨ ... ∨ P(xₙ)과 동치이다.

**유일 양화사(Uniqueness Quantifier, ∃!):**
- ∃!xP(x)는 "P(x)가 참인 x가 정확히 하나 존재한다"를 의미한다.

**양화사의 부정 (드모르간 법칙의 양화사 버전):**
- ¬∀xP(x) ≡ ∃x¬P(x): "모든 x에 대해 P(x)"의 부정은 "P(x)가 거짓인 x가 존재"
- ¬∃xP(x) ≡ ∀x¬P(x): "P(x)인 x가 존재"의 부정은 "모든 x에 대해 P(x)가 거짓"

**중요한 규칙들:**
- 양화사는 모든 명제 논리 연산자보다 높은 우선순위를 가진다.
- 정의역(domain)은 반드시 명시되어야 하며, 정의역이 달라지면 양화된 문장의 진리값도 달라진다.
- **속박 변수(bound variable)**: 양화사의 범위 안에 있는 변수
- **자유 변수(free variable)**: 양화사의 범위 밖에 있는 변수 (명제가 되려면 모든 변수가 속박되거나 값이 할당되어야 함)

**양화사와 루프의 관계:**
- ∀xP(x): 정의역의 모든 x를 순회하며 P(x)가 항상 참인지 확인 (전체 탐색)
- ∃xP(x): 정의역의 x를 순회하며 P(x)가 참인 x를 찾을 때까지 탐색

## 예시

전칭 양화사:
```
P(x) = "x + 1 > x", 정의역: 모든 실수
∀xP(x) → 참 (모든 실수에 대해 x+1 > x)

Q(x) = "x < 2", 정의역: 모든 실수
∀xQ(x) → 거짓 (반례: x = 3이면 3 < 2는 거짓)
```

존재 양화사:
```
P(x) = "x > 3", 정의역: 모든 실수
∃xP(x) → 참 (예: x = 4일 때 4 > 3은 참)

Q(x) = "x = x + 1", 정의역: 모든 실수
∃xQ(x) → 거짓 (어떤 실수도 x = x + 1을 만족하지 않음)
```

양화사의 부정:
```
"모든 학생이 미적분을 수강했다" → ∀xP(x)
부정: "미적분을 수강하지 않은 학생이 존재한다" → ∃x¬P(x)
```

제한된 정의역에서의 양화:
```
∀x<0 (x² > 0): "모든 음의 실수 x에 대해 x² > 0"
이는 ∀x(x < 0 → x² > 0)과 동치

∃z>0 (z² = 2): "z² = 2인 양의 실수 z가 존재한다"
이는 ∃z(z > 0 ∧ z² = 2)와 동치
```

## 관련 개념

- [Predicate](/knowledge/mathematics/predicate/) - 양화사가 적용되는 대상
- [Nested Quantifier](/knowledge/mathematics/nested-quantifier/) - 여러 양화사가 중첩된 경우
- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 드모르간 법칙의 양화사 버전
- [Rules of Inference](/knowledge/mathematics/rules-of-inference/) - 양화 문장에 대한 추론 규칙
