---
title: "직접 증명 (Direct Proof)"
description: "직접 증명(Direct Proof)은 조건문 p → q를 증명하기 위해 p가 참임을 가정한 후, 공리, 정의, 이전에 증명된 정리, 추론 규칙을 사용하여 q도 반드시 참임을 단계적으로 보이는 증명 방법이다"
tags: ['Direct Proof', 'Proof Method', 'Conditional Statement', 'Theorem']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/direct-proof
sidebar:
  order: 10
---

## 핵심 개념

직접 증명은 가장 직관적이고 기본적인 증명 방법이다. 가설(hypothesis)에서 출발하여 결론(conclusion)으로 나아가는 순방향 추론 과정이다.

**증명의 기본 용어:**
- **정리(Theorem)**: 참임이 증명될 수 있는 명제 (중요도가 높은 결과)
- **보조정리(Lemma)**: 다른 정리의 증명에 도움이 되는 보조적인 정리
- **따름정리(Corollary)**: 이미 증명된 정리로부터 직접 도출되는 정리
- **추측(Conjecture)**: 참으로 제안되었지만 아직 증명되지 않은 명제
- **공리(Axiom)**: 증명 없이 참으로 가정되는 기본 명제

**직접 증명의 전형적 구조:**
1. ∀x(P(x) → Q(x)) 형태의 정리를 증명하고자 함
2. 임의의 원소 c에 대해 P(c)가 참이라 가정
3. 정의, 공리, 추론 규칙을 사용하여 단계적으로 추론
4. Q(c)가 참임을 도출
5. 전칭 일반화에 의해 ∀x(P(x) → Q(x))가 참

**직접 증명의 특수한 경우:**
- **공허한 증명(Vacuous Proof)**: 가설 p가 거짓임을 보여 p → q가 참임을 증명 (p가 거짓이면 p → q는 자동으로 참)
- **자명한 증명(Trivial Proof)**: 결론 q가 참임을 보여 p → q가 참임을 증명

직접 증명은 많은 경우에 자연스럽고 명확하지만, 가설에서 결론으로 직접 나아가는 경로가 불분명할 때는 대우법에 의한 증명이나 귀류법 같은 간접 증명을 시도해야 한다.

## 예시

"n이 홀수 정수이면 n²도 홀수이다"의 직접 증명:
```
가정: n은 홀수 정수
홀수의 정의에 의해: n = 2k + 1 (k는 정수)

n² = (2k + 1)²
   = 4k² + 4k + 1
   = 2(2k² + 2k) + 1

2k² + 2k는 정수이므로, n² = 2m + 1 형태 (m = 2k² + 2k)
따라서 n²은 홀수이다. ∎
```

"두 유리수의 합은 유리수이다"의 직접 증명:
```
가정: r, s는 유리수
유리수의 정의에 의해: r = p/q (q ≠ 0), s = t/u (u ≠ 0)

r + s = p/q + t/u
      = (pu + qt) / (qu)

q ≠ 0이고 u ≠ 0이므로 qu ≠ 0
pu + qt와 qu는 정수이므로
r + s는 유리수이다. ∎
```

공허한 증명의 예:
```
P(0): "만약 0 > 1이면 0² > 0"
가설 "0 > 1"이 거짓이므로, 조건문은 자동으로 참이다. ∎
```

## 관련 개념

- [Rules of Inference](/knowledge/mathematics/rules-of-inference/) - 직접 증명에서 사용되는 추론 규칙
- [Proof by Contraposition](/knowledge/mathematics/proof-by-contraposition/) - 직접 증명이 어려울 때의 대안
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 또 다른 간접 증명 방법
- [Proposition](/knowledge/mathematics/proposition/) - 증명의 대상이 되는 명제
