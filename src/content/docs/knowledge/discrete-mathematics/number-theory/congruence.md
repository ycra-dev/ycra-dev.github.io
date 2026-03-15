---
title: "합동 (Congruence)"
description: "합동(Congruence)은 두 정수 a, b가 양의 정수 m으로 나누었을 때 같은 나머지를 가지는 관계이다"
tags: ['Congruence', 'Modular Arithmetic', 'Number Theory', 'Equivalence Relation']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/congruence
sidebar:
  order: 2
---

## 핵심 개념

합동 관계는 정수 집합 위의 동치 관계(equivalence relation)로서, 수론과 암호학의 기초를 이룬다. Gauss가 18세기 말에 체계적으로 발전시킨 개념이다.

**합동의 동치 조건들** (Theorem 3, 4):
1. a ≡ b (mod m) ⟺ m | (a - b)
2. a ≡ b (mod m) ⟺ a mod m = b mod m (같은 나머지)
3. a ≡ b (mod m) ⟺ 정수 k가 존재하여 a = b + km

**합동의 산술 성질** (Theorem 5):
a ≡ b (mod m)이고 c ≡ d (mod m)이면:
- a + c ≡ b + d (mod m) — 덧셈 보존
- ac ≡ bd (mod m) — 곱셈 보존

**주의사항**:
- ac ≡ bc (mod m)이라고 해서 반드시 a ≡ b (mod m)인 것은 아니다 (나눗셈은 항상 성립하지 않음)
- 단, gcd(c, m) = 1이면 ac ≡ bc (mod m)에서 a ≡ b (mod m)을 도출할 수 있다 (Theorem 7)

합동 관계는 정수를 m개의 서로소인 합동류(congruence class)로 분할한다. 각 합동류는 같은 나머지를 가지는 정수들의 집합이다.

## 예시

**합동 판별 예시**:
```
17 ≡ 5 (mod 6)?
→ 17 - 5 = 12, 6 | 12이므로 17 ≡ 5 (mod 6) ✓

24 ≡ 14 (mod 6)?
→ 24 - 14 = 10, 6 ∤ 10이므로 24 ≢ 14 (mod 6) ✗
```

**합동의 산술 성질 활용**:
```
7 ≡ 2 (mod 5)이고 11 ≡ 1 (mod 5)이면:
  덧셈: 7 + 11 = 18 ≡ 2 + 1 = 3 (mod 5)
  곱셈: 7 * 11 = 77 ≡ 2 * 1 = 2 (mod 5)
```

**나눗셈 주의 예시**:
```
14 ≡ 8 (mod 6)
양변을 2로 나누면: 7 ≡ 4 (mod 6)? → 7 - 4 = 3, 6 ∤ 3 → 거짓!
∵ gcd(2, 6) = 2 ≠ 1이므로 나눗셈이 성립하지 않음
```

**Python으로 합동 확인**:
```python
def is_congruent(a, b, m):
    return (a - b) % m == 0

print(is_congruent(17, 5, 6))   # True
print(is_congruent(24, 14, 6))  # False
```

## 관련 개념

- [Modular Arithmetic](/knowledge/mathematics/modular-arithmetic/) - 합동에 기반한 산술 체계
- [Chinese Remainder Theorem](/knowledge/mathematics/chinese-remainder-theorem/) - 연립 합동식의 풀이
- [Fermat's Little Theorem](/knowledge/mathematics/fermats-little-theorem/) - 소수 모듈러 합동의 핵심 정리
