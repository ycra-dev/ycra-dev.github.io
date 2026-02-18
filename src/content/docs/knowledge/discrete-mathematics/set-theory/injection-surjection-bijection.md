---
title: "Injection Surjection Bijection"
description: "함수 f: A → B에 대해, **단사함수(injection)**는 서로 다른 입력에 서로 다른 출력을 대응시키는 함수이고, **전사함수(surjection)**는 공역의 모든 원소가 치역에 포함되는 함수이며, **전단사함수(bijection)**는 단사이면서 동..."
tags: ['Injection', 'Surjection', 'Bijection', 'One To One', 'Onto', 'Function Types', 'Invertible']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/injection-surjection-bijection
sidebar:
  order: 6
---

## 핵심 개념

**단사함수(Injection, One-to-one):**
- 정의: ∀a∀b(f(a) = f(b) → a = b), 동치로 ∀a∀b(a ≠ b → f(a) ≠ f(b))
- 증명법: f(a) = f(b)를 가정하고 a = b를 유도
- 반증법: f(a) = f(b)이지만 a ≠ b인 구체적 반례를 제시
- 순증가 또는 순감소 함수는 반드시 단사함수이다

**전사함수(Surjection, Onto):**
- 정의: ∀y ∈ B, ∃x ∈ A such that f(x) = y
- 즉, 치역 = 공역. 공역의 모든 원소가 최소 하나의 역상을 가진다
- 증명법: 임의의 y ∈ B에 대해 f(x) = y인 x ∈ A를 찾기
- 반증법: f(x) ≠ y인 특정 y ∈ B를 제시

**전단사함수(Bijection, One-to-one Correspondence):**
- 단사 + 전사
- 공역의 각 원소가 정의역의 정확히 하나의 원소에 대응
- **역함수(inverse function)**가 존재하는 필요충분조건
- 두 집합의 **크기(cardinality)가 같음**을 보이는 데 사용

**역함수(Inverse Function):**
f가 전단사일 때, f⁻¹: B → A는 f(a) = b일 때 f⁻¹(b) = a로 정의된다. f⁻¹ ∘ f = ιA, f ∘ f⁻¹ = ιB (항등함수).

**유한 집합의 특별한 성질:**
f: A → A이고 A가 유한집합이면, f가 단사 ⟺ f가 전사. 즉, 유한 집합에서 자기 자신으로의 함수는 하나만 보여도 충분하다. 그러나 무한 집합에서는 이 동치가 성립하지 않는다.

## 예시

```
단사이지만 전사가 아닌 함수:
f: {a,b,c} → {1,2,3,4}, f(a)=4, f(b)=5, f(c)=1
→ 모든 입력에 다른 출력 (단사 ✓), 2가 치역에 없음 (전사 ✗)

전사이지만 단사가 아닌 함수:
f: {a,b,c,d} → {1,2,3}, f(a)=3, f(b)=2, f(c)=1, f(d)=3
→ f(a) = f(d) = 3 (단사 ✗), {1,2,3}의 모든 원소가 상 (전사 ✓)

전단사함수:
f: Z → Z, f(x) = x + 1
→ 단사: x+1 = y+1이면 x = y ✓
→ 전사: 임의의 y에 대해 x = y-1이면 f(x) = y ✓
→ 역함수: f⁻¹(y) = y - 1

전단사가 아닌 함수:
f: Z → Z, f(x) = x²
→ f(1) = f(-1) = 1이므로 단사 아님
→ f(x) = -1인 정수 x 없으므로 전사 아님
```

단사/전사와 집합 크기의 관계:
```
|A| = m, |B| = n인 유한 집합에서
- 단사 f: A → B 존재 ⟹ m ≤ n
- 전사 f: A → B 존재 ⟹ m ≥ n
- 전단사 f: A → B 존재 ⟹ m = n
```

## 관련 개념

- [Function](/knowledge/mathematics/function/) - 함수의 기본 정의와 구성요소
- [Function Composition](/knowledge/mathematics/function-composition/) - 합성함수의 단사/전사 보존 성질
- [Cardinality](/knowledge/mathematics/cardinality/) - 전단사함수로 집합의 크기 비교
- [Set](/knowledge/mathematics/set/) - 함수의 정의역/공역으로서의 집합
