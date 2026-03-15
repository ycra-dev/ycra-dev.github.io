---
title: "귀류법 (Proof by Contradiction)"
description: "귀류법(Proof by Contradiction)은 증명하고자 하는 명제 p의 부정 ¬p를 가정한 후, 모순(r ∧ ¬r 형태)을 도출하여 ¬p가 거짓임을, 따라서 p가 참임을 보이는 간접 증명 방법이다"
tags: ['Proof By Contradiction', 'Indirect Proof', 'Reductio Ad Absurdum', 'Proof Method']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/proof-by-contradiction
sidebar:
  order: 12
---

## 핵심 개념

귀류법의 논리적 기반은 다음과 같다: ¬p → (r ∧ ¬r)이 참이면, r ∧ ¬r은 항상 거짓(모순)이므로 ¬p도 거짓이어야 한다. 따라서 p는 참이다.

**귀류법의 절차:**
1. 증명하려는 명제 p의 부정 ¬p가 참이라 가정한다.
2. 이 가정으로부터 논리적 추론을 진행한다.
3. 모순(어떤 명제 r과 그 부정 ¬r이 동시에 참)을 도출한다.
4. 모순이 발생했으므로 가정 ¬p가 거짓이다.
5. 따라서 p가 참이다.

**조건문 p → q에 대한 귀류법:**
- p ∧ ¬q를 가정하고 모순을 도출한다.
- 이 방법은 (p ∧ ¬q) → F와 p → q의 논리적 동치에 기반한다 (둘 다 p가 참이고 q가 거짓일 때만 거짓).

**대우 증명과의 관계:**
대우 증명은 귀류법의 특수한 경우로 볼 수 있다. 대우 증명에서 ¬q를 가정하고 ¬p를 도출하는 것을, p와 ¬q를 동시에 가정한 후 p ∧ ¬p 모순을 도출하는 귀류법으로 재작성할 수 있다.

**직접 증명도 귀류법으로 변환 가능:**
p와 ¬q를 가정한 후, 직접 증명의 단계를 사용하여 q를 도출하면 ¬q ∧ q 모순을 얻는다.

**비둘기집 원리(Pigeonhole Principle)**와 같은 조합론적 논증에서 귀류법이 특히 유용하다.

## 예시

"22일 중 적어도 4일은 같은 요일에 해당한다"의 귀류법:
```
부정 가정: 같은 요일에 해당하는 날이 최대 3일이다.
일주일은 7일이므로, 최대 7 × 3 = 21일만 선택할 수 있다.
이는 22일을 선택했다는 전제와 모순된다.
따라서 적어도 4일은 같은 요일에 해당한다. ∎
```

"√2는 무리수이다"의 귀류법 (고전적 증명):
```
부정 가정: √2는 유리수이다.
√2 = a/b (a, b는 정수, b ≠ 0, a/b는 기약분수)

양변을 제곱: 2 = a²/b²
              2b² = a²

→ a²은 짝수 → a도 짝수 → a = 2c (c는 정수)
→ 2b² = 4c² → b² = 2c²
→ b²은 짝수 → b도 짝수

a와 b가 모두 짝수이면 공통인수 2를 가지므로,
a/b가 기약분수라는 가정과 모순된다.
따라서 √2는 무리수이다. ∎
```

조건문의 귀류법: "3n + 2가 홀수이면 n은 홀수이다":
```
p ∧ ¬q를 가정: 3n + 2가 홀수이고(p) n이 짝수이다(¬q).

n이 짝수이므로 n = 2k (k는 정수)
3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1)

따라서 3n + 2는 짝수(홀수가 아님)이다.
이는 "3n + 2가 홀수"라는 가정 p와 모순된다.
즉 p ∧ ¬p 모순이 발생한다.
따라서 원래 명제 p → q는 참이다. ∎
```

## 관련 개념

- [Direct Proof](/knowledge/mathematics/direct-proof/) - 귀류법의 대안인 순방향 증명
- [Proof by Contraposition](/knowledge/mathematics/proof-by-contraposition/) - 귀류법과 밀접한 관계의 대우 증명
- [Rules of Inference](/knowledge/mathematics/rules-of-inference/) - 증명에 사용되는 추론 규칙
- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 모순과 항진명제의 관계
