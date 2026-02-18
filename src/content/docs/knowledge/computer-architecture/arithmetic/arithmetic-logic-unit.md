---
title: "Arithmetic Logic Unit"
description: "산술 논리 장치(ALU, Arithmetic Logic Unit)는 덧셈, 뺄셈, 그리고 보통 AND, OR 같은 논리 연산을 수행하는 하드웨어 장치이다"
tags: ['Alu', 'Addition', 'Subtraction', 'Hardware', 'Datapath']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/arithmetic-logic-unit
sidebar:
  order: 1
---

## 핵심 개념

ALU는 프로세서의 핵심 구성 요소로, 모든 산술 및 논리 연산을 담당한다. 이진수의 덧셈은 오른쪽에서 왼쪽으로 비트별로 수행되며, 올림(carry)이 다음 비트로 전달된다. 뺄셈은 적절한 피연산자를 부정(negate)한 후 덧셈으로 수행한다. 오버플로우 검출이 중요한 역할을 하며, MIPS에서는 add/addi/sub는 오버플로우 시 예외를 발생시키고, addu/addiu/subu는 오버플로우를 무시한다. 덧셈 속도를 높이기 위해 캐리 룩어헤드(carry lookahead) 같은 기법이 사용되며, 이는 올림 전파의 최악의 경우를 비트 수의 log2 함수로 줄인다.

MIPS 32비트 ALU는 32개의 1비트 ALU를 연결하여 구성된다. 1비트 ALU는 AND 게이트, OR 게이트, 전가산기(full adder), 멀티플렉서로 구성되며, Operation 제어 신호로 수행할 연산을 선택한다. 뺄셈은 2의 보수를 이용하여 b를 반전(Binvert)하고 최하위 비트의 CarryIn을 1로 설정하여 a + b' + 1 = a - b를 계산한다. NOR 연산은 드모르간 정리를 이용하여 NOT a AND NOT b로 구현한다. slt(set on less than) 명령어는 최상위 비트 ALU의 부호 비트(Set 출력)를 최하위 비트의 Less 입력에 연결하여 구현한다. 분기 명령어의 동등 비교는 뺄셈 후 결과가 0인지 검사하는 Zero 검출기로 구현한다. 4비트 제어 신호(Ainvert, Binvert, Operation 2비트)로 모든 연산을 선택한다.

## 예시

```
# 이진수 덧셈 예시: 6 + 7
    0110   (6)
  + 0111   (7)
  ------
    1101   (13)

# 뺄셈 예시: 7 - 6 = 7 + (-6)
# -6의 2의 보수: 1010
    0111   (7)
  + 1010   (-6)
  ------
    0001   (1)
```

```
MIPS ALU 제어 신호:
Ainvert  Bnegate  Operation  기능
  0        0        00      AND
  0        0        01      OR
  0        0        10      add
  0        1        10      subtract
  0        1        11      slt
  1        1        00      NOR

32비트 ALU 구조:
  [1비트 ALU₀] → [1비트 ALU₁] → ... → [1비트 ALU₃₁]
       ↑              ↑                      ↑
    CarryIn₀=0     CarryOut₀→              Set→Less₀
    (뺄셈 시 1)    CarryIn₁

  Zero = NOR(Result₃₁, Result₃₀, ..., Result₁, Result₀)
```

## 관련 개념

- [Overflow Detection](/knowledge/computer-architecture/overflow-detection/)
- [Carry Lookahead](/knowledge/computer-architecture/carry-lookahead/)
- [Twos Complement](/knowledge/computer-architecture/twos-complement/)
- [Multiplication Hardware](/knowledge/computer-architecture/multiplication-hardware/)
- [Carry Lookahead Adder](/knowledge/computer-architecture/carry-lookahead-adder/)
- [Datapath](/knowledge/computer-architecture/datapath/)
