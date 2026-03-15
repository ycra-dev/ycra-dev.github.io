---
title: "오버플로우 검출 (Overflow Detection)"
description: "오버플로우 검출(Overflow Detection)은 산술 연산의 결과가 고정된 워드 크기로 표현할 수 없을 정도로 너무 크거나 작은 경우를 감지하는 메커니즘이다"
tags: ['Arithmetic', 'Exception', 'Twos Complement', 'Alu', 'Error Handling']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/overflow-detection
sidebar:
  order: 2
---

## 핵심 개념

32비트 워드를 사용하는 컴퓨터에서 오버플로우는 결과에 33비트가 필요한 경우 발생한다. 덧셈에서 오버플로우 발생 조건: 양수+양수=음수, 또는 음수+음수=양수. 뺄셈에서: 양수-음수=음수, 또는 음수-양수=양수. 부호가 다른 피연산자의 덧셈이나 같은 부호의 피연산자의 뺄셈에서는 오버플로우가 발생할 수 없다. MIPS는 오버플로우를 예외(exception)로 처리하며, 예외 발생 시 예외 프로그램 카운터(EPC)에 해당 명령어 주소를 저장한다. C 언어는 오버플로우를 무시하므로 MIPS C 컴파일러는 항상 부호 없는 산술 명령어(addu, subu)를 생성한다.

## 예시

```
# 오버플로우 발생 조건 (2의 보수)
# 연산     | 피연산자A | 피연산자B | 결과   | 오버플로우?
# 덧셈     | A >= 0   | B >= 0   | < 0   | 예
# 덧셈     | A < 0    | B < 0    | >= 0  | 예
# 뺄셈     | A >= 0   | B < 0    | < 0   | 예
# 뺄셈     | A < 0    | B >= 0   | >= 0  | 예

# MIPS 오버플로우 처리:
add  $t0, $s0, $s1   # 오버플로우 시 예외 발생
addu $t0, $s0, $s1   # 오버플로우 무시
```

## 관련 개념

- [산술논리장치 (ALU)](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [예외 (Exception)](/knowledge/computer-architecture/exception/)
- [2의 보수 (Two's Complement)](/knowledge/computer-architecture/twos-complement/)
