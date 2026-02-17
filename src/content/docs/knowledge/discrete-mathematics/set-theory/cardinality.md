---
title: "Cardinality"
description: "두 집합 A와 B의 크기(cardinality)가 같다 함은 A에서 B로의 전단사함수(bijection)가 존재하는 것이며, |A| = |B|로 표기한다"
tags: ['Cardinality', 'Countable', 'Uncountable', 'Aleph Null', 'Cantor', 'Diagonalization', 'Computability']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/cardinality
sidebar:
  order: 10
---

## 핵심 개념

유한 집합의 크기는 단순히 원소의 수이지만, 무한 집합의 경우 크기 비교를 위해 전단사함수의 존재성을 사용한다. 이 접근법은 Georg Cantor가 개척한 것이다.

**가산 무한(countably infinite)**: 양의 정수 집합 Z⁺와 같은 크기를 가지는 무한 집합. 크기를 ℵ₀(알레프 널)로 표기한다. 가산 무한 집합의 원소들은 수열 a₁, a₂, a₃, ...로 나열할 수 있다.

**가산 집합의 예:**
- 홀수 양의 정수: f(n) = 2n - 1 (Z⁺와의 전단사)
- 모든 정수 Z: 0, 1, -1, 2, -2, 3, -3, ...으로 나열
- 양의 유리수 Q⁺: 대각선 논법으로 나열 가능 (놀라운 결과!)

**비가산 집합 - Cantor의 대각선 논법:**
실수의 집합 R은 비가산이다. 증명은 귀류법을 사용한다:
1. [0,1) 구간의 모든 실수를 r₁, r₂, r₃, ...로 나열 가능하다고 가정
2. 각 rᵢ의 소수점 아래 i번째 자릿수 dᵢᵢ와 다른 새 수 r을 구성
3. r은 목록에 없으므로 모순 → 실수는 나열 불가

**Schröder-Bernstein 정리**: A에서 B로의 단사함수와 B에서 A로의 단사함수가 모두 존재하면, |A| = |B|이다. 직접 전단사를 구성하지 않고도 크기가 같음을 보일 수 있다.

**계산 불가능 함수(uncomputable function)의 존재:**
- 모든 프로그래밍 언어의 프로그램 집합은 가산이다 (유한 알파벳의 문자열)
- 양의 정수에서 자기 자신으로의 함수 집합은 비가산이다
- 따라서 컴퓨터 프로그램으로 계산할 수 없는 함수가 존재한다!

**연속체 가설(Continuum Hypothesis)**: ℵ₀와 𝔠 = |R| 사이에 다른 크기의 무한 집합이 존재하는가? 이 문제는 표준적 집합론 공리(ZF)에서 증명도 반증도 불가능하다는 것이 밝혀졌다.

**Cantor의 정리**: 임의의 집합 S에 대해 |S| < |P(S)|. 이는 무한 집합의 크기가 무한히 많은 단계로 존재함을 보여준다.

## 예시

```
가산 집합의 나열:
홀수 양의 정수: f(n) = 2n - 1
1 → 1, 2 → 3, 3 → 5, 4 → 7, 5 → 9, ...

정수 Z의 나열:
0, 1, -1, 2, -2, 3, -3, ...
f(n) = n/2 (n이 짝수), f(n) = -(n-1)/2 (n이 홀수)

양의 유리수의 나열 (대각선 탐색):
1/1, 1/2, 2/1, 3/1, 1/3, 1/4, 2/3, 3/2, 4/1, ...

Cantor 대각선 논법의 예:
r₁ = 0.2̲3794...   d₁₁ = 2 ≠ 4 → d₁ = 4
r₂ = 0.4 4̲590...   d₂₂ = 4 = 4 → d₂ = 5
r₃ = 0.09 1̲18...   d₃₃ = 1 ≠ 4 → d₃ = 4
r₄ = 0.805 5̲3...   d₄₄ = 5 ≠ 4 → d₄ = 4
r = 0.4544... (어떤 rᵢ와도 다름!)

크기 비교:
|Z⁺| = |Z| = |Q| = ℵ₀ < 𝔠 = |R| = |P(Z⁺)| = 2^ℵ₀
```

Hilbert 호텔 역설:
```
무한 개의 방이 모두 차 있는 호텔에 새 손님이 도착하면?
→ 방 n의 손님을 방 n+1로 이동 → 방 1이 빔!
유한 호텔에서는 불가능하지만, 무한 호텔에서는 가능
```

## 관련 개념

- [Set](/knowledge/mathematics/set/) - 집합의 기본 정의와 크기(cardinality)
- [Injection Surjection Bijection](/knowledge/mathematics/injection-surjection-bijection/) - 전단사함수를 이용한 크기 비교
- [Power Set](/knowledge/mathematics/power-set/) - Cantor의 정리: |S| < |P(S)|
- [Sequence](/knowledge/mathematics/sequence/) - 가산 집합의 원소를 수열로 나열
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 대각선 논법은 귀류법의 응용
