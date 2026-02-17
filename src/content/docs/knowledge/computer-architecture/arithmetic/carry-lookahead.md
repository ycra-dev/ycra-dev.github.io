---
title: "Carry Lookahead"
description: "캐리 룩어헤드(Carry Lookahead)는 올림(carry)을 미리 예측하여 덧셈 속도를 높이는 기법으로, 최악의 경우 지연을 가산기 비트 수의 전체가 아닌 log2 함수로 줄인다"
tags: ['Adder', 'Arithmetic', 'Performance', 'Hardware', 'Parallel Prefix']
created: 2026-02-15
updated: 2026-02-17
draft: true
slug: knowledge/computer-architecture/carry-lookahead
sidebar:
  order: 3
---

## 핵심 개념

기본 리플 캐리 가산기(ripple carry adder)에서는 올림이 최하위 비트에서 최상위 비트까지 순차적으로 전파되어 n비트 가산기의 지연이 O(n)이다. 캐리 룩어헤드는 상위 비트의 올림을 미리 계산하여 최악의 경우를 O(log2(n))으로 줄인다. 더 빠르지만 더 많은 게이트가 필요하다. 각 비트 위치에서 generate(올림 생성)와 propagate(올림 전파) 신호를 계산하고, 이를 조합하여 모든 올림을 동시에 결정한다. 이 기법은 곱셈 하드웨어의 부분 곱 합산에도 활용된다.

## 예시

```
# 캐리 룩어헤드의 기본 원리
# 각 비트 i에서:
# Generate (G_i): a_i AND b_i (이 위치에서 올림 생성)
# Propagate (P_i): a_i XOR b_i (이전 올림을 전파)

# 올림 계산:
# C_1 = G_0 + P_0 · C_0
# C_2 = G_1 + P_1 · G_0 + P_1 · P_0 · C_0
# C_3 = G_2 + P_2 · G_1 + P_2 · P_1 · G_0 + ...

# 4비트 리플 캐리: 4단계 지연
# 4비트 캐리 룩어헤드: 2단계 지연 (log2(4) = 2)
```

## 관련 개념

- [Arithmetic Logic Unit](/knowledge/computer-architecture/arithmetic-logic-unit/)
- [Multiplication Hardware](/knowledge/computer-architecture/multiplication-hardware/)
