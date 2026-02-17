---
title: "Integer Representation"
description: "정수 표현(Integer Representation)은 양의 정수 n을 1보다 큰 정수 b를 밑(base)으로 하여 n = a_k*b^k + a_{k-1}*b^{k-1} + "
tags: ['Integer Representation', 'Binary', 'Hexadecimal', 'Octal', 'Base Conversion', 'Number System']
created: 2026-02-16
updated: 2026-02-17
draft: true
slug: knowledge/mathematics/integer-representation
sidebar:
  order: 3
---

## 핵심 개념

컴퓨터 과학에서 가장 중요한 진법은 다음과 같다:
- **2진법(Binary)**: b = 2, 숫자 {0, 1}. 컴퓨터 내부 산술의 기본
- **8진법(Octal)**: b = 8, 숫자 {0, ..., 7}. 3비트 그룹에 대응
- **16진법(Hexadecimal)**: b = 16, 숫자 {0, ..., 9, A, B, C, D, E, F}. 4비트 그룹에 대응

**진법 변환 알고리즘(Algorithm 1)**:
10진수 n을 b진법으로 변환하려면, n을 b로 반복적으로 나누어 나머지를 모은다:
```
q := n
while q != 0:
    a_k := q mod b    (이것이 다음 자릿수)
    q := q div b
```
나머지들을 역순으로 나열하면 b진법 표현이 된다.

**2진법 <-> 8진법/16진법 변환**:
- 8진법: 2진수를 3비트씩 묶어서 변환 (8 = 2^3)
- 16진법: 2진수를 4비트씩 묶어서 변환 (16 = 2^4)
- 이 변환은 매우 빠르고 직관적이므로 실무에서 많이 활용된다.

**n자리 수의 비트 수**: 양의 정수 n의 b진법 표현은 floor(log_b(n)) + 1 자릿수를 가진다.

**정수 산술의 복잡도**:
- **덧셈**: n비트 정수 두 개의 이진 덧셈은 O(n) 비트 연산
- **곱셈**: 전통적 방법은 O(n^2) 비트 연산, 더 효율적인 O(n^1.585) 알고리즘도 존재
- **div와 mod**: O(n^2) 비트 연산 (n비트 이하의 수)

## 예시

**2진수 → 10진수 변환**:
```
(10101111)_2 = 1*2^7 + 0*2^6 + 1*2^5 + 0*2^4 + 1*2^3 + 1*2^2 + 1*2^1 + 1*2^0
             = 128 + 32 + 8 + 4 + 2 + 1 = 175
```

**10진수 → 8진수 변환 (반복 나눗셈)**:
```
12345를 8진수로:
12345 ÷ 8 = 1543 나머지 1
1543  ÷ 8 = 192  나머지 7
192   ÷ 8 = 24   나머지 0
24    ÷ 8 = 3    나머지 0
3     ÷ 8 = 0    나머지 3

→ (12345)_10 = (30071)_8
```

**2진법 ↔ 16진법 직접 변환**:
```
(11 1110 1011 1100)_2
→ 4비트씩 그룹: 0011 | 1110 | 1011 | 1100
→ 16진수:        3      E      B      C
→ (3EBC)_16
```

**Python에서의 진법 변환**:
```python
n = 12345
print(bin(n))    # 0b11000000111001
print(oct(n))    # 0o30071
print(hex(n))    # 0x3039

# 수동 진법 변환
def to_base(n, b):
    if n == 0: return "0"
    digits = "0123456789ABCDEF"
    result = ""
    while n > 0:
        result = digits[n % b] + result
        n //= b
    return result

print(to_base(12345, 8))   # 30071
print(to_base(175627, 16)) # 2AE0B
```

**이진 덧셈 예시**:
```
  1 1 1 0
+ 1 0 1 1
---------
1 1 0 0 1   (14 + 11 = 25)
```

## 관련 개념

- [Algorithm](/knowledge/mathematics/algorithm/) - 진법 변환 알고리즘, 산술 알고리즘
- [Complexity](/knowledge/mathematics/complexity/) - 이진 산술의 비트 연산 복잡도
- [Big-O Notation](/knowledge/mathematics/big-o-notation/) - 덧셈 O(n), 곱셈 O(n^2)
- [Modular Exponentiation](/knowledge/mathematics/modular-exponentiation/) - 이진 전개를 활용한 효율적 거듭제곱
- [Modular Arithmetic](/knowledge/mathematics/modular-arithmetic/) - mod, div 연산
