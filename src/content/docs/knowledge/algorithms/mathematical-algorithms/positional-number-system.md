---
title: "위치 기수법 (Positional Number System)"
description: "기수(radix) b를 사용하여 각 자릿값의 위치가 그 값의 의미를 결정하는 수 표현 체계"
tags: ["Algorithms", "Number Theory", "Arithmetic", "Mathematical Algorithms"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/algorithms/mathematical-algorithms/positional-number-system
sidebar:
  order: 27
---

## 핵심 개념

위치 수 체계(Positional Number System)는 기수(radix) b를 사용하여 수를 위치 표기법으로 표현한다:

```
(... a₂ a₁ a₀ . a₋₁ a₋₂ ...)_b = Σ_k a_k × b^k
```

각 자릿값의 **위치(position)**가 그 의미를 결정한다. 자릿값 a_k의 실제 값은 a_k × b^k다.

## 동작 원리

**주요 기수 체계**:
| 이름 | 기수 | 자릿값 | 주용도 |
|------|------|--------|--------|
| 이진(Binary) | 2 | 0-1 | 컴퓨터 내부 |
| 팔진(Octal) | 8 | 0-7 | 역사적 |
| 십진(Decimal) | 10 | 0-9 | 일상 |
| 십육진(Hexadecimal) | 16 | 0-F | 메모리 표시 |
| 육십진(Sexagesimal) | 60 | — | 시간, 각도 |

**역사적 발전**:
- **기원전 1750**: 바빌론의 육십진법 — 최초의 부동소수점 표기 (소수점 위치를 문맥에서 추론)
- **AD 600**: 힌두 문화에서 현대 십진법의 원형 (0 포함)
- **AD 750**: 아랍으로 전파, al-Khwārizmī의 교재
- **1202**: 피보나치의 『산반서』가 유럽에 전파

**이진 ↔ 16진 변환**: 4비트가 정확히 1자리 16진수에 대응하므로 변환 비용이 없다.

**MSB/LSB**:
- MSB(Most Significant Bit): 왼쪽 끝, 가장 큰 자릿값
- LSB(Least Significant Bit): 오른쪽 끝, 가장 작은 자릿값
- PRNG에서 LCG의 하위 비트(LSB)는 품질이 낮음 → 상위 비트 사용 권장

## 예시

```python
def to_base(n, base, digits="0123456789ABCDEF"):
    """양의 정수 n을 임의 기수로 변환"""
    if n == 0:
        return "0"
    result = []
    while n > 0:
        result.append(digits[n % base])
        n //= base
    return "".join(reversed(result))

def from_base(s, base):
    """임의 기수의 수를 정수로 변환 (Horner's Rule)"""
    digits = "0123456789ABCDEF"
    result = 0
    for c in s:
        result = result * base + digits.index(c.upper())
    return result

# 변환 예시
n = 255
print(f"십진: {n}")
print(f"이진: {to_base(n, 2)}")   # 11111111
print(f"팔진: {to_base(n, 8)}")   # 377
print(f"16진: {to_base(n, 16)}")  # FF

# 빠른 이진↔16진 변환
def bin_to_hex(binary_str):
    """4비트씩 그룹화하여 변환 (연산 없음)"""
    n = int(binary_str, 2)
    return hex(n)[2:].upper()

def hex_to_bin(hex_str):
    n = int(hex_str, 16)
    return bin(n)[2:]

print(bin_to_hex("11111111"))  # FF
print(hex_to_bin("FF"))        # 11111111

# 음수 표현: 2의 보수 (2^n 기수에서의 보완)
def twos_complement(n, bits=8):
    """2의 보수 표현 (정수 → 비트 패턴)"""
    if n >= 0:
        return format(n, f'0{bits}b')
    return format(2**bits + n, f'0{bits}b')

print(twos_complement(-1, 8))   # 11111111
print(twos_complement(-128, 8)) # 10000000
```

## 관련 개념

- [부동소수점 연산 (Floating Point Arithmetic)](/knowledge/algorithms/mathematical-algorithms/floating-point-arithmetic/)
- [기수 변환 (Radix Conversion)](/knowledge/algorithms/mathematical-algorithms/radix-conversion/)
- [다중 정밀도 연산 (Multiple-Precision Arithmetic)](/knowledge/algorithms/mathematical-algorithms/multiple-precision-arithmetic/)
