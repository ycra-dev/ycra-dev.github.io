---
title: "대우 증명 (Proof by Contraposition)"
description: "대우 증명(Proof by Contraposition)은 조건문 p → q를 증명하기 위해, 그 대우인 ¬q → ¬p를 증명하는 간접 증명 방법이다"
tags: ['Proof By Contraposition', 'Indirect Proof', 'Contrapositive', 'Proof Method']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/proof-by-contraposition
sidebar:
  order: 11
---

## 핵심 개념

대우 증명은 **간접 증명(indirect proof)**의 한 유형이다. 직접 증명에서는 가설 p에서 출발하여 결론 q에 도달하지만, 대우 증명에서는 결론의 부정 ¬q에서 출발하여 가설의 부정 ¬p에 도달한다.

**대우 증명의 절차:**
1. 결론 q의 부정, 즉 ¬q가 참이라 가정한다.
2. 정의, 공리, 추론 규칙을 사용하여 추론을 진행한다.
3. 가설 p의 부정, 즉 ¬p가 참임을 도출한다.
4. ¬q → ¬p가 증명되었으므로, p → q도 참이다.

**언제 대우 증명을 사용하는가:**
- 직접 증명에서 가설 p로부터 결론 q로 나아가는 경로가 불분명할 때
- 가설이 "x는 무리수이다" 또는 "x ≠ 0"처럼 직접 다루기 어려운 형태일 때 (부정하면 "x는 유리수이다", "x = 0"으로 더 구체적이고 다루기 쉬워짐)
- 결론의 부정을 가정했을 때 더 풍부한 정보를 얻을 수 있을 때

**직접 증명 vs 대우 증명 전략:**
1. 먼저 직접 증명을 시도: 가설의 정의를 전개하고 추론을 시작
2. 직접 증명이 막히면 대우 증명 시도: 결론의 부정을 가정하고 가설의 부정을 도출
3. 특히 "만약 ... 아니면", "무리수", "홀수가 아닌" 등의 가설은 대우 증명의 단서

대우 증명은 귀류법(proof by contradiction)으로도 재작성할 수 있다: p와 ¬q를 모두 가정한 후, 대우 증명의 단계를 사용하여 ¬p를 도출하면 p ∧ ¬p라는 모순을 얻는다.

## 예시

"3n + 2가 홀수이면 n은 홀수이다"의 대우 증명:
```
직접 증명 시도:
  가정: 3n + 2가 홀수, 즉 3n + 2 = 2k + 1
  → 3n + 1 = 2k → n = (2k-1)/3 ... 막힘!

대우 증명:
  결론의 부정 가정: n이 짝수이다.
  n = 2k (k는 정수)

  3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1)

  3k + 1은 정수이므로 3n + 2는 짝수, 즉 홀수가 아니다.
  따라서 ¬q → ¬p가 증명되었으므로 p → q도 참이다. ∎
```

"n = ab (a, b는 양의 정수)이면 a ≤ √n 또는 b ≤ √n"의 대우 증명:
```
결론의 부정 가정: a > √n 이고 b > √n

두 부등식을 곱하면:
  ab > √n · √n = n

따라서 ab ≠ n, 이는 가설 n = ab의 부정이다.
¬q → ¬p가 증명되었으므로 원래 명제도 참이다. ∎
```

"n이 정수이고 n²이 홀수이면 n은 홀수이다"의 대우 증명:
```
결론의 부정 가정: n이 짝수 (홀수가 아님)
n = 2k (k는 정수)

n² = (2k)² = 4k² = 2(2k²)

2k²은 정수이므로 n²은 짝수, 즉 홀수가 아니다.
대우가 증명되었으므로 원래 명제도 참이다. ∎
```

## 관련 개념

- [Direct Proof](/knowledge/mathematics/direct-proof/) - 대우 증명의 대안인 순방향 증명
- [Proof by Contradiction](/knowledge/mathematics/proof-by-contradiction/) - 대우 증명과 밀접한 관계의 귀류법
- [Logical Equivalence](/knowledge/mathematics/logical-equivalence/) - 조건문과 대우의 동치 관계
- [Rules of Inference](/knowledge/mathematics/rules-of-inference/) - 증명에 사용되는 추론 규칙
