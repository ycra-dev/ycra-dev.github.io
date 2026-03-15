---
title: "부호 확장 (Sign Extend)"
description: "부호 확장(Sign Extend)은 원본 데이터의 최상위 부호 비트를 더 큰 데이터의 상위 비트에 복제하여 데이터 크기를 확장하는 연산이다"
tags: ['Datapath', 'Immediate Field', 'Two Complement', 'Mips']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/sign-extend
sidebar:
  order: 10
---

## 핵심 개념

MIPS의 load/store 및 분기 명령어에서 16비트 즉시 값(immediate field)을 32비트 값으로 확장할 때 부호 확장이 사용된다. 2의 보수 표현에서 부호 확장은 원래 수의 값을 보존한다. 예를 들어, 16비트 음수 값의 최상위 비트(1)를 상위 16비트 모두에 복제하면 32비트에서도 동일한 음수 값을 나타낸다. 데이터패스에서 부호 확장 유닛은 16비트 입력을 받아 32비트 출력을 생성하는 조합 논리 회로이다.

## 예시

```
16비트 값: 1111 1111 1111 0000 (-16)
부호 확장 후 32비트:
1111 1111 1111 1111 1111 1111 1111 0000 (-16)

16비트 값: 0000 0000 0000 1010 (+10)
부호 확장 후 32비트:
0000 0000 0000 0000 0000 0000 0000 1010 (+10)
```

## 관련 개념

- [데이터패스 (Datapath)](/knowledge/computer-architecture/datapath/)
- [ALU 제어 (ALU Control)](/knowledge/computer-architecture/alu-control/)
