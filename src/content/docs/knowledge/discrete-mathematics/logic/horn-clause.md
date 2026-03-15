---
title: "호른 절 (Horn Clause)"
description: "최대 하나의 양 리터럴을 포함하는 논리합 절 — Prolog의 기반이며 선형 시간 O(N)으로 SAT를 풀 수 있는 Horn-SAT의 핵심"
tags: ["Logic", "SAT", "Prolog", "Linear Time", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/logic/horn-clause
sidebar:
  order: 15
---

## 핵심 개념

Horn 절(Horn Clause)은 최대 하나의 양 리터럴(보완되지 않은 변수)을 포함하는 논리합(OR) 절이다. 즉, 대부분의 리터럴이 부정 형태이며 많아야 하나만 긍정 형태다.

**함의(implication) 형태로 읽기:**
Horn 절 (ū ∨ v̄ ∨ w̄ ∨ z)는 다음과 동치:
```
(u ∧ v ∧ w) ⇒ z
```

## 동작 원리

**수학적 특성 (Horn의 정리 H, 1951):**
부울 함수 f(x₁,...,xₙ)가 Horn 절의 연언으로 표현 가능 ⟺
```
f(x) ∧ f(y) → f(x ∧ y)  (좌표별 AND)
```

**확정 Horn 함수(Definite Horn):**
모든 절에 정확히 하나의 양 리터럴이 있는 경우. f(1,...,1)=1이므로 항상 충족 가능.
- **핵심(Core)**: 최소 충족 벡터에서 참인 변수들의 집합
- 선형 시간 O(N+n)으로 핵심 계산 가능 (Algorithm C, 순전파)

**Algorithm C (핵심 계산):**
0 카운트 절부터 시작하여 결론을 스택에 쌓고, 각 참인 명제가 새로운 절을 활성화하는 순전파(forward chaining) 방식.

**응용:**
- **Prolog**: 확정 Horn 절을 기본 추론 메커니즘으로 사용
- **컴파일러**: 문법 분석에서 인접 문자 결정 (첫/끝 심볼)
- **Horn-SAT**: 선형 시간 O(N)으로 풀 수 있는 SAT의 특수 경우

## 예시

```
컴파일러 응용: 산술 표현식 문법
E → T | T + E | T - E
T → F | F * T | F / T
F → (E) | V | ...

Horn 절 형태:
"E가 +로 시작할 수 있다" → T+E로 시작하면 E가 + 포함 가능
(u ∧ v ∧ w) ⇒ z 형태로 표현

핵심 계산 (Algorithm C):
처음부터 알려진 것: 변수(a,b,c,...)와 숫자(0,1)가 F가 될 수 있음
→ F가 T가 될 수 있음
→ T가 E가 될 수 있음
→ 따라서 연산자 인접 관계 결정
```

```python
def horn_sat_core(clauses, n_vars):
    """
    Horn-SAT 핵심 계산 (Algorithm C)
    각 절: (조건 리스트, 결론) 형태
    """
    true_vars = set()
    # 조건이 없는 절(단위 절)부터 시작
    queue = [conclusion for conditions, conclusion in clauses if not conditions]
    true_vars.update(queue)

    while queue:
        var = queue.pop()
        for conditions, conclusion in clauses:
            # 모든 조건이 참이면 결론 활성화
            if all(c in true_vars for c in conditions):
                if conclusion not in true_vars:
                    true_vars.add(conclusion)
                    queue.append(conclusion)

    return true_vars  # 최소 충족 할당 (핵심)
```

## 관련 개념

- [부울 충족 가능성 (Boolean Satisfiability)](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [크롬 절 (Krom Clause)](/knowledge/discrete-mathematics/logic/krom-clause/)
- [3SAT](/knowledge/discrete-mathematics/logic/3sat/)
- [DNF와 CNF (DNF and CNF)](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
