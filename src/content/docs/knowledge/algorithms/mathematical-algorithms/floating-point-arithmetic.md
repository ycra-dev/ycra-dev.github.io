---
title: "부동소수점 연산 (Floating Point Arithmetic)"
description: "소수점 위치를 동적으로 변화시켜 넓은 범위의 수를 표현하는 ±f × b^e 형식의 수 체계와 그 연산 오차"
tags: ["Algorithms", "Numerical Analysis", "Computer Architecture", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/floating-point-arithmetic
sidebar:
  order: 28
---

## 핵심 개념

부동소수점 산술(Floating Point Arithmetic)은 소수점(radix point)의 위치를 동적으로 변화시켜 넓은 범위의 수를 표현하는 방식이다:

```
±f × b^e
```

- **f**: 가수(fraction/mantissa), 1/b ≤ f < 1 (정규화)
- **b**: 기수(보통 2)
- **e**: 지수(exponent)

1/1750 기원전 바빌론 수학자들이 이미 육십진법 부동소수점을 사용했다.

## 동작 원리

**IEEE 754 표준**:

| 형식 | 비트 | 부호 | 지수 | 가수 | 범위 | 정밀도 |
|------|------|------|------|------|------|--------|
| 단정도(float32) | 32 | 1 | 8 | 23(+1) | ≈ ±10^±38 | 약 7자리 |
| 배정도(float64) | 64 | 1 | 11 | 52(+1) | ≈ ±10^±308 | 약 15자리 |

**산술 오차의 원인**:

1. **반올림 오차(Rounding Error)**: 표현 불가능한 값을 가장 가까운 표현값으로 근사
   - 0.1은 이진수로 정확히 표현 불가능

2. **흡수(Absorption)**: |a| >> |b|일 때 a + b = a가 되는 현상
   ```
   1e16 + 1.0 == 1e16  # Python에서 True!
   ```

3. **취소(Cancellation)**: 거의 같은 두 수의 차 → 유효 비트 급감

4. **언더플로/오버플로**: 지수 범위 초과

**정확도 분석**: 기수 b가 클수록 반올림 오차의 상대적 크기가 커진다. b=2가 b=10보다 이론적으로 더 정밀하다.

**특수 값**: IEEE 754는 ±Inf, NaN(Not a Number), -0을 정의한다.

## 예시

```python
import struct, math

# 부동소수점 표현 분석
def analyze_float(f):
    """IEEE 754 단정도 분해"""
    bits = struct.unpack('I', struct.pack('f', f))[0]
    sign = (bits >> 31) & 1
    exp = (bits >> 23) & 0xFF
    mantissa = bits & 0x7FFFFF
    print(f"부호: {sign}, 지수: {exp-127}, 가수: {mantissa:023b}")

analyze_float(0.1)  # 정확히 표현되지 않음!

# 흡수 오차
a = 1e16
b = 1.0
print(a + b == a)  # True! b가 흡수됨

# 취소 오차
x = 1000000.1
y = 1000000.0
diff = x - y
print(diff)            # 0.09999847412109375 (오차!)
print(x - y == 0.1)    # False

# Kahan 보상 덧셈 (정밀도 개선)
def kahan_sum(numbers):
    """Kahan summation으로 부동소수점 오차 누적 최소화"""
    total = 0.0
    comp = 0.0  # 보상 항
    for x in numbers:
        y = x - comp          # 보상 항 빼기
        t = total + y
        comp = (t - total) - y  # 다음 보상 항
        total = t
    return total

# 일반 합산 vs Kahan 합산
nums = [0.1] * 1000
print(f"일반 합: {sum(nums)}")         # ≈ 99.9999... (오차)
print(f"Kahan 합: {kahan_sum(nums)}")  # 정확히 100.0에 가까움
print(f"정확 값: {100.0}")

# 안정적인 이차방정식 풀기
def quadratic(a, b, c):
    """취소 오차를 피한 이차방정식 풀이"""
    disc = math.sqrt(b*b - 4*a*c)
    if b > 0:
        x1 = (-b - disc) / (2*a)
    else:
        x1 = (-b + disc) / (2*a)
    x2 = c / (a * x1)  # x1*x2 = c/a 이용
    return x1, x2
```

## 관련 개념

- [위치 기수법 (Positional Number System)](/knowledge/algorithms/mathematical-algorithms/positional-number-system/)
- [다중 정밀도 연산 (Multiple-Precision Arithmetic)](/knowledge/algorithms/mathematical-algorithms/multiple-precision-arithmetic/)
- [기수 변환 (Radix Conversion)](/knowledge/algorithms/mathematical-algorithms/radix-conversion/)
