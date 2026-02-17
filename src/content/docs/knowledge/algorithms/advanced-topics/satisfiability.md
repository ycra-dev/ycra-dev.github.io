---
title: "Satisfiability"
description: "충족 가능성(Satisfiability, SAT)은 부울 식(boolean formula)의 변수에 0/1 값을 배정하여 식 전체를 참(1)으로 만들 수 있는지 묻는 결정 문제로, 최초로 NP-완전이 증명된 문제(CIRCUIT-SAT)의 계열이다"
tags: ['Satisfiability', 'Sat', 'Cnf', '3 Cnf Sat', 'Circuit Sat', 'Boolean Formula', 'Cook Levin']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/algorithms/satisfiability
sidebar:
  order: 6
---

## 핵심 개념

**SAT의 변형들**:

1. **CIRCUIT-SAT** (회로 충족 가능성):
   - 입력: AND, OR, NOT 게이트로 구성된 부울 조합 회로
   - 질문: 출력을 1로 만드는 입력 배정이 존재하는가?
   - **최초의 NP-완전 문제** (Theorem 34.7)
   - Cook-Levin 정리에 해당: 모든 NP 문제를 직접 환원

2. **SAT** (식 충족 가능성):
   - 입력: 변수, ¬, ∧, ∨, 괄호로 구성된 부울 식
   - CIRCUIT-SAT ≤_P SAT
   - NP-완전

3. **3-CNF-SAT** (3-CNF 충족 가능성):
   - 입력: 정확히 3개 리터럴의 절(clause)들의 논리곱
   - SAT ≤_P 3-CNF-SAT
   - NP-완전
   - 많은 NPC 증명의 출발점

4. **2-CNF-SAT**: **P에 속함** (다항 시간 해결 가능)

**CIRCUIT-SAT의 NP-완전성 증명 (핵심 아이디어)**:
```
임의의 NP 언어 L에 대해:
1. L ∈ NP → 다항 시간 검증 알고리즘 A(x, y) 존재
2. A의 T(n)단계 계산을 부울 회로로 시뮬레이션:
   - 설정(configuration) = 프로그램 + PC + 입력 x + 인증서 y + 작업 메모리
   - 하드웨어 회로 M이 한 설정을 다음 설정으로 변환
   - T(n)개의 M 사본을 직렬 연결
3. 입력 x를 고정, 인증서 y만 회로의 입력으로 남김
4. C(y) = A(x, y) → x ∈ L ⟺ C가 충족 가능
```

**CNF(Conjunctive Normal Form)**:
```
절(clause): 리터럴의 논리합 — (x₁ ∨ ¬x₂ ∨ x₃)
CNF: 절들의 논리곱 — C₁ ∧ C₂ ∧ ... ∧ Cₖ
k-CNF: 각 절이 정확히 k개의 리터럴
```

**SAT → 3-CNF-SAT 환원 과정**:
1. 부울 식을 이진 파싱 트리로 변환
2. 각 내부 노드에 보조 변수 도입
3. 각 노드를 3개 리터럴 절로 변환
4. 필요시 절 복제 (1-2개 리터럴 → 3개로 확장)

## 예시

```
3-CNF-SAT 인스턴스:
φ = (x₁ ∨ ¬x₂ ∨ x₃) ∧ (¬x₁ ∨ x₂ ∨ x₄) ∧ (x₂ ∨ ¬x₃ ∨ ¬x₄)

배정: x₁=1, x₂=0, x₃=1, x₄=0
  절 1: (1 ∨ 1 ∨ 1) = 1 ✓
  절 2: (0 ∨ 0 ∨ 0) = 0 ✗ → 충족 불가

배정: x₁=1, x₂=1, x₃=0, x₄=1
  절 1: (1 ∨ 0 ∨ 0) = 1 ✓
  절 2: (0 ∨ 1 ∨ 1) = 1 ✓
  절 3: (1 ∨ 1 ∨ 0) = 1 ✓ → 충족 가능!
```

CIRCUIT-SAT 예시:
```
입력: x₁, x₂, x₃
회로:
  g₁ = x₁ AND x₂
  g₂ = NOT x₃
  g₃ = g₁ OR g₂
  출력 = g₃

배정 x₁=1, x₂=1, x₃=0:
  g₁ = 1 AND 1 = 1
  g₂ = NOT 0 = 1
  g₃ = 1 OR 1 = 1 → 충족! ✓
```

2-SAT vs 3-SAT 난이도 차이:
```
2-SAT: (x₁ ∨ x₂) ∧ (¬x₁ ∨ x₃) ∧ (¬x₂ ∨ ¬x₃)
→ 함의 그래프(implication graph)로 O(V+E)에 해결 가능 (P)

3-SAT: 같은 구조에 리터럴 하나 추가 → NP-complete
→ 알려진 최선: 지수 시간 알고리즘
```

## 관련 개념

- [NP-Completeness](/knowledge/algorithms/np-completeness/) - SAT가 속하는 복잡도 클래스
- [Reduction](/knowledge/algorithms/reduction/) - SAT에서 다른 NPC 문제로의 환원
- [P vs NP](/knowledge/algorithms/p-vs-np/) - SAT의 다항 시간 해결 여부가 핵심
- [NP-Hard](/knowledge/algorithms/np-hard/) - SAT의 난이도 분류
- [Approximation Algorithm](/knowledge/algorithms/approximation-algorithm/) - MAX-SAT 근사 알고리즘
