---
title: "3SAT"
description: "각 절이 정확히 3개의 리터럴로 구성된 CNF 형식의 부울 공식에 대한 충족가능성 문제 — NP-완전 문제의 대표적 예시이며 절/변수 비율 4.267에서 급격한 전이가 발생함"
tags: ["Logic", "SAT", "NP-Complete", "CNF", "Complexity"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/discrete-mathematics/logic/3sat
sidebar:
  order: 14
---

## 핵심 개념

3SAT는 각 절(clause)이 정확히 3개의 리터럴로 구성된 CNF(Conjunctive Normal Form) 형식의 부울 공식에 대한 충족가능성 문제다. 일반 SAT로부터 다항 시간 변환이 가능하며, 이를 통해 3SAT가 일반 SAT만큼 어렵다는 것을 보인다 (Cook-Levin 정리).

## 동작 원리

**구조적 특성:**
- 각 절은 8가지 진리값 조합 중 7가지를 허용 (1/8 확률로 제약 위반)
- 7개 이하의 절을 가진 3-CNF는 항상 충족 가능

**임계 비율:**
절 대 변수 비율이 약 4.267 근방에서 급격한 전이 발생:
- 비율 < 4.267: 대부분 충족 가능
- 비율 > 4.267: 대부분 불충족

**최소 불충족 예시:**
최단 흥미로운 3-CNF는 8개 절 (Rivest의 결합 블록 설계 기반):
- 임의 7개 절의 부분집합은 정확히 2가지 방식으로 충족 가능
- 8개 전체는 불충족

**알고리즘 접근:**
- DPLL: 단위 전파 + 순수 리터럴 제거 + 역추적
- CDCL (Conflict-Driven Clause Learning): 현대적 SAT 솔버의 핵심
- 국소 탐색: WalkSAT, GSAT 등

## 예시

```python
# 3-SAT 공식 표현
# 각 절은 3개의 리터럴 (양수 = 양의 변수, 음수 = 부정 변수)
clauses = [
    [1, 2, 3],      # (x₁ ∨ x₂ ∨ x₃)
    [1, -2, 4],     # (x₁ ∨ x̄₂ ∨ x₄)
    [-1, 2, -3],    # (x̄₁ ∨ x₂ ∨ x̄₃)
    [-1, -2, 3],    # (x̄₁ ∨ x̄₂ ∨ x₃)
]

def is_satisfied(clauses, assignment):
    """부분 할당에서 공식 충족 여부 확인"""
    for clause in clauses:
        clause_sat = False
        for lit in clause:
            var = abs(lit)
            if var in assignment:
                val = assignment[var] if lit > 0 else not assignment[var]
                if val:
                    clause_sat = True
                    break
        if not clause_sat:
            return False
    return True

def random_walk_sat(clauses, n_vars, max_flips=1000):
    """WalkSAT: 국소 탐색 기반 SAT 풀이"""
    import random
    assignment = {i: random.choice([True, False]) for i in range(1, n_vars+1)}

    for _ in range(max_flips):
        unsat = [c for c in clauses if not any(
            (assignment.get(abs(l), False) == (l > 0)) for l in c
        )]
        if not unsat:
            return True, assignment
        clause = random.choice(unsat)
        var = abs(random.choice(clause))  # 랜덤 플립
        assignment[var] = not assignment[var]

    return False, None
```

## 관련 개념

- [Boolean Satisfiability](/knowledge/discrete-mathematics/logic/boolean-satisfiability/)
- [Horn Clause](/knowledge/discrete-mathematics/logic/horn-clause/)
- [Krom Clause](/knowledge/discrete-mathematics/logic/krom-clause/)
- [DNF and CNF](/knowledge/discrete-mathematics/boolean-algebra/dnf-cnf/)
