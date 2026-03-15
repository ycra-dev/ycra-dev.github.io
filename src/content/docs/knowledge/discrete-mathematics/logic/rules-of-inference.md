---
title: "추론 규칙 (Rules of Inference)"
description: "추론 규칙(Rules of Inference)은 타당한 논증(valid argument)을 구성하기 위한 기본 템플릿으로, 전제(premises)가 모두 참일 때 결론(conclusion)이 반드시 참이 되는 논증 형식이다"
tags: ['Rules Of Inference', 'Modus Ponens', 'Modus Tollens', 'Syllogism', 'Resolution', 'Valid Argument']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/rules-of-inference
sidebar:
  order: 9
---

## 핵심 개념

**타당한 논증(Valid Argument)**: 전제 p₁, p₂, ..., pₙ과 결론 q로 이루어진 논증에서 (p₁ ∧ p₂ ∧ ... ∧ pₙ) → q가 항진명제일 때 타당하다.

**명제 논리의 주요 추론 규칙:**

| 규칙 | 형식 | 항진명제 기반 |
|------|------|-------------|
| **긍정식(Modus Ponens)** | p, p→q ∴ q | (p ∧ (p→q)) → q |
| **부정식(Modus Tollens)** | ¬q, p→q ∴ ¬p | (¬q ∧ (p→q)) → ¬p |
| **가설적 삼단논법(Hypothetical Syllogism)** | p→q, q→r ∴ p→r | ((p→q) ∧ (q→r)) → (p→r) |
| **선언적 삼단논법(Disjunctive Syllogism)** | p∨q, ¬p ∴ q | ((p∨q) ∧ ¬p) → q |
| **부가(Addition)** | p ∴ p∨q | p → (p∨q) |
| **단순화(Simplification)** | p∧q ∴ p | (p∧q) → p |
| **논리곱(Conjunction)** | p, q ∴ p∧q | (p∧q) → (p∧q) |
| **분해(Resolution)** | p∨q, ¬p∨r ∴ q∨r | ((p∨q) ∧ (¬p∨r)) → (q∨r) |

**양화 문장의 추론 규칙:**

| 규칙 | 형식 |
|------|------|
| **전칭 예화(Universal Instantiation)** | ∀xP(x) ∴ P(c) |
| **전칭 일반화(Universal Generalization)** | P(c) for arbitrary c ∴ ∀xP(x) |
| **존재 예화(Existential Instantiation)** | ∃xP(x) ∴ P(c) for some c |
| **존재 일반화(Existential Generalization)** | P(c) for some c ∴ ∃xP(x) |

**중요 결합 규칙:**
- **전칭 긍정식(Universal Modus Ponens)**: ∀x(P(x)→Q(x)), P(a) ∴ Q(a)
- **전칭 부정식(Universal Modus Tollens)**: ∀x(P(x)→Q(x)), ¬Q(a) ∴ ¬P(a)

**오류(Fallacy)**: 추론 규칙과 유사하지만 타당하지 않은 논증 형식
- **결론 긍정의 오류**: p→q, q ∴ p (잘못됨!)
- **가설 부정의 오류**: p→q, ¬p ∴ ¬q (잘못됨!)

**Resolution의 컴퓨터 과학적 중요성:**
Resolution은 Prolog 같은 논리 프로그래밍 언어와 자동 정리 증명 시스템에서 핵심적으로 사용되는 추론 규칙이다. 절(clause) 형태로 표현된 전제들에 반복적으로 resolution을 적용하여 증명을 구성한다.

## 예시

Modus Ponens 활용:
```
전제 1: "눈이 오면 스키를 탈 것이다." (p → q)
전제 2: "눈이 온다." (p)
결론: "스키를 탈 것이다." (q)     ✓ 타당한 논증
```

여러 추론 규칙을 결합한 논증:
```
전제: ¬p ∧ q, r → p, ¬r → s, s → t
결론: t

1. ¬p ∧ q          전제
2. ¬p               단순화(1에서)
3. r → p            전제
4. ¬r               부정식(2, 3에서)
5. ¬r → s           전제
6. s                긍정식(4, 5에서)
7. s → t            전제
8. t                긍정식(6, 7에서) ✓
```

오류의 예:
```
"이 책의 모든 문제를 풀면 이산수학을 배울 것이다." (p → q)
"이산수학을 배웠다." (q)
"이 책의 모든 문제를 풀었다." (p)  ✗ 결론 긍정의 오류!
(다른 방법으로도 배울 수 있음)
```

## 관련 개념

- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 추론 규칙의 기반이 되는 논리적 동치
- [Quantifier](/knowledge/mathematics/quantifier/) - 양화 문장에 대한 추론 규칙
- [Direct Proof](/knowledge/mathematics/direct-proof/) - 추론 규칙을 활용하여 구성하는 직접 증명
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 모순을 도출하는 간접 증명 방법
