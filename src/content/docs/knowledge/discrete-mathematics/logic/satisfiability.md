---
title: "충족 가능성 (Satisfiability)"
description: "합성 명제가 만족가능(satisfiable)하다는 것은 그 명제의 변수들에 대해 참으로 만드는 진리값 할당이 존재한다는 것이다"
tags: ['Satisfiability', 'Sat Problem', 'Np Completeness', 'Tautology', 'Contradiction']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/satisfiability
sidebar:
  order: 5
---

## 핵심 개념

만족가능성(satisfiability) 문제는 컴퓨터 과학에서 가장 중요한 문제 중 하나이다. 합성 명제가 만족가능한지 판단하는 것을 **SAT 문제(Boolean Satisfiability Problem)**라고 한다.

**핵심 개념들:**
- **항진명제(Tautology)**: 모든 진리값 할당에서 참인 합성 명제 (예: p ∨ ¬p)
- **모순(Contradiction)**: 모든 진리값 할당에서 거짓인 합성 명제 (예: p ∧ ¬p)
- **우발명제(Contingency)**: 항진명제도 모순도 아닌 합성 명제

합성 명제가 만족불가능하다는 것은 그 부정이 항진명제라는 것과 동치이다.

**컴퓨터 과학에서의 중요성:**
SAT 문제는 NP-완전(NP-complete) 문제의 대표적인 예이며, 로봇공학, 소프트웨어 테스팅, AI 계획, 컴퓨터 회로 설계, 스케줄링, 네트워킹, 유전학 등 다양한 분야의 문제를 SAT 문제로 모델링할 수 있다.

n개의 변수를 가진 합성 명제의 진리표는 2^n개의 행을 가지므로, 변수가 많아지면(예: 1000개 → 2^1000 조합) 모든 진리값 조합을 확인하는 것이 불가능하다. 그러나 실용적인 SAT 솔버(solver)들이 개발되어 특정 유형의 문제를 효율적으로 해결한다.

**응용 예시:**
- **n-퀸 문제**: n×n 체스보드에 n개의 퀸을 서로 공격하지 않게 배치하는 문제를 SAT로 모델링
- **스도쿠**: 729개의 명제 변수 p(i,j,n)을 사용하여 9×9 스도쿠를 SAT 문제로 변환 (10밀리초 이내 해결 가능)

## 예시

만족가능성 판단 예시:

1) (p ∨ ¬q) ∧ (q ∨ ¬r) ∧ (r ∨ ¬p)
   → p, q, r이 모두 같은 진리값을 가질 때 참 → **만족가능**

2) (p ∨ q ∨ r) ∧ (¬p ∨ ¬q ∨ ¬r)
   → p, q, r 중 적어도 하나가 참이고 적어도 하나가 거짓이면 참 → **만족가능**

3) 위 두 식의 논리곱:
   (p ∨ ¬q) ∧ (q ∨ ¬r) ∧ (r ∨ ¬p) ∧ (p ∨ q ∨ r) ∧ (¬p ∨ ¬q ∨ ¬r)
   → 첫 번째 조건은 세 변수가 같아야 하고, 두 번째 조건은 달라야 하므로 모순 → **만족불가능**

스도쿠의 SAT 모델링 (개략):
```
변수: p(i,j,n) = "i행 j열에 숫자 n이 있다" (729개 변수)
제약조건:
- 각 행에 모든 숫자 포함: ∧(i=1..9) ∧(n=1..9) ∨(j=1..9) p(i,j,n)
- 각 열에 모든 숫자 포함: ∧(j=1..9) ∧(n=1..9) ∨(i=1..9) p(i,j,n)
- 각 3×3 블록에 모든 숫자 포함
- 각 셀에 최대 하나의 숫자
```

## 관련 개념

- [Truth Table](/knowledge/mathematics/truth-table/) - 만족가능성을 판단하는 기본 도구
- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 항진명제와 모순의 관계
- [Proposition](/knowledge/mathematics/proposition/) - SAT 문제의 기본 구성 요소
