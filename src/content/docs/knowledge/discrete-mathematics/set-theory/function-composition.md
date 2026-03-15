---
title: "함수 합성 (Function Composition)"
description: "함수 g: A → B와 f: B → C가 주어졌을 때, f와 g의 합성(composition) f ∘ g는 A에서 C로의 함수로, 모든 a ∈ A에 대해 (f ∘ g)(a) = f(g(a))로 정의된다"
tags: ['Function Composition', 'Inverse Function', 'Identity Function', 'Composability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/function-composition
sidebar:
  order: 7
---

## 핵심 개념

함수 합성은 두 함수를 순차적으로 적용하여 새로운 함수를 만드는 연산이다. 먼저 g를 적용한 후 f를 적용하는 것이므로, 표기 순서(f ∘ g)와 실행 순서(먼저 g, 그 다음 f)가 반대임에 주의해야 한다.

**합성의 조건**: f ∘ g가 정의되려면 g의 치역이 f의 정의역의 부분집합이어야 한다.

**핵심 성질:**
- **결합법칙 성립**: (f ∘ g) ∘ h = f ∘ (g ∘ h)
- **교환법칙 불성립**: f ∘ g ≠ g ∘ f (일반적으로)
- **단사 보존**: f, g 모두 단사이면 f ∘ g도 단사
- **전사 보존**: f, g 모두 전사이면 f ∘ g도 전사
- f ∘ g가 전사이면 f는 반드시 전사
- f ∘ g가 단사이면 g는 반드시 단사

**항등함수(Identity Function)**: ιA: A → A, ιA(x) = x. 어떤 함수와 합성해도 원래 함수가 보존된다.

**역함수와 합성의 관계**: f: A → B가 전단사일 때,
- f⁻¹ ∘ f = ιA (A 위의 항등함수)
- f ∘ f⁻¹ = ιB (B 위의 항등함수)
- (f⁻¹)⁻¹ = f

역함수 합성의 순서: f와 g가 가역(invertible)이면 (f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹ (순서 역전).

컴퓨터과학에서 함수 합성은 **파이프라인 처리**, **함수형 프로그래밍의 합성 연산자**, 변환의 체인 등에서 핵심적으로 사용된다. 예를 들어, Unix 파이프라인 `cmd1 | cmd2 | cmd3`는 함수 합성 cmd3 ∘ cmd2 ∘ cmd1에 해당한다.

## 예시

```
g: {a,b,c} → {a,b,c}, g(a)=b, g(b)=c, g(c)=a
f: {a,b,c} → {1,2,3}, f(a)=3, f(b)=2, f(c)=1

(f ∘ g)(a) = f(g(a)) = f(b) = 2
(f ∘ g)(b) = f(g(b)) = f(c) = 1
(f ∘ g)(c) = f(g(c)) = f(a) = 3

주의: g ∘ f는 정의 불가 (f의 치역 {1,2,3}이 g의 정의역 {a,b,c}의 부분집합이 아님)
```

교환법칙이 성립하지 않는 예:
```
f(x) = 2x + 3, g(x) = 3x + 2 (둘 다 Z → Z)

(f ∘ g)(x) = f(3x + 2) = 2(3x + 2) + 3 = 6x + 7
(g ∘ f)(x) = g(2x + 3) = 3(2x + 3) + 2 = 6x + 11

f ∘ g ≠ g ∘ f
```

역함수와 합성:
```
f: Z → Z, f(x) = x + 1
f⁻¹(y) = y - 1

(f⁻¹ ∘ f)(x) = f⁻¹(x + 1) = (x + 1) - 1 = x  ✓ (항등함수)
(f ∘ f⁻¹)(y) = f(y - 1) = (y - 1) + 1 = y  ✓ (항등함수)
```

Python에서의 함수 합성:
```python
def compose(f, g):
    return lambda x: f(g(x))

f = lambda x: 2*x + 3
g = lambda x: 3*x + 2

fog = compose(f, g)
gof = compose(g, f)
print(fog(1))  # 6*1 + 7 = 13  ← (f ∘ g)(1) = f(g(1)) = f(5) = 13
print(gof(1))  # 6*1 + 11 = 17 ← (g ∘ f)(1) = g(f(1)) = g(5) = 17
```

## 관련 개념

- [Function](/knowledge/mathematics/function/) - 함수의 정의, 정의역, 공역
- [Injection Surjection Bijection](/knowledge/mathematics/injection-surjection-bijection/) - 합성이 보존하는 함수의 성질
- [Cardinality](/knowledge/mathematics/cardinality/) - 전단사 합성을 이용한 크기 비교의 추이성
