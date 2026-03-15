---
title: "부호 확장 (Sign Extension)"
description: "부호 확장(Sign Extension)은 n비트의 2의 보수 수를 n비트보다 큰 표현으로 변환할 때, 원래 수의 최상위 비트(부호 비트)를 복제하여 새로운 상위 비트를 채우는 기법이다"
tags: ['Binary', 'Twos Complement', 'Data Conversion', 'Immediate Value', 'Signed Number']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/sign-extension
sidebar:
  order: 9
---

## 핵심 개념

부호 확장은 MIPS의 load, store, branch, add immediate 등의 명령어에서 16비트 즉시값(immediate)을 32비트 레지스터 값과 연산할 때 필수적으로 사용된다. 16비트 즉시값 필드는 -32,768에서 32,767까지의 값을 표현하며, 이를 32비트로 확장할 때 부호 비트를 복제한다. 양수의 2의 보수는 무한한 선행 0을, 음수는 무한한 선행 1을 가지므로, 부호 확장은 단순히 이 숨겨진 비트를 복원하는 것이다. 부호 있는 load(lb)는 부호 확장을 수행하고, 부호 없는 load(lbu)는 0으로 채운다.

## 예시

```
16비트 → 32비트 부호 확장:

양수 +2 (16비트): 0000 0000 0000 0010
→ 32비트:         0000 0000 0000 0000 0000 0000 0000 0010
                  (0을 16개 복제하여 상위 비트 채움)

음수 -2 (16비트): 1111 1111 1111 1110
→ 32비트:         1111 1111 1111 1111 1111 1111 1111 1110
                  (1을 16개 복제하여 상위 비트 채움)

MIPS에서의 사용:
addi $s0, $s1, -4    # 즉시값 -4(16비트)를 32비트로 부호 확장
                     # 후 $s1에 더함
```

## 관련 개념

- [2의 보수 (Two's Complement)](/knowledge/computer-architecture/twos-complement/)
- [데이터 전송 명령어 (Data Transfer Instruction)](/knowledge/computer-architecture/data-transfer-instruction/)
- [명령어 형식 (Instruction Format)](/knowledge/computer-architecture/instruction-format/)
- [레지스터 (Register)](/knowledge/computer-architecture/register/)
