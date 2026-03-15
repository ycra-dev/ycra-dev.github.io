---
title: "호너의 법칙 (Horner's Rule)"
description: "다항식 a_n x^n + ... + a_1 x + a_0를 (((...((a_n x + a_{n-1})x + a_{n-2})x + ...)x + a_0) 형태로 n번의 곱셈과 덧셈으로 계산하는 최적 알고리즘"
tags: ["Algorithms", "Polynomial", "Evaluation", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/horners-rule
sidebar:
  order: 31
---

## 핵심 개념

호너의 방법(Horner's Rule)은 n차 다항식을 x에서 최소한의 연산으로 계산하는 알고리즘이다:

```
p(x) = a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0
     = ((...((a_n × x + a_{n-1}) × x + a_{n-2}) × x + ...) × x + a_0)
```

**비용**: n번의 곱셈 + n번의 덧셈 (총 2n 연산)

직접 계산하면 n + (n-1) + ... + 1 = n(n+1)/2번의 곱셈이 필요하다. Horner's Rule은 이를 n번으로 줄인다.

## 동작 원리

**알고리즘**:
```
b_n ← a_n
for k = n-1 downto 0:
    b_k ← b_{k+1} × x + a_k
결과: b_0 = p(x)
```

**최적성 증명**: 1954년 Pan이 "일반적인 n차 다항식에 대해 n번의 곱셈 이하로 계산하는 방법은 없다"고 증명했다 (특수한 다항식은 제외).

**응용**:

1. **기수 변환 (Radix Conversion)**: b진수를 10진수로 변환
   ```
   (d_n d_{n-1} ... d_1 d_0)_b = (...((d_n × b + d_{n-1}) × b + d_{n-2}) × b + ... + d_0)
   ```

2. **다항식 나눗셈**: 나머지 계산 → 모듈러 다항식 연산

3. **부동소수점 계산**: 수치 라이브러리의 핵심

4. **CRC 계산**: 다항식 나눗셈 기반 오류 검출

**다항식 나머지 계산 (Synthetic Division)**:
p(x) ÷ (x - r)의 몫과 나머지를 Horner's Rule로 동시에 계산:
```
b_n = a_n
b_k = a_k + r × b_{k+1}    (k = n-1 downto 0)
나머지 = b_0 = p(r)
```

## 예시

```python
def horner_evaluate(coeffs, x):
    """
    다항식 평가 (Horner's Rule)
    coeffs: [a_n, a_{n-1}, ..., a_1, a_0] (최고차항부터)
    """
    result = coeffs[0]
    for c in coeffs[1:]:
        result = result * x + c
    return result

# 3x³ + 2x² - 5x + 7을 x=4에서 계산
coeffs = [3, 2, -5, 7]
x = 4
result = horner_evaluate(coeffs, x)
print(f"p(4) = {result}")  # 3×64 + 2×16 - 5×4 + 7 = 211

# 검증
direct = 3*4**3 + 2*4**2 - 5*4 + 7
print(f"직접 계산: {direct}")  # 211

# 기수 변환에 Horner's Rule 적용
def binary_to_decimal_horner(binary_str):
    """이진수 → 십진수 (Horner's Rule)"""
    result = 0
    for bit in binary_str:
        result = result * 2 + int(bit)
    return result

print(binary_to_decimal_horner("10101000"))  # 168

# 합성 제법 (다항식 나눗셈)
def synthetic_division(coeffs, r):
    """
    p(x) ÷ (x - r) = 몫 q(x) + 나머지 p(r)
    """
    quotient = [coeffs[0]]
    for c in coeffs[1:]:
        quotient.append(quotient[-1] * r + c)
    remainder = quotient.pop()
    return quotient, remainder

quotient, remainder = synthetic_division([3, 2, -5, 7], 4)
print(f"몫: {quotient}")     # [3, 14, 51]
print(f"나머지: {remainder}") # 211

# 수치 안정성: 큰 계수에서의 정밀도
import numpy as np
coeffs_np = np.array([1.0, -10.0, 1.0])  # x² - 10x + 1
x_val = 5.0 + 1e-10
print(f"Horner: {horner_evaluate(coeffs_np, x_val):.6e}")
```

## 관련 개념

- [다항식 연산 (Polynomial Arithmetic)](/knowledge/algorithms/mathematical-algorithms/polynomial-arithmetic/)
- [기수 변환 (Radix Conversion)](/knowledge/algorithms/mathematical-algorithms/radix-conversion/)
- [고속 곱셈 (Fast Multiplication)](/knowledge/algorithms/mathematical-algorithms/fast-multiplication/)
