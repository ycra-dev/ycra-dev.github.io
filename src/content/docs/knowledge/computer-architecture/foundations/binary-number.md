---
title: "이진수 (Binary Number)"
description: "0과 1 두 개의 숫자만 사용하는 2진법으로 표현된 수로, 컴퓨터 내부의 모든 데이터와 연산의 기반"
tags: ["Computer-Architecture", "Binary", "Number-System", "Digital"]
created: 2026-02-27
updated: 2026-02-27
draft: true
slug: knowledge/computer-architecture/binary-number
sidebar:
  order: 35
---

## 핵심 개념

이진수(binary number)는 0과 1 두 개의 숫자만 사용하는 2진법(base-2)으로 표현된 수이다. 컴퓨터 내부의 모든 데이터와 연산은 이진수를 기반으로 동작한다.

## 동작 원리

우리가 일상에서 사용하는 10진법은 0~9까지 10개의 숫자를 사용하고 각 자릿값이 10의 거듭제곱인 반면, 이진법은 0과 1만 사용하고 각 자릿값이 2의 거듭제곱이다.

### 이진수 변환 원리

각 자릿수는 오른쪽부터 2^0, 2^1, 2^2, ... 의 자릿값을 가진다:

```
이진수  1  1  1  0  1
자릿값  2⁴ 2³ 2² 2¹ 2⁰
      = 16 + 8 + 4 + 0 + 1 = 29 (10진수)
```

### 컴퓨터에서 이진수를 사용하는 이유
1. **물리적 구현이 쉽다**: 트랜지스터의 ON/OFF 두 상태가 0과 1에 자연스럽게 대응한다.
2. **오류에 강하다**: 두 상태만 구분하면 되므로 전압 변동 등 노이즈에 의한 오류가 적다.
3. **논리 연산과의 일치**: 부울 대수(참/거짓)와 직접 대응하여 논리 회로 설계가 직관적이다.

### 관련 진법
- **8진법(Octal, base-8)**: 이진수 3자리를 1자리로 축약 (예: 111₂ = 7₈)
- **16진법(Hexadecimal, base-16)**: 이진수 4자리를 1자리로 축약 (예: 1111₂ = F₁₆). 메모리 주소, 색상 코드 등에 자주 사용된다.

## 예시

10진수와 이진수 대응표:

```
10진수  이진수     10진수  이진수
  0     0000        8     1000
  1     0001        9     1001
  2     0010       10     1010
  3     0011       15     1111
  4     0100       16    10000
  5     0101      100   1100100
  6     0110      255   11111111
  7     0111      256  100000000
```

이진수 덧셈 예시:

```
    0 1 1 0 1   (= 13)
  + 0 1 0 1 1   (= 11)
  -----------
    1 1 0 0 0   (= 24)
```

규칙: 0+0=0, 0+1=1, 1+0=1, 1+1=10(올림)

16진법으로 색상 표현:

```
#FF0000 = 빨강 (R=255, G=0, B=0)
#00FF00 = 초록
#0000FF = 파랑
#FFFFFF = 흰색 (R=255, G=255, B=255)
```

## 관련 개념

- [비트 (Bit)](/knowledge/computer-architecture/bit/) - 이진수의 한 자리를 나타내는 정보 단위
- [바이트 (Byte)](/knowledge/computer-architecture/byte/) - 이진수 8자리를 묶은 데이터 단위
- [아날로그-디지털 변환 (Analog to Digital Conversion)](/knowledge/computer-architecture/analog-to-digital-conversion/) - 아날로그 값을 이진수로 변환하는 과정
- [ASCII](/knowledge/computer-architecture/ascii/) - 문자를 이진수로 인코딩하는 표준

## 출처

- Understanding the Digital World, Chapter 2
