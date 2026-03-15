---
title: "주항 (Prime Implicant)"
description: "부울 함수에서 리터럴을 하나라도 제거하면 함축식이 되지 않는 최소 단항식 — 논리 최소화와 최단 DNF 계산의 핵심 개념"
tags: ["Boolean Algebra", "Logic Minimization", "DNF", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/boolean-algebra/prime-implicant
sidebar:
  order: 10
---

## 핵심 개념

소 함축식(Prime Implicant)은 부울 함수 f에 대해, 그 자체는 f의 함축식(implicant)이지만 리터럴을 하나라도 제거하면 더 이상 함축식이 되지 않는 최소 단항식이다. (W. V. Quine, 1952)

n차원 이진 초큐브 {0,1}ⁿ 위에서 기하학적으로 해석하면, 소 함축식은 f가 참인 점들 안에 포함된 **극대 부분큐브(maximal subcube)**에 대응한다.

## 동작 원리

**기하학적 해석:**
- f가 참인 점들을 n차원 이진 초큐브의 점들로 본다
- 각 implicant는 f가 참인 점들 안에 포함된 부분큐브(subcube)에 대응
- 소 함축식은 그 중 **극대 부분큐브**에 대응 — 어떤 좌표도 와일드카드(*)로 바꿀 수 없는 최대 크기 큐브

**논리 최소화와의 관계:**
- **선언적 소형식(Disjunctive Prime Form)**: 모든 소 함축식의 논리합
- 최단 DNF는 모든 소 함축식의 부분집합으로 구성됨
- 단조 부울 함수의 경우: 최단 DNF = 선언적 소형식 (Quine의 Theorem Q)

**NP 하드:**
최단 DNF를 구하는 문제(Logic Minimization)는 NP-hard이다.

**소 절(Prime Clause):**
CNF에서의 대칭적 개념; f가 함축하는 최소 절.

**Quine-McCluskey 방법:**
두 점이 한 비트만 다르면 합쳐 와일드카드를 추가하고, 더 이상 합칠 수 없을 때까지 반복한다.

## 예시

```
f(w,x,y,z)의 참이 되는 점들:
0000, 0001, 0010, 0011, 1100, 1101, 1110, 1111

극대 부분큐브들:
00**  → implicant: w̄ ∧ x̄  (w=0, x=0, y와 z는 무관)
11**  → implicant: w ∧ x

소 함축식들: {w̄∧x̄, w∧x}

소 함축식 계산 (Quine-McCluskey 방법):
두 점이 한 비트만 다르면 합쳐 와일드카드 추가
→ 0000, 0001 → 000* (w̄∧x̄∧ȳ)
→ 0000, 0010 → 00*0 (w̄∧x̄∧z̄)
→ 합치면: 00** = w̄∧x̄
반복하여 더 이상 합칠 수 없으면 소 함축식
```

```python
def quine_mccluskey(minterms, n_vars):
    """Quine-McCluskey 알고리즘으로 소 함축식 찾기"""
    def differs_by_one(a, b):
        diff = a ^ b
        return diff != 0 and (diff & (diff - 1)) == 0

    groups = [set(minterms)]
    prime_implicants = set()

    while groups[-1]:
        next_group = set()
        used = set()
        current = groups[-1]
        for a in current:
            for b in current:
                if differs_by_one(a, b):
                    combined = a | b  # 와일드카드 처리 (실제로는 더 복잡)
                    next_group.add(combined)
                    used.add(a)
                    used.add(b)
        prime_implicants |= current - used
        groups.append(next_group)

    return prime_implicants
```

## 관련 개념

- [DNF와 CNF (DNF and CNF)](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
- [단조 불 함수 (Monotone Boolean Function)](/knowledge/discrete-mathematics/boolean-algebra/monotone-boolean-function/)
- [부울 충족 가능성 (Boolean Satisfiability)](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [카르노 맵 (Karnaugh Map)](/knowledge/discrete-mathematics/boolean-algebra/karnaugh-map/)
