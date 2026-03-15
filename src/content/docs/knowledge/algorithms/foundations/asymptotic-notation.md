---
title: "점근 표기법 (Asymptotic Notation)"
description: "점근적 표기법(Asymptotic Notation)은 입력 크기가 한없이 커질 때 함수의 증가율(order of growth)을 특성화하는 수학적 표기법이다"
tags: ['Asymptotic Notation', 'Big O', 'Omega', 'Theta', 'Complexity Analysis']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/asymptotic-notation
sidebar:
  order: 8
---

## 핵심 개념

다섯 가지 점근적 표기법이 있다:

**1. O-표기법 (Big-O)** — 점근적 상한(upper bound):
O(g(n)) = {f(n) : ∃c>0, n₀>0 s.t. 0 ≤ f(n) ≤ c·g(n), ∀n ≥ n₀}
- "f(n)은 g(n)보다 빠르게 증가하지 않는다"
- 예: 4n² + 100n + 500 = O(n²)

**2. Ω-표기법 (Big-Omega)** — 점근적 하한(lower bound):
Ω(g(n)) = {f(n) : ∃c>0, n₀>0 s.t. 0 ≤ c·g(n) ≤ f(n), ∀n ≥ n₀}
- "f(n)은 g(n)만큼 빠르게 증가한다"

**3. Θ-표기법 (Theta)** — 점근적 근사 한계(tight bound):
Θ(g(n)) = {f(n) : ∃c₁,c₂>0, n₀>0 s.t. 0 ≤ c₁·g(n) ≤ f(n) ≤ c₂·g(n), ∀n ≥ n₀}
- **정리 3.1**: f(n) = Θ(g(n)) ⟺ f(n) = O(g(n)) ∧ f(n) = Ω(g(n))

**4. o-표기법 (Little-o)** — 느슨한 상한 (tight하지 않음):
- 모든 c > 0에 대해 f(n) < c·g(n) (충분히 큰 n에서)
- lim(n→∞) f(n)/g(n) = 0

**5. ω-표기법 (Little-omega)** — 느슨한 하한 (tight하지 않음):
- lim(n→∞) f(n)/g(n) = ∞

**실수와의 비유:**
- f(n) = O(g(n)) ≈ a ≤ b
- f(n) = Ω(g(n)) ≈ a ≥ b
- f(n) = Θ(g(n)) ≈ a = b
- f(n) = o(g(n)) ≈ a < b
- f(n) = ω(g(n)) ≈ a > b

**주의**: O-표기법을 Θ-표기법 대신 사용하는 것은 흔한 오류이다. 예를 들어 "O(n²) 알고리즘이 O(n³) 알고리즘보다 빠르다"는 정확하지 않다.

## 예시

```
증가율 비교:

  함수               | 점근적 표기
  ------------------|-------------
  7n³ + 100n² - 20n | Θ(n³), O(n³), O(n⁴), Ω(n³), Ω(n²)
  n²/100 - 100n     | Θ(n²)
  2n                | O(n²) (= o(n²)), Ω(n), ω(1)

수행 시간에 적용:
  삽입 정렬 최악: Θ(n²)  ← 가장 정확한 표현
  삽입 정렬 최악: O(n²)  ← 맞지만 덜 정확
  삽입 정렬 전체: O(n²)  ← 올바름 (모든 경우 포함)
  삽입 정렬 전체: Θ(n²)  ← 잘못됨! (최선은 Θ(n))
  병합 정렬 전체: Θ(n lg n) ← 모든 경우에 성립
```

## 관련 개념

- [최악의 경우 분석 (Worst-Case Analysis)](/knowledge/algorithms/worst-case-analysis/)
- [점화식 (Recurrence)](/knowledge/algorithms/recurrence/)
- [알고리즘 (Algorithm)](/knowledge/algorithms/algorithm/)
