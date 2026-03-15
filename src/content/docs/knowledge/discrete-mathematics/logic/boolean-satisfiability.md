---
title: "부울 충족 가능성 (Boolean Satisfiability)"
description: "주어진 부울 함수 f가 f(x)=1이 되는 입력 벡터를 갖는지 판단하는 문제 — P vs NP의 핵심이며 회로 검증·계획·모델 검사에 광범위하게 사용됨"
tags: ["Logic", "SAT", "NP-Complete", "Complexity", "Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/logic/boolean-satisfiability
sidebar:
  order: 13
---

## 핵심 개념

부울 충족가능성(Boolean Satisfiability, SAT)은 주어진 부울 함수 f가 f(x)=1이 되는 입력 벡터 x를 갖는지 판단하는 문제다. 즉, f(x₁,...,xₙ) = 1을 만족시키는 변수 할당이 존재하는가를 결정한다.

컴퓨터 과학의 가장 유명한 미해결 문제: 길이 N인 부울 공식에 대해 O(N^k) 시간 안에 SAT를 해결하는 알고리즘이 존재하는가? (P=NP 문제와 직결됨)

## 동작 원리

**SAT의 실용성:**
- 100개 변수로도 실용적 문제의 상당수 표현 가능
- 회로 검증, 계획(planning), 모델 검사 등에 광범위 사용

**쉬운 특수 경우들:**
1. **Horn-SAT**: Horn 절만으로 구성 → 선형 시간 O(N)
2. **2-SAT (Krom-SAT)**: 각 절이 2개의 리터럴 → 선형 시간 O(N)

**최단 불충족 3-CNF:**
8개의 절이 필요하며, Rivest의 결합 블록 설계 기반:
- 임의 7개 절의 부분집합은 항상 충족 가능
- 8개 전체는 불충족

**SAT 풀이 접근법:**
1. 브루트 포스: 2ⁿ 시도
2. DPLL 알고리즘: 단위 전파 + 역추적
3. CDCL: 충돌 주도 절 학습
4. Exact Cover로 변환 후 Dancing Links

## 예시

```
Horn 절 예시 (함의 형태):
(ū ∨ v̄ ∨ w̄ ∨ x̄ ∨ y ∨ z)
→ (u ∧ v ∧ w ∧ x ∧ y) ⇒ z

SAT 예시:
(x₁ ∨ x₂ ∨ x₃) ∧ (x̄₁ ∨ x₂) ∧ (x̄₂ ∨ x₃)

할당 x₁=0, x₂=1, x₃=1:
(0∨1∨1) ∧ (1∨1) ∧ (0∨1) = 1∧1∧1 = 1 ✓
```

```python
def dpll(clauses, assignment={}):
    """DPLL 알고리즘 기본 아이디어"""
    # 단위 전파: 크기 1인 절 처리
    unit_clauses = [c for c in clauses if len(c) == 1]
    for unit in unit_clauses:
        lit = unit[0]
        assignment[abs(lit)] = lit > 0
        clauses = propagate(clauses, lit)

    # 모든 절 충족 → 충족 가능
    if not clauses:
        return True, assignment

    # 빈 절 발생 → 불충족
    if any(len(c) == 0 for c in clauses):
        return False, {}

    # 변수 선택 후 역추적
    var = pick_variable(clauses)
    for val in [True, False]:
        new_assignment = dict(assignment)
        new_assignment[var] = val
        sat, result = dpll(propagate(clauses, var if val else -var), new_assignment)
        if sat:
            return True, result
    return False, {}
```

## 관련 개념

- [3SAT](/knowledge/discrete-mathematics/logic/3sat/)
- [호른 절 (Horn Clause)](/knowledge/discrete-mathematics/logic/horn-clause/)
- [크롬 절 (Krom Clause)](/knowledge/discrete-mathematics/logic/krom-clause/)
- [주항 (Prime Implicant)](/knowledge/discrete-mathematics/boolean-algebra/prime-implicant/)
- [DNF와 CNF (DNF and CNF)](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
