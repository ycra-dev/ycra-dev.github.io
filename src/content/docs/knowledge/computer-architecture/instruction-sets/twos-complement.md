---
title: "2의 보수 (Two's Complement)"
description: "2의 보수(Two's Complement)는 부호 있는 정수를 이진수로 표현하는 방식으로, 선행 비트가 0이면 양수, 1이면 음수를 나타내며, 1965년 이후 모든 컴퓨터에서 사용되는 유일한 표현 방식이다"
tags: ['Number Representation', 'Signed Integer', 'Binary', 'Arithmetic', 'Overflow']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/twos-complement
sidebar:
  order: 8
---

## 핵심 개념

2의 보수는 하드웨어를 단순하게 만드는 관점에서 선택된 표현이다. 최상위 비트(MSB)가 부호 비트 역할을 하며, 양수는 0으로, 음수는 1로 시작한다. 32비트에서 표현 범위는 -2^31(-2,147,483,648)부터 2^31-1(2,147,483,647)까지이다. 부호-크기(sign and magnitude) 방식의 단점(두 개의 0, 복잡한 덧셈기)을 해결한다. 음수를 구하는 빠른 방법은 모든 비트를 반전한 후 1을 더하는 것이다. 부호 확장(sign extension)은 작은 비트 수의 값을 큰 비트 수로 확장할 때, 부호 비트를 복제하여 상위 비트를 채우는 기법이다.

현재 판매되는 모든 컴퓨터에서 사용되는 표준 정수 표현법이다. 뺄셈은 해당 피연산자를 부정(비트 반전 후 1 더하기)한 후 덧셈으로 수행한다. 유한한 워드 크기(보통 32비트) 때문에 산술 연산이 표현 가능한 범위를 초과하는 결과를 생성할 수 있다. 오버플로우 검출이 중요하며, 양수+양수=음수 또는 음수+음수=양수일 때 오버플로우가 발생한다. MIPS에서 add/sub는 오버플로우 시 예외를 발생시키고, addu/subu는 무시한다. 포화 산술(saturating arithmetic)은 오버플로우 시 최댓값/최솟값으로 고정하는 방식으로, 미디어 연산에 유용하다.

## 예시

```
32비트 2의 보수 표현:

양수 2:  0000 0000 0000 0000 0000 0000 0000 0010
음수 -2: 1111 1111 1111 1111 1111 1111 1111 1110

부정(negation) 방법: 비트 반전 + 1
  2:  0000...0010
반전:  1111...1101
  +1: 1111...1110 = -2 ✓

부호 확장 예시 (16비트 → 32비트):
  -2 (16비트): 1111 1111 1111 1110
  -2 (32비트): 1111 1111 1111 1111 1111 1111 1111 1110
  → 부호 비트(1)를 상위 16비트에 복제
```

```
# 2의 보수 표현 (8비트)
# +7  = 00000111
# -7  = 11111001 (비트 반전 후 +1)
#
# 뺄셈: 7 - 6 = 7 + (-6)
#   00000111  (+7)
# + 11111010  (-6)
# ----------
#   00000001  (+1)

# 오버플로우 예시:
#   01111111  (+127)
# + 00000001  (+1)
# ----------
#   10000000  (-128)  <- 양수+양수=음수: 오버플로우!
```

## 관련 개념

- [워드 (Word)](/knowledge/computer-architecture/word/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
- [부호 확장 (Sign Extension)](/knowledge/computer-architecture/sign-extension/)
- [기계어 (Machine Language)](/knowledge/computer-architecture/machine-language/)
- [오버플로우 검출 (Overflow Detection)](/knowledge/computer-architecture/overflow-detection/)
- [산술논리장치 (ALU)](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [예외 (Exception)](/knowledge/computer-architecture/exception/)
